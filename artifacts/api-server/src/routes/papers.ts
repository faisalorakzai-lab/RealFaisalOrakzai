import { Router, type IRouter } from "express";
  import { eq } from "drizzle-orm";
  import { db, researchTable } from "@workspace/db";

  const router: IRouter = Router();

  // ââ helpers ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  function toSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 80);
  }

  function buildApa(
    authors: string[],
    year: string,
    title: string,
    institution: string,
    url: string
  ): string {
    const formattedAuthors = authors
      .map((a) => {
        const parts = a.trim().split(/\s+/);
        if (parts.length < 2) return a;
        const last = parts[parts.length - 1];
        const initials = parts
          .slice(0, -1)
          .map((n) => n[0] + ".")
          .join(" ");
        return `${last}, ${initials}`;
      })
      .join(", & ");
    return `${formattedAuthors} (${year}). ${title}. ${institution}. ${url}`;
  }

  function buildBibtex(
    slug: string,
    authors: string[],
    year: string,
    title: string,
    institution: string,
    url: string,
    keywords: string[]
  ): string {
    const key = `orakzai${year}${slug.replace(/-/g, "").substring(0, 12)}`;
    const authorStr = authors.join(" and ");
    const lines = [
      `@article{${key},`,
      `  title     = {${title}},`,
      `  author    = {${authorStr}},`,
      `  year      = {${year}},`,
      `  publisher = {${institution}},`,
      `  url       = {${url}}`,
      keywords.length ? `  keywords  = {${keywords.join(", ")}}` : null,
      `}`,
    ]
      .filter(Boolean)
      .join("\n");
    return lines;
  }

  function buildJsonLd(
    id: number,
    slug: string,
    title: string,
    abstract: string,
    authors: string[],
    year: string,
    institution: string,
    keywords: string[],
    downloadUrl: string | null | undefined,
    baseUrl: string
  ) {
    return {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "@id": `${baseUrl}/papers/${slug}`,
      headline: title,
      name: title,
      description: abstract,
      abstract,
      datePublished: `${year}-01-01`,
      keywords: keywords.join(", "),
      inLanguage: "en",
      isAccessibleForFree: true,
      url: `${baseUrl}/papers/${slug}`,
      ...(downloadUrl && {
        associatedMedia: {
          "@type": "MediaObject",
          contentUrl: downloadUrl,
          encodingFormat: "application/pdf",
        },
      }),
      author: authors.map((name) => ({
        "@type": "Person",
        name,
        url: baseUrl,
        affiliation: { "@type": "Organization", name: institution },
        sameAs: ["https://orcid.org/0009-0000-0915-7272"],
      })),
      publisher: {
        "@type": "Organization",
        name: institution,
        url: baseUrl,
      },
    };
  }

  function enrichPaper(
    row: {
      id: number;
      title: string;
      type: string;
      abstract: string;
      authors: string[];
      downloadUrl?: string | null;
      tags?: string[] | null;
      publishedAt: Date;
      createdAt: Date;
    },
    baseUrl: string
  ) {
    const slug = toSlug(row.title);
    const year = new Date(row.publishedAt).getFullYear().toString();
    const institution = "Orakzai Research Lab";
    const tags = row.tags ?? [];
    const url = `${baseUrl}/papers/${slug}`;

    const apa = buildApa(row.authors, year, row.title, institution, url);
    const bibtex = buildBibtex(slug, row.authors, year, row.title, institution, url, tags);
    const jsonld = buildJsonLd(
      row.id,
      slug,
      row.title,
      row.abstract,
      row.authors,
      year,
      institution,
      tags,
      row.downloadUrl,
      baseUrl
    );

    return {
      id: row.id,
      slug,
      title: row.title,
      type: row.type,
      abstract: row.abstract,
      publishedAt: row.publishedAt.toISOString(),
      authors: row.authors,
      keywords: tags,
      downloadUrl: row.downloadUrl ?? null,
      tags,
      institution,
      journalTitle: "Orakzai Research Lab Working Papers",
      orcid: "0009-0000-0915-7272",
      citation: { apa, bibtex, jsonld },
    };
  }

  // ââ GET /papers âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  router.get("/papers", async (req, res): Promise<void> => {
    const baseUrl = `https://${req.hostname === "localhost" ? "faisalorakzai.com" : req.hostname}`;
    const { type, search } = req.query as { type?: string; search?: string };

    let rows = await db
      .select()
      .from(researchTable)
      .orderBy(researchTable.publishedAt);

    if (type) rows = rows.filter((r) => r.type === type);
    if (search) {
      const s = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.title.toLowerCase().includes(s) ||
          r.abstract.toLowerCase().includes(s) ||
          (r.tags ?? []).some((t) => t.toLowerCase().includes(s))
      );
    }

    res.json(rows.map((r) => enrichPaper(r, baseUrl)));
  });

  // ââ GET /papers/:slug âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  router.get("/papers/:slug", async (req, res): Promise<void> => {
    const baseUrl = `https://${req.hostname === "localhost" ? "faisalorakzai.com" : req.hostname}`;
    const { slug } = req.params;

    // Try numeric ID first, then fall back to slug matching
    let row: typeof researchTable.$inferSelect | undefined;

    const numericId = parseInt(slug, 10);
    if (!isNaN(numericId)) {
      [row] = await db
        .select()
        .from(researchTable)
        .where(eq(researchTable.id, numericId));
    }

    // If not found by ID, load all and match by slug
    if (!row) {
      const all = await db.select().from(researchTable);
      row = all.find((r) => toSlug(r.title) === slug);
    }

    if (!row) {
      res.status(404).json({ error: "Paper not found" });
      return;
    }

    // Return JSON or BibTeX based on Accept header
    const accept = req.headers.accept ?? "";
    if (accept.includes("application/x-bibtex") || req.query.format === "bibtex") {
      const enriched = enrichPaper(row, baseUrl);
      res.setHeader("Content-Type", "application/x-bibtex; charset=utf-8");
      res.send(enriched.citation.bibtex);
      return;
    }

    // Content-negotiation: application/ld+json for JSON-LD crawlers
    if (accept.includes("application/ld+json") || req.query.format === "jsonld") {
      const enriched = enrichPaper(row, baseUrl);
      res.setHeader("Content-Type", "application/ld+json; charset=utf-8");
      res.json(enriched.citation.jsonld);
      return;
    }

    res.json(enrichPaper(row, baseUrl));
  });

  // ââ POST /papers ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  router.post("/papers", async (req, res): Promise<void> => {
    const baseUrl = `https://${req.hostname === "localhost" ? "faisalorakzai.com" : req.hostname}`;
    const {
      title,
      type,
      abstract,
      authors,
      keywords,
      downloadUrl,
      tags,
      publishedAt,
    } = req.body as {
      title?: string;
      type?: string;
      abstract?: string;
      authors?: string[];
      keywords?: string[];
      downloadUrl?: string;
      tags?: string[];
      publishedAt?: string;
    };

    if (!title || !type || !abstract || !authors?.length) {
      res.status(400).json({
        error: "title, type, abstract, and authors are required",
        example: {
          title: "My Daily Article Title",
          type: "article",
          abstract: "Brief description of the article...",
          authors: ["Muhammad Faisal Orakzai"],
          tags: ["DeFi", "Pakistan", "Blockchain"],
          downloadUrl: null,
          publishedAt: new Date().toISOString(),
        },
      });
      return;
    }

    const allTags = [...new Set([...(tags ?? []), ...(keywords ?? [])])];

    const [row] = await db
      .insert(researchTable)
      .values({
        title,
        type,
        abstract,
        authors,
        tags: allTags.length ? allTags : null,
        downloadUrl: downloadUrl ?? null,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      })
      .returning();

    res.status(201).json(enrichPaper(row, baseUrl));
  });

  export default router;
  
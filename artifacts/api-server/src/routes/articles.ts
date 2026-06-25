import { Router, type IRouter } from "express";
import { eq, ilike, or } from "drizzle-orm";
import { db, articlesTable } from "@workspace/db";
import {
  ListArticlesQueryParams,
  ListArticlesResponse,
  CreateArticleBody,
  CreateArticleResponse,
  GetArticleParams,
  GetArticleResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/articles", async (req, res): Promise<void> => {
  const query = ListArticlesQueryParams.safeParse(req.query);
  let rows = await db.select().from(articlesTable).orderBy(articlesTable.publishedAt);
  if (query.success) {
    if (query.data.category) {
      rows = rows.filter((r) => r.category === query.data.category);
    }
    if (query.data.search) {
      const s = query.data.search.toLowerCase();
      rows = rows.filter((r) =>
        r.title.toLowerCase().includes(s) ||
        r.excerpt.toLowerCase().includes(s) ||
        r.content.toLowerCase().includes(s)
      );
    }
  }
  res.json(ListArticlesResponse.parse(rows.map((r) => ({
    ...r,
    tags: r.tags ?? [],
    publishedAt: r.publishedAt.toISOString(),
  }))));
});

router.post("/articles", async (req, res): Promise<void> => {
  const parsed = CreateArticleBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(articlesTable).values(parsed.data).returning();
  res.status(201).json(CreateArticleResponse.parse({ ...row, tags: row.tags ?? [], publishedAt: row.publishedAt.toISOString() }));
});

router.get("/articles/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetArticleParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db.select().from(articlesTable).where(eq(articlesTable.id, params.data.id));
  if (!row) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.json(GetArticleResponse.parse({ ...row, tags: row.tags ?? [], publishedAt: row.publishedAt.toISOString() }));
});

export default router;

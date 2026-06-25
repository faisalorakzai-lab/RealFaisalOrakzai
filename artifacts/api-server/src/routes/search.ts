import { Router, type IRouter } from "express";
import { db, projectsTable, articlesTable, researchTable, newsTable } from "@workspace/db";
import { GlobalSearchQueryParams, GlobalSearchResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/search", async (req, res): Promise<void> => {
  const query = GlobalSearchQueryParams.safeParse(req.query);
  if (!query.success || !query.data.q) {
    res.status(400).json({ error: "Query parameter 'q' is required" });
    return;
  }

  const q = query.data.q.toLowerCase();

  const [projects, articles, research, news] = await Promise.all([
    db.select().from(projectsTable),
    db.select().from(articlesTable),
    db.select().from(researchTable),
    db.select().from(newsTable),
  ]);

  const results = [
    ...projects
      .filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      .map((p) => ({
        id: p.id,
        type: "project",
        title: p.title,
        excerpt: p.description.slice(0, 150),
        url: `/projects`,
      })),
    ...articles
      .filter((a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
      .map((a) => ({
        id: a.id,
        type: "article",
        title: a.title,
        excerpt: a.excerpt.slice(0, 150),
        url: `/learning`,
      })),
    ...research
      .filter((r) => r.title.toLowerCase().includes(q) || r.abstract.toLowerCase().includes(q))
      .map((r) => ({
        id: r.id,
        type: "research",
        title: r.title,
        excerpt: r.abstract.slice(0, 150),
        url: `/research`,
      })),
    ...news
      .filter((n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q))
      .map((n) => ({
        id: n.id,
        type: "news",
        title: n.title,
        excerpt: n.excerpt.slice(0, 150),
        url: `/press`,
      })),
  ].slice(0, 20);

  res.json(GlobalSearchResponse.parse({ query: query.data.q, results }));
});

export default router;

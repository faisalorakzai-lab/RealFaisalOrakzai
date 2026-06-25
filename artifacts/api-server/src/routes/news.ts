import { Router, type IRouter } from "express";
import { db, newsTable } from "@workspace/db";
import {
  ListNewsQueryParams,
  ListNewsResponse,
  CreateNewsBody,
  CreateNewsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/news", async (req, res): Promise<void> => {
  const query = ListNewsQueryParams.safeParse(req.query);
  let rows = await db.select().from(newsTable).orderBy(newsTable.publishedAt);
  if (query.success && query.data.category) {
    rows = rows.filter((r) => r.category === query.data.category);
  }
  res.json(ListNewsResponse.parse(rows.map((r) => ({
    ...r,
    publishedAt: r.publishedAt.toISOString(),
  }))));
});

router.post("/news", async (req, res): Promise<void> => {
  const parsed = CreateNewsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(newsTable).values(parsed.data).returning();
  res.status(201).json(CreateNewsResponse.parse({ ...row, publishedAt: row.publishedAt.toISOString() }));
});

export default router;

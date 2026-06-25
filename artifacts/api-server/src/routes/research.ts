import { Router, type IRouter } from "express";
import { db, researchTable } from "@workspace/db";
import {
  ListResearchQueryParams,
  ListResearchResponse,
  CreateResearchBody,
  CreateResearchResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/research", async (req, res): Promise<void> => {
  const query = ListResearchQueryParams.safeParse(req.query);
  let rows = await db.select().from(researchTable).orderBy(researchTable.publishedAt);
  if (query.success && query.data.type) {
    rows = rows.filter((r) => r.type === query.data.type);
  }
  res.json(ListResearchResponse.parse(rows.map((r) => ({
    ...r,
    authors: r.authors ?? [],
    tags: r.tags ?? [],
    publishedAt: r.publishedAt.toISOString(),
  }))));
});

router.post("/research", async (req, res): Promise<void> => {
  const parsed = CreateResearchBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(researchTable).values(parsed.data).returning();
  res.status(201).json(CreateResearchResponse.parse({
    ...row,
    authors: row.authors ?? [],
    tags: row.tags ?? [],
    publishedAt: row.publishedAt.toISOString(),
  }));
});

export default router;

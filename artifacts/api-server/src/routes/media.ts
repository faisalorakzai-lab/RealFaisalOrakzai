import { Router, type IRouter } from "express";
import { db, mediaTable } from "@workspace/db";
import {
  ListMediaQueryParams,
  ListMediaResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/media", async (req, res): Promise<void> => {
  const query = ListMediaQueryParams.safeParse(req.query);
  let rows = await db.select().from(mediaTable).orderBy(mediaTable.publishedAt);
  if (query.success && query.data.type) {
    rows = rows.filter((r) => r.type === query.data.type);
  }
  res.json(ListMediaResponse.parse(rows.map((r) => ({
    ...r,
    publishedAt: r.publishedAt.toISOString(),
  }))));
});

export default router;

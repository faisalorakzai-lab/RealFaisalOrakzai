import { Router, type IRouter } from "express";
import { asc } from "drizzle-orm";
import { db, timelineTable } from "@workspace/db";
import { ListTimelineResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/timeline", async (_req, res): Promise<void> => {
  const rows = await db.select().from(timelineTable).orderBy(asc(timelineTable.year));
  res.json(ListTimelineResponse.parse(rows));
});

export default router;

import { Router, type IRouter } from "express";
import { db, companiesTable } from "@workspace/db";
import { ListCompaniesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/companies", async (_req, res): Promise<void> => {
  const rows = await db.select().from(companiesTable).orderBy(companiesTable.id);
  res.json(ListCompaniesResponse.parse(rows.map((r) => ({
    ...r,
    connections: r.connections ?? [],
  }))));
});

export default router;

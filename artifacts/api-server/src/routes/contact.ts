import { Router, type IRouter } from "express";
  import { db, contactsTable } from "@workspace/db";
  import { sql } from "drizzle-orm";
  import {
    SubmitContactBody,
    SubmitContactResponse,
  } from "@workspace/api-zod";

  const router: IRouter = Router();

  router.get("/contact/stats", async (_req, res): Promise<void> => {
    const [row] = await db.select({ count: sql<number>`count(*)` }).from(contactsTable);
    res.json({ count: Number(row?.count ?? 0) });
  });

  router.post("/contact", async (req, res): Promise<void> => {
    const parsed = SubmitContactBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }
    const [row] = await db.insert(contactsTable).values(parsed.data).returning();
    res.status(201).json(SubmitContactResponse.parse({ ...row, createdAt: row.createdAt.toISOString() }));
  });

  export default router;
  
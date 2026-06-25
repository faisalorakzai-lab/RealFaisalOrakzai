import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import {
  SubmitContactBody,
  SubmitContactResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

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

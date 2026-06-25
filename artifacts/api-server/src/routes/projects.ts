import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, projectsTable } from "@workspace/db";
import {
  ListProjectsQueryParams,
  ListProjectsResponse,
  CreateProjectBody,
  CreateProjectResponse,
  GetProjectParams,
  GetProjectResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/projects", async (req, res): Promise<void> => {
  const query = ListProjectsQueryParams.safeParse(req.query);
  let rows = await db.select().from(projectsTable).orderBy(projectsTable.createdAt);
  if (query.success && query.data.category) {
    rows = rows.filter((r) => r.category === query.data.category);
  }
  res.json(ListProjectsResponse.parse(rows.map((r) => ({
    ...r,
    technologies: r.technologies ?? [],
  }))));
});

router.post("/projects", async (req, res): Promise<void> => {
  const parsed = CreateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(projectsTable).values(parsed.data).returning();
  res.status(201).json(CreateProjectResponse.parse({ ...row, technologies: row.technologies ?? [] }));
});

router.get("/projects/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetProjectParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db.select().from(projectsTable).where(eq(projectsTable.id, params.data.id));
  if (!row) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json(GetProjectResponse.parse({ ...row, technologies: row.technologies ?? [] }));
});

export default router;

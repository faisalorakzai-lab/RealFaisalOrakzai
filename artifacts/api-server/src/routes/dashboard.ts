import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, projectsTable, articlesTable, researchTable, newsTable, companiesTable } from "@workspace/db";
import { GetDashboardSummaryResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/dashboard/summary", async (req, res): Promise<void> => {
  const [totalProjects, totalArticles, totalResearch, totalNews, totalCompanies] = await Promise.all([
    db.select().from(projectsTable),
    db.select().from(articlesTable),
    db.select().from(researchTable),
    db.select().from(newsTable),
    db.select().from(companiesTable),
  ]);

  const featuredProjects = await db.select().from(projectsTable).orderBy(desc(projectsTable.createdAt)).limit(3);
  const featuredArticles = await db.select().from(articlesTable).orderBy(desc(articlesTable.publishedAt)).limit(3);

  const recentActivity = [
    ...featuredProjects.map((p, i) => ({
      id: i + 1,
      type: "project",
      title: `New project: ${p.title}`,
      description: p.description.slice(0, 100),
      createdAt: p.createdAt.toISOString(),
    })),
    ...featuredArticles.map((a, i) => ({
      id: i + 10,
      type: "article",
      title: `Published: ${a.title}`,
      description: a.excerpt.slice(0, 100),
      createdAt: a.publishedAt.toISOString(),
    })),
  ].slice(0, 6);

  res.json(GetDashboardSummaryResponse.parse({
    totalProjects: totalProjects.length,
    totalArticles: totalArticles.length,
    totalResearch: totalResearch.length,
    totalNews: totalNews.length,
    totalCompanies: totalCompanies.length,
    recentActivity,
    featuredProjects: featuredProjects.map((p) => ({
      ...p,
      technologies: p.technologies ?? [],
    })),
    featuredArticles: featuredArticles.map((a) => ({
      ...a,
      tags: a.tags ?? [],
      publishedAt: a.publishedAt.toISOString(),
    })),
  }));
});

export default router;

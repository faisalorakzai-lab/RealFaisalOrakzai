import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const researchTable = pgTable("research", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  abstract: text("abstract").notNull(),
  authors: text("authors").array().notNull(),
  downloadUrl: text("download_url"),
  tags: text("tags").array(),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertResearchSchema = createInsertSchema(researchTable).omit({ id: true, publishedAt: true, createdAt: true });
export type InsertResearch = z.infer<typeof insertResearchSchema>;
export type Research = typeof researchTable.$inferSelect;

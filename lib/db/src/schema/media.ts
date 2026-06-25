import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const mediaTable = pgTable("media", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  videoUrl: text("video_url"),
  duration: text("duration"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMediaSchema = createInsertSchema(mediaTable).omit({ id: true, publishedAt: true, createdAt: true });
export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof mediaTable.$inferSelect;

import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const timelineTable = pgTable("timeline", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  isVision: boolean("is_vision").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertTimelineSchema = createInsertSchema(timelineTable).omit({ id: true, createdAt: true });
export type InsertTimeline = z.infer<typeof insertTimelineSchema>;
export type Timeline = typeof timelineTable.$inferSelect;

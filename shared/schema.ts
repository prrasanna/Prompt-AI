import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const promptLogs = pgTable("prompt_logs", {
  id: serial("id").primaryKey(),
  mode: text("mode").notNull(), // 'study', 'coding', 'career'
  input: text("input").notNull(),
  output: text("output").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPromptLogSchema = createInsertSchema(promptLogs).omit({ id: true, createdAt: true });
export type InsertPromptLog = z.infer<typeof insertPromptLogSchema>;
export type PromptLog = typeof promptLogs.$inferSelect;

export const generatePromptSchema = z.object({
  mode: z.enum(["study", "coding", "career"]),
  userInput: z.string().min(1, "Please enter an idea"),
});
export type GeneratePromptRequest = z.infer<typeof generatePromptSchema>;

export const generatePromptResponseSchema = z.object({
  output: z.string(),
});
export type GeneratePromptResponse = z.infer<typeof generatePromptResponseSchema>;

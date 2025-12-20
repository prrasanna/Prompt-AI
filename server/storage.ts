import { db } from "./db";
import { promptLogs, type InsertPromptLog, type PromptLog } from "@shared/schema";

export interface IStorage {
  createPromptLog(log: InsertPromptLog): Promise<PromptLog>;
}

export class DatabaseStorage implements IStorage {
  async createPromptLog(log: InsertPromptLog): Promise<PromptLog> {
    const [newLog] = await db.insert(promptLogs).values(log).returning();
    return newLog;
  }
}

export const storage = new DatabaseStorage();

import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

// @ts-ignore
import { GoogleGenAI } from "@google/genai";

const geminiClient = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.prompts.generate.path, async (req, res) => {
    try {
      const input = api.prompts.generate.input.parse(req.body);

      let systemPrompt = "You are an expert academic assistant.";
      if (input.mode === "study") {
        systemPrompt = "You are an expert academic assistant. Convert the user's idea into an optimized study prompt...";
      } else if (input.mode === "coding") {
        systemPrompt = "You are an expert coding mentor. Convert the user's idea into an optimized coding prompt...";
      } else if (input.mode === "career") {
        systemPrompt = "You are an expert career coach. Convert the user's idea into an optimized professional prompt...";
      }

      const prompt = `${systemPrompt}\nUser: ${input.userInput}`;

      const response = await geminiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      // Use response.text per SDK Quickstart
      const output = response.text || "No output generated.";

      await storage.createPromptLog({
        mode: input.mode,
        input: input.userInput,
        output: output,
      });

      res.json({ output });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      console.error("Gemini API Error:", err);
      res.status(500).json({ message: "Failed to generate prompt" });
    }
  });

  return httpServer;
}

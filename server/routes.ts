import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
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
        systemPrompt = "You are an expert academic assistant. Convert the user's idea into an optimized study prompt. The output should be a clear, structured prompt that the student can use to get exam-ready notes.";
      } else if (input.mode === "coding") {
        systemPrompt = "You are an expert coding mentor. Convert the user's idea into an optimized coding prompt. The output should be a prompt that asks for clean code, explanations, and best practices.";
      } else if (input.mode === "career") {
        systemPrompt = "You are an expert career coach. Convert the user's idea into an optimized prompt for LinkedIn posts, resumes, or cover letters. The output should be a prompt that asks for professional, engaging content.";
      }

      // We want the AI to *generate the prompt* that the student should use, OR generate the *content* directly?
      // The requirement says: "Convert simple ideas into optimized AI prompts and generate high-quality outputs"
      // And: "Based on selected mode, generate a different optimized system prompt... Integrate OpenAI API... Return only clean, formatted output"
      // It seems the app itself IS the AI assistant. The user enters an idea, and we return the result *using* an optimized system prompt.
      // e.g. User enters "Explain React hooks". We send that to OpenAI with the system prompt "You are an expert coding mentor...". OpenAI returns the explanation.
      
      // WAIT. "Convert the user's idea into an optimized prompt AND generate the best possible output."
      // The architecture says: "Based on selected mode, generate a different optimized system prompt".
      // Let's re-read carefully: "Convert the user's idea into an optimized prompt and generate the best possible output."
      // It sounds like we are doing the generation for them.
      // "Output section with: Final AI response".
      // So we are acting as the specialized AI.

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input.userInput },
        ],
      });

      const output = response.choices[0].message.content || "No output generated.";

      // Log it
      await storage.createPromptLog({
        mode: input.mode,
        input: input.userInput,
        output: output,
      });

      res.json({ output });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
        });
      }
      console.error("OpenAI Error:", err);
      res.status(500).json({ message: "Failed to generate prompt" });
    }
  });

  return httpServer;
}

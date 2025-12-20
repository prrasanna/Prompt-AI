import { z } from 'zod';
import { generatePromptSchema, generatePromptResponseSchema } from './schema';

export const api = {
  prompts: {
    generate: {
      method: 'POST' as const,
      path: '/api/generate',
      input: generatePromptSchema,
      responses: {
        200: generatePromptResponseSchema,
        500: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

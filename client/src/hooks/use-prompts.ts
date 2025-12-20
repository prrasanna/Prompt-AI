import { useMutation } from "@tanstack/react-query";
import { api, type GeneratePromptRequest, type GeneratePromptResponse } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useGeneratePrompt() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: GeneratePromptRequest) => {
      // Validate input before sending using the shared Zod schema
      const validatedInput = api.prompts.generate.input.parse(data);

      const res = await fetch(api.prompts.generate.path, {
        method: api.prompts.generate.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedInput),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to generate prompt");
      }

      const responseData = await res.json();
      // Validate response structure
      return api.prompts.generate.responses[200].parse(responseData);
    },
    onError: (error: Error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

import { useState } from "react";
import { CosmicBackground } from "@/components/CosmicBackground";
import { ModeCard } from "@/components/ModeCard";
import { PromptOutput } from "@/components/PromptOutput";
import { useGeneratePrompt } from "@/hooks/use-prompts";
import { GraduationCap, BookOpen, Code, Briefcase, Wand2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";

type Mode = "study" | "coding" | "career";

export default function Home() {
  const [mode, setMode] = useState<Mode>("study");
  const [input, setInput] = useState("");
  const [generatedOutput, setGeneratedOutput] = useState("");
  const { mutate, isPending } = useGeneratePrompt();
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter your idea first.",
        variant: "destructive",
      });
      return;
    }

    mutate(
      { mode, userInput: input },
      {
        onSuccess: (data) => {
          setGeneratedOutput(data.output);
        },
      }
    );
  };

  const getPlaceholder = () => {
    switch (mode) {
      case "study":
        return "e.g., Explain quantum entanglement like I'm 5, or create a study plan for AP Biology...";
      case "coding":
        return "e.g., Write a Python script to scrape a website, or debug this React component...";
      case "career":
        return "e.g., Improve my resume summary for a software engineer role, or write a cover letter for...";
      default:
        return "Type your idea here...";
    }
  };

  return (
    <div className="min-h-screen text-foreground relative">
      <CosmicBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Prompt AI
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold font-display leading-tight mb-4">
              Turn Ideas Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent">
                Supercharged Prompts
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Stop struggling with generic AI answers. Select a mode, enter your rough idea, and get a professionally engineered prompt instantly.
          </motion.p>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <ModeCard
            id="study"
            title="Study Mode"
            description="Complex topics simplified, study plans, and flashcards."
            icon={BookOpen}
            isActive={mode === "study"}
            onClick={() => setMode("study")}
          />
          <ModeCard
            id="coding"
            title="Coding Mode"
            description="Bug fixes, code generation, and architecture explanations."
            icon={Code}
            isActive={mode === "coding"}
            onClick={() => setMode("coding")}
          />
          <ModeCard
            id="career"
            title="Career Mode"
            description="Resume polishing, cover letters, and interview prep."
            icon={Briefcase}
            isActive={mode === "career"}
            onClick={() => setMode("career")}
          />
        </div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-2 rounded-3xl mb-12 shadow-2xl shadow-black/50"
        >
          <div className="bg-background/40 rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-white/60">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Enter your raw idea below</span>
            </div>
            
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={getPlaceholder()}
              className="min-h-[160px] text-lg bg-transparent border-none focus-visible:ring-0 resize-none placeholder:text-white/20 text-white/90 p-0 leading-relaxed font-light"
            />
            
            <div className="flex justify-end mt-4 pt-4 border-t border-white/5">
              <Button
                onClick={handleGenerate}
                disabled={isPending || !input.trim()}
                className="rounded-xl px-8 py-6 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Prompt
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Output Section */}
        <div className="scroll-mt-24" id="output">
          <PromptOutput output={generatedOutput} isLoading={isPending} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

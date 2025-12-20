import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PromptOutputProps {
  output: string;
  isLoading: boolean;
}

export function PromptOutput({ output, isLoading }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!output && !isLoading) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center min-h-[200px] gap-4"
        >
          <div className="relative w-16 h-16">
            <motion.div
              className="absolute inset-0 border-4 border-primary/30 rounded-full"
            />
            <motion.div
              className="absolute inset-0 border-4 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-white/60 animate-pulse font-medium">Crafting your perfect prompt...</p>
        </motion.div>
      ) : (
        <motion.div
          key="result"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-1 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border-primary/20"
        >
          <div className="bg-black/40 p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Optimized Prompt</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="hover:bg-white/10 hover:text-white text-white/60 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="p-6 bg-black/20">
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-white/90 selection:bg-primary/40 selection:text-white">
              {output}
            </pre>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

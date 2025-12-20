import { motion } from "framer-motion";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Footer } from "@/components/Footer";
import { GraduationCap, Lightbulb, Target, Users } from "lucide-react";
import { Link } from "wouter";

export default function AboutUs() {
  return (
    <div className="min-h-screen text-foreground relative">
      <CosmicBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-primary/20 rounded-lg">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              StudentPrompt AI
            </span>
          </Link>
          <div className="text-sm font-medium text-white/40 hidden sm:block">
            v1.0.0
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold font-display">About StudentPrompt AI</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Empowering students with AI-driven prompt engineering for academic and career success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-2xl"
            >
              <Lightbulb className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-white/70">
                To simplify prompt engineering and make AI assistance accessible to every student, regardless of technical background.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 rounded-2xl"
            >
              <Target className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-white/70">
                A world where students leverage AI not just for answers, but for deeper learning and professional growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-8 rounded-2xl"
            >
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Built for Students</h3>
              <p className="text-white/70">
                Created by students, for students. We understand your challenges and designed solutions that actually work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-8 rounded-2xl"
            >
              <GraduationCap className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Powered by AI</h3>
              <p className="text-white/70">
                Leveraging state-of-the-art OpenAI models to deliver intelligent, context-aware assistance.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

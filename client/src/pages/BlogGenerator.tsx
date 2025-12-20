import { motion } from "framer-motion";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Footer } from "@/components/Footer";
import { GraduationCap, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function BlogGenerator() {
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
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-5xl font-bold font-display">Blog Generator</h1>
            </div>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Transform your ideas into engaging, SEO-optimized blog posts using AI-powered generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-3 text-primary">Feature-Rich</h3>
              <p className="text-white/70">
                Generate blog posts with AI, optimize for SEO, and manage your content library all in one place.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-3 text-accent">Quick & Easy</h3>
              <p className="text-white/70">
                Just enter a topic, select your tone, and let AI do the heavy lifting for you.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

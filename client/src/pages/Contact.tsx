import { motion } from "framer-motion";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Footer } from "@/components/Footer";
import { GraduationCap, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

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

      <main className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4 mb-12">
            <MessageSquare className="w-8 h-8 text-primary mx-auto" />
            <h1 className="text-5xl font-bold font-display">Get In Touch</h1>
            <p className="text-lg text-white/60">
              Have feedback or questions? We'd love to hear from you.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-panel p-8 rounded-2xl space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">
                <Mail className="w-4 h-4 inline mr-2" />
                Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="bg-background/40 border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="bg-background/40 border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Message
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what's on your mind..."
                className="min-h-[160px] bg-background/40 border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </motion.form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

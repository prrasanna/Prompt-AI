import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";

interface ModeCardProps {
  id: "study" | "coding" | "career";
  title: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export function ModeCard({ id, title, description, icon: Icon, isActive, onClick }: ModeCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "relative p-6 rounded-2xl text-left transition-all duration-300 w-full h-full flex flex-col items-start gap-4",
        "border backdrop-blur-md",
        isActive 
          ? "bg-primary/10 border-primary shadow-[0_0_30px_rgba(139,92,246,0.3)] ring-1 ring-primary/50" 
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
      )}
    >
      <div 
        className={clsx(
          "p-3 rounded-xl transition-colors duration-300",
          isActive ? "bg-primary text-white shadow-lg shadow-primary/40" : "bg-white/10 text-white/70 group-hover:bg-white/20"
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
      
      <div>
        <h3 className={clsx("text-lg font-bold font-display mb-1", isActive ? "text-white" : "text-white/90")}>
          {title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed">
          {description}
        </p>
      </div>

      {isActive && (
        <motion.div
          layoutId="active-glow"
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-50 pointer-events-none"
        />
      )}
    </motion.button>
  );
}

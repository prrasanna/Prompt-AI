import { motion } from "framer-motion";
import { useMemo } from "react";

export function CosmicBackground() {
  // Generate random stars only once
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050511]">
      {/* Deep nebula gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(88,28,135,0.15),_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(59,130,246,0.1),_transparent_50%)]" />
      
      {/* Floating orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ 
          x: [0, -70, 0], 
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[90px]"
      />

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

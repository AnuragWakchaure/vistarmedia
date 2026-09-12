"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AuroraBackgroundProps {
  className?: string;
  showGrid?: boolean;
}

export function AuroraBackground({
  className = "",
  showGrid = true,
}: AuroraBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* 1. Subtle Fine Dot Grid Texture */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage: `radial-gradient(rgba(184, 15, 10, 0.18) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      )}

      {/* 2. Top-Center Gold Aurora Blob */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: ["-50%", "-48%", "-52%", "-50%"],
                y: ["0%", "8%", "-4%", "0%"],
                scale: [1, 1.08, 0.96, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[750px] sm:w-[900px] h-[400px] sm:h-[480px] bg-[#FBCB77]/25 rounded-full blur-[110px] sm:blur-[140px]"
      />

      {/* 3. Bottom-Right Crimson Aurora Blob */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: ["0%", "-6%", "4%", "0%"],
                y: ["0%", "-10%", "6%", "0%"],
                scale: [1, 0.95, 1.08, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[-5%] sm:right-[5%] w-[450px] sm:w-[600px] h-[350px] sm:h-[450px] bg-[#B80F0A]/8 rounded-full blur-[100px] sm:blur-[130px]"
      />

      {/* 4. Top-Left Soft Crimson Ambient Sheen */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: ["0%", "8%", "-5%", "0%"],
                y: ["0%", "6%", "-8%", "0%"],
                scale: [0.9, 1.05, 0.95, 0.9],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[15%] left-[-8%] w-[400px] sm:w-[500px] h-[300px] sm:h-[400px] bg-[#EE6A43]/6 rounded-full blur-[90px] sm:blur-[120px]"
      />
    </div>
  );
}

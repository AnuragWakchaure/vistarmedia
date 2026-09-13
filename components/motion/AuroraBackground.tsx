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
      {/* 1. Subtle Cyber Cyan Dot Grid Texture */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 210, 255, 0.22) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      )}

      {/* 2. Top-Center Electric Cyan Aurora Blob */}
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
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[750px] sm:w-[950px] h-[450px] sm:h-[550px] bg-[#00D2FF]/14 rounded-full blur-[120px] sm:blur-[160px]"
      />

      {/* 3. Bottom-Right Vibrant Royal Blue Aurora Blob */}
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
        className="absolute bottom-[-10%] right-[-5%] sm:right-[5%] w-[450px] sm:w-[650px] h-[350px] sm:h-[500px] bg-[#0A84FF]/16 rounded-full blur-[110px] sm:blur-[150px]"
      />

      {/* 4. Top-Left Deep Electric Ambient Sheen */}
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
        className="absolute top-[15%] left-[-8%] w-[400px] sm:w-[500px] h-[300px] sm:h-[400px] bg-[#0051FF]/12 rounded-full blur-[90px] sm:blur-[130px]"
      />
    </div>
  );
}

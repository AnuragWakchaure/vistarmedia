"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SpotlightBackgroundProps {
  className?: string;
  intensity?: "subtle" | "focus";
}

export function SpotlightBackground({
  className = "",
  intensity = "subtle",
}: SpotlightBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  const opacity = intensity === "focus" ? 0.35 : 0.22;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* Top Center Spotlight Cone */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [opacity * 0.85, opacity * 1.15, opacity * 0.85],
                scale: [1, 1.04, 1],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[500px] sm:h-[650px] bg-gradient-to-b from-[#00D2FF]/20 via-[#0A84FF]/10 to-transparent rounded-full blur-[100px] sm:blur-[130px]"
      />

      {/* Subtle Bottom Ambient Tone */}
      <div className="absolute -bottom-[15%] left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[#00D2FF]/5 rounded-full blur-[100px]" />
    </div>
  );
}

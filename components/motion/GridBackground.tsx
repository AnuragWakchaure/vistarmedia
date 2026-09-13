"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GridBackgroundProps {
  className?: string;
  pattern?: "dots" | "lines" | "cross";
  glowColor?: string;
  glowOpacity?: number;
}

export function GridBackground({
  className = "",
  pattern = "dots",
  glowColor = "rgba(0, 210, 255, 0.15)",
  glowOpacity = 0.35,
}: GridBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  const getBackgroundImage = () => {
    switch (pattern) {
      case "lines":
        return `linear-gradient(to right, rgba(0, 210, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 210, 255, 0.08) 1px, transparent 1px)`;
      case "cross":
        return `radial-gradient(rgba(0, 210, 255, 0.2) 1.5px, transparent 1.5px)`;
      case "dots":
      default:
        return `radial-gradient(rgba(0, 210, 255, 0.18) 1px, transparent 1px)`;
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* Central Soft Ambient Cyan Glow */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [glowOpacity * 0.8, glowOpacity * 1.2, glowOpacity * 0.8],
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[350px] sm:h-[450px] rounded-full blur-[130px]"
        style={{ backgroundColor: glowColor }}
      />

      {/* Radial-Masked Grid / Pattern */}
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
        style={{
          backgroundImage: getBackgroundImage(),
          backgroundSize: pattern === "lines" ? "48px 48px" : "28px 28px",
        }}
      />
    </div>
  );
}

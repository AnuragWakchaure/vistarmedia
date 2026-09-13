"use client";

import React from "react";

interface SpotlightBackgroundProps {
  className?: string;
  intensity?: "subtle" | "focus";
}

export function SpotlightBackground({
  className = "",
  intensity = "subtle",
}: SpotlightBackgroundProps) {
  const opacity = intensity === "focus" ? "opacity-35" : "opacity-20";

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* Top Center Spotlight Cone (Hardware-accelerated CSS) */}
      <div
        className={`absolute -top-[10%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[500px] sm:h-[650px] bg-gradient-to-b from-[#00D2FF]/20 via-[#0A84FF]/10 to-transparent rounded-full blur-[80px] sm:blur-[100px] ${opacity} pointer-events-none`}
        style={{ willChange: "transform", transform: "translate3d(-50%, 0, 0)" }}
      />

      {/* Subtle Bottom Ambient Tone */}
      <div
        className="absolute -bottom-[15%] left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[#00D2FF]/5 rounded-full blur-[80px] pointer-events-none"
        style={{ willChange: "transform", transform: "translate3d(-50%, 0, 0)" }}
      />
    </div>
  );
}

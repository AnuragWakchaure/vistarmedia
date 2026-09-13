"use client";

import React from "react";

interface AuroraBackgroundProps {
  className?: string;
  showGrid?: boolean;
}

export function AuroraBackground({
  className = "",
  showGrid = true,
}: AuroraBackgroundProps) {
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

      {/* 2. Top-Center Electric Cyan Aurora Blob (Hardware-accelerated CSS) */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[750px] sm:w-[950px] h-[450px] sm:h-[550px] bg-[#00D2FF]/14 rounded-full blur-[100px] sm:blur-[130px] motion-safe:animate-pulse pointer-events-none"
        style={{ willChange: "opacity, transform", transform: "translate3d(-50%, 0, 0)" }}
      />

      {/* 3. Bottom-Right Vibrant Royal Blue Aurora Blob */}
      <div
        className="absolute bottom-[-10%] right-[-5%] sm:right-[5%] w-[450px] sm:w-[650px] h-[350px] sm:h-[500px] bg-[#0A84FF]/16 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none"
        style={{ willChange: "opacity, transform", transform: "translate3d(0, 0, 0)" }}
      />

      {/* 4. Top-Left Deep Electric Ambient Sheen */}
      <div
        className="absolute top-[15%] left-[-8%] w-[400px] sm:w-[500px] h-[300px] sm:h-[400px] bg-[#0051FF]/12 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"
        style={{ willChange: "opacity, transform", transform: "translate3d(0, 0, 0)" }}
      />
    </div>
  );
}

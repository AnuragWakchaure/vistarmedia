"use client";

import React from "react";
import { AuroraBackground } from "./AuroraBackground";
import { GridBackground } from "./GridBackground";
import { NetworkBeamBackground } from "./NetworkBeamBackground";
import { SpotlightBackground } from "./SpotlightBackground";

export type BackgroundVariant = "hero" | "aurora" | "grid" | "network" | "spotlight" | "dots" | "minimal";

interface SectionBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
  intensity?: "subtle" | "minimal" | "focus";
}

export function SectionBackground({
  variant = "minimal",
  className = "",
  intensity = "subtle",
}: SectionBackgroundProps) {
  switch (variant) {
    case "hero":
    case "aurora":
      return <AuroraBackground className={className} showGrid={true} />;
    case "grid":
      return <GridBackground className={className} pattern="dots" glowOpacity={intensity === "minimal" ? 0.25 : 0.4} />;
    case "network":
      return <NetworkBeamBackground className={className} />;
    case "spotlight":
      return <SpotlightBackground className={className} intensity={intensity === "focus" ? "focus" : "subtle"} />;
    case "dots":
      return <GridBackground className={className} pattern="dots" glowOpacity={0.2} />;
    case "minimal":
    default:
      return (
        <div
          aria-hidden="true"
          className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FBCB77]/10 rounded-full blur-[120px]" />
        </div>
      );
  }
}

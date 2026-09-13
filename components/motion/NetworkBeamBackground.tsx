"use client";

import React from "react";

interface NetworkBeamBackgroundProps {
  className?: string;
}

export function NetworkBeamBackground({
  className = "",
}: NetworkBeamBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* Background ambient cool wash */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00D2FF]/10 rounded-full blur-[100px] pointer-events-none"
        style={{ willChange: "transform", transform: "translate3d(-50%, -50%, 0)" }}
      />

      {/* SVG Network Beams */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beamGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#00D2FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0A84FF" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="beamGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0A84FF" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#00D2FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0051FF" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Diagonal Wave 1 */}
        <path
          d="M-100,100 C300,50 600,250 1200,120 S1800,300 2200,180"
          fill="none"
          stroke="url(#beamGradient1)"
          strokeWidth="1.5"
          strokeDasharray="8 12"
        />

        {/* Diagonal Wave 2 */}
        <path
          d="M-50,300 C400,200 700,450 1300,280 S1900,420 2300,320"
          fill="none"
          stroke="url(#beamGradient2)"
          strokeWidth="1.5"
          strokeDasharray="10 16"
        />

        {/* Connection Node Rings */}
        <circle cx="25%" cy="30%" r="3" fill="#00D2FF" opacity="0.6" />
        <circle cx="50%" cy="45%" r="4" fill="#0A84FF" opacity="0.5" />
        <circle cx="75%" cy="35%" r="3" fill="#00D2FF" opacity="0.6" />
      </svg>
    </div>
  );
}

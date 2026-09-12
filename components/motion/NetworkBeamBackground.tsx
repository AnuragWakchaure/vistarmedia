"use client";

import { motion, useReducedMotion } from "framer-motion";

interface NetworkBeamBackgroundProps {
  className?: string;
}

export function NetworkBeamBackground({
  className = "",
}: NetworkBeamBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* Background ambient warm wash */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FBCB77]/15 rounded-full blur-[130px]" />

      {/* SVG Network Beams */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beamGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B80F0A" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#B80F0A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FBCB77" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="beamGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EE6A43" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#B80F0A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#111111" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Diagonal Wave 1 */}
        <motion.path
          d="M-100,100 C300,50 600,250 1200,120 S1800,300 2200,180"
          fill="none"
          stroke="url(#beamGradient1)"
          strokeWidth="1.5"
          strokeDasharray="8 12"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  strokeDashoffset: [0, -200],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Diagonal Wave 2 */}
        <motion.path
          d="M-50,300 C400,200 700,450 1300,280 S1900,420 2300,320"
          fill="none"
          stroke="url(#beamGradient2)"
          strokeWidth="1.5"
          strokeDasharray="10 16"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  strokeDashoffset: [0, 260],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Connection Node Rings */}
        <circle cx="25%" cy="30%" r="3" fill="#B80F0A" opacity="0.4" />
        <circle cx="50%" cy="45%" r="4" fill="#B80F0A" opacity="0.3" />
        <circle cx="75%" cy="35%" r="3" fill="#B80F0A" opacity="0.4" />
      </svg>
    </div>
  );
}

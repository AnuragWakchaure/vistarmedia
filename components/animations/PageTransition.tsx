"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "./MotionTokens";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        y: shouldReduceMotion ? 0 : 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : DURATIONS.fast,
        ease: EASINGS.easeOutCubic,
      }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

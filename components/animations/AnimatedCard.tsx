"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "./MotionTokens";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  hoverEffect = true,
}: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0 : DURATIONS.normal,
        delay,
        ease: EASINGS.easeOutQuart,
      }}
      whileHover={
        hoverEffect && !shouldReduceMotion
          ? {
              y: -4,
              transition: { duration: DURATIONS.micro, ease: EASINGS.easeOutCubic },
            }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

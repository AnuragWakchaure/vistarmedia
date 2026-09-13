"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  value: string | number;
  className?: string;
  duration?: number;
}

export function Counter({
  value,
  className = "",
  duration = 1.6,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  const stringVal = String(value).trim();
  const match = stringVal.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

  const prefix = match ? match[1] : "";
  const numericTarget = match ? parseFloat(match[2]) : null;
  const suffix = match ? match[3] : "";

  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayCount, setDisplayCount] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView || numericTarget === null || shouldReduceMotion || hasAnimated) {
      return;
    }

    setHasAnimated(true);
    let startTime: number | null = null;
    let animationFrame: number;

    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const update = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);

      setDisplayCount(Math.round(easedProgress * numericTarget));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, numericTarget, duration, shouldReduceMotion, hasAnimated]);

  if (numericTarget === null) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  // Display target value immediately on SSR and initial paint to eliminate layout shift and zero flash
  const countToShow = displayCount !== null ? displayCount : numericTarget;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {countToShow}
      {suffix}
    </span>
  );
}

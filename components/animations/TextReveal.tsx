"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASINGS, DURATIONS } from "./MotionTokens";

interface TextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className = "",
  highlightWords = [],
  highlightClassName = "text-[#B80F0A]",
  delay = 0.1,
  stagger = 0.05,
  once = true,
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATIONS.normal,
        ease: EASINGS.easeOutExpo,
      },
    },
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={containerVariants}
      className={`inline-block ${className}`}
    >
      {words.map((word, idx) => {
        // Clean word for matching
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <motion.span
            key={`${word}-${idx}`}
            variants={wordVariants}
            className={`inline-block mr-[0.25em] ${
              isHighlight ? highlightClassName : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

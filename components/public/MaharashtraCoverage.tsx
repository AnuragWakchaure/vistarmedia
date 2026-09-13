"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import { Counter } from "@/components/animations/Counter";
import { CreatorLocationItem, DEFAULT_CREATOR_LOCATIONS } from "@/lib/data/maharashtra-geo";

const MaharashtraMap = dynamic(() => import("@/components/public/MaharashtraMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[900/680] max-h-[640px] bg-[#07111A] rounded-3xl flex items-center justify-center border border-cyan-500/20">
      <div className="w-8 h-8 rounded-full border-2 border-[#00C8FF] border-t-transparent animate-spin" />
    </div>
  ),
});

interface MaharashtraCoverageProps {
  locations?: CreatorLocationItem[];
}

export default function MaharashtraCoverage({
  locations = DEFAULT_CREATOR_LOCATIONS,
}: MaharashtraCoverageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <section id="maharashtra-reach" className="relative overflow-hidden bg-[#05080D] scroll-mt-28 py-20 sm:py-24">
      <div className="px-4 sm:px-6 max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Header with Title and Districts Counter Badge */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: DURATIONS.normal, ease: EASINGS.easeOutQuart }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#07111A] border border-cyan-500/30 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00C8FF]" />
              <span>Geographic Presence</span>
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.98]">
              Deep Regional Reach Across{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] via-[#33D4FF] to-[#009DFF]">
                Maharashtra.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Our network spans urban metros and rural farming clusters, giving brands authenticated local trust that generic agencies cannot match.
            </p>
          </div>
          <div className="p-5 sm:p-6 rounded-3xl bg-[#07111A]/90 backdrop-blur-md border border-white/10 shadow-xl text-left md:text-right shrink-0">
            <div className="font-anton text-4xl sm:text-5xl text-[#00C8FF]">
              <Counter value="13+" />
            </div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
              Key Districts Covered
            </div>
          </div>
        </motion.div>

        {/* Real Geographically Accurate Interactive Maharashtra Map (Dark Canvas) */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASINGS.easeOutQuart }}
          className="rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl"
        >
          <MaharashtraMap
            locations={locations}
            selectedLocationName={selectedCity}
            onSelectLocation={setSelectedCity}
          />
        </motion.div>
      </div>
    </section>
  );
}
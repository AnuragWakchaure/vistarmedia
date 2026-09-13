"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import { SectionBackground } from "@/components/motion/SectionBackground";
import { Counter } from "@/components/animations/Counter";

const METRIC_CARDS = [
  {
    value: "200+",
    title: "Verified Creators",
    description:
      "Over 200 handpicked regional creators vetted for authentic engagement and verified local audience trust.",
  },
  {
    value: "35+",
    title: "Districts Covered",
    description:
      "Deep geographic presence across Pune, Mumbai, Nashik, Kolhapur, Vidarbha, and rural agricultural belts.",
  },
  {
    value: "3.8x",
    title: "Vernacular Resonance",
    description:
      "Culturally tuned Marathi content delivering 3.8x higher brand recall and direct dealer inquiries.",
  },
  {
    value: "0%",
    title: "Bot Pod Inflation",
    description:
      "Transparent real-time telemetry, direct UTM tracking, and 100% human-verified impression auditing.",
  },
];

export default function BentoWhyUs() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATIONS.normal,
        ease: EASINGS.easeOutQuart,
      },
    },
  };

  return (
    <section id="why-us" className="py-20 sm:py-24 px-4 sm:px-6 bg-[#F3F6F8] relative overflow-hidden scroll-mt-28">
      <SectionBackground variant="grid" intensity="minimal" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ========================================================================= */}
          {/* LEFT SIDE: Heading + Paragraph + Trust Highlights + CTA */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: DURATIONS.normal, ease: EASINGS.easeOutQuart }}
            className="lg:col-span-5 space-y-6 flex flex-col justify-center"
          >
            <div className="space-y-4">
              {/* Accent Line / Tag */}
              <div className="flex items-center gap-2">
                <span className="w-10 h-1 rounded-full bg-[#00C8FF]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#009DFF]">
                  Why Choose VISTAR
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="font-anton text-3xl sm:text-4xl md:text-5xl text-[#0B1117] uppercase tracking-tight leading-[1.02]">
                Influencer Marketing Agency in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009DFF] via-[#00C8FF] to-[#0A84FF]">
                  Maharashtra
                </span>
              </h2>

              {/* Supporting Copy */}
              <p className="text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed">
                Our growth is more than just words — it&apos;s in verified numbers. Discover how we connect high-growth brands with authentic regional creators across urban hubs and rural heartlands.
              </p>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 pb-1">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#00C8FF]" />
                  <span className="text-[11px] font-bold text-[#0B1117] uppercase tracking-wide">
                    Zero Bot Inflation
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#009DFF]" />
                  <span className="text-[11px] font-bold text-[#0B1117] uppercase tracking-wide">
                    100% Vernacular ROI
                  </span>
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="pt-2">
                <Link
                  href="/#creators"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00C8FF] to-[#009DFF] hover:from-[#33D4FF] hover:to-[#00C8FF] text-[#05080D] font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(0,200,255,0.35)] hover:shadow-[0_6px_25px_rgba(0,200,255,0.45)] hover:scale-[1.02]"
                >
                  <span>Explore Categories</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: 2x2 Grid of 4 Elevated Metric & Trust Cards */}
          {/* ========================================================================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
          >
            {METRIC_CARDS.map((card, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-cyan-400 shadow-[0_4px_24px_rgba(11,17,23,0.03)] hover:shadow-[0_16px_36px_rgba(0,200,255,0.12)] transition-all duration-300 flex flex-col items-center text-center justify-between space-y-4 group"
              >
                {/* Number / Stat */}
                <div className="font-anton text-4xl sm:text-5xl text-[#009DFF] group-hover:text-[#00C8FF] transition-colors leading-none tracking-tight">
                  <Counter value={card.value} />
                </div>

                {/* Card Title & Description */}
                <div className="space-y-2">
                  <h3 className="font-bold text-base sm:text-lg text-[#0B1117] uppercase tracking-wide">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64717C] font-normal leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div className="w-8 h-1 rounded-full bg-slate-100 group-hover:bg-[#00C8FF] transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
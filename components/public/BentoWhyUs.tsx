"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import { SectionBackground } from "@/components/motion/SectionBackground";
import { Counter } from "@/components/animations/Counter";

const METRIC_CARDS = [
  {
    value: "200+",
    title: "Verified Creators",
    description:
      "Handpicked regional creators vetted for authentic engagement and verified local audience trust across Maharashtra.",
  },
  {
    value: "35+",
    title: "Districts Covered",
    description:
      "Deep geographic presence across Pune, Mumbai, Nashik, Kolhapur, Vidarbha, and agricultural heartlands.",
  },
  {
    value: "3.8x",
    title: "Vernacular Resonance",
    description:
      "Culturally tuned Marathi content delivering 3.8x higher brand recall and direct dealer-level inquiries.",
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
    <section id="why-us" className="py-20 sm:py-24 px-4 sm:px-6 bg-[#F8FAFC] relative overflow-hidden scroll-mt-28">
      <SectionBackground variant="grid" intensity="minimal" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT SIDE: Heading + Copy + Trust Highlights + CTA */}
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
                <span className="w-8 h-1 rounded-full bg-[#00B8F0]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0088B8]">
                  Why Choose VISTAR
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="font-anton text-3xl sm:text-4xl md:text-5xl text-[#0B1117] uppercase tracking-tight leading-[1.02]">
                Influencer Marketing Agency in{" "}
                <span className="text-[#00B8F0]">
                  Maharashtra
                </span>
              </h2>

              {/* Supporting Copy */}
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Our growth is more than just words — it&apos;s verified in real campaign data. Discover how we connect high-growth brands with authentic regional creators across urban centers and rural markets.
              </p>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 pb-1">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/90 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#00B8F0]" />
                  <span className="text-[11px] font-semibold text-[#0B1117] uppercase tracking-wide">
                    Zero Bot Inflation
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/90 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#0088B8]" />
                  <span className="text-[11px] font-semibold text-[#0B1117] uppercase tracking-wide">
                    100% Vernacular ROI
                  </span>
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="pt-2">
                <Link
                  href="/#creators"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00B8F0] hover:bg-[#00A3D9] text-[#05080D] font-bold text-xs uppercase tracking-wider transition-all duration-150 shadow-xs active:scale-[0.99]"
                >
                  <span>Explore Categories</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: 2x2 Grid of 4 Elevated Metric & Trust Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {METRIC_CARDS.map((card, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="p-6 rounded-xl bg-white border border-slate-200/90 hover:border-[#00B8F0]/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-start text-left justify-between space-y-3 group"
              >
                {/* Number / Stat */}
                <div className="font-anton text-4xl sm:text-5xl text-[#0088B8] group-hover:text-[#00B8F0] transition-colors leading-none tracking-tight">
                  <Counter value={card.value} />
                </div>

                {/* Card Title & Description */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-[#0B1117] tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div className="w-6 h-0.5 rounded-full bg-slate-200 group-hover:bg-[#00B8F0] transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
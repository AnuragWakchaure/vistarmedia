"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import { Counter } from "@/components/animations/Counter";
import { AuroraBackground } from "@/components/motion/AuroraBackground";

export default function HeroSection({
  heading,
  subheading,
  highlight,
  primaryCta,
  secondaryCta,
  creatorCount = "200+",
}: {
  heading?: string;
  subheading?: string;
  highlight?: string;
  primaryCta?: string;
  secondaryCta?: string;
  creatorCount?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
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
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 overflow-hidden bg-[#FCECDF]">
      {/* Motion UI Aurora Ambient Background */}
      <AuroraBackground showGrid={true} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center relative z-10 space-y-8"
      >
        {/* Editorial Sticker Badge */}
        <motion.div variants={itemVariants} className="inline-block">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border-2 border-dashed border-[#B80F0A] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B80F0A] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#B80F0A]">
              <Counter value={creatorCount} /> Creators Connected Across Maharashtra
            </span>
            <span className="text-stone-300">&bull;</span>
            <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#B80F0A]" /> Pune &bull; Mumbai &bull; Rural MH
            </span>
          </div>
        </motion.div>

        {/* Primary Massive Anton Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-anton text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#111111] leading-[0.95] uppercase"
        >
          {heading ? (
            heading.toUpperCase().includes("STAND OUT") ? (
              <>
                {heading.replace(/STAND OUT\.?/i, "").trim()}{" "}
                <span className="text-[#B80F0A]">
                  STAND OUT.
                </span>
              </>
            ) : (
              heading
            )
          ) : (
            <>
              INFLUENCER MARKETING THAT MAKES BRANDS{" "}
              <span className="text-[#B80F0A]">
                STAND OUT.
              </span>
            </>
          )}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-sm sm:text-base text-stone-700 font-medium leading-relaxed"
        >
          {subheading ||
            "Connect your brand with verified regional creators, engage targeted local audiences across urban hubs and rural heartlands, and execute high-converting campaigns people genuinely remember."}
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={EASINGS.spring}
            className="w-full sm:w-auto"
          >
            <Link
              href="/#campaign-enquiry"
              className="group w-full sm:w-auto px-8 py-4 rounded-full bg-[#B80F0A] hover:bg-[#960C08] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg border-2 border-[#960C08] flex items-center justify-center gap-2"
            >
              <span>{primaryCta || "Start Your Campaign"}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={EASINGS.spring}
            className="w-full sm:w-auto"
          >
            <Link
              href="/campaigns"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-stone-50 border-2 border-stone-300 text-[#111111] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>{secondaryCta || "View Our Campaigns"}</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Credibility Micro-Strip / Metric Tiles */}
        <motion.div
          variants={itemVariants}
          className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
        >
          <motion.div
            whileHover={{ y: -3 }}
            transition={EASINGS.spring}
            className="p-5 rounded-2xl bg-white border-2 border-stone-200/90 shadow-nickpat hover:border-[#B80F0A]/40 transition-colors"
          >
            <div className="font-anton text-3xl sm:text-4xl text-[#B80F0A] leading-none">
              <Counter value={creatorCount} />
            </div>
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mt-1.5">Creators Network</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            transition={EASINGS.spring}
            className="p-5 rounded-2xl bg-white border-2 border-stone-200/90 shadow-nickpat hover:border-[#B80F0A]/40 transition-colors"
          >
            <div className="font-anton text-3xl sm:text-4xl text-[#111111] leading-none">
              <Counter value="100%" />
            </div>
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mt-1.5">Maharashtra Coverage</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            transition={EASINGS.spring}
            className="p-5 rounded-2xl bg-white border-2 border-stone-200/90 shadow-nickpat hover:border-[#B80F0A]/40 transition-colors"
          >
            <div className="font-anton text-3xl sm:text-4xl text-[#B80F0A] leading-none">
              End-To-End
            </div>
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mt-1.5">Execution Support</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            transition={EASINGS.spring}
            className="p-5 rounded-2xl bg-white border-2 border-stone-200/90 shadow-nickpat hover:border-[#B80F0A]/40 transition-colors"
          >
            <div className="font-anton text-3xl sm:text-4xl text-[#111111] leading-none">
              Regional
            </div>
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mt-1.5">Content Ecosystem</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import React from "react";
import {
  Users,
  Target,
  ShieldCheck,
  LineChart,
  Sparkles,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import { SectionBackground } from "@/components/motion/SectionBackground";

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
    <section className="py-24 px-4 sm:px-6 bg-[#FCECDF] relative overflow-hidden">
      <SectionBackground variant="grid" intensity="minimal" />
      <div className="max-w-6xl mx-auto space-y-14 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: DURATIONS.normal, ease: EASINGS.easeOutQuart }}
          className="text-center space-y-3 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            Why Choose VISTAR
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#111111] uppercase tracking-tight leading-tight">
            Built For Maharashtra's{" "}
            <span className="text-[#B80F0A] underline decoration-[#FBCB77] decoration-wavy decoration-2">
              High-Growth Brands
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 font-medium max-w-xl mx-auto leading-relaxed">
            We bridge the gap between enterprise marketing expectations and authentic regional creator credibility across urban metros and rural heartlands.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: 200+ Verified Regional Creators (Wide 2-col Anchor) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-white border-2 border-stone-200/90 hover:border-[#111111] shadow-nickpat transition-colors flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#111111] text-white">
                  01 / NETWORK DEPTH
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B80F0A]">
                  <CheckCircle2 className="w-4 h-4 text-[#B80F0A]" />
                  <span>100% Verified Audiences</span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-anton text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight">
                  200+ Handpicked Regional Creators Across 35 Districts
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed max-w-xl">
                  Deeply connected with vernacular, agricultural, lifestyle, technology, and auto influencers. We do not rely on open rosters; every creator is vetted for engagement authenticity.
                </p>
              </div>
            </div>

            {/* Visual Micro-Widget: Niche Categories Matrix */}
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <div className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-wider">
                Specialized Creator Verticals
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "🌾 Agriculture & Machinery", count: "35+ Creators" },
                  { label: "⚡ Tech & Automobile", count: "40+ Creators" },
                  { label: "🍛 Food & Culture", count: "30+ Creators" },
                  { label: "👗 Lifestyle & Comedy", count: "50+ Creators" },
                  { label: "📈 FinTech & Education", count: "25+ Creators" },
                  { label: "🎭 Marathi Entertainment", count: "45+ Creators" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF6EF] border border-stone-200 text-stone-800 text-xs font-semibold"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-mono font-bold text-[#B80F0A] bg-white px-1.5 py-0.5 rounded border border-stone-200">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Hyper-Local Cultural Nuance (1-col Bold Red Card) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-1 p-8 rounded-3xl bg-[#B80F0A] text-white border-2 border-[#960C08] shadow-nickpat flex flex-col justify-between space-y-6 group relative overflow-hidden"
          >
            {/* Subtle background decoration */}
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <Sparkles className="w-48 h-48 text-white" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#FBCB77] text-[#111111]">
                  02 / LOCAL DNA
                </span>
                <Zap className="w-5 h-5 text-[#FBCB77]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  Regional Cultural Nuance & Marathi Dialects
                </h3>
                <p className="text-xs sm:text-sm text-stone-100 font-medium leading-relaxed">
                  We understand that Pune, Kolhapur, Vidarbha, and Khandesh require distinct cultural tones, dialect respect, and local vernacular triggers.
                </p>
              </div>
            </div>

            {/* Visual Micro-Widget: Dialect Badges & Performance Callout */}
            <div className="space-y-3 relative z-10 pt-4 border-t border-white/20">
              <div className="flex flex-wrap gap-1.5">
                {["Punekari", "Kolhapuri", "Varhadi (Vidarbha)", "Khandeshi", "Marathwadi"].map(
                  (d, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-black/25 text-[#FBCB77] text-[11px] font-mono font-semibold border border-white/15"
                    >
                      {d}
                    </span>
                  )
                )}
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Vernacular Resonance
                </span>
                <span className="font-anton text-xl text-[#FBCB77]">3.8x Higher</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Precision Audience Matching (1-col) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-1 p-8 rounded-3xl bg-white border-2 border-stone-200/90 hover:border-[#111111] shadow-nickpat transition-colors flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#111111] text-white">
                  03 / TARGETING
                </span>
                <Target className="w-5 h-5 text-[#B80F0A]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-anton text-2xl text-[#111111] uppercase tracking-tight">
                  Precision Demographic Matching
                </h3>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  Data-backed creator selection based on follower geography, purchasing power, age cohorts, and strict brand alignment.
                </p>
              </div>
            </div>

            {/* Visual Micro-Widget: Regional Audience Concentration */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-stone-700">
                  <span>Tier-1 Metros (Mumbai/Pune)</span>
                  <span className="font-mono text-[#B80F0A]">45%</span>
                </div>
                <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#B80F0A] w-[45%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-stone-700">
                  <span>Tier-2 Regional Hubs</span>
                  <span className="font-mono text-[#111111]">35%</span>
                </div>
                <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#FBCB77] w-[35%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-stone-700">
                  <span>Rural Agro-Belt</span>
                  <span className="font-mono text-[#B80F0A]">20%</span>
                </div>
                <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#111111] w-[20%]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Authentic Storytelling vs Banner Ads (1-col) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-1 p-8 rounded-3xl bg-white border-2 border-stone-200/90 hover:border-[#111111] shadow-nickpat transition-colors flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#111111] text-white">
                  04 / RETENTION
                </span>
                <TrendingUp className="w-5 h-5 text-[#B80F0A]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-anton text-2xl text-[#111111] uppercase tracking-tight">
                  High-Retention Native Integration
                </h3>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  Organic storytelling that creators naturally weave into their daily content rather than synthetic ads that audiences immediately skip.
                </p>
              </div>
            </div>

            {/* Visual Micro-Widget: Engagement Benchmark Comparison */}
            <div className="space-y-2 pt-4 border-t border-stone-100">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs font-semibold">
                <span className="text-stone-500">Generic Banner Ads</span>
                <span className="font-mono text-stone-700 font-bold">0.8% CTR</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FFF9E6] border border-[#FBCB77] flex items-center justify-between text-xs font-bold text-[#111111]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B80F0A]" />
                  VISTAR Creator Stories
                </span>
                <span className="font-mono text-[#B80F0A] text-sm font-black">4.6% Avg Rate</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Transparent Reporting & Audit (1-col) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-1 p-8 rounded-3xl bg-white border-2 border-stone-200/90 hover:border-[#111111] shadow-nickpat transition-colors flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#111111] text-white">
                  05 / AUDIT & ROI
                </span>
                <LineChart className="w-5 h-5 text-[#B80F0A]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-anton text-2xl text-[#111111] uppercase tracking-tight">
                  Transparent Metrics & Real-Time Tracking
                </h3>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  Verifiable impressions, UTM conversion tracking, story swipe-ups, and genuine campaign post-mortems with zero inflated numbers.
                </p>
              </div>
            </div>

            {/* Visual Micro-Widget: Trust Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-stone-100">
              <div className="p-3 rounded-xl bg-[#FAF6EF] border border-stone-200 text-center">
                <div className="font-anton text-xl text-[#B80F0A]">100%</div>
                <div className="text-[10px] font-bold text-stone-600 uppercase">Real Views</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6EF] border border-stone-200 text-center">
                <div className="font-anton text-xl text-[#111111]">0%</div>
                <div className="text-[10px] font-bold text-stone-600 uppercase">Bot Inflation</div>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Turnkey End-to-End Orchestration (Full Width 3-col Banner) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-3 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#111111] via-[#1C1C1C] to-[#111111] text-white border-2 border-stone-900 shadow-nickpat flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 group"
          >
            <div className="space-y-3 max-w-lg">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#B80F0A] text-white">
                  06 / EXECUTION
                </span>
                <span className="text-xs font-bold text-[#FBCB77] uppercase tracking-wider">
                  Turnkey Campaign Workflow
                </span>
              </div>
              <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Complete End-to-End Campaign Management
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-medium leading-relaxed">
                We handle creator briefing, contract agreements, vernacular scripting approvals, logistics dispatch, and guaranteed delivery under one single roof.
              </p>
            </div>

            {/* Interactive Timeline Step Widget */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
              {[
                { step: "01", title: "Strategy Brief", desc: "Targeting & Match" },
                { step: "02", title: "Contracts", desc: "Fixed Rates & NDAs" },
                { step: "03", title: "Script Approval", desc: "Marathi Nuance Check" },
                { step: "04", title: "Live Launch", desc: "Real-Time Audit" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1.5"
                >
                  <div className="font-mono text-xs font-bold text-[#FBCB77]">{s.step}</div>
                  <div className="font-bold text-sm text-white">{s.title}</div>
                  <div className="text-[11px] text-stone-400">{s.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
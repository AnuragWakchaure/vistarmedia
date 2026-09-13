"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Users,
  Film,
  Radio,
  BarChart3,
  Check,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";

export default function CampaignProcess() {
  const shouldReduceMotion = useReducedMotion();

  const textVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATIONS.normal, ease: EASINGS.easeOutQuart },
    },
  };

  const visualVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: DURATIONS.normal, ease: EASINGS.easeOutQuart },
    },
  };

  return (
    <section id="process" className="relative overflow-hidden bg-[#EAF0F3] scroll-mt-28 py-20 sm:py-24">
      <div className="py-18 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-14 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: DURATIONS.normal, ease: EASINGS.easeOutQuart }}
          className="text-center space-y-3.5 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#0B1117] text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00C8FF]" />
            <span>How It Works &bull; Campaign Process</span>
          </div>

          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            From Brief To{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009DFF] via-[#00C8FF] to-[#0A84FF]">
              Campaign Results.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#64717C] font-normal max-w-xl mx-auto leading-relaxed">
            End-to-end execution across 35 Maharashtra districts — from strategy to verified ROI.
          </p>
        </motion.div>

        {/* Alternating Zig-Zag Process Container */}
        <div className="relative space-y-12 sm:space-y-16">
          {/* Subtle Center Connector Spine on Desktop */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-slate-300 via-slate-400/40 to-slate-300 pointer-events-none" />

          {/* ========================================================================= */}
          {/* STEP 01 — STRATEGY BRIEF (Row 1: Text Left | Visual Right) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center relative">
            {/* Text Side (order-1 on all screens) */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-cyan-200 text-[#009DFF] text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
                <span>01 / STRATEGY</span>
              </div>

              <h3 className="font-anton text-3xl sm:text-4xl text-[#0B1117] uppercase tracking-tight leading-tight">
                Define Brief & KPIs.
              </h3>

              <p className="text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed">
                We align your brand goals with target demographics, district allocation, and measurable performance KPIs.
              </p>

              <div className="space-y-2 pt-1">
                {[
                  "Target district & vernacular audience mapping",
                  "Deliverable scope (Reels, Story Sequences, Activations)",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0B1117] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual Side (order-2 on all screens) */}
            <motion.div
              variants={visualVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-2"
            >
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(11,17,23,0.06)] space-y-4">
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#009DFF]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1117]">Campaign Strategic Brief</div>
                      <div className="text-[10px] font-mono text-slate-400">DOC-REF #MH-STRAT-2026</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                    Validated
                  </span>
                </div>

                {/* Brief Fields Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#EAF0F3] border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Target Region</span>
                    <span className="text-xs font-bold text-[#0B1117]">Pune &bull; Nashik &bull; Kolhapur</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#EAF0F3] border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Primary Objective</span>
                    <span className="text-xs font-bold text-[#0B1117]">Regional Consideration</span>
                  </div>
                </div>

                {/* KPI Checklist Progress */}
                <div className="space-y-1.5 p-3 rounded-xl bg-[#EAF0F3] border border-slate-200/80">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-[#0B1117]">Strategy Readiness</span>
                    <span className="font-mono text-[#009DFF]">100% Locked</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#009DFF] to-[#00C8FF] w-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 02 — CREATOR MATCH (Row 2: Visual Left | Text Right) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center relative">
            {/* Visual Side (order-2 on mobile, lg:order-1 on desktop) */}
            <motion.div
              variants={visualVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-2 lg:order-1"
            >
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(11,17,23,0.06)] space-y-3.5">
                {/* Telemetry Search Bar */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#EAF0F3] border border-slate-200/80">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0B1117]">
                    <Users className="w-4 h-4 text-[#009DFF]" />
                    <span>Niche: Agriculture & Vernacular Tech</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#009DFF] bg-white px-2 py-0.5 rounded border border-cyan-100">
                    28 Match
                  </span>
                </div>

                {/* Mini Creator Cards */}
                <div className="space-y-2">
                  {[
                    { name: "Saurabh Deshmukh", niche: "Agro Machinery", loc: "Nashik &bull; 450K Reach", score: "99% Match" },
                    { name: "Pooja Patil", niche: "Rural Lifestyle", loc: "Kolhapur &bull; 620K Reach", score: "97% Match" },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-[#EAF0F3] border border-slate-200/80 flex items-center justify-between gap-3 hover:border-cyan-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-cyan-50 border border-cyan-200 text-[#009DFF] font-anton text-sm flex items-center justify-center shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#0B1117]">{c.name}</div>
                          <div className="text-[11px] text-[#64717C] font-medium">{c.niche}</div>
                          <div className="text-[10px] font-mono text-slate-400">{c.loc}</div>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-md bg-white text-[#009DFF] border border-cyan-200 text-[10px] font-mono font-bold shrink-0 shadow-xs">
                        {c.score}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Verification Signal */}
                <div className="flex items-center justify-between text-[11px] font-medium text-[#64717C] pt-1">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    Audience Authenticity Audited
                  </span>
                  <span className="font-mono text-slate-400">Zero Fake Followers</span>
                </div>
              </div>
            </motion.div>

            {/* Text Side (order-1 on mobile, lg:order-2 on desktop) */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 lg:order-2 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-cyan-200 text-[#009DFF] text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
                <span>02 / CREATOR MATCH</span>
              </div>

              <h3 className="font-anton text-3xl sm:text-4xl text-[#0B1117] uppercase tracking-tight leading-tight">
                Creator Matchmaking.
              </h3>

              <p className="text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed">
                We pair your brand with vetted vernacular creators who have verified engagement and community credibility.
              </p>

              <div className="space-y-2 pt-1">
                {[
                  "100% verified engagement with zero bot pods",
                  "Direct rate negotiation & transparent contracting",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0B1117] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 03 — CONTENT (Row 3: Text Left | Visual Right) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center relative">
            {/* Text Side (order-1 on all screens) */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-cyan-200 text-[#009DFF] text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
                <span>03 / BRIEFING & APPROVAL</span>
              </div>

              <h3 className="font-anton text-3xl sm:text-4xl text-[#0B1117] uppercase tracking-tight leading-tight">
                Native Content Scripting.
              </h3>

              <p className="text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed">
                Creators craft high-impact regional content in native Marathi dialects with full brand review and rapid approval cycles.
              </p>

              <div className="space-y-2 pt-1">
                {[
                  "Authentic Marathi cultural hooks & storytelling",
                  "Dedicated brand compliance & quality check",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0B1117] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual Side (order-2 on all screens) */}
            <motion.div
              variants={visualVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-2"
            >
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(11,17,23,0.06)] space-y-3.5">
                {/* Status Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-[#009DFF]" />
                    <span className="text-xs font-bold text-[#0B1117]">Script & Video Review</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-[#009DFF] border border-cyan-100 text-[10px] font-mono font-bold">
                    Round 1 &bull; 100% On-Track
                  </span>
                </div>

                {/* Workflow Checklist Items */}
                <div className="space-y-2">
                  {[
                    { label: "Marathi Dialect & Hook Alignment", status: "Approved" },
                    { label: "Product Key Benefits & USP Mentions", status: "Approved" },
                    { label: "Legal & Regulatory Compliance Check", status: "Approved" },
                    { label: "Video Final Cut & Audio Mixing", status: "Client Ready" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 sm:p-3 rounded-xl bg-[#EAF0F3] border border-slate-200/80 flex items-center justify-between text-xs"
                    >
                      <span className="text-[#0B1117] font-medium">{item.label}</span>
                      <span className="font-mono text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-500" />
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Sign-off Callout */}
                <div className="p-3 rounded-xl bg-cyan-50/60 border border-cyan-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-[#0B1117] font-semibold">Client Greenlight Granted</span>
                  <span className="font-mono text-[#009DFF] font-bold">Ready for Launch</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 04 — EXECUTION (Row 4: Visual Left | Text Right) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center relative">
            {/* Visual Side (order-2 on mobile, lg:order-1 on desktop) */}
            <motion.div
              variants={visualVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-2 lg:order-1"
            >
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(11,17,23,0.06)] space-y-3.5">
                {/* Launch Waves Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#009DFF] animate-pulse" />
                    <span className="text-xs font-bold text-[#0B1117]">Multi-Wave Rollout Matrix</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-mono font-bold">
                    LIVE NOW
                  </span>
                </div>

                {/* Timed Drops Timeline */}
                <div className="space-y-2">
                  {[
                    { wave: "Wave 1 — 10:00 AM", focus: "Metro Anchor Reels (Mumbai & Pune)", status: "Active &bull; 920K Reach" },
                    { wave: "Wave 2 — 02:00 PM", focus: "Tier-2 Regional Creators (Nashik & Sambhajinagar)", status: "Active &bull; 640K Reach" },
                    { wave: "Wave 3 — 07:00 PM", focus: "Rural Agro-Storytellers (Vidarbha & Khandesh)", status: "Scheduled &bull; Prime Time" },
                  ].map((w, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-[#EAF0F3] border border-slate-200/80 space-y-1"
                    >
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-mono font-bold text-[#009DFF]">{w.wave}</span>
                        <span className="text-[10px] font-mono text-emerald-600 font-semibold">{w.status}</span>
                      </div>
                      <div className="text-xs font-bold text-[#0B1117]">{w.focus}</div>
                    </div>
                  ))}
                </div>

                {/* Live Velocity Metric */}
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-[#64717C] font-medium">Network Engagement Velocity</span>
                  <span className="font-anton text-base text-[#009DFF]">14.2K / Hour</span>
                </div>
              </div>
            </motion.div>

            {/* Text Side (order-1 on mobile, lg:order-2 on desktop) */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 lg:order-2 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-cyan-200 text-[#009DFF] text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
                <span>04 / CAMPAIGN LAUNCH</span>
              </div>

              <h3 className="font-anton text-3xl sm:text-4xl text-[#0B1117] uppercase tracking-tight leading-tight">
                Synchronized Rollout.
              </h3>

              <p className="text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed">
                Coordinated drops across Instagram and YouTube timed to peak viewing hours for maximum regional reach.
              </p>

              <div className="space-y-2 pt-1">
                {[
                  "Synchronized cross-creator posting window",
                  "Trackable UTM links & active comment pinning",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0B1117] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 05 — TRACKING (Row 5: Text Left | Visual Right) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center relative">
            {/* Text Side (order-1 on all screens) */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-cyan-200 text-[#009DFF] text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
                <span>05 / TRACKING & TELEMETRY</span>
              </div>

              <h3 className="font-anton text-3xl sm:text-4xl text-[#0B1117] uppercase tracking-tight leading-tight">
                Real-Time Telemetry.
              </h3>

              <p className="text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed">
                Live monitoring of reach, click velocities, and audience sentiment with zero-bot auditing.
              </p>

              <div className="space-y-2 pt-1">
                {[
                  "Live UTM attribution & conversion velocity",
                  "Zero-bot audit guaranteeing authentic impressions",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0B1117] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual Side (order-2 on all screens) */}
            <motion.div
              variants={visualVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-2"
            >
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(11,17,23,0.06)] space-y-3.5">
                {/* Top Telemetry Row */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-2xl bg-[#EAF0F3] border border-slate-200/80 text-center">
                    <div className="font-anton text-2xl text-[#00C8FF]">2.8M</div>
                    <div className="text-[10px] font-mono uppercase text-slate-500">Total Views</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#EAF0F3] border border-slate-200/80 text-center">
                    <div className="font-anton text-2xl text-[#0B1117]">4.8%</div>
                    <div className="text-[10px] font-mono uppercase text-slate-500">Avg CTR</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#EAF0F3] border border-slate-200/80 text-center">
                    <div className="font-anton text-2xl text-emerald-600">94%</div>
                    <div className="text-[10px] font-mono uppercase text-slate-500">Positive</div>
                  </div>
                </div>

                {/* Regional Audience Heatmap Bar */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-[#EAF0F3] border border-slate-200/80">
                  <div className="flex justify-between items-center text-[11px] font-bold text-[#0B1117]">
                    <span>Geographic Distribution</span>
                    <span className="font-mono text-[#009DFF]">Maharashtra Core</span>
                  </div>
                  <div className="flex h-2.5 rounded-full overflow-hidden gap-1 bg-slate-200">
                    <div className="bg-[#009DFF] w-[45%]" title="Pune & Mumbai (45%)" />
                    <div className="bg-[#00C8FF] w-[35%]" title="Tier-2 Hubs (35%)" />
                    <div className="bg-slate-400 w-[20%]" title="Agro Belt (20%)" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                    <span>Metros: 45%</span>
                    <span>Tier-2: 35%</span>
                    <span>Rural: 20%</span>
                  </div>
                </div>

                {/* Audit Pill */}
                <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Human-Audited Views
                  </span>
                  <span>100% Genuine Traffic</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 06 — REPORTING (Row 6: Visual Left | Text Right) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center relative">
            {/* Visual Side (order-2 on mobile, lg:order-1 on desktop) */}
            <motion.div
              variants={visualVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-2 lg:order-1"
            >
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(11,17,23,0.06)] space-y-3.5">
                {/* Executive Report Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#009DFF]" />
                    <span className="text-xs font-bold text-[#0B1117]">Post-Campaign ROI Dossier</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-[#009DFF] border border-cyan-100 text-[10px] font-mono font-bold uppercase">
                    Delivered
                  </span>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#EAF0F3] border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Verified Reach</span>
                    <div className="font-anton text-2xl text-[#0B1117]">1.45M Users</div>
                    <span className="text-[10px] text-emerald-600 font-semibold">+18% above target</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#EAF0F3] border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Cost Per Engagement</span>
                    <div className="font-anton text-2xl text-[#00C8FF]">&#8377;0.42</div>
                    <span className="text-[10px] text-[#64717C] font-semibold">3.2x ROI Efficiency</span>
                  </div>
                </div>

                {/* Recommendations Callout */}
                <div className="p-3 rounded-2xl bg-cyan-50/60 border border-cyan-200/60 space-y-1">
                  <div className="text-xs font-bold text-[#0B1117]">Strategic Growth Takeaways</div>
                  <p className="text-[11px] text-[#64717C] leading-relaxed">
                    Vernacular agro-reels in Nashik generated 4.2x higher dealer queries.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Text Side (order-1 on mobile, lg:order-2 on desktop) */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 lg:order-2 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-cyan-200 text-[#009DFF] text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
                <span>06 / REPORTING & INSIGHTS</span>
              </div>

              <h3 className="font-anton text-3xl sm:text-4xl text-[#0B1117] uppercase tracking-tight leading-tight">
                Executive ROI Dossier.
              </h3>

              <p className="text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed">
                Comprehensive performance audit breaking down verified reach, commercial efficiency, and scaling blueprint.
              </p>

              <div className="space-y-2 pt-1">
                {[
                  "Creator-by-creator metrics & content archive",
                  "Verified CPM & cost-per-engagement audit",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0B1117] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Conversion Action Card in Midnight / Deep Navy */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: DURATIONS.normal, ease: EASINGS.easeOutQuart }}
          className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#05080D] via-[#07111A] to-[#05080D] border border-cyan-500/30 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2.5 text-center md:text-left max-w-xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00C8FF] bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
              Ready For Execution
            </span>
            <h3 className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
              Ready To Launch Your Maharashtra Campaign?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Share your brand goals with our strategy team. We’ll deliver a tailored creator proposal and transparent pricing within 48 hours.
            </p>
          </div>

          <Link
            href="/#campaign-enquiry"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00C8FF] to-[#009DFF] hover:from-[#33D4FF] hover:to-[#00C8FF] text-[#05080D] font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(0,200,255,0.4)] flex items-center justify-center gap-2 shrink-0 group hover:scale-[1.02]"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Users,
  Video,
  Target,
  MapPin,
  Layers,
  BarChart3,
  CheckCircle2,
  Download,
  Shield,
  Zap,
  TrendingUp,
  Sparkles,
  FileText,
  Rocket,
  Clock,
  Headphones,
  Link as LinkIcon,
  PieChart,
  Radio,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import { Counter } from "@/components/animations/Counter";

export default function HomeServicesSection() {
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
    <section
      id="services"
      className="relative overflow-hidden bg-[#F8FAFC] scroll-mt-28 py-20 sm:py-24 px-4 sm:px-6"
    >
      {/* Subtle Atmospheric Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full bg-[#00C2FF]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-[#0088FF]/10 blur-3xl" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER: Master Title, Subtitle, Live Badge & Actions */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: DURATIONS.normal, ease: EASINGS.easeOutQuart }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="space-y-3.5 max-w-3xl">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase text-[#0B111E] tracking-wider">
                Full-Stack Regional Capabilities
              </span>
            </div>

            {/* Master Headline */}
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#0B111E] uppercase leading-[0.98] tracking-tight">
              Strategic Solutions Built For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] via-[#00C2FF] to-[#0074DB]">
                Regional Scale.
              </span>
            </h2>

            {/* Body Description */}
            <p className="text-sm sm:text-base text-[#64748B] font-normal leading-relaxed max-w-2xl">
              From high-production metro campaigns to grassroots agricultural storytelling, we manage your entire influencer marketing lifecycle across Tier-2 and Tier-3 heartlands.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0B111E] text-white hover:bg-[#0088FF] font-extrabold text-xs uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span>Explore All Capabilities</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/#campaign-enquiry"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0B111E] hover:bg-[#F1F5F9] border border-slate-200 text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <Download className="w-4 h-4 text-[#0088FF]" />
              <span>Credentials Deck</span>
            </Link>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 6 CORE CAPABILITIES BENTO GRID */}
        {/* ========================================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* ===================================================================== */}
          {/* CARD 01: Regional Influencer Marketing */}
          {/* ===================================================================== */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 hover:border-[#00C2FF]/60 shadow-[0_4px_24px_rgba(11,17,30,0.04)] hover:shadow-[0_16px_36px_rgba(0,194,255,0.12)] transition-all duration-300 p-6 sm:p-7 overflow-hidden hover:-translate-y-1"
          >
            <div className="flex flex-col space-y-4">
              {/* Header Meta */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#E5EEFF] font-mono text-xs text-[#005BAF] font-bold">
                  01
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] text-[#0088FF] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Copy */}
              <div>
                <h3 className="font-anton text-2xl text-[#0B111E] uppercase mb-2 tracking-tight">
                  Regional Influencer Marketing
                </h3>
                <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                  Strategic talent deployment across 200+ vetted Marathi creators delivering authentic community trust and local dialect resonance.
                </p>
              </div>

              {/* Rich Visual Photo & Dynamic Matchmaking Overlay */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 group">
                <img
                  alt="Regional creator recording video vlog"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop&q=80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C30]/90 via-[#0B1C30]/25 to-transparent" />

                {/* Matchmaking Widget Pill */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between p-2 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-white/50">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <span className="inline-flex h-5 w-5 rounded-full bg-[#005BAF] text-white text-[9px] items-center justify-center font-bold">
                        MH
                      </span>
                      <span className="inline-flex h-5 w-5 rounded-full bg-[#00C1FD] text-[#004B65] text-[9px] items-center justify-center font-bold">
                        PN
                      </span>
                      <span className="inline-flex h-5 w-5 rounded-full bg-[#D3E4FE] text-[#005BAF] text-[9px] items-center justify-center font-bold">
                        NG
                      </span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#0B111E] uppercase">
                      200+ CREATORS
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#0088FF]">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#0B111E]">
                      BRAND FIT
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* District Geo Nodes Bar */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F8FAFC] border border-slate-200/70 font-mono text-[11px] text-[#64748B]">
                <span className="flex items-center gap-1 font-bold text-[#0088FF]">
                  <MapPin className="w-3.5 h-3.5" />
                  HUB NODES
                </span>
                <span className="font-medium truncate ml-2">Pune • Kolhapur • Nashik • Nagpur</span>
              </div>
            </div>

            {/* Feature Badges Footer */}
            <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-[#0088FF]" /> 200+ Vetted Creators
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-[#0088FF]" /> 35 Districts Covered
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <Shield className="w-3 h-3 text-[#00C1FD]" /> Zero-Bot Guarantee
              </span>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* CARD 02: Vernacular Content Production */}
          {/* ===================================================================== */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 hover:border-[#00C2FF]/60 shadow-[0_4px_24px_rgba(11,17,30,0.04)] hover:shadow-[0_16px_36px_rgba(0,194,255,0.12)] transition-all duration-300 p-6 sm:p-7 overflow-hidden hover:-translate-y-1"
          >
            <div className="flex flex-col space-y-4">
              {/* Header Meta */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#E5EEFF] font-mono text-xs text-[#005BAF] font-bold">
                  02
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] text-[#0088FF] flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Copy */}
              <div>
                <h3 className="font-anton text-2xl text-[#0B111E] uppercase mb-2 tracking-tight">
                  Vernacular Content Production
                </h3>
                <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                  High-retention Reels and short-form videos crafted with native Marathi cultural triggers, idiomatic copy, and colloquial pacing.
                </p>
              </div>

              {/* Rich Visual Photo & Production UI */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 group">
                <img
                  alt="Vernacular video production set behind the scenes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C30]/90 via-[#0B1C30]/30 to-transparent" />

                {/* Live Production Metric Well */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-white/50 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#64748B] uppercase font-bold">FORMAT MATRIX</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#00C1FD]/20 text-[#006688] font-bold">
                      9:16 NATIVE
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-[#D3E4FE] font-mono text-[9px] font-bold text-[#005BAF]">
                      MARATHI HOOK
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0B111E] font-mono text-[9px] font-semibold">
                      REELS
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0B111E] font-mono text-[9px] font-semibold">
                      SHORTS
                    </span>

                    {/* Animated Soundwave preview */}
                    <div className="ml-auto flex items-end gap-0.5 h-3.5">
                      <span className="w-0.5 h-2 bg-[#0088FF] rounded-full animate-pulse" />
                      <span className="w-0.5 h-3.5 bg-[#0088FF] rounded-full animate-pulse" />
                      <span className="w-0.5 h-2.5 bg-[#0088FF] rounded-full animate-pulse" />
                      <span className="w-0.5 h-1.5 bg-[#0088FF] rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio & Hook Micro Bar */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F8FAFC] border border-slate-200/70 font-mono text-[11px] text-[#64748B]">
                <span className="flex items-center gap-1 font-bold text-[#0088FF]">
                  <Headphones className="w-3.5 h-3.5" />
                  DIALECT ACCURACY
                </span>
                <span className="font-bold text-[#0088FF]">99.4% AUDITED</span>
              </div>
            </div>

            {/* Feature Badges Footer */}
            <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-[#0088FF]" /> Native Scripting
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <Zap className="w-3 h-3 text-[#0088FF]" /> Reels & Shorts
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <TrendingUp className="w-3 h-3 text-[#00C1FD]" /> 4.2x Retention Rate
              </span>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* CARD 03: Precision Creator Matching */}
          {/* ===================================================================== */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 hover:border-[#00C2FF]/60 shadow-[0_4px_24px_rgba(11,17,30,0.04)] hover:shadow-[0_16px_36px_rgba(0,194,255,0.12)] transition-all duration-300 p-6 sm:p-7 overflow-hidden hover:-translate-y-1"
          >
            <div className="flex flex-col space-y-4">
              {/* Header Meta */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#E5EEFF] font-mono text-xs text-[#005BAF] font-bold">
                  03
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] text-[#0088FF] flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Copy */}
              <div>
                <h3 className="font-anton text-2xl text-[#0B111E] uppercase mb-2 tracking-tight">
                  Precision Creator Matching
                </h3>
                <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                  Algorithmic demographic mapping pairing brands to creators whose audience geography and spending power mirror your target buyers.
                </p>
              </div>

              {/* Interactive Algorithm UI Well */}
              <div className="relative w-full h-44 rounded-2xl bg-[#F1F5F9] p-3 flex flex-col justify-between border border-slate-200/80">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#64748B] uppercase font-bold">ATTRIBUTION ENGINE</span>
                  <span className="px-2 py-0.5 rounded bg-[#0088FF] text-white font-bold">
                    AFFINITY v4
                  </span>
                </div>

                {/* Matching Path Visualization */}
                <div className="flex items-center justify-between gap-1 p-2 rounded-xl bg-white shadow-xs border border-slate-200/60">
                  <div className="text-center px-2 py-1 rounded bg-slate-100">
                    <span className="block font-mono text-[9px] text-[#64748B]">INPUT</span>
                    <span className="font-bold text-[10px] text-[#0B111E] uppercase">Brand Brief</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[10px] text-[#0088FF] font-black">98.4%</span>
                    <div className="w-8 h-0.5 bg-[#00C2FF]" />
                  </div>
                  <div className="text-center px-2 py-1 rounded bg-[#D3E4FE]">
                    <span className="block font-mono text-[9px] text-[#005BAF]">MATCH</span>
                    <span className="font-bold text-[10px] text-[#005BAF] uppercase">Creator Fit</span>
                  </div>
                </div>

                {/* Micro Demographic Bar Chart */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[10px] text-[#64748B]">
                    <span>REGIONAL AFFINITY (MAHARASHTRA)</span>
                    <span className="font-bold text-[#0B111E]">91% TIER-2/3</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden flex">
                    <div className="h-full bg-[#0088FF]" style={{ width: "62%" }} />
                    <div className="h-full bg-[#00C2FF]" style={{ width: "29%" }} />
                    <div className="h-full bg-[#005BAF]" style={{ width: "9%" }} />
                  </div>
                </div>
              </div>

              {/* Geo-Fencing Status Bar */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F8FAFC] border border-slate-200/70 font-mono text-[11px] text-[#64748B]">
                <span className="flex items-center gap-1 font-bold text-[#0088FF]">
                  <MapPin className="w-3.5 h-3.5" />
                  GEO-FENCE RESOLUTION
                </span>
                <span className="font-bold text-[#0B111E]">TALUKA LEVEL</span>
              </div>
            </div>

            {/* Feature Badges Footer */}
            <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-[#0088FF]" /> District Geo-Fencing
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <PieChart className="w-3 h-3 text-[#0088FF]" /> Audience Demographics
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <Shield className="w-3 h-3 text-[#00C1FD]" /> Brand Safety Cleared
              </span>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* CARD 04: Hyperlocal Brand Activations */}
          {/* ===================================================================== */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 hover:border-[#00C2FF]/60 shadow-[0_4px_24px_rgba(11,17,30,0.04)] hover:shadow-[0_16px_36px_rgba(0,194,255,0.12)] transition-all duration-300 p-6 sm:p-7 overflow-hidden hover:-translate-y-1"
          >
            <div className="flex flex-col space-y-4">
              {/* Header Meta */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#E5EEFF] font-mono text-xs text-[#005BAF] font-bold">
                  04
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] text-[#0088FF] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Copy */}
              <div>
                <h3 className="font-anton text-2xl text-[#0B111E] uppercase mb-2 tracking-tight">
                  Hyperlocal Brand Activations
                </h3>
                <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                  District-level experiential events, agricultural expos, and store launches connecting on-ground footfalls with creator reach.
                </p>
              </div>

              {/* Rich Visual Photo & Ground Node Map Ticker */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 group">
                <img
                  alt="Hyperlocal experiential marketing event on ground in Maharashtra"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&auto=format&fit=crop&q=80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C30]/90 via-[#0B1C30]/30 to-transparent" />

                {/* Live Footfall Card Pill */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-white/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[9px] font-bold uppercase text-[#64748B]">
                      GROUND NODES
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#D3E4FE] text-[#005BAF] font-mono text-[9px] font-bold">
                      35 DISTRICTS
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[9px] text-[#0B111E]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0088FF]" /> Pune
                      </span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[9px] text-[#0B111E]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]" /> Mumbai
                      </span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[9px] text-[#0B111E]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#005BAF]" /> Nashik
                      </span>
                    </div>
                    <div className="text-right pl-2">
                      <span className="font-anton text-lg text-[#0088FF] leading-none">84K+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footfall Amplification Node */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F8FAFC] border border-slate-200/70 font-mono text-[11px] text-[#64748B]">
                <span className="flex items-center gap-1 font-bold text-[#0088FF]">
                  <Radio className="w-3.5 h-3.5" />
                  OFFLINE-TO-ONLINE LIFT
                </span>
                <span className="font-bold text-[#0088FF]">+240% ENGAGEMENT</span>
              </div>
            </div>

            {/* Feature Badges Footer */}
            <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-[#0088FF]" /> Tier-2 & Tier-3 Presence
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <Target className="w-3 h-3 text-[#0088FF]" /> Footfall Amplification
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#00C1FD]" /> Agro & Auto Events
              </span>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* CARD 05: Turnkey Campaign Orchestration (Featured Highlight Card) */}
          {/* ===================================================================== */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-between rounded-3xl bg-white border-2 border-[#00C2FF]/50 shadow-[0_8px_32px_rgba(0,194,255,0.16)] transition-all duration-300 p-6 sm:p-7 overflow-hidden ring-4 ring-[#00C2FF]/10 hover:-translate-y-1"
          >
            {/* Electric ambient corner glow */}
            <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[#00C2FF]/20 blur-xl" />

            <div className="flex flex-col space-y-4 relative z-10">
              {/* Header Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-[#0088FF] text-white font-mono text-xs font-bold">
                    05
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#E5EEFF] font-mono text-[10px] text-[#005BAF] font-black uppercase tracking-wider">
                    FLAGSHIP
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#E5EEFF] text-[#0088FF] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Copy */}
              <div>
                <h3 className="font-anton text-2xl text-[#0088FF] uppercase mb-2 tracking-tight">
                  Turnkey Campaign Orchestration
                </h3>
                <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                  Full operational management: legal contracting, vernacular briefing, script approvals, product logistics dispatch, and live launches.
                </p>
              </div>

              {/* Interactive Workflow UI Well */}
              <div className="relative w-full h-44 rounded-2xl bg-[#F1F5F9] p-3 flex flex-col justify-between border border-slate-200/80">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#64748B] uppercase font-bold">TURNKEY PIPELINE</span>
                  <span className="px-2 py-0.5 rounded bg-[#0088FF] text-white font-bold">
                    48H SLA
                  </span>
                </div>

                {/* 4-Stage Stepper */}
                <div className="grid grid-cols-4 gap-1.5 py-1">
                  <div className="flex flex-col items-center text-center p-1.5 rounded-xl bg-white shadow-2xs border border-slate-200/60">
                    <span className="font-mono text-[10px] text-[#0088FF] font-bold">01</span>
                    <span className="font-bold text-[9px] text-[#0B111E] uppercase mt-0.5">Brief</span>
                    <FileText className="w-3.5 h-3.5 text-[#0088FF] mt-1" />
                  </div>
                  <div className="flex flex-col items-center text-center p-1.5 rounded-xl bg-white shadow-2xs border border-slate-200/60">
                    <span className="font-mono text-[10px] text-[#0088FF] font-bold">02</span>
                    <span className="font-bold text-[9px] text-[#0B111E] uppercase mt-0.5">Match</span>
                    <Users className="w-3.5 h-3.5 text-[#00C1FD] mt-1" />
                  </div>
                  <div className="flex flex-col items-center text-center p-1.5 rounded-xl bg-white shadow-2xs border border-slate-200/60">
                    <span className="font-mono text-[10px] text-[#0088FF] font-bold">03</span>
                    <span className="font-bold text-[9px] text-[#0B111E] uppercase mt-0.5">Approve</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0088FF] mt-1" />
                  </div>
                  <div className="flex flex-col items-center text-center p-1.5 rounded-xl bg-gradient-to-tr from-[#0088FF] to-[#00C2FF] text-white shadow-2xs">
                    <span className="font-mono text-[10px] text-white font-bold">04</span>
                    <span className="font-bold text-[9px] text-white uppercase mt-0.5">Launch</span>
                    <Rocket className="w-3.5 h-3.5 text-white mt-1" />
                  </div>
                </div>

                {/* SLA Status Bar */}
                <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-white text-[#0B111E] font-mono text-[10px] border border-slate-200/60">
                  <span className="flex items-center gap-1.5 text-[#0088FF] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-ping" />
                    SINGLE POINT OF CONTACT
                  </span>
                  <span className="font-bold text-[#0B111E]">ZERO DELAYS</span>
                </div>
              </div>

              {/* Workflow Metric Footer */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#E5EEFF] font-mono text-[11px] text-[#005BAF]">
                <span className="flex items-center gap-1 font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  DISPATCH EFFICIENCY
                </span>
                <span className="font-black">100% TIMELY RELEASES</span>
              </div>
            </div>

            {/* Feature Badges Footer */}
            <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-slate-100 relative z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E5EEFF] text-[#005BAF] text-[11px] font-bold">
                <CheckCircle2 className="w-3 h-3" /> Fixed-Rate Contracts
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E5EEFF] text-[#005BAF] text-[11px] font-bold">
                <Clock className="w-3 h-3" /> Rapid 48h Turnaround
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E5EEFF] text-[#005BAF] text-[11px] font-bold">
                <Headphones className="w-3 h-3" /> Dedicated Ops Manager
              </span>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* CARD 06: Verifiable Performance & Audit */}
          {/* ===================================================================== */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 hover:border-[#00C2FF]/60 shadow-[0_4px_24px_rgba(11,17,30,0.04)] hover:shadow-[0_16px_36px_rgba(0,194,255,0.12)] transition-all duration-300 p-6 sm:p-7 overflow-hidden hover:-translate-y-1"
          >
            <div className="flex flex-col space-y-4">
              {/* Header Meta */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#E5EEFF] font-mono text-xs text-[#005BAF] font-bold">
                  06
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] text-[#0088FF] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Copy */}
              <div>
                <h3 className="font-anton text-2xl text-[#0B111E] uppercase mb-2 tracking-tight">
                  Verifiable Performance & Audit
                </h3>
                <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                  Transparent post-campaign reporting with third-party verified impressions, real-time UTM parameter tracking, and proven ROI metrics.
                </p>
              </div>

              {/* Reach Velocity Sparkline & Data Visualization */}
              <div className="relative w-full h-44 rounded-2xl bg-[#F1F5F9] p-3 flex flex-col justify-between border border-slate-200/80">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#64748B] uppercase font-bold">REACH VELOCITY</span>
                  <span className="px-2 py-0.5 rounded bg-[#D3E4FE] text-[#005BAF] font-bold">
                    100% AUDITED
                  </span>
                </div>

                {/* Sparkline Graph Widget */}
                <div className="relative w-full h-20 flex items-center justify-center">
                  <svg
                    className="w-full h-full text-[#00C2FF]"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 300 80"
                  >
                    <defs>
                      <linearGradient id="metricGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,65 C40,60 80,45 120,48 C160,52 200,20 240,24 C270,27 285,10 300,8 L300,80 L0,80 Z"
                      fill="url(#metricGrad)"
                    />
                    <path
                      d="M0,65 C40,60 80,45 120,48 C160,52 200,20 240,24 C270,27 285,10 300,8"
                      stroke="#0088FF"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    {/* Data Node Dots */}
                    <circle className="fill-white stroke-[#0088FF]" cx="120" cy="48" r="3.5" strokeWidth="2" />
                    <circle className="fill-white stroke-[#0088FF]" cx="240" cy="24" r="3.5" strokeWidth="2" />
                    <circle className="fill-[#0088FF] stroke-white" cx="300" cy="8" r="4.5" strokeWidth="2" />
                  </svg>

                  <div className="absolute right-2 top-1 bg-white px-2 py-0.5 rounded-lg shadow-xs border border-slate-200/60">
                    <span className="font-anton text-sm text-[#0088FF]">48.2M</span>
                    <span className="block font-mono text-[8px] text-[#64748B] uppercase">Tracked Impr.</span>
                  </div>
                </div>

                {/* Bottom UTM Telemetry Tag */}
                <div className="flex items-center justify-between font-mono text-[9px] text-[#64748B]">
                  <span className="truncate">UTM: source=vistar_reg&amp;geo=mh</span>
                  <span className="text-[#0088FF] font-bold">LIFETIME LOGS</span>
                </div>
              </div>

              {/* Audit Guarantee Tag */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F8FAFC] border border-slate-200/70 font-mono text-[11px] text-[#64748B]">
                <span className="flex items-center gap-1 font-bold text-[#0088FF]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  THIRD-PARTY INTEGRITY
                </span>
                <span className="font-bold text-[#0B111E]">SOC-2 AUDITED</span>
              </div>
            </div>

            {/* Feature Badges Footer */}
            <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-[#0088FF]" /> Verifiable Impressions
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <LinkIcon className="w-3 h-3 text-[#0088FF]" /> UTM Conversion Tracking
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] text-[#0B111E] text-[11px] font-semibold border border-cyan-100/60 shadow-2xs">
                <TrendingUp className="w-3 h-3 text-[#00C1FD]" /> Comprehensive ROI
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* BOTTOM VERIFIED PROOF & METRICS BANNER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: DURATIONS.normal, ease: EASINGS.easeOutQuart }}
          className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(11,17,30,0.04)] flex flex-col lg:flex-row items-center justify-between gap-8 mt-6"
        >
          {/* 4 Verified Numerical Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full lg:w-auto">
            <div className="space-y-1">
              <span className="font-anton text-3xl sm:text-4xl text-[#0088FF] tracking-tight leading-none block">
                <Counter value="35+" />
              </span>
              <span className="block font-mono text-[11px] uppercase text-[#64748B] font-semibold">
                Districts in MH
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-anton text-3xl sm:text-4xl text-[#0B111E] tracking-tight leading-none block">
                <Counter value="200M+" />
              </span>
              <span className="block font-mono text-[11px] uppercase text-[#64748B] font-semibold">
                Vernacular Views
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-anton text-3xl sm:text-4xl text-[#0088FF] tracking-tight leading-none block">
                <Counter value="94%" />
              </span>
              <span className="block font-mono text-[11px] uppercase text-[#64748B] font-semibold">
                Brand Retention
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-anton text-3xl sm:text-4xl text-[#00C2FF] tracking-tight leading-none block">
                48H
              </span>
              <span className="block font-mono text-[11px] uppercase text-[#64748B] font-semibold">
                Kickoff SLA
              </span>
            </div>
          </div>

          {/* Roadmap Callout & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto justify-end">
            <div className="text-center sm:text-right hidden xl:block mr-3">
              <span className="font-bold text-xs uppercase text-[#0B111E] tracking-wide block">
                Ready to scale across regional markets?
              </span>
              <span className="font-mono text-[11px] text-[#64748B]">
                Let our strategist draft your bespoke blueprint.
              </span>
            </div>

            <Link
              href="/#campaign-enquiry"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0088FF] text-white hover:bg-[#0074DB] font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(0,136,255,0.3)] hover:shadow-[0_6px_25px_rgba(0,136,255,0.45)] hover:scale-[1.02]"
            >
              <span>Get Free Creator Audit</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F1F5F9] text-[#0B111E] hover:bg-slate-200 border border-slate-200 text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs"
            >
              <span>Schedule Demo</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


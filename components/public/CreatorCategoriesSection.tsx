"use client";

import React from "react";
import Link from "next/link";
import {
  Sprout,
  Sparkles,
  Car,
  UtensilsCrossed,
  Shirt,
  TrendingUp,
  ArrowUpRight,
  Users,
  Compass,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import { SectionBackground } from "@/components/motion/SectionBackground";

export interface CreatorCategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: React.ElementType;
  creatorCount: string;
  reach: string;
  description: string;
  tags: string[];
  gradient: string;
  accent: string;
  badgeBg: string;
  borderAccent: string;
}

const CREATOR_CATEGORIES: CreatorCategoryItem[] = [
  {
    id: "agriculture",
    name: "Agriculture & Rural Tech",
    slug: "Agriculture",
    icon: Sprout,
    creatorCount: "45+ Creators",
    reach: "12M+ Reach",
    description:
      "Influential rural voices, agri-machinery experts, and farming innovators across Vidarbha, Marathwada & Western Maharashtra.",
    tags: ["Tractors", "Agri-Tech", "Seeds", "Rural Economy"],
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    accent: "text-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    borderAccent: "group-hover:border-emerald-500/50",
  },
  {
    id: "vernacular",
    name: "Vernacular Marathi & Comedy",
    slug: "Marathi Content",
    icon: Sparkles,
    creatorCount: "60+ Creators",
    reach: "28M+ Reach",
    description:
      "High-engagement Marathi sketch creators, relatable family comedy, and authentic cultural storytellers with immense regional recall.",
    tags: ["Viral Sketches", "Regional Slang", "Family Humor", "High Retention"],
    gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
    accent: "text-[#009DFF]",
    badgeBg: "bg-cyan-50 text-[#009DFF] border-cyan-200",
    borderAccent: "group-hover:border-cyan-400",
  },
  {
    id: "automotive",
    name: "Automotive & Commercial Vehicles",
    slug: "Automobile",
    icon: Car,
    creatorCount: "30+ Creators",
    reach: "9.5M+ Reach",
    description:
      "Tractor walk-throughs, commercial vehicle reviews, EV roadshows, and two-wheeler launches connecting directly with buyers.",
    tags: ["Tractor Reviews", "EV Launch", "Test Drives", "Dealerships"],
    gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
    accent: "text-blue-600",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    borderAccent: "group-hover:border-blue-400",
  },
  {
    id: "food",
    name: "Regional Food & Agro-Foods",
    slug: "Food",
    icon: UtensilsCrossed,
    creatorCount: "35+ Creators",
    reach: "15M+ Reach",
    description:
      "Authentic Maharashtrian recipes, highway dhaba reviews, packaged spices, and farm-fresh organic food promotions.",
    tags: ["Marathi Cuisine", "Street Food", "Spices", "D2C Brands"],
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    accent: "text-amber-600",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    borderAccent: "group-hover:border-amber-400",
  },
  {
    id: "lifestyle",
    name: "Lifestyle, Youth & Fashion",
    slug: "Lifestyle",
    icon: Shirt,
    creatorCount: "40+ Creators",
    reach: "18M+ Reach",
    description:
      "Trendsetters across Pune, Mumbai, Nashik and Kolhapur driving youth consumer habits, festive shopping, and campus buzz.",
    tags: ["Festivals", "Apparel", "Beauty", "Campus Culture"],
    gradient: "from-pink-500/10 via-rose-500/5 to-transparent",
    accent: "text-pink-600",
    badgeBg: "bg-pink-50 text-pink-700 border-pink-200",
    borderAccent: "group-hover:border-pink-400",
  },
  {
    id: "fintech",
    name: "Fintech & Financial Literacy",
    slug: "Technology",
    icon: TrendingUp,
    creatorCount: "25+ Creators",
    reach: "8.2M+ Reach",
    description:
      "Marathi finance educators breaking down investment, micro-loans, insurance, and digital banking for regional audiences.",
    tags: ["Vernacular Finance", "Mutual Funds", "MSME Loans", "Savings"],
    gradient: "from-teal-500/10 via-cyan-500/5 to-transparent",
    accent: "text-teal-600",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
    borderAccent: "group-hover:border-teal-400",
  },
];

export default function CreatorCategoriesSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
      },
    },
  };

  const itemVariants = {
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
    <section
      id="creators"
      className="py-20 sm:py-24 px-4 sm:px-6 bg-[#EAF0F3] relative overflow-hidden scroll-mt-28"
    >
      <SectionBackground variant="dots" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: DURATIONS.normal, ease: EASINGS.easeOutQuart }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#0B1117] text-xs font-bold uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#00C8FF]" />
              <span>Vernacular Talent Ecosystem</span>
            </div>

            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
              Creator Categories & Verticals
            </h2>

            <p className="text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed">
              Explore Maharashtra&apos;s most influential regional voices categorized by audience affinity, cultural resonance, and purchasing power.
            </p>
          </div>

          <Link
            href="/#campaign-enquiry"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0B1117] border border-slate-200 hover:border-[#00C8FF]/60 text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow-md shrink-0 hover:-translate-y-0.5"
          >
            <span>Request Creator Shortlist</span>
            <ArrowUpRight className="w-4 h-4 text-[#009DFF]" />
          </Link>
        </motion.div>

        {/* ========================================================================= */}
        {/* 6 CREATOR CATEGORIES BENTO GRID */}
        {/* ========================================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CREATOR_CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;

            return (
              <motion.div key={cat.id} variants={itemVariants}>
                <Link
                  href="/#campaign-enquiry"
                  className={`group relative flex flex-col justify-between h-full rounded-3xl bg-white border border-slate-200/90 ${cat.borderAccent} shadow-[0_4px_24px_rgba(11,17,23,0.03)] hover:shadow-[0_16px_36px_rgba(0,200,255,0.12)] transition-all duration-300 p-6 sm:p-7 overflow-hidden hover:-translate-y-1 cursor-pointer block select-none`}
                >
                  {/* Subtle Top-Right Ambient Glow */}
                  <div
                    className={`pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${cat.gradient} blur-xl`}
                  />

                  <div className="space-y-4 relative z-10">
                    {/* Top Header: Icon + Stats Pills */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#EAF0F3] group-hover:bg-gradient-to-tr group-hover:from-[#00C8FF] group-hover:to-[#009DFF] text-[#0B1117] group-hover:text-[#05080D] flex items-center justify-center transition-all duration-300 shadow-xs">
                        <IconComponent className="w-6 h-6 transition-transform group-hover:scale-110" />
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${cat.badgeBg}`}>
                          {cat.creatorCount}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold">
                          {cat.reach}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5 pt-1">
                      <h3 className="font-anton text-2xl text-[#0B1117] group-hover:text-[#009DFF] transition-colors leading-tight">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#64717C] leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    {/* Tag Cloud */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-[#F3F6F8] border border-slate-200/80 text-slate-700 text-[10px] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <span className="text-xs font-bold text-slate-500 group-hover:text-[#009DFF] transition-colors flex items-center gap-1 uppercase tracking-wider text-[11px]">
                      <Users className="w-3.5 h-3.5 text-[#00C8FF]" /> Request {cat.slug} Shortlist
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#EAF0F3] group-hover:bg-[#00C8FF] text-[#0B1117] group-hover:text-[#05080D] flex items-center justify-center transition-all duration-200 shadow-xs">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ========================================================================= */}
        {/* BOTTOM QUICK CALLOUT BANNER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: DURATIONS.normal, ease: EASINGS.easeOutQuart }}
          className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-anton text-xl sm:text-2xl text-[#0B1117] uppercase leading-tight">
              Looking for a custom creator cohort for your brand?
            </div>
            <p className="text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed">
              We provide tailored district-level creator shortlists matched to your exact product niche, target language, and marketing budget.
            </p>
          </div>

          <Link
            href="/#campaign-enquiry"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00C8FF] to-[#009DFF] hover:from-[#33D4FF] hover:to-[#00C8FF] text-[#05080D] font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(0,200,255,0.35)] shrink-0 hover:scale-[1.02]"
          >
            <span>Request Creator Shortlist</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/components/animations/MotionTokens";
import { SectionBackground } from "@/components/motion/SectionBackground";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does VISTAR help brands connect with Marathi influencers?",
    answer:
      "We match your brand with vetted Marathi creators based on target demographics, district distribution, and verified engagement. Our team handles talent negotiation, briefing, and campaign delivery end-to-end.",
  },
  {
    question: "What support do creators get when working with VISTAR?",
    answer:
      "Creators receive clear campaign briefs, contract protection, timely guaranteed payments, and brand collaborations that genuinely align with their regional audience voice.",
  },
  {
    question: "How can I track and measure the performance of my campaigns?",
    answer:
      "Every campaign includes transparent reporting with verifiable impressions, regional reach, CTRs, and UTM conversion metrics with zero bot inflation.",
  },
  {
    question: "What industries and creator categories does VISTAR cover?",
    answer:
      "Our 200+ creator roster spans Agriculture, Tech & Auto, Regional Food, Lifestyle & Comedy, FinTech, and Marathi Infotainment across Maharashtra.",
  },
  {
    question: "How long does it take to launch an influencer marketing campaign?",
    answer:
      "Standard campaigns go live within 48 to 72 hours from brief sign-off to creator activation. Express turnaround is available for urgent product launches.",
  },
  {
    question: "Can we target specific districts or tier-2/tier-3 cities in Maharashtra?",
    answer:
      "Yes. We execute hyper-targeted campaigns across 35 districts including Pune, Mumbai, Nashik, Kolhapur, Sambhajinagar, and rural agricultural belts.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[#F8FAFC] relative overflow-hidden">
      <SectionBackground variant="grid" intensity="minimal" />

      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" distance={16} className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white border border-slate-200 text-[#0B1117] text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#00B8F0]" />
            <span>FAQ &bull; Clarifications</span>
          </div>
          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0B1117] uppercase tracking-tight leading-[1.02]">
            Frequently Asked{" "}
            <span className="text-[#00B8F0]">
              Questions.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Everything you need to know about partnering with VISTAR for regional creator campaigns.
          </p>
        </ScrollReveal>

        {/* Minimalist Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className={`rounded-xl border transition-all duration-150 bg-white ${
                  isOpen
                    ? "border-[#00B8F0]/40 shadow-xs"
                    : "border-slate-200/90 hover:border-slate-300 shadow-2xs"
                } overflow-hidden`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 select-none focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm sm:text-base font-semibold transition-colors ${
                      isOpen ? "text-[#007EA6]" : "text-slate-900 hover:text-[#007EA6]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border transition-all duration-150 ${
                      isOpen
                        ? "bg-[#00B8F0] text-[#05080D] border-[#00B8F0]"
                        : "bg-slate-50 text-slate-500 border-slate-200"
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: EASINGS.easeInOutCubic }}
                    >
                      <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100/80">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

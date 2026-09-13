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
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[#F3F6F8] relative overflow-hidden">
      <SectionBackground variant="grid" intensity="minimal" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" distance={16} className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#0B1117] text-xs font-bold uppercase tracking-wider shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#009DFF]" />
            <span>FAQ’s &bull; Direct Answers</span>
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009DFF] to-[#00C8FF]">
              Questions.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed">
            Everything you need to know about partnering with VISTAR for regional creator campaigns.
          </p>
        </ScrollReveal>

        {/* Minimalist Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className={`rounded-3xl border transition-all duration-200 bg-white ${
                  isOpen
                    ? "border-cyan-400 ring-2 ring-cyan-100 shadow-[0_8px_25px_rgba(0,200,255,0.08)]"
                    : "border-slate-200/90 hover:border-cyan-300 shadow-xs"
                } overflow-hidden`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none focus:outline-hidden cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-anton text-lg sm:text-xl uppercase tracking-wide transition-colors ${
                      isOpen ? "text-[#009DFF]" : "text-[#0B1117] hover:text-[#009DFF]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 ${
                      isOpen
                        ? "bg-[#00C8FF] text-[#05080D] border-[#00C8FF] rotate-180"
                        : "bg-[#EAF0F3] text-slate-500 border-slate-200"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: EASINGS.easeInOutCubic }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed border-t border-slate-100">
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

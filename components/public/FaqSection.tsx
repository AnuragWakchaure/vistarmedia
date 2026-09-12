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
      "We analyze your specific brand goals, industry niche, and geographic targets (from urban metros like Mumbai & Pune to rural farming clusters). Our team matches you with vetted regional creators who hold authenticated audience trust, negotiating rates, managing briefings, and overseeing execution end-to-end.",
  },
  {
    question: "What support do creators get when working with VISTAR?",
    answer:
      "VISTAR connects regional Marathi and vernacular storytellers with verified enterprise brands. We provide clear campaign briefs, contract security, guaranteed timely payments with zero hidden fees, and dedicated growth support so creators can focus on authentic content creation.",
  },
  {
    question: "How can I track and measure the performance of my campaigns?",
    answer:
      "Every campaign executed through VISTAR comes with comprehensive, transparent reporting. We provide verifiable analytics including verified impressions, regional reach, engagement rates, audience demographics, and click-through tracking to ensure measurable ROI.",
  },
  {
    question: "What industries and creator categories does VISTAR cover?",
    answer:
      "Our network of 200+ creators spans Agriculture & Rural Farming, Tech & Automobiles, Vernacular Marathi News & Infotainment, Food & Hospitality, Lifestyle & Fashion, Education, and Regional Entertainment across Maharashtra.",
  },
  {
    question: "How long does it take to launch an influencer marketing campaign?",
    answer:
      "From receiving your brief and shortlisting verified creators to script approvals and logistics, standard campaigns typically go live within 48 to 72 hours. Urgent launch turnarounds can be coordinated with our strategy team.",
  },
  {
    question: "Can we target specific districts or tier-2/tier-3 cities in Maharashtra?",
    answer:
      "Yes! Our creators are located across 13+ districts including Pune, Mumbai, Nashik, Ahilyanagar, Kolhapur, Chhatrapati Sambhajinagar, Nagpur, and Satara, allowing for hyper-targeted regional dialect and cultural alignment.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#FCECDF] border-t-2 border-stone-200/60 relative overflow-hidden">
      <SectionBackground variant="grid" intensity="minimal" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" distance={16} className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#B80F0A]" />
            FAQ’s &bull; Quick Answers
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-[#111111] uppercase tracking-tight">
            Have Any Doubt ? We Got You
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 font-medium max-w-lg mx-auto leading-relaxed">
            Everything you need to know about partnering with VISTAR for regional creator campaigns.
          </p>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`rounded-2xl sm:rounded-3xl border-2 transition-all duration-200 bg-white ${
                  isOpen
                    ? "border-[#B80F0A] shadow-nickpat-lg"
                    : "border-stone-200/90 shadow-nickpat hover:border-[#B80F0A]/50"
                } overflow-hidden`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-anton text-lg sm:text-xl uppercase tracking-wide transition-colors ${
                      isOpen ? "text-[#B80F0A]" : "text-[#111111]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                      isOpen
                        ? "bg-[#B80F0A] text-white border-[#960C08] rotate-180"
                        : "bg-stone-100 text-stone-700 border-stone-200"
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
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 font-medium leading-relaxed border-t border-stone-100">
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

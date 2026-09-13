"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote, CheckCircle2, Star } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASINGS } from "@/components/animations/MotionTokens";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export interface TestimonialItem {
  _id?: string;
  personName: string;
  designation: string;
  company: string;
  photo?: string;
  testimonial: string;
  featured?: boolean;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    personName: "Anand Deshmukh",
    designation: "Marketing Head",
    company: "Mahindra Tractors",
    photo: "/images/brands/mahindra-tractors.png",
    testimonial:
      "VISTAR transformed our tractor and agricultural machinery campaigns into high-impact Marathi creator stories, delivering a 3.4x surge in direct dealer inquiries across rural Maharashtra.",
    featured: true,
  },
  {
    personName: "Priyanka Kadam",
    designation: "Brand Lead",
    company: "Sahyadri Natural Foods",
    photo: "/images/testimonials/testimonial-2.webp",
    testimonial:
      "Vernacular storytelling brought authentic local trust that generic agencies couldn't replicate. Generated immediate consumer adoption across Western Maharashtra.",
    featured: true,
  },
  {
    personName: "Naukrivalaa (Rohan Patil)",
    designation: "Creator (670K+ Followers)",
    company: "Educational Vernacular Channel",
    photo: "/images/testimonials/testimonial-3.webp",
    testimonial:
      "Seamless creator workflow with clear briefs, transparent pricing, timely payments, and brand partnerships that genuinely respect Marathi audiences.",
    featured: true,
  },
];

export default function TestimonialsSection({
  testimonials = [],
}: {
  testimonials?: TestimonialItem[];
}) {
  const shouldReduceMotion = useReducedMotion();
  const rawItems = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;
  const displayItems = rawItems.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = displayItems.length;
  const goToIndex = (index: number) => {
    setActiveIndex(index % total);
  };

  const featured = displayItems[activeIndex] || displayItems[0];
  const supporting1Index = (activeIndex + 1) % total;
  const supporting2Index = (activeIndex + 2) % total;
  const supporting1 = displayItems[supporting1Index];
  const supporting2 = displayItems[supporting2Index];

  // Motion variants for crossfade transitions
  const transitionVariants = {
    initial: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 8,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.35,
        ease: EASINGS.easeOutQuart,
      },
    },
    exit: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : -8,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
        ease: EASINGS.easeOutQuart,
      },
    },
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#F3F6F8] scroll-mt-28 py-20 sm:py-24"
    >
      <div className="px-4 sm:px-6 max-w-6xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <ScrollReveal direction="up" distance={16} className="text-center space-y-3.5 max-w-2xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE4E9] shadow-xs text-[#0B1117] text-xs font-mono font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]" />
            <span>CLIENT VOICES</span>
          </div>

          {/* Main Editorial Heading */}
          <h2 className="font-anton text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B1117] uppercase tracking-tight leading-[1.02]">
            Real Partnerships.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009DFF] via-[#00C8FF] to-[#0A84FF]">
              Real Experiences.
            </span>
          </h2>

          {/* Supporting Line */}
          <p className="text-xs sm:text-sm md:text-base text-[#64717C] font-normal max-w-xl mx-auto leading-relaxed">
            Genuine experiences from brand leaders and regional creators collaborating with VISTAR across Maharashtra.
          </p>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* MAIN FEATURED TESTIMONIAL (Large Horizontal Composition) */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-white border border-[#DCE4E9] p-7 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(11,17,23,0.03)] relative overflow-hidden">
          {/* Top Metadata Bar */}
          <div className="flex items-center justify-between border-b border-[#DCE4E9] pb-5 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#009DFF] uppercase">
                {String(activeIndex + 1).padStart(2, "0")} / FEATURED TESTIMONIAL
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#64717C] bg-[#F3F6F8] px-3 py-1 rounded-full border border-[#DCE4E9]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00C8FF]" />
              <span className="uppercase tracking-wider">Verified Regional Partner</span>
            </div>
          </div>

          {/* Two-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Quotation & Client Details */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Subtle, Elegant Quotation Mark */}
                <Quote className="w-9 h-9 sm:w-11 sm:h-11 text-[#00C8FF]/30 fill-[#00C8FF]/10 shrink-0" />

                {/* Animated Testimonial Text */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`quote-${activeIndex}`}
                    variants={transitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <p className="text-lg sm:text-xl md:text-2xl text-[#0B1117] font-medium leading-relaxed tracking-normal">
                      &ldquo;{featured.testimonial}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Divider Line */}
              <div className="w-full h-px bg-[#DCE4E9]" />

              {/* Animated Client Information */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`client-${activeIndex}`}
                  variants={transitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-base sm:text-lg text-[#0B1117] font-sans">
                      {featured.personName}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64717C] font-normal">
                      {featured.designation}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-xs sm:text-sm font-bold text-[#0B1117] font-sans">
                      {featured.company}
                    </div>
                    <div className="text-[11px] font-mono text-[#009DFF] uppercase tracking-wider">
                      REGIONAL CAMPAIGN
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Genuine Partner / Campaign Visual Frame */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`img-${activeIndex}`}
                  variants={transitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative h-64 sm:h-72 lg:h-80 w-full rounded-2xl overflow-hidden border border-[#DCE4E9] bg-[#F3F6F8] group"
                >
                  {featured.photo ? (
                    featured.photo.includes("/brands/") || featured.photo.endsWith(".png") ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-white p-6 sm:p-10 relative">
                        <div className="relative w-4/5 h-3/5 max-w-[260px] max-h-[130px] transition-transform duration-500 group-hover:scale-105">
                          <Image
                            src={featured.photo}
                            alt={`${featured.company} logo`}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            priority={activeIndex === 0}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={featured.photo}
                        alt={`${featured.personName} - ${featured.company}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority={activeIndex === 0}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F6F8] to-slate-200 text-[#0B1117] p-6 text-center">
                      <span className="font-anton text-4xl text-[#009DFF]">
                        {featured.personName.charAt(0)}
                      </span>
                      <span className="text-xs font-bold mt-2 text-[#0B1117]">
                        {featured.company}
                      </span>
                    </div>
                  )}

                  {/* Gradient Card Overlay with Company Tag */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1117]/85 via-transparent to-transparent flex items-end justify-between p-4 sm:p-5 pointer-events-none">
                    <div>
                      <div className="text-[10px] font-mono font-bold text-[#00C8FF] uppercase tracking-widest">
                        PARTNER SPOTLIGHT
                      </div>
                      <div className="text-white text-xs sm:text-sm font-bold truncate">
                        {featured.company}
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#00C8FF] text-[#00C8FF]" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUPPORTING TESTIMONIALS (Only 2 Smaller Cards) */}
        {/* ========================================================================= */}
        {total > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Supporting Card 1 */}
            <div
              onClick={() => goToIndex(supporting1Index)}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DCE4E9] hover:border-[#00C8FF]/60 shadow-[0_2px_12px_rgba(11,17,23,0.02)] hover:shadow-[0_8px_24px_rgba(0,200,255,0.08)] transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer select-none"
              role="button"
              tabIndex={0}
              aria-label={`View testimonial from ${supporting1.personName}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  goToIndex(supporting1Index);
                }
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#64717C] group-hover:text-[#009DFF] transition-colors uppercase">
                    {String(supporting1Index + 1).padStart(2, "0")} / CLIENT VOICE
                  </span>
                  <Quote className="w-4 h-4 text-[#00C8FF]/40 fill-[#00C8FF]/10" />
                </div>

                <p className="text-xs sm:text-[13px] text-[#0B1117] font-normal leading-relaxed line-clamp-3">
                  &ldquo;{supporting1.testimonial}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#DCE4E9] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {supporting1.photo ? (
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#DCE4E9] bg-white shrink-0">
                      <Image
                        src={supporting1.photo}
                        alt={supporting1.personName}
                        fill
                        sizes="36px"
                        loading="lazy"
                        className={supporting1.photo.includes("/brands/") || supporting1.photo.endsWith(".png") ? "object-contain p-1" : "object-cover"}
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#F3F6F8] text-[#009DFF] font-bold text-xs flex items-center justify-center border border-[#DCE4E9] shrink-0">
                      {supporting1.personName.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-[#0B1117] group-hover:text-[#009DFF] transition-colors truncate">
                      {supporting1.personName}
                    </h4>
                    <p className="text-[11px] text-[#64717C] truncate">
                      {supporting1.designation} &bull; <span className="font-semibold text-[#0B1117]">{supporting1.company}</span>
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-[#64717C] group-hover:text-[#00C8FF] transition-colors uppercase shrink-0">
                  Select &rarr;
                </span>
              </div>
            </div>

            {/* Supporting Card 2 */}
            <div
              onClick={() => goToIndex(supporting2Index)}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DCE4E9] hover:border-[#00C8FF]/60 shadow-[0_2px_12px_rgba(11,17,23,0.02)] hover:shadow-[0_8px_24px_rgba(0,200,255,0.08)] transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer select-none"
              role="button"
              tabIndex={0}
              aria-label={`View testimonial from ${supporting2.personName}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  goToIndex(supporting2Index);
                }
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#64717C] group-hover:text-[#009DFF] transition-colors uppercase">
                    {String(supporting2Index + 1).padStart(2, "0")} / CLIENT VOICE
                  </span>
                  <Quote className="w-4 h-4 text-[#00C8FF]/40 fill-[#00C8FF]/10" />
                </div>

                <p className="text-xs sm:text-[13px] text-[#0B1117] font-normal leading-relaxed line-clamp-3">
                  &ldquo;{supporting2.testimonial}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#DCE4E9] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {supporting2.photo ? (
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#DCE4E9] bg-white shrink-0">
                      <Image
                        src={supporting2.photo}
                        alt={supporting2.personName}
                        fill
                        sizes="36px"
                        loading="lazy"
                        className={supporting2.photo.includes("/brands/") || supporting2.photo.endsWith(".png") ? "object-contain p-1" : "object-cover"}
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#F3F6F8] text-[#009DFF] font-bold text-xs flex items-center justify-center border border-[#DCE4E9] shrink-0">
                      {supporting2.personName.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-[#0B1117] group-hover:text-[#009DFF] transition-colors truncate">
                      {supporting2.personName}
                    </h4>
                    <p className="text-[11px] text-[#64717C] truncate">
                      {supporting2.designation} &bull; <span className="font-semibold text-[#0B1117]">{supporting2.company}</span>
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-[#64717C] group-hover:text-[#00C8FF] transition-colors uppercase shrink-0">
                  Select &rarr;
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

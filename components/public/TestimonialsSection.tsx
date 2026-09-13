"use client";

import React from "react";
import { Quote, Star, CheckCircle2 } from "lucide-react";
import { useReducedMotion } from "framer-motion";
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
    company: "MahaAgro Tech Solutions",
    photo: "/images/testimonials/testimonial-1.webp",
    testimonial:
      "VISTAR transformed our agri-tech machinery into relatable Marathi reels, delivering a 3.4x surge in direct dealer enquiries across Nashik and Vidarbha.",
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
  {
    personName: "Vikram Gaikwad",
    designation: "Growth VP",
    company: "FinMarathi Digital",
    photo: "/images/testimonials/testimonial-4.webp",
    testimonial:
      "Data-driven regional influencer campaigns with measurable ROI and verified community reach across Tier-2 Maharashtra towns.",
    featured: false,
  },
  {
    personName: "Snehal Shinde",
    designation: "Head of Digital",
    company: "Deccan Lifestyle Brands",
    photo: "/images/testimonials/testimonial-5.webp",
    testimonial:
      "Unlocked top-tier regional creators from Pune to Kolhapur. Our launch campaign hit 2.8M verified impressions in just 10 days.",
    featured: true,
  },
  {
    personName: "Rajesh Kulkarni",
    designation: "Regional Director",
    company: "Swaraj Tractors & Machinery",
    photo: "/images/testimonials/testimonial-6.webp",
    testimonial:
      "Deep cultural respect and vernacular nuance gave our machinery brand undisputed authenticity across Maharashtra's farming heartlands.",
    featured: true,
  },
];

function LightTestimonialCard({
  item,
  idx,
  shouldReduceMotion,
}: {
  item: TestimonialItem;
  idx: number;
  shouldReduceMotion: boolean | null;
}) {
  const rotationDegrees = idx % 4 === 0 ? -0.8 : idx % 4 === 1 ? 0.6 : idx % 4 === 2 ? -0.6 : 0.8;

  return (
    <div
      style={{
        transform: shouldReduceMotion ? "none" : `rotate(${rotationDegrees}deg)`,
      }}
      className="w-[300px] sm:w-[340px] md:w-[360px] shrink-0 p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-[#00C8FF]/60 shadow-[0_4px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_36px_rgba(0,200,255,0.1)] transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer select-none"
    >
      {/* Top Header: Avatar + Author Info + Star Rating */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {item.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.photo}
              alt={item.personName}
              width={44}
              height={44}
              loading="lazy"
              decoding="async"
              className="w-11 h-11 rounded-full object-cover border-2 border-cyan-100 shadow-xs shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-cyan-50 text-[#009DFF] font-anton text-sm flex items-center justify-center border border-cyan-200 shrink-0">
              {item.personName.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-bold text-sm text-[#07111A] group-hover:text-[#009DFF] transition-colors truncate">
              {item.personName}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium truncate">
              {item.designation} &bull; <span className="text-slate-800 font-semibold">{item.company}</span>
            </p>
          </div>
        </div>

        {/* 5-Stars Strip */}
        <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#00C8FF] text-[#00C8FF]" />
          ))}
        </div>
      </div>

      {/* Testimonial Quote */}
      <p className="text-xs sm:text-[13px] text-slate-700 font-normal leading-relaxed italic line-clamp-3">
        &ldquo;{item.testimonial}&rdquo;
      </p>

      {/* Bottom Verified Badge & Cyan Quote Detail */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#009DFF] bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
          <CheckCircle2 className="w-3 h-3 text-[#00C8FF]" />
          <span>Verified Regional Partner</span>
        </span>
        <Quote className="w-4 h-4 text-[#00C8FF]/40 fill-[#00C8FF]/20" />
      </div>
    </div>
  );
}

export default function TestimonialsSection({
  testimonials = [],
}: {
  testimonials?: TestimonialItem[];
}) {
  const shouldReduceMotion = useReducedMotion();
  const displayItems = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  // Split into two rotating marquee rows
  const midPoint = Math.ceil(displayItems.length / 2);
  const row1Base = displayItems.slice(0, midPoint);
  const row2Base = displayItems.slice(midPoint);

  // 2x minimum cloning for seamless 50% CSS marquee loop
  const row1 = [...row1Base, ...row1Base];
  const row2 = [...(row2Base.length > 0 ? row2Base : row1Base), ...(row2Base.length > 0 ? row2Base : row1Base)];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#F3F6F8] scroll-mt-28 py-20 sm:py-24">
      <div className="px-4 sm:px-6 max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={16} className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-[#0B1117] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#00C8FF]" />
            <span>Client Trust & Partner Reviews</span>
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-[#0B1117] uppercase tracking-tight leading-[0.98]">
            What Our Clients & Creators{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009DFF] to-[#00C8FF]">
              Say About Us.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64717C] font-normal leading-relaxed">
            Real feedback from high-growth brands and leading Marathi influencers executing campaigns with VISTAR.
          </p>
        </ScrollReveal>

        {/* Steady Layout when less than 4 items or reduced motion */}
        {displayItems.length < 4 || shouldReduceMotion ? (
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {displayItems.map((item, idx) => (
              <LightTestimonialCard
                key={item._id || idx}
                item={item}
                idx={idx}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        ) : (
          /* Rotating Infinite Marquee Container */
          <div className="space-y-6 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)] py-2">
            {/* Row 1: Rotating to the Left */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee flex gap-6 pr-6">
                {row1.map((item, idx) => (
                  <LightTestimonialCard
                    key={`t1-${item._id || idx}-${idx}`}
                    item={item}
                    idx={idx}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </div>
            </div>

            {/* Row 2: Rotating to the Right */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-reverse flex gap-6 pr-6">
                {row2.map((item, idx) => (
                  <LightTestimonialCard
                    key={`t2-${item._id || idx}-${idx}`}
                    item={item}
                    idx={idx + 2}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

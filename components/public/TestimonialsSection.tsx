"use client";

import { Quote, Star, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import { SectionBackground } from "@/components/motion/SectionBackground";
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
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    testimonial:
      "VISTAR helped us connect with the right Marathi creators across Nashik and Vidarbha. Transforming complex agri-tech machinery into relatable regional reels resulted in a 3.4x spike in direct dealer enquiries.",
    featured: true,
  },
  {
    personName: "Priyanka Kadam",
    designation: "Brand Lead",
    company: "Sahyadri Natural Foods",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    testimonial:
      "Partnering with VISTAR transformed how we launched our packaged foods. Their expertise in vernacular storytelling brought authentic local trust that generic Mumbai agencies simply couldn't replicate.",
    featured: true,
  },
  {
    personName: "Naukrivalaa (Rohan Patil)",
    designation: "Creator (670K+ Followers)",
    company: "Educational Vernacular Channel",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    testimonial:
      "Working with VISTAR has been seamless for me as a creator. Clear campaign briefs, transparent pricing, timely payments, and brand partnerships that genuinely align with my audience's Marathi voice.",
    featured: true,
  },
  {
    personName: "Vikram Gaikwad",
    designation: "Growth VP",
    company: "FinMarathi Digital",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    testimonial:
      "Their data-driven approach to regional influencer campaigns gave us measurable ROI and authentic community reach across Tier-2 and Tier-3 Maharashtra towns. Truly unmatched execution.",
    featured: false,
  },
  {
    personName: "Snehal Shinde",
    designation: "Head of Digital",
    company: "Deccan Lifestyle Brands",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    testimonial:
      "From Pune to Kolhapur, VISTAR unlocked creators we had no prior access to. Our regional launch campaign hit 2.8M impressions in just 10 days.",
    featured: true,
  },
  {
    personName: "Rajesh Kulkarni",
    designation: "Regional Director",
    company: "Swaraj Tractors & Machinery",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    testimonial:
      "Rural marketing requires deep cultural respect and vernacular nuance. VISTAR's creator partnerships gave our brand undisputed authenticity among farmers.",
    featured: true,
  },
];

function CompactTestimonialCard({
  item,
  idx,
  shouldReduceMotion,
}: {
  item: TestimonialItem;
  idx: number;
  shouldReduceMotion: boolean | null;
}) {
  // Playful subtle alternating rotation
  const rotationDegrees = idx % 4 === 0 ? -1.0 : idx % 4 === 1 ? 0.8 : idx % 4 === 2 ? -0.8 : 1.0;

  return (
    <div
      style={{
        transform: shouldReduceMotion ? "none" : `rotate(${rotationDegrees}deg)`,
      }}
      className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 p-5 sm:p-6 rounded-2xl bg-white border-2 border-stone-200/90 hover:border-[#111111] shadow-nickpat transition-colors duration-200 flex flex-col justify-between space-y-4 group cursor-pointer select-none"
    >
      {/* Top Header: Avatar + Author Info + Star Rating */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {item.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.photo}
              alt={item.personName}
              className="w-10 h-10 rounded-full object-cover border border-[#B80F0A]/30 shadow-xs shrink-0"
              loading="lazy"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#FBCB77] text-[#111111] font-anton text-sm flex items-center justify-center border border-[#111111] shrink-0">
              {item.personName.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-bold text-sm text-[#111111] group-hover:text-[#B80F0A] transition-colors truncate">
              {item.personName}
            </h4>
            <p className="text-[11px] text-stone-500 font-medium truncate">
              {item.designation} &bull; <span className="text-stone-700 font-bold">{item.company}</span>
            </p>
          </div>
        </div>

        {/* 5-Stars Minimalist Strip */}
        <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#FBCB77] text-[#FBCB77]" />
          ))}
        </div>
      </div>

      {/* Testimonial Quote */}
      <p className="text-xs sm:text-[13px] text-stone-700 font-medium leading-relaxed italic line-clamp-3">
        "{item.testimonial}"
      </p>

      {/* Bottom Verified Badge */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#B80F0A] bg-[#FCECDF] px-2 py-0.5 rounded-full border border-stone-200">
          <CheckCircle2 className="w-3 h-3 text-[#B80F0A]" />
          <span>Verified Partner</span>
        </span>
        <Quote className="w-3.5 h-3.5 text-stone-300 fill-stone-300" />
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

  const repeatCount = 4;
  const row1 = Array(repeatCount).fill(row1Base).flat();
  const row2 = Array(repeatCount).fill(row2Base.length > 0 ? row2Base : row1Base).flat();

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[#FCECDF] border-t-2 border-stone-200/60 relative overflow-hidden">
      <SectionBackground variant="aurora" />

      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        {/* Editorial Section Header */}
        <ScrollReveal direction="up" distance={16} className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#B80F0A] animate-pulse" />
            People Loves Us
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-[#111111] uppercase tracking-tight leading-[0.98]">
            Here Is What Our Clients & Creators Say About Us..
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
            Real feedback from high-growth brands and leading Marathi influencers executing campaigns with VISTAR.
          </p>
        </ScrollReveal>

        {/* Reduced Motion fallback */}
        {shouldReduceMotion ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {displayItems.slice(0, 6).map((item, idx) => (
              <CompactTestimonialCard
                key={item._id || idx}
                item={item}
                idx={idx}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        ) : (
          /* Rotating Infinite Marquee Container */
          <div className="space-y-5 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)] py-2">
            {/* Row 1: Rotating to the Left */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee flex gap-5 sm:gap-6 pr-6">
                {row1.map((item, idx) => (
                  <CompactTestimonialCard
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
              <div className="animate-marquee-reverse flex gap-5 sm:gap-6 pr-6">
                {row2.map((item, idx) => (
                  <CompactTestimonialCard
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

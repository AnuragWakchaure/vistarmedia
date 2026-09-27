"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, BadgeCheck } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { formatFollowers } from "@/lib/utils";

interface CreatorItem {
  _id: string;
  name: string;
  slug?: string;
  profileImage: string;
  bio?: string;
  location: string;
  categories?: string[];
  totalFollowers: number;
  featured?: boolean;
}

interface CreatorMarqueeGridProps {
  creators: CreatorItem[];
}

function CreatorCard({ creator }: { creator: CreatorItem }) {
  return (
    <div className="w-[280px] sm:w-[320px] shrink-0 p-5 rounded-xl bg-white border border-slate-200/90 hover:border-[#00B8F0]/40 shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between group select-none cursor-pointer">
      <div className="space-y-3.5">
        {/* Top Header Row: Category Badge & Location */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#00B8F0]/10 text-[#0088B8] border border-[#00B8F0]/20">
            {creator.categories?.[0] || "Exclusive Creator"}
          </span>
          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#00B8F0]" />
            {creator.location}
          </span>
        </div>

        {/* Creator Info: Avatar + Name */}
        <div className="flex items-center gap-3.5 pt-0.5">
          <div className="relative shrink-0 w-13 h-13 sm:w-14 sm:h-14">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={creator.profileImage}
              alt={creator.name}
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-slate-100 shadow-2xs"
            />
            {creator.featured && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[#00B8F0] text-[#05080D] flex items-center justify-center shadow-2xs" title="Verified Creator">
                <BadgeCheck className="w-3 h-3 text-[#05080D]" />
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-anton text-lg sm:text-xl text-[#0B1117] group-hover:text-[#0088B8] transition-colors truncate">
              {creator.name}
            </h3>
            <p className="text-xs text-slate-500 font-normal line-clamp-1 mt-0.5">
              {creator.bio || "Maharashtra Regional Creator"}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Reach Badge & Direct CTA */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-400 block leading-none">
            Verified Reach
          </span>
          <span className="font-anton text-lg text-[#00B8F0] tracking-tight">
            {formatFollowers(creator.totalFollowers || 0)}
          </span>
        </div>

        <Link
          href="/#campaign-enquiry"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 group-hover:bg-[#00B8F0] text-slate-800 group-hover:text-[#05080D] text-xs font-semibold uppercase tracking-wider transition-all duration-150 border border-slate-200 group-hover:border-[#00B8F0]"
        >
          <span>Book</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default function CreatorMarqueeGrid({ creators }: CreatorMarqueeGridProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!creators || creators.length === 0) {
    return null;
  }

  // Split creators into two distinct rows for alternating motion
  const midPoint = Math.ceil(creators.length / 2);
  const row1Base = creators.slice(0, midPoint);
  const row2Base = creators.slice(midPoint);

  // Replicate rows 2x (exact mathematical minimum for CSS -50% infinite translation loop)
  const row1 = [...row1Base, ...row1Base];
  const row2 = [...(row2Base.length > 0 ? row2Base : row1Base), ...(row2Base.length > 0 ? row2Base : row1Base)];

  // If there are less than 4 creators or user prefers reduced motion: show steady static cards
  if (creators.length < 4 || shouldReduceMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {creators.map((c) => (
          <CreatorCard key={c._id} creator={c} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)] py-4">
      {/* Row 1: Scrolling to the Left */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex gap-6 pr-6">
          {row1.map((creator, idx) => (
            <CreatorCard key={`r1-${creator._id}-${idx}`} creator={creator} />
          ))}
        </div>
      </div>

      {/* Row 2: Scrolling to the Right */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-reverse flex gap-6 pr-6">
          {row2.map((creator, idx) => (
            <CreatorCard key={`r2-${creator._id}-${idx}`} creator={creator} />
          ))}
        </div>
      </div>
    </div>
  );
}

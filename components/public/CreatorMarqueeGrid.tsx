"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, BadgeCheck, Users } from "lucide-react";
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

function CreatorCard({ creator, idx }: { creator: CreatorItem; idx: number }) {
  return (
    <div className="w-[300px] sm:w-[340px] shrink-0 p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-cyan-400 shadow-[0_4px_24px_rgba(11,17,23,0.03)] hover:shadow-[0_16px_36px_rgba(0,200,255,0.12)] transition-all duration-200 flex flex-col justify-between group select-none cursor-pointer">
      <div className="space-y-4">
        {/* Top Header Row: Category Badge & Location */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-50 text-[#009DFF] border border-cyan-100">
            {creator.categories?.[0] || "Exclusive Creator"}
          </span>
          <span className="text-[11px] text-[#64717C] font-semibold flex items-center gap-1 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#009DFF]" />
            {creator.location}
          </span>
        </div>

        {/* Creator Info: Avatar + Name */}
        <div className="flex items-center gap-4 pt-1">
          <div className="relative shrink-0">
            <img
              src={creator.profileImage}
              alt={creator.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-cyan-100 shadow-xs"
            />
            {creator.featured && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00C8FF] text-[#05080D] flex items-center justify-center shadow-xs" title="Verified Creator">
                <BadgeCheck className="w-3.5 h-3.5 text-[#05080D]" />
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-anton text-xl sm:text-2xl text-[#0B1117] group-hover:text-[#009DFF] transition-colors truncate">
              {creator.name}
            </h3>
            <p className="text-xs text-[#64717C] font-medium line-clamp-1 mt-0.5">
              {creator.bio || "Maharashtra Regional Creator"}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Reach Badge & Direct CTA */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">
            Verified Reach
          </span>
          <span className="font-anton text-xl text-[#00C8FF] tracking-tight">
            {formatFollowers(creator.totalFollowers || 0)}
          </span>
        </div>

        <Link
          href="/#campaign-enquiry"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#EAF0F3] group-hover:bg-gradient-to-r group-hover:from-[#00C8FF] group-hover:to-[#009DFF] text-[#0B1117] group-hover:text-[#05080D] text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-slate-200 group-hover:border-cyan-300 shadow-xs"
        >
          <span>Book</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

  // Replicate rows to ensure seamless continuous infinite marquee loop
  const repeatCount = 4;
  const row1 = Array(repeatCount).fill(row1Base).flat();
  const row2 = Array(repeatCount).fill(row2Base.length > 0 ? row2Base : row1Base).flat();

  // If there are less than 4 creators or user prefers reduced motion: show steady static cards
  if (creators.length < 4 || shouldReduceMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {creators.map((c, idx) => (
          <CreatorCard key={`${c._id}-${idx}`} creator={c} idx={idx} />
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
            <CreatorCard key={`r1-${creator._id}-${idx}`} creator={creator} idx={idx} />
          ))}
        </div>
      </div>

      {/* Row 2: Scrolling to the Right */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-reverse flex gap-6 pr-6">
          {row2.map((creator, idx) => (
            <CreatorCard key={`r2-${creator._id}-${idx}`} creator={creator} idx={idx + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles, Star } from "lucide-react";
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
  const isGoldAccent = idx % 2 === 1;

  return (
    <div className="w-[300px] sm:w-[340px] shrink-0 p-6 rounded-3xl bg-white border-2 border-stone-200/90 hover:border-[#B80F0A] shadow-nickpat hover:shadow-nickpat-lg transition-colors duration-200 flex flex-col justify-between group select-none cursor-pointer">
      <div className="space-y-4">
        {/* Top Header Row: Category Badge & Location */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
              isGoldAccent
                ? "bg-[#FBCB77] text-[#111111] border-[#111111]"
                : "bg-white text-[#B80F0A] border-dashed border-[#B80F0A]"
            }`}
          >
            {creator.categories?.[0] || "Exclusive Creator"}
          </span>
          <span className="text-[11px] text-stone-600 font-semibold flex items-center gap-1 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#B80F0A]" />
            {creator.location}
          </span>
        </div>

        {/* Creator Info: Avatar + Name */}
        <div className="flex items-center gap-4 pt-1">
          <div className="relative shrink-0">
            <img
              src={creator.profileImage}
              alt={creator.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#B80F0A] shadow-sm"
            />
            {creator.featured && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#B80F0A] text-white flex items-center justify-center shadow-xs">
                <Star className="w-3 h-3 fill-[#FBCB77] text-[#FBCB77]" />
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-anton text-xl sm:text-2xl text-[#111111] group-hover:text-[#B80F0A] transition-colors truncate">
              {creator.name}
            </h3>
            <p className="text-xs text-stone-500 font-medium line-clamp-1 mt-0.5">
              {creator.bio || "Maharashtra Regional Creator"}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Reach Badge & Direct CTA */}
      <div className="mt-6 pt-4 border-t-2 border-stone-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-stone-400 block leading-none">
            Verified Reach
          </span>
          <span className="font-anton text-xl text-[#B80F0A] tracking-tight">
            {formatFollowers(creator.totalFollowers || 0)}
          </span>
        </div>

        <Link
          href="/#campaign-enquiry"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#111111] group-hover:bg-[#B80F0A] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
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

  // Reduced motion: show clean static grid
  if (shouldReduceMotion) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.slice(0, 6).map((c, idx) => (
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

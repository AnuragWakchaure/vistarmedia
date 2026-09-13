"use client";

import React from "react";

export interface BrandItem {
  _id?: string;
  name: string;
  logo: string;
  website?: string;
  status?: string;
  displayOrder?: number;
}

const DEFAULT_BRANDS: BrandItem[] = [
  {
    name: "Mahindra Tractors",
    logo: "/images/brands/mahindra-tractors.png",
  },
  {
    name: "TVS Motors",
    logo: "/images/brands/tvs-motors.png",
  },
  {
    name: "Siddhant Seeds",
    logo: "/images/brands/siddhant-seeds.png",
  },
];

interface BrandMarqueeProps {
  brands?: BrandItem[];
}

export default function BrandMarquee({ brands }: BrandMarqueeProps) {
  // Use DB brands if provided and active, otherwise fallback to curated real top brand list
  const activeBrands = brands && brands.length > 0 ? brands : DEFAULT_BRANDS;
  // Double list for continuous seamless marquee loop
  const marqueeList = [...activeBrands, ...activeBrands, ...activeBrands];

  return (
    <section className="relative overflow-hidden select-none bg-[#F3F6F8] py-8 sm:py-10">
      <div className="px-4 sm:px-6 max-w-6xl mx-auto space-y-4 relative z-10">
        {/* Section Sub-heading Header: Trusted by top brands */}
        <div className="flex items-center justify-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]" />
          <p className="text-xs sm:text-[13px] font-bold tracking-widest text-[#0B1117] uppercase font-sans">
            Trusted By Industry-Leading Brands
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]" />
        </div>

        {/* Ticker Capsule Container */}
        <div className="relative rounded-[32px] bg-white border border-slate-200/90 shadow-[0_4px_24px_rgba(11,17,23,0.04)] py-4 sm:py-5 px-4 sm:px-6 overflow-hidden">
          {/* Steady Layout for our verified partner brands */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {activeBrands.map((brand, idx) => (
              <div
                key={`${brand._id || brand.name}-${idx}`}
                className="inline-flex items-center gap-3.5 px-6 py-3 rounded-2xl bg-[#EAF0F3] border border-slate-200/80 hover:border-[#00C8FF]/50 shadow-xs shrink-0 select-none cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {brand.logo && (
                  <div className="flex items-center justify-center h-8 sm:h-9 shrink-0 bg-white rounded-xl px-2.5 py-1 border border-slate-100 shadow-xs">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={120}
                      height={36}
                      loading="lazy"
                      decoding="async"
                      className="h-6 sm:h-7 max-h-7 w-auto max-w-[100px] sm:max-w-[120px] object-contain shrink-0"
                    />
                  </div>
                )}
                <span className="text-xs sm:text-sm font-bold text-[#0B1117] tracking-tight font-sans whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

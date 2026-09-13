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
    name: "Government of Maharashtra",
    logo: "/images/brands/gov-maharashtra.png",
  },
  {
    name: "Government of India",
    logo: "/images/brands/gov-india.png",
  },
  {
    name: "Mahindra Tractors",
    logo: "/images/brands/mahindra.png",
  },
  {
    name: "Tata Motors",
    logo: "/images/brands/tata.png",
  },
  {
    name: "Sahyadri Farms",
    logo: "/images/brands/sahyadri-farms.png",
  },
  {
    name: "FinMarathi",
    logo: "/images/brands/finmarathi.png",
  },
  {
    name: "TVS Motors",
    logo: "/images/brands/tvs-motors.png",
  },
];

interface BrandMarqueeProps {
  brands?: BrandItem[];
}

export default function BrandMarquee({ brands }: BrandMarqueeProps) {
  // Use DB brands if provided and active, otherwise fallback to curated real top brand list
  const activeBrands = brands && brands.length > 0 ? brands : DEFAULT_BRANDS;
  // Double list for continuous seamless marquee loop
  const marqueeList = [...activeBrands, ...activeBrands];

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
          {/* Edge Gradient Fade Masks */}
          {activeBrands.length >= 4 && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />
            </>
          )}

          {activeBrands.length < 4 ? (
            /* Steady Layout for less than 4 brands */
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {activeBrands.map((brand, idx) => (
                <div
                  key={`${brand._id || brand.name}-${idx}`}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#EAF0F3] border border-slate-200/80 hover:border-[#00C8FF]/50 shadow-xs shrink-0 select-none cursor-default transition-all duration-200 hover:-translate-y-0.5"
                >
                  {brand.logo && (
                    <div className="flex items-center justify-center h-6 shrink-0 bg-white rounded-lg px-2 py-0.5 border border-slate-100 shadow-xs">
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className="h-4 sm:h-5 max-h-5 w-auto max-w-[70px] sm:max-w-[80px] object-contain shrink-0"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <span className="text-xs sm:text-[13px] font-bold text-[#0B1117] tracking-tight font-sans whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* Continuous Infinite Marquee Track */
            <div className="animate-marquee flex items-center gap-4 sm:gap-6">
              {marqueeList.map((brand, idx) => (
                <div
                  key={`${brand._id || brand.name}-${idx}`}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#EAF0F3] border border-slate-200/80 hover:border-[#00C8FF]/50 shadow-xs shrink-0 select-none cursor-default transition-all duration-200 hover:-translate-y-0.5"
                >
                  {/* Brand Logo / Icon */}
                  {brand.logo && (
                    <div className="flex items-center justify-center h-6 shrink-0 bg-white rounded-lg px-2 py-0.5 border border-slate-100 shadow-xs">
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className="h-4 sm:h-5 max-h-5 w-auto max-w-[70px] sm:max-w-[80px] object-contain shrink-0"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Brand Name Text */}
                  <span className="text-xs sm:text-[13px] font-bold text-[#0B1117] tracking-tight font-sans whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

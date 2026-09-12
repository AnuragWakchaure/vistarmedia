"use client";

import React from "react";
import { Star } from "lucide-react";

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
    <section className="py-8 sm:py-10 px-4 sm:px-6 bg-[#FCECDF] relative overflow-hidden select-none border-b-2 border-stone-200/60">
      <div className="max-w-5xl mx-auto space-y-3.5">
        {/* Section Sub-heading Header: Trusted by top brands */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B80F0A]" />
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-stone-700 uppercase font-sans">
            Trusted by top brands
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B80F0A]" />
        </div>

        {/* Ticker Capsule Container inspired by Nickpat Media */}
        <div className="relative rounded-[32px] bg-[#FAF6EF] border-2 border-stone-200/90 shadow-nickpat py-3.5 sm:py-4 px-4 sm:px-6 overflow-hidden">
          {/* Edge Gradient Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#FAF6EF] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#FAF6EF] to-transparent z-10" />

          {/* Continuous Infinite Marquee Track */}
          <div className="animate-marquee flex items-center gap-4 sm:gap-6">
            {marqueeList.map((brand, idx) => (
              <div
                key={`${brand._id || brand.name}-${idx}`}
                className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white border-2 border-stone-200/90 shadow-xs shrink-0 select-none cursor-default"
              >
                {/* Brand Logo / Icon */}
                {brand.logo && (
                  <div className="flex items-center justify-center h-5 sm:h-6 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="h-5 sm:h-6 max-h-6 w-auto max-w-[70px] sm:max-w-[85px] object-contain shrink-0"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Brand Name Text */}
                <span className="text-xs sm:text-[13px] font-bold text-stone-900 tracking-tight font-sans whitespace-nowrap">
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

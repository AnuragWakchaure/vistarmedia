"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";

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
    website: "https://mahindratractor.com",
  },
  {
    name: "TVS Motors",
    logo: "/images/brands/tvs-motors.png",
    website: "https://tvsmotor.com",
  },
  {
    name: "Siddhant Seeds",
    logo: "/images/brands/siddhant-seeds.png",
    website: "https://siddhantseeds.com",
  },
  {
    name: "Bhoomi22.com",
    logo: "/images/brands/bhoomi-22.jpeg",
    website: "https://bhoomi22.com",
  },
  {
    name: "Pashukhata App",
    logo: "/images/brands/pashukhata.jpeg",
    website: "https://pashukhata.com",
  },
];

interface BrandMarqueeProps {
  brands?: BrandItem[];
}

export default function BrandMarquee({ brands }: BrandMarqueeProps) {
  const shouldReduceMotion = useReducedMotion();
  const activeBrands = brands && brands.length > 0 ? brands : DEFAULT_BRANDS;

  // When count of brands is more than 4, enable continuous horizontal marquee sliding
  const isSliding = activeBrands.length >= 4 && !shouldReduceMotion;

  // Duplicate items 4x so that the -50% CSS keyframe loop is seamlessly infinite across all screen sizes
  const marqueeBrands = [
    ...activeBrands,
    ...activeBrands,
    ...activeBrands,
    ...activeBrands,
  ];

  return (
    <section className="relative overflow-hidden select-none bg-[#F8FAFC] py-8 sm:py-10">
      <div className="px-4 sm:px-6 max-w-6xl mx-auto space-y-4 relative z-10">
        {/* Section Sub-heading Header */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Trusted By Industry-Leading Brands Across Maharashtra
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />
        </div>

        {/* Ticker Capsule Container */}
        <div className="relative rounded-xl bg-white border border-slate-200/90 shadow-2xs py-4 px-2 sm:px-4 overflow-hidden">
          {/* Edge Fade Gradients for Seamless Entrance/Exit */}
          {isSliding && (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10"
              />
            </>
          )}

          {isSliding ? (
            /* Horizontal Continuous Sliding Track with Pause on Hover */
            <div className="flex overflow-hidden">
              <div
                className="animate-marquee flex items-center gap-3 sm:gap-6 pr-3 sm:pr-6"
                style={{ animationDuration: `${Math.max(20, activeBrands.length * 5)}s` }}
              >
                {marqueeBrands.map((brand, idx) => {
                  const isDuplicate = idx >= activeBrands.length;
                  const BrandWrapper = brand.website ? "a" : "div";
                  const wrapperProps = brand.website
                    ? {
                        href: brand.website,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-label": `Visit ${brand.name}`,
                      }
                    : {};

                  return (
                    <BrandWrapper
                      key={`${brand._id || brand.name}-${idx}`}
                      {...wrapperProps}
                      aria-hidden={isDuplicate ? "true" : undefined}
                      tabIndex={isDuplicate ? -1 : undefined}
                      className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/70 shadow-2xs shrink-0 select-none transition-all duration-150 group cursor-pointer"
                    >
                      {brand.logo && (
                        <div className="flex items-center justify-center h-7 sm:h-8 shrink-0 bg-white rounded-md px-2 py-0.5 border border-slate-100 group-hover:border-slate-200 shadow-2xs transition-colors">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            width={120}
                            height={32}
                            loading="lazy"
                            decoding="async"
                            className="h-5 sm:h-6 max-h-6 w-auto max-w-[90px] sm:max-w-[110px] object-contain shrink-0"
                          />
                        </div>
                      )}
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 tracking-tight whitespace-nowrap">
                        {brand.name}
                      </span>
                    </BrandWrapper>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Static Centered Flex Grid (for <= 3 brands or reduced-motion) */
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              {activeBrands.map((brand, idx) => (
                <div
                  key={`${brand._id || brand.name}-${idx}`}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-slate-300 shadow-2xs shrink-0 select-none cursor-default transition-colors"
                >
                  {brand.logo && (
                    <div className="flex items-center justify-center h-7 sm:h-8 shrink-0 bg-white rounded-md px-2 py-0.5 border border-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={120}
                        height={32}
                        loading="lazy"
                        decoding="async"
                        className="h-5 sm:h-6 max-h-6 w-auto max-w-[90px] sm:max-w-[110px] object-contain shrink-0"
                      />
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 tracking-tight whitespace-nowrap">
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

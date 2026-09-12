"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import { Counter } from "@/components/animations/Counter";
import { SectionBackground } from "@/components/motion/SectionBackground";
import MaharashtraMap from "@/components/public/MaharashtraMap";
import { CreatorLocationItem, DEFAULT_CREATOR_LOCATIONS } from "@/lib/data/maharashtra-geo";

const HUBS = [
  { city: "Pune", role: "Tech & Urban Lifestyle", activeCount: "45+" },
  { city: "Mumbai", role: "Entertainment & Fashion", activeCount: "50+" },
  { city: "Nashik", role: "Agriculture & Food", activeCount: "25+" },
  { city: "Ahilyanagar", role: "Rural Agriculture & Machinery", activeCount: "20+" },
  { city: "Chhatrapati Sambhajinagar", role: "Regional Commerce", activeCount: "20+" },
  { city: "Kolhapur", role: "Cultural & Vernacular Reach", activeCount: "20+" },
  { city: "Nagpur", role: "Vidarbha Regional Hub", activeCount: "25+" },
  { city: "Satara & Sangli", role: "Agri-Business & Dairy", activeCount: "15+" },
];

interface MaharashtraCoverageProps {
  locations?: CreatorLocationItem[];
}

export default function MaharashtraCoverage({
  locations = DEFAULT_CREATOR_LOCATIONS,
}: MaharashtraCoverageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATIONS.normal,
        ease: EASINGS.easeOutQuart,
      },
    },
  };

  // Check if a card matches the active selected map city
  const isCardActive = (hubCity: string) => {
    if (!selectedCity) return false;
    if (hubCity === selectedCity) return true;
    if (hubCity === "Satara & Sangli" && (selectedCity === "Satara" || selectedCity === "Sangli")) {
      return true;
    }
    if (hubCity === "Chhatrapati Sambhajinagar" && selectedCity.includes("Sambhajinagar")) {
      return true;
    }
    return false;
  };

  const handleCardClick = (hubCity: string) => {
    if (hubCity === "Satara & Sangli") {
      setSelectedCity(selectedCity === "Satara" ? "Sangli" : selectedCity === "Sangli" ? null : "Satara");
    } else if (selectedCity === hubCity) {
      setSelectedCity(null);
    } else {
      setSelectedCity(hubCity);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#FCECDF] border-t-2 border-stone-200/60 relative overflow-hidden">
      <SectionBackground variant="network" />
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header with Title and Districts Counter Badge */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: DURATIONS.normal, ease: EASINGS.easeOutQuart }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
              Geographic Presence
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl text-[#111111] uppercase tracking-tight leading-tight">
              Reaching Maharashtra: From Metro Hubs To Rural Heartlands
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
              Our network spans urban metros and rural farming clusters, giving brands authenticated local trust that generic agencies cannot match.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-white border-2 border-stone-200/90 shadow-nickpat text-left md:text-right shrink-0">
            <div className="font-anton text-4xl sm:text-5xl text-[#B80F0A]">
              <Counter value="13+" />
            </div>
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mt-1">
              Key Districts Covered
            </div>
          </div>
        </motion.div>

        {/* Real Geographically Accurate Interactive Maharashtra Map */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASINGS.easeOutQuart }}
        >
          <MaharashtraMap
            locations={locations}
            selectedLocationName={selectedCity}
            onSelectLocation={setSelectedCity}
          />
        </motion.div>

        {/* Existing Hub Cards Grid with Interactive Map Linking */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-anton text-xl sm:text-2xl text-[#111111] uppercase tracking-wide">
              Major Network Nodes & Regional Voices
            </h3>
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider hidden sm:block">
              Click any node to focus on map
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {HUBS.map((hub) => {
              const active = isCardActive(hub.city);
              return (
                <motion.div
                  key={hub.city}
                  variants={cardVariants}
                  onClick={() => handleCardClick(hub.city)}
                  className={`p-5 rounded-2xl border-2 shadow-nickpat cursor-pointer transition-all duration-200 space-y-3 group ${
                    active
                      ? "bg-[#FFFDF9] border-[#B80F0A] ring-2 ring-[#B80F0A]/20 shadow-nickpat-lg"
                      : "bg-white border-stone-200/90 hover:border-[#B80F0A]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-bold text-sm flex items-center gap-1.5 transition-colors ${
                        active ? "text-[#B80F0A]" : "text-[#111111] group-hover:text-[#B80F0A]"
                      }`}
                    >
                      <span className="relative flex items-center justify-center">
                        <span
                          className={`w-2 h-2 rounded-full bg-[#B80F0A] absolute animate-ping pointer-events-none ${
                            active ? "opacity-90" : "opacity-40"
                          }`}
                        />
                        <MapPin className="w-4 h-4 text-[#B80F0A] relative z-10" />
                      </span>
                      {hub.city}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                        active
                          ? "bg-[#B80F0A] text-white border-[#B80F0A]"
                          : "bg-[#FBCB77] text-[#111111] border-stone-300"
                      }`}
                    >
                      <Counter value={hub.activeCount} />
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-medium">{hub.role}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
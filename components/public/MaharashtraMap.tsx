"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MAHARASHTRA_DISTRICTS,
  MAHARASHTRA_VIEWBOX,
  MAP_WIDTH,
  MAP_HEIGHT,
  DEFAULT_CREATOR_LOCATIONS,
  CreatorLocationItem,
  projectCoordinates,
} from "@/lib/data/maharashtra-geo";
import { MapPin, Users, Sparkles, Navigation, X } from "lucide-react";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";

interface MaharashtraMapProps {
  locations?: CreatorLocationItem[];
  selectedLocationName?: string | null;
  onSelectLocation?: (name: string | null) => void;
}

// Network corridor connections between strategic hubs
const CORRIDORS = [
  { from: "Mumbai", to: "Pune" },
  { from: "Mumbai", to: "Nashik" },
  { from: "Pune", to: "Nashik" },
  { from: "Pune", to: "Ahilyanagar" },
  { from: "Nashik", to: "Ahilyanagar" },
  { from: "Ahilyanagar", to: "Chhatrapati Sambhajinagar" },
  { from: "Chhatrapati Sambhajinagar", to: "Nagpur" },
  { from: "Pune", to: "Satara" },
  { from: "Satara", to: "Sangli" },
  { from: "Sangli", to: "Kolhapur" },
  { from: "Satara", to: "Kolhapur" },
];

// Optimized label placements around marker coordinates to avoid overlapping
const LABEL_OFFSETS: Record<string, { dx: number; dy: number; textAnchor: "start" | "middle" | "end" }> = {
  Mumbai: { dx: -14, dy: -6, textAnchor: "end" },
  Pune: { dx: -14, dy: 16, textAnchor: "end" },
  Nashik: { dx: 14, dy: -12, textAnchor: "start" },
  Ahilyanagar: { dx: 14, dy: 4, textAnchor: "start" },
  "Chhatrapati Sambhajinagar": { dx: 14, dy: -10, textAnchor: "start" },
  Nagpur: { dx: 16, dy: -6, textAnchor: "start" },
  Satara: { dx: -14, dy: 4, textAnchor: "end" },
  Sangli: { dx: 14, dy: 4, textAnchor: "start" },
  Kolhapur: { dx: -14, dy: 14, textAnchor: "end" },
};

export default function MaharashtraMap({
  locations = DEFAULT_CREATOR_LOCATIONS,
  selectedLocationName,
  onSelectLocation,
}: MaharashtraMapProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<CreatorLocationItem | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Compute exact coordinates for each location
  const projectedLocations = useMemo(() => {
    return locations.map((loc) => {
      const [x, y] = projectCoordinates(loc.lon, loc.lat);
      return {
        ...loc,
        x: loc.x ?? x,
        y: loc.y ?? y,
      };
    });
  }, [locations]);

  // Active highlighted location (either clicked or hovered)
  const activeLocation = useMemo(() => {
    if (hoveredLocation) return hoveredLocation;
    if (selectedLocationName) {
      return projectedLocations.find((l) => l.name === selectedLocationName) || null;
    }
    return null;
  }, [hoveredLocation, selectedLocationName, projectedLocations]);

  // Marker size proportional to creator count
  const getMarkerRadius = (count: number) => {
    if (count >= 50) return 8.5;
    if (count >= 40) return 7.5;
    if (count >= 25) return 6.5;
    if (count >= 20) return 6;
    return 5.5;
  };

  // Build corridor curved lines
  const corridorPaths = useMemo(() => {
    const locMap = new Map(projectedLocations.map((l) => [l.name, l]));
    return CORRIDORS.map((c) => {
      const start = locMap.get(c.from);
      const end = locMap.get(c.to);
      if (!start || !end) return null;

      // Calculate subtle quadratic bezier control point
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const normalX = -dy * 0.12;
      const normalY = dx * 0.12;
      const cx = midX + normalX;
      const cy = midY + normalY;

      return {
        id: `${c.from}-${c.to}`,
        from: c.from,
        to: c.to,
        path: `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`,
      };
    }).filter(Boolean);
  }, [projectedLocations]);

  const handleMarkerClick = (loc: CreatorLocationItem) => {
    if (onSelectLocation) {
      if (selectedLocationName === loc.name) {
        onSelectLocation(null);
      } else {
        onSelectLocation(loc.name);
      }
    }
    setHoveredLocation(loc);
  };

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EF] to-[#F5EFEB] border-2 border-stone-200/90 shadow-nickpat overflow-hidden p-3 sm:p-6 md:p-8 select-none">
      {/* Subtle Map Ambient Header Badges */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-sm flex items-center gap-1.5 text-[11px] font-bold text-stone-800 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#B80F0A] animate-pulse" />
          <span>Real Maharashtra Geo-Network</span>
        </div>
        <div className="hidden md:flex px-2.5 py-1 rounded-full bg-[#111111] text-white text-[10px] font-mono font-semibold uppercase tracking-wider shadow-sm">
          35 Districts Verified
        </div>
      </div>

      {/* Map Control / Clear Highlight Button */}
      {activeLocation && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20">
          <button
            onClick={() => {
              setHoveredLocation(null);
              if (onSelectLocation) onSelectLocation(null);
            }}
            className="px-3 py-1.5 rounded-full bg-white/95 hover:bg-stone-100 text-stone-700 hover:text-[#B80F0A] text-xs font-bold uppercase tracking-wider border border-stone-200 shadow-sm transition flex items-center gap-1.5"
            aria-label="Clear location filter"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset View</span>
          </button>
        </div>
      )}

      {/* SVG Maharashtra Accurate Geography */}
      <div className="relative w-full aspect-[900/680] max-h-[640px] flex items-center justify-center">
        <svg
          viewBox={MAHARASHTRA_VIEWBOX}
          className="w-full h-full drop-shadow-sm overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Filter for marker dropshadow */}
            <filter id="marker-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#111111" floodOpacity="0.2" />
            </filter>
            {/* Filter for state soft shadow */}
            <filter id="state-depth" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#B80F0A" floodOpacity="0.06" />
            </filter>
            {/* Linear gradient for active district pulse */}
            <linearGradient id="district-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBCB77" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FEEFDB" stopOpacity="0.8" />
            </linearGradient>
            {/* Red Network Corridor Gradient */}
            <linearGradient id="corridor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B80F0A" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FBCB77" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#B80F0A" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* 1. Maharashtra State Districts Layer (35 Official Districts) */}
          <g filter="url(#state-depth)">
            {MAHARASHTRA_DISTRICTS.map((district) => {
              const isDistrictHovered = hoveredDistrict === district.name;
              const hasActiveCity =
                activeLocation &&
                (activeLocation.name.toLowerCase().includes(district.name.toLowerCase()) ||
                  district.name.toLowerCase().includes(activeLocation.name.toLowerCase()) ||
                  (activeLocation.name === "Ahilyanagar" && district.name === "Ahmednagar") ||
                  (activeLocation.name === "Chhatrapati Sambhajinagar" && district.name === "Aurangabad"));

              return (
                <path
                  key={district.id}
                  d={district.path}
                  fill={
                    hasActiveCity
                      ? "url(#district-highlight)"
                      : isDistrictHovered
                      ? "#FFF3E0"
                      : "#FCF9F2"
                  }
                  stroke={hasActiveCity ? "#B80F0A" : isDistrictHovered ? "#B80F0A" : "#DDD4C5"}
                  strokeWidth={hasActiveCity ? 1.5 : isDistrictHovered ? 1.2 : 0.85}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="transition-colors duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredDistrict(district.name)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  aria-label={`${district.name} District, Maharashtra`}
                  data-district={district.name}
                />
              );
            })}
          </g>

          {/* 2. Strategic Creator Network Corridor Beams */}
          <g className="pointer-events-none">
            {corridorPaths.map((c) => {
              if (!c) return null;
              const isCorridorActive =
                activeLocation && (activeLocation.name === c.from || activeLocation.name === c.to);

              return (
                <g key={c.id}>
                  {/* Base corridor dashed trace */}
                  <path
                    d={c.path}
                    fill="none"
                    stroke={isCorridorActive ? "#B80F0A" : "#B80F0A"}
                    strokeWidth={isCorridorActive ? 2 : 1.2}
                    strokeDasharray={isCorridorActive ? "none" : "3 5"}
                    strokeOpacity={isCorridorActive ? 0.8 : 0.25}
                    className="transition-all duration-300"
                  />
                  {/* Subtle pulsing energy dot traveling on active corridors */}
                  {mounted && !shouldReduceMotion && (
                    <circle r={isCorridorActive ? 3 : 2} fill="#B80F0A" opacity={isCorridorActive ? 0.9 : 0.4}>
                      <animateMotion
                        dur={isCorridorActive ? "3.5s" : "7s"}
                        repeatCount="indefinite"
                        path={c.path}
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </g>

          {/* 3. Location Markers & Labels Layer */}
          <g>
            {projectedLocations.map((loc) => {
              const isSelected = selectedLocationName === loc.name;
              const isHovered = hoveredLocation?.name === loc.name;
              const isActive = isSelected || isHovered;
              const radius = getMarkerRadius(loc.creatorCount);
              const offset = LABEL_OFFSETS[loc.name] || { dx: 14, dy: 4, textAnchor: "start" };

              return (
                <g
                  key={loc.name}
                  transform={`translate(${loc.x}, ${loc.y})`}
                  className="cursor-pointer group"
                  onClick={() => handleMarkerClick(loc)}
                  onMouseEnter={() => setHoveredLocation(loc)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${loc.name}, ${loc.countDisplay} creators, ${loc.category}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleMarkerClick(loc);
                    }
                  }}
                >
                  {/* Pulsing Ripple Effect */}
                  {mounted && !shouldReduceMotion && (
                    <circle
                      r={radius * 2.4}
                      fill="#B80F0A"
                      className={`animate-ping opacity-30 pointer-events-none transition-opacity ${
                        isActive ? "opacity-60" : "opacity-20"
                      }`}
                    />
                  )}

                  {/* Outer Glow Halo when selected */}
                  {isActive && (
                    <circle
                      r={radius + 7}
                      fill="#B80F0A"
                      fillOpacity={0.2}
                      className="transition-all duration-300 pointer-events-none"
                    />
                  )}

                  {/* White Outer Border Ring */}
                  <circle
                    r={radius + 2.5}
                    fill="#FFFFFF"
                    stroke="#111111"
                    strokeWidth={1.2}
                    filter="url(#marker-shadow)"
                  />

                  {/* Red Core Circle */}
                  <circle
                    r={radius}
                    fill={isActive ? "#B80F0A" : "#B80F0A"}
                    className="transition-all duration-200"
                  />

                  {/* Inner Golden Dot */}
                  <circle r={2} fill="#FBCB77" />

                  {/* City Label & Badge on Map */}
                  <g
                    transform={`translate(${offset.dx}, ${offset.dy})`}
                    className="transition-transform duration-200 pointer-events-none"
                  >
                    {/* Background Pill for High Contrast Readability */}
                    <rect
                      x={offset.textAnchor === "end" ? -90 : -4}
                      y={-12}
                      width={94}
                      height={18}
                      rx={5}
                      fill="#FFFFFF"
                      fillOpacity={isActive ? 0.95 : 0.82}
                      stroke={isActive ? "#B80F0A" : "#E2D9CC"}
                      strokeWidth={isActive ? 1.2 : 0.75}
                      className="shadow-sm"
                    />

                    {/* City Name */}
                    <text
                      x={offset.textAnchor === "end" ? -6 : 4}
                      y={1}
                      textAnchor={offset.textAnchor === "end" ? "end" : "start"}
                      className="font-anton text-[10px] sm:text-[11px] tracking-wide fill-[#111111] uppercase select-none font-medium"
                    >
                      {loc.name === "Chhatrapati Sambhajinagar" ? "Sambhajinagar" : loc.name}
                    </text>

                    {/* Creator Count Sub-badge */}
                    <text
                      x={offset.textAnchor === "end" ? -72 : 72}
                      y={1}
                      textAnchor="middle"
                      className="font-mono text-[9px] font-bold fill-[#B80F0A] select-none"
                    >
                      {loc.countDisplay}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Interactive Tooltip Card on Marker Hover/Select */}
      <AnimatePresence>
        {activeLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: DURATIONS.micro, ease: EASINGS.easeOutCubic }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-30 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#111111] shadow-nickpat-lg text-left space-y-2"
          >
            <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#FCECDF] text-[#B80F0A]">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-anton text-lg sm:text-xl text-[#111111] uppercase tracking-tight leading-none">
                    {activeLocation.name}
                  </h4>
                  <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    {activeLocation.lat.toFixed(4)}° N, {activeLocation.lon.toFixed(4)}° E
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#FBCB77] text-[#111111] font-mono text-xs font-black border border-stone-300">
                {activeLocation.countDisplay} Creators
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-[#B80F0A] uppercase tracking-wider">
                {activeLocation.category}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                {activeLocation.description ||
                  "Verified regional voice connecting urban and rural consumer clusters."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Legend Footer */}
      <div className="mt-4 pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600 font-medium">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#B80F0A] inline-block border border-white shadow-sm" />
            <span className="text-stone-700 font-bold">Active Creator Hub</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-0.5 bg-[#B80F0A] inline-block opacity-60" />
            <span>Distribution Corridor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#FFF3E0] border border-[#B80F0A] inline-block" />
            <span>District Coverage</span>
          </div>
        </div>
        <div className="text-[11px] text-stone-500 italic hidden sm:block">
          Click any marker or district to view regional insights
        </div>
      </div>
    </div>
  );
}

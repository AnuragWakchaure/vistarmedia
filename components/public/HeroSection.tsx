"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import { Counter } from "@/components/animations/Counter";
import { AuroraBackground } from "@/components/motion/AuroraBackground";

export interface ICampaignReelItem {
  id: string;
  title: string;
  brand: string;
  category: string;
  location: string;
  videoUrl: string;
  posterUrl: string;
  reach: string;
  reachSubtext: string;
  engagement: string;
}

// Exactly 2 Verified Campaign Video Reels (High-Reach Spotlight First)
const DEFAULT_CAMPAIGNS: ICampaignReelItem[] = [
  {
    id: "campaign-01",
    brand: "Mahindra Tractors",
    title: "New Tractor Launch Campaign",
    category: "Regional Agriculture & Auto Campaign",
    location: "Chhatrapati Sambhajinagar • Maharashtra",
    videoUrl: "/videos/mahindra-launch-reel.mp4",
    posterUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1200&auto=format&fit=crop&q=80",
    reach: "1.8M+ Reach",
    reachSubtext: "@mh20vlogger_yt • Maharashtra",
    engagement: "93K+ Likes • 144 Comments",
  },
  {
    id: "campaign-02",
    brand: "Vishal Kadlag Collab",
    title: "Kaka ❌ Brand Ambassador ✅",
    category: "Vernacular Influencer Campaign",
    location: "Maharashtra",
    videoUrl: "/videos/hero-reel.mp4",
    posterUrl: "/images/hero-reel-poster.webp",
    reach: "135K+ Reach",
    reachSubtext: "@vishal_kadlag08 • Maharashtra",
    engagement: "6,591 Likes • 34 Comments",
  },
];

export default function HeroSection({
  heading,
  subheading,
  highlight,
  primaryCta,
  secondaryCta,
  creatorCount = "200+",
  campaigns,
  creators,
}: {
  heading?: string;
  subheading?: string;
  highlight?: string;
  primaryCta?: string;
  secondaryCta?: string;
  creatorCount?: string;
  campaigns?: any[];
  creators?: any[];
}) {
  const shouldReduceMotion = useReducedMotion();

  // Exactly 2 Hero campaign videos
  const campaignList: ICampaignReelItem[] = DEFAULT_CAMPAIGNS;

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const isDraggingRef = useRef(false);

  const activeCampaign = campaignList[activeIdx] || campaignList[0];

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pagination Handler
  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setActiveIdx((prev) => (prev + newDirection + campaignList.length) % campaignList.length);
    },
    [campaignList.length]
  );

  const goToSlide = (index: number) => {
    if (index === activeIdx) return;
    setDirection(index > activeIdx ? 1 : -1);
    setActiveIdx(index);
  };

  // Defer video initialization until after initial page load & interactivity to safeguard LCP
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Auto-play active video reliably whenever active slide changes
  useEffect(() => {
    if (!videoLoaded) return;
    const video = videoRef.current;
    if (!video) return;

    setProgress(0);
    video.muted = isMuted;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        // Fall back to muted play if unmuted playback was blocked by browser
        try {
          video.muted = true;
          setIsMuted(true);
          await video.play();
          setIsPlaying(true);
        } catch (e) {
          setIsPlaying(false);
        }
      }
    };

    playVideo();
  }, [activeIdx, videoLoaded, activeCampaign.videoUrl]);

  // Video Progress Update
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const restartVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = playerContainerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      container.requestFullscreen().catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2800);
  };

  const handleMouseLeave = () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    setShowControls(false);
  };

  // Handle Drag Gestures on Carousel Card
  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (
    _: any,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => {
    const { offset, velocity } = info;
    const swipeThreshold = 50;
    const velocityThreshold = 400;

    if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
      paginate(1);
    } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
      paginate(-1);
    }
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);
  };

  const handleCardClick = () => {
    if (isDraggingRef.current) return;
    togglePlay();
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "m" || e.key === "M") {
      e.preventDefault();
      toggleMute(e as any);
    }
  };

  // Variants for Slide Horizontal Physical Motion
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? "100%" : dir < 0 ? "-100%" : 0,
      opacity: shouldReduceMotion ? 1 : 0.85,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        x: shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring" as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: shouldReduceMotion ? 0 : dir < 0 ? "100%" : "-100%",
      opacity: shouldReduceMotion ? 1 : 0.85,
      transition: {
        x: shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring" as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 16,
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

  return (
    <section className="relative min-h-screen lg:min-h-[92vh] flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#05080D]">
      {/* Motion UI Aurora Ambient Background */}
      <AuroraBackground showGrid={true} />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center"
        >
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Value Proposition & Credibility Engine */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 text-left">
            {/* Tag / Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#07111A]/90 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,200,255,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#00C8FF] animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00C8FF]">
                  {highlight || "Maharashtra Influencer Agency"}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-slate-300 font-semibold border border-cyan-500/20">
                  Verified ROI
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-anton text-4xl sm:text-5xl lg:text-5xl xl:text-6xl tracking-tight leading-[0.98] uppercase text-white"
            >
              {heading ? (
                heading.toUpperCase().includes("STAND OUT") ? (
                  <>
                    {heading.replace(/STAND OUT\.?/i, "").trim()}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] via-[#33D4FF] to-[#009DFF] drop-shadow-[0_0_30px_rgba(0,200,255,0.35)]">
                      STAND OUT.
                    </span>
                  </>
                ) : (
                  heading
                )
              ) : (
                <>
                  INFLUENCER MARKETING THAT MAKES BRANDS{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] via-[#33D4FF] to-[#009DFF] drop-shadow-[0_0_30px_rgba(0,200,255,0.35)]">
                    STAND OUT.
                  </span>
                </>
              )}
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed"
            >
              {subheading ||
                "Connect your brand with 200+ verified Maharashtra creators to execute high-converting regional campaigns with verifiable ROI, authentic vernacular resonance, and zero bot inflation."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
            >
              <Link
                href="/#campaign-enquiry"
                className="group px-7 py-4 rounded-full bg-gradient-to-r from-[#00C8FF] to-[#009DFF] hover:from-[#33D4FF] hover:to-[#00C8FF] text-[#05080D] font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(0,200,255,0.4)] hover:shadow-[0_6px_30px_rgba(0,200,255,0.55)] hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>{primaryCta || "Get In Touch"}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/campaigns"
                className="px-7 py-4 rounded-full bg-[#07111A]/90 hover:bg-[#0B1822] border border-white/15 hover:border-cyan-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>{secondaryCta || "View Campaigns / Our Work"}</span>
              </Link>
            </motion.div>

            {/* 4 Trust Metrics Strip */}
            <motion.div
              variants={itemVariants}
              className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 w-full"
            >
              {/* Stat 1 */}
              <div className="p-3.5 rounded-2xl bg-[#07111A]/80 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 transition-colors">
                <div className="font-anton text-2xl sm:text-3xl text-[#00C8FF] leading-none">
                  <Counter value="200+" />
                </div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1.5">
                  Verified Creators
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-3.5 rounded-2xl bg-[#07111A]/80 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 transition-colors">
                <div className="font-anton text-2xl sm:text-3xl text-white leading-none">
                  <Counter value="35" />
                </div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1.5">
                  Districts Covered
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-3.5 rounded-2xl bg-[#07111A]/80 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 transition-colors">
                <div className="font-anton text-2xl sm:text-3xl text-[#00C8FF] leading-none">
                  <Counter value="100+" />
                </div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1.5">
                  Live Campaigns
                </div>
              </div>

              {/* Stat 4 */}
              <div className="p-3.5 rounded-2xl bg-[#07111A]/80 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 transition-colors">
                <div className="font-anton text-2xl sm:text-3xl text-emerald-400 leading-none">
                  3.8x
                </div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1.5">
                  Vernacular ROI
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: VISTAR Swipeable 9:16 Campaign Reel Carousel */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex flex-col items-center lg:items-end justify-center py-2 sm:py-6 space-y-3 sm:space-y-3.5 w-full">
            {/* Ambient Cyan/Navy Backlight Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] h-[420px] sm:h-[480px] bg-gradient-to-tr from-[#00C8FF]/20 via-[#009DFF]/15 to-transparent blur-3xl pointer-events-none rounded-full" />

            {/* Swipeable Carousel Wrapper */}
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] flex flex-col items-center space-y-2.5 sm:space-y-3">
              {/* 9:16 Video Player Card Container */}
              <div
                ref={playerContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                tabIndex={0}
                role="region"
                aria-roledescription="carousel"
                aria-label="VISTAR Campaign Reel Carousel"
                onKeyDown={handleKeyDown}
                className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden border border-white/15 hover:border-cyan-500/40 bg-[#07111A] shadow-[0_20px_50px_rgba(0,0,0,0.6)] group select-none focus:outline-none focus:ring-2 focus:ring-[#00C8FF] touch-pan-y shrink-0"
              >
                {/* Physical Slide AnimatePresence Container */}
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeCampaign.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onClick={handleCardClick}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing flex flex-col justify-between"
                  >
                    {/* Top Animated Playback Progress Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30 pointer-events-none">
                      <div
                        className="h-full bg-gradient-to-r from-[#00C8FF] to-[#009DFF] transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Top Header Controls Overlay */}
                    <div
                      className={`absolute top-3 left-3 right-3 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between z-20 transition-opacity duration-300 pointer-events-auto ${
                        showControls || !isPlaying
                          ? "opacity-100"
                          : "opacity-80 group-hover:opacity-100"
                      }`}
                    >
                      {/* Subtle Proof of Work Indicator Badge */}
                      <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[9px] sm:text-[10px] font-mono font-bold tracking-wider shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#00C8FF] animate-pulse" />
                        <span>FEATURED CAMPAIGN</span>
                      </div>

                      {/* Top Right Controls Group */}
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        {/* Restart Button */}
                        <button
                          type="button"
                          onClick={restartVideo}
                          aria-label="Replay campaign video from beginning"
                          className="w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-white/15 hover:border-[#00C8FF] text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm cursor-pointer"
                          title="Restart"
                        >
                          <RotateCcw className="w-3 h-3 text-slate-300" />
                        </button>

                        {/* Mute / Unmute Button */}
                        <button
                          type="button"
                          onClick={toggleMute}
                          aria-label={
                            isMuted
                              ? "Unmute campaign video audio"
                              : "Mute campaign video audio"
                          }
                          className="w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-white/15 hover:border-[#00C8FF] text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm cursor-pointer"
                          title={isMuted ? "Unmute audio" : "Mute audio"}
                        >
                          {isMuted ? (
                            <VolumeX className="w-3 h-3 text-slate-300" />
                          ) : (
                            <Volume2 className="w-3 h-3 text-[#00C8FF]" />
                          )}
                        </button>

                        {/* Fullscreen Button */}
                        <button
                          type="button"
                          onClick={toggleFullscreen}
                          aria-label="Toggle fullscreen video playback"
                          className="w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-white/15 hover:border-[#00C8FF] text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm cursor-pointer"
                          title="Fullscreen"
                        >
                          <Maximize2 className="w-3 h-3 text-slate-300" />
                        </button>
                      </div>
                    </div>

                    {/* ONLY Mount Video for the Active Slide (Lazy Loading & Core Web Vitals) */}
                    {videoLoaded ? (
                      <video
                        ref={videoRef}
                        key={activeCampaign.videoUrl}
                        src={activeCampaign.videoUrl}
                        poster={activeCampaign.posterUrl}
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        preload="none"
                        crossOrigin="anonymous"
                        onTimeUpdate={handleTimeUpdate}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={activeCampaign.posterUrl}
                        alt={activeCampaign.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        loading="eager"
                      />
                    )}

                    {/* Subtle Vignette Gradient for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05080D]/95 via-transparent to-[#05080D]/40 pointer-events-none" />

                    {/* Centered VISTAR Custom Play Button Overlay (when paused or hovered) */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-300 ${
                        !isPlaying
                          ? "opacity-100 bg-black/40 backdrop-blur-xs"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#05080D]/85 backdrop-blur-md border border-cyan-400/50 flex items-center justify-center text-[#00C8FF] shadow-[0_0_30px_rgba(0,200,255,0.35)] hover:scale-105 transition-transform"
                        aria-hidden="true"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
                        ) : (
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
                        )}
                      </div>
                    </div>

                    {/* Bottom Campaign Information Overlay */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 z-20 p-2.5 sm:p-3.5 rounded-2xl bg-[#07111A]/90 backdrop-blur-md border border-white/10 text-left space-y-1 sm:space-y-1.5 pointer-events-auto">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00C8FF] truncate">
                          {activeCampaign.brand}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 shrink-0">
                          {activeCampaign.location}
                        </span>
                      </div>

                      <div className="font-anton text-xs sm:text-sm md:text-base text-white leading-tight line-clamp-1">
                        {activeCampaign.title}
                      </div>

                      <div className="text-[10px] text-slate-400 font-medium line-clamp-1">
                        {activeCampaign.category}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* =================================================================== */}
              {/* EDITORIAL NAVIGATION & PAGINATION BAR */}
              {/* =================================================================== */}
              <div className="w-full flex items-center justify-between px-1 shrink-0">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Previous campaign reel"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#07111A]/90 hover:bg-[#0B1822] border border-white/15 hover:border-[#00C8FF]/60 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00C8FF]"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-[#00C8FF] transition-colors" />
                </button>

                {/* Editorial Counter & Indicator Pills */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Counter: 01 / 02 */}
                  <div className="font-mono text-xs tracking-wider flex items-center gap-1.5 select-none">
                    <span className="text-[#00C8FF] font-bold text-sm">
                      {String(activeIdx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#8E9CA7] font-medium">/</span>
                    <span className="text-[#8E9CA7] font-medium">
                      {String(campaignList.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Indicator Pills */}
                  <div className="flex items-center gap-1.5 ml-1">
                    {campaignList.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goToSlide(i)}
                        aria-label={`Go to campaign slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                          i === activeIdx
                            ? "w-6 bg-[#00C8FF] shadow-[0_0_8px_rgba(0,200,255,0.6)]"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Next campaign reel"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#07111A]/90 hover:bg-[#0B1822] border border-white/15 hover:border-[#00C8FF]/60 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00C8FF]"
                >
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#00C8FF] transition-colors" />
                </button>
              </div>

              {/* =================================================================== */}
              {/* REEL REACH & VERIFIED PERFORMANCE STATS BAR */}
              {/* =================================================================== */}
              <div className="w-full p-3 sm:p-3.5 rounded-2xl bg-[#07111A]/95 backdrop-blur-md border border-white/10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 shrink-0">
                {/* Left: Reach Metrics Counter */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#00C8FF] to-[#009DFF] text-[#05080D] flex items-center justify-center font-anton text-xs sm:text-sm shadow-md shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 font-bold" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-xs font-anton text-white flex items-center gap-1.5 leading-tight">
                      <span className="text-[#00C8FF] text-sm">
                        {activeCampaign.reach}
                      </span>
                      <span className="uppercase tracking-wide text-slate-200 text-[11px] sm:text-xs">
                        Reel Reach
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium truncate">
                      {activeCampaign.reachSubtext}
                    </div>
                  </div>
                </div>

                {/* Right: Key Verified Engagement Pill */}
                <div className="flex items-center sm:items-end justify-between sm:justify-center sm:flex-col shrink-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{activeCampaign.engagement}</span>
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono mt-0.5">
                    100% Verified Telemetry
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
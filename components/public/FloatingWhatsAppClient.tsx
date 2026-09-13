"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CheckCheck, Send } from "lucide-react";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function FloatingWhatsAppClient({
  whatsappUrl,
}: {
  whatsappUrl: string;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Automatically trigger popup on page open or refresh after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowPopup(false);
    setHasInteracted(true);
  };

  const handleToggle = () => {
    setShowPopup((prev) => !prev);
    setHasInteracted(true);
  };

  return (
    <aside
      aria-label="WhatsApp Quick Support"
      className="fixed bottom-6 right-5 sm:right-6 z-50 flex flex-col items-end gap-3 select-none"
    >
      {/* =================================================================== */}
      {/* AUTO POPUP CHAT CARD */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: DURATIONS.normal, ease: EASINGS.easeOutQuart }}
            className="w-[300px] sm:w-[330px] rounded-3xl bg-[#07111A]/95 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden text-left"
          >
            {/* Header with Team Status */}
            <div className="p-3.5 bg-gradient-to-r from-[#0B1822] via-[#0D1F2D] to-[#07111A] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center shadow-md">
                    <WhatsAppIcon className="w-full h-full object-cover" size={36} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#07111A] animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>VISTAR Media</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#25D366]/20 text-[#25D366] font-mono font-bold">
                      ONLINE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    Typically replies in &lt; 5 mins
                  </div>
                </div>
              </div>

              {/* Close / Dismiss Button */}
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Close WhatsApp chat popup"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Body Bubble */}
            <div className="p-4 space-y-3 bg-[#05080D]/70">
              <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#0B1822] border border-white/10 text-white space-y-1.5 shadow-sm">
                <p className="text-xs leading-relaxed text-slate-200">
                  👋 <strong>Namaste!</strong> Looking to launch an influencer campaign or collaborate with creators in Maharashtra?
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Chat directly with our strategist on WhatsApp for instant creator matches and custom campaign quotes.
                </p>
                <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 font-mono pt-1">
                  <span>Just now</span>
                  <CheckCheck className="w-3 h-3 text-[#00C8FF]" />
                </div>
              </div>

              {/* Direct Connect Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowPopup(false)}
                className="w-full group py-3 px-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#2EE572] hover:to-[#25D366] text-[#05080D] font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.5)] flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 shadow-xs">
                    <WhatsAppIcon className="w-full h-full object-cover" size={20} />
                  </div>
                  <span>Connect on WhatsApp</span>
                </div>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* FLOATING WHATSAPP TRIGGER BUTTON */}
      {/* =================================================================== */}
      <div className="flex items-center gap-2.5">
        {/* Hover / Auto Tooltip Pill */}
        {!showPopup && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:inline-block bg-[#07111A]/90 border border-white/15 text-white text-[11px] font-bold tracking-wide px-3.5 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md cursor-pointer hover:border-[#25D366]"
            onClick={handleToggle}
          >
            Connect on WhatsApp
          </motion.span>
        )}

        <div className="relative group">
          {/* Ambient Glowing Green Halo */}
          <span
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-full bg-[#25D366] opacity-60 blur-md animate-pulse pointer-events-none group-hover:opacity-90 group-hover:blur-lg transition-all duration-300"
          />
          <span
            aria-hidden="true"
            className="absolute -inset-0.5 rounded-full bg-[#25D366]/40 blur-xs pointer-events-none"
          />

          {/* Notification Ping Badge when Popup is Closed */}
          {!showPopup && !hasInteracted && (
            <span className="absolute -top-1 -right-1 z-30 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white text-[#05080D] text-[8px] font-mono font-black items-center justify-center shadow-xs">
                1
              </span>
            </span>
          )}

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with VISTAR on WhatsApp"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={EASINGS.spring}
            className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.8),0_0_35px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,1),0_0_50px_rgba(37,211,102,0.6)] ring-2 ring-[#25D366] ring-offset-2 ring-offset-[#07111A] flex items-center justify-center border border-white/50 transition-all cursor-pointer overflow-hidden p-0 bg-[#25D366]"
          >
            <WhatsAppIcon className="w-full h-full object-cover" size={48} />
          </motion.a>
        </div>
      </div>
    </aside>
  );
}


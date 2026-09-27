"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CheckCheck } from "lucide-react";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function FloatingWhatsAppClient({
  whatsappUrl,
}: {
  whatsappUrl: string;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Automatically trigger popup on page open or refresh after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

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
            initial={{ opacity: 0, y: 16, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: DURATIONS.fast, ease: EASINGS.easeOutQuart }}
            className="w-[290px] sm:w-[320px] rounded-xl bg-[#0E131E] border border-white/10 shadow-2xl overflow-hidden text-left"
          >
            {/* Header with Team Status */}
            <div className="p-3 bg-[#080B11] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                    <WhatsAppIcon className="w-full h-full object-cover" size={32} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#25D366] border border-[#080B11]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span>VISTAR Support</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-medium">
                      ONLINE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Typically replies in &lt; 5 mins
                  </div>
                </div>
              </div>

              {/* Close / Dismiss Button */}
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Close WhatsApp chat popup"
                className="w-6 h-6 rounded-md hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Body Bubble */}
            <div className="p-3.5 space-y-3 bg-[#0E131E]">
              <div className="p-3 rounded-lg bg-[#080B11] border border-white/5 text-white space-y-1">
                <p className="text-xs leading-relaxed text-slate-200">
                  👋 <strong>Namaste!</strong> Planning an influencer campaign or creator partnership in Maharashtra?
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Chat directly with our strategist for instant creator matches and custom quotes.
                </p>
                <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 font-mono pt-1">
                  <span>Just now</span>
                  <CheckCheck className="w-3 h-3 text-[#00B8F0]" />
                </div>
              </div>

              {/* Direct Connect Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowPopup(false)}
                className="w-full group py-2.5 px-3.5 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-[#05080D] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4" size={16} />
                  <span>Connect on WhatsApp</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* FLOATING WHATSAPP TRIGGER BUTTON */}
      {/* =================================================================== */}
      <div className="flex items-center gap-2.5">
        {/* Tooltip Pill */}
        {!showPopup && (
          <span
            className="hidden sm:inline-block bg-[#0E131E] border border-white/10 text-white text-[11px] font-medium px-3 py-1 rounded-md shadow-md cursor-pointer hover:border-white/20 transition-colors"
            onClick={handleToggle}
          >
            Chat on WhatsApp
          </span>
        )}

        <div className="relative group">
          {/* Notification Ping Badge when Popup is Closed */}
          {!showPopup && !hasInteracted && (
            <span className="absolute -top-1 -right-1 z-30 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          )}

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with VISTAR on WhatsApp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={EASINGS.spring}
            className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all cursor-pointer overflow-hidden p-0 bg-[#25D366]"
          >
            <WhatsAppIcon className="w-full h-full object-cover" size={48} />
          </motion.a>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { EASINGS } from "@/components/animations/MotionTokens";

export default function FloatingWhatsAppClient({
  whatsappUrl,
}: {
  whatsappUrl: string;
}) {
  return (
    <aside
      aria-label="WhatsApp Quick Support"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="hidden md:inline-block bg-white border-2 border-stone-200 text-[#111111] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-nickpat-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"
      >
        Chat with VISTAR
      </motion.span>
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with VISTAR on WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={EASINGS.spring}
        className="w-13 h-13 p-3.5 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center border-2 border-emerald-600 hover:shadow-xl transition-shadow"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </motion.a>
    </aside>
  );
}

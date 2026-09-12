"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Creators", href: "/creators" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DURATIONS.fast, ease: EASINGS.easeOutQuart }}
      className="fixed top-0 left-0 right-0 z-50 pt-4 pb-2 px-4 sm:px-6 pointer-events-none"
    >
      <div
        className={cn(
          "max-w-6xl mx-auto rounded-full px-5 py-2.5 sm:py-3 flex items-center justify-between pointer-events-auto transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-nickpat-lg border-2 border-[#111111]/10"
            : "bg-white/90 backdrop-blur-sm shadow-nickpat border-2 border-[#111111]/10"
        )}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={EASINGS.spring}
            className="w-8 h-8 rounded-lg bg-[#B80F0A] border-2 border-[#960C08] flex items-center justify-center font-extrabold text-white text-base shadow-sm"
          >
            V
          </motion.div>
          <span className="font-anton text-2xl tracking-wider text-[#111111]">
            VISTAR
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-bold text-stone-700">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 transition-colors hover:text-[#B80F0A] group",
                  isActive ? "text-[#B80F0A] font-extrabold" : "text-stone-700"
                )}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B80F0A] rounded-full"
                    transition={EASINGS.gentleSpring}
                  />
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B80F0A]/60 rounded-full transition-all duration-200 group-hover:w-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={EASINGS.spring}
          >
            <Link
              href="/#campaign-enquiry"
              className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#B80F0A] hover:bg-[#960C08] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md border border-[#960C08]"
            >
              <span>Start Campaign</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-stone-900 hover:text-[#B80F0A] p-1.5 rounded-full hover:bg-stone-100 transition"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: DURATIONS.fast, ease: EASINGS.easeOutQuart }}
            className="md:hidden mt-2 max-w-6xl mx-auto bg-white border-2 border-stone-200 rounded-3xl p-6 shadow-nickpat-lg pointer-events-auto space-y-4"
          >
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block text-sm font-bold uppercase tracking-wider py-2 px-3 rounded-xl transition",
                        isActive
                          ? "text-[#B80F0A] bg-[#FCECDF]"
                          : "text-stone-800 hover:text-[#B80F0A] hover:bg-stone-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="pt-3 border-t border-stone-100">
              <Link
                href="/#campaign-enquiry"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#B80F0A] text-white text-xs font-bold uppercase tracking-wider shadow-md active:scale-98 transition"
              >
                Start Your Campaign <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
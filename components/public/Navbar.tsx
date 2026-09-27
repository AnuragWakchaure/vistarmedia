"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { EASINGS, DURATIONS } from "@/components/animations/MotionTokens";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Categories", href: "/#creators" },
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
      className="fixed top-0 left-0 right-0 z-50 pt-3 pb-2 px-4 sm:px-6 pointer-events-none"
    >
      <div
        className={cn(
          "max-w-6xl mx-auto rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-300",
          scrolled
            ? "bg-[#090D14]/95 backdrop-blur-xl border border-white/10 shadow-lg"
            : "bg-[#090D14]/80 backdrop-blur-md border border-white/10 shadow-md"
        )}
      >
        {/* Brand Logo with Official Image */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={EASINGS.spring}
            className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg overflow-hidden border border-white/15 bg-white shrink-0 shadow-xs"
          >
            <Image
              src="/images/logo.png"
              alt="VISTAR Logo"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-anton text-xl tracking-wider text-white group-hover:text-[#00B8F0] transition-colors leading-none">
              VISTAR
            </span>
            <span className="text-[8px] font-mono uppercase tracking-widest text-[#00B8F0] font-semibold hidden sm:block">
              Marketing Agency
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs uppercase tracking-wider font-semibold text-slate-300">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 transition-colors hover:text-[#00B8F0] group",
                  isActive ? "text-[#00B8F0] font-bold" : "text-slate-300"
                )}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B8F0] rounded-full"
                    transition={EASINGS.gentleSpring}
                  />
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00B8F0]/50 rounded-full transition-all duration-200 group-hover:w-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/#campaign-enquiry"
            className="group inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-[#00B8F0] hover:bg-[#00A3D9] text-[#05080D] text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xs active:scale-[0.98]"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5 text-[#00B8F0]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: DURATIONS.fast, ease: EASINGS.easeOutQuart }}
            className="md:hidden mt-2 max-w-6xl mx-auto bg-[#090D14]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl pointer-events-auto space-y-3"
          >
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block text-xs font-semibold uppercase tracking-wider py-2 px-3 rounded-lg transition",
                      isActive
                        ? "text-[#00B8F0] bg-[#00B8F0]/10 border border-[#00B8F0]/25"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-2 border-t border-white/10">
              <Link
                href="/#campaign-enquiry"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#00B8F0] hover:bg-[#00A3D9] text-[#05080D] text-xs font-bold uppercase tracking-wider transition active:scale-[0.98]"
              >
                Get In Touch <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
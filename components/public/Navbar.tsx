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
      className="fixed top-0 left-0 right-0 z-50 pt-4 pb-2 px-4 sm:px-6 pointer-events-none"
    >
      <div
        className={cn(
          "max-w-6xl mx-auto rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between pointer-events-auto transition-all duration-300",
          scrolled
            ? "bg-[#07111A]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
            : "bg-[#07111A]/85 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        )}
      >
        {/* Brand Logo with Official Image */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={EASINGS.spring}
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-white/15 shadow-sm bg-white shrink-0"
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
            <span className="font-anton text-xl sm:text-2xl tracking-wider text-white group-hover:text-[#00C8FF] transition-colors leading-none">
              VISTAR
            </span>
            <span className="text-[8px] font-mono uppercase tracking-widest text-[#00C8FF] font-bold hidden sm:block">
              Marketing Agency
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-wider font-semibold text-slate-300">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 transition-colors hover:text-[#00C8FF] group",
                  isActive ? "text-[#00C8FF] font-bold" : "text-slate-300"
                )}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00C8FF] to-[#009DFF] rounded-full shadow-[0_0_8px_#00C8FF]"
                    transition={EASINGS.gentleSpring}
                  />
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00C8FF]/60 rounded-full transition-all duration-200 group-hover:w-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={EASINGS.spring}
          >
            <Link
              href="/#campaign-enquiry"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00C8FF] to-[#009DFF] hover:from-[#33D4FF] hover:to-[#00C8FF] text-[#05080D] text-xs font-extrabold uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(0,200,255,0.4)]"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-300 hover:text-[#00C8FF] p-2 rounded-full hover:bg-white/10 transition border border-transparent"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5 text-[#00C8FF]" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden mt-2 max-w-6xl mx-auto bg-[#07111A]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl pointer-events-auto space-y-4"
          >
            <nav className="flex flex-col space-y-1.5">
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
                        "block text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition",
                        isActive
                          ? "text-[#00C8FF] bg-cyan-500/10 border border-cyan-500/30"
                          : "text-slate-300 hover:text-[#00C8FF] hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="pt-3 border-t border-white/10">
              <Link
                href="/#campaign-enquiry"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#00C8FF] to-[#009DFF] text-[#05080D] text-xs font-extrabold uppercase tracking-wider shadow-[0_4px_20px_rgba(0,200,255,0.4)] active:scale-98 transition"
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
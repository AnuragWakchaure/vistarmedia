"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdminAction } from "@/actions/auth.actions";
import {
  LayoutDashboard,
  Users,
  Film,
  Layers,
  Sparkles,
  Award,
  BarChart3,
  Home,
  Image as ImageIcon,
  Inbox,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminNav } from "./AdminNavContext";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads & Enquiries", href: "/admin/leads", icon: Inbox },
  { label: "Creators Network", href: "/admin/creators", icon: Users },
  { label: "Campaigns", href: "/admin/campaigns", icon: Film },
  { label: "Brand Partners", href: "/admin/brands", icon: Award },
  { label: "Agency Services", href: "/admin/services", icon: Layers },
  { label: "Testimonials", href: "/admin/testimonials", icon: Sparkles },
  { label: "Live Statistics", href: "/admin/statistics", icon: BarChart3 },
  { label: "Homepage Editor", href: "/admin/homepage", icon: Home },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "Global Settings", href: "/admin/settings", icon: SettingsIcon },
];

function NavContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#0D121D]">
      {/* Brand Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-white/10 shrink-0">
        <Link href="/admin" onClick={onClose} className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="VISTAR"
            className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(0,210,255,0.3)]"
          />
          <div>
            <div className="text-[10px] text-[#00D2FF] font-mono font-bold tracking-wider uppercase">Console</div>
          </div>
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all uppercase tracking-wider",
                isActive
                  ? "bg-[#00D2FF] text-black shadow-[0_0_15px_rgba(0,210,255,0.3)] font-black"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-black" : "text-slate-400")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Controls */}
      <div className="p-4 border-t border-white/10 space-y-2 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-[#00D2FF] hover:bg-white/10 transition uppercase tracking-wider"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#00D2FF]" />
            Live Website
          </span>
          <span className="text-[10px] font-mono text-slate-500">&rarr;</span>
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition uppercase tracking-wider cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const { isMobileOpen, closeMobileNav } = useAdminNav();

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#0D121D] border-r border-white/10 flex-col shrink-0 h-screen sticky top-0 z-40 text-slate-300">
        <NavContent />
      </aside>

      {/* Mobile Slide-Over Drawer with Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileNav}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Slide-in Drawer Container */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-72 max-w-[85vw] bg-[#0D121D] border-r border-white/10 flex flex-col h-full shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10"
            >
              <NavContent onClose={closeMobileNav} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
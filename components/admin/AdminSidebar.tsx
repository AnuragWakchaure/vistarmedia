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
  ShieldCheck,
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
  { label: "Admin & Security", href: "/admin/admins", icon: ShieldCheck },
];

function NavContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#0B0F18] border-r border-white/[0.08]">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-white/[0.08] shrink-0">
        <Link href="/admin" onClick={onClose} className="flex items-center gap-2.5 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="VISTAR"
            className="h-7 w-auto object-contain"
          />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#00B8F0] bg-[#00B8F0]/10 px-1.5 py-0.5 rounded border border-[#00B8F0]/20">
            Console
          </span>
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1] transition cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3.5 space-y-1 custom-scrollbar">
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
                "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150 select-none",
                isActive
                  ? "bg-white/[0.08] text-white font-semibold border-l-2 border-[#00B8F0] shadow-xs"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
              )}
            >
              <Icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-[#00B8F0]" : "text-slate-400")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Controls */}
      <div className="p-3.5 border-t border-white/[0.08] space-y-1.5 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#00B8F0]" />
            Live Website
          </span>
          <span className="text-[10px] font-mono text-slate-500">&rarr;</span>
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-400/90 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
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
              className="relative w-72 max-w-[85vw] bg-[#0D121D] border-r border-white/10 flex flex-col h-full shadow-2xl z-10"
            >
              <NavContent onClose={closeMobileNav} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
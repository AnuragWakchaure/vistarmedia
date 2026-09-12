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
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads / Enquiries", href: "/admin/leads", icon: Inbox },
  { label: "Creators", href: "/admin/creators", icon: Users },
  { label: "Campaigns", href: "/admin/campaigns", icon: Film },
  { label: "Brands", href: "/admin/brands", icon: Award },
  { label: "Services", href: "/admin/services", icon: Layers },
  { label: "Testimonials", href: "/admin/testimonials", icon: Sparkles },
  { label: "Statistics", href: "/admin/statistics", icon: BarChart3 },
  { label: "Homepage Editor", href: "/admin/homepage", icon: Home },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "Global Settings", href: "/admin/settings", icon: SettingsIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0B111E] border-r border-white/5 flex flex-col shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center font-black text-white text-base">
          V
        </div>
        <div>
          <div className="text-sm font-bold tracking-wide text-white">VISTAR</div>
          <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Admin Panel</div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === "/admin" 
            ? pathname === "/admin" 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors",
                isActive
                  ? "bg-[#0066FF] text-white font-semibold shadow-lg shadow-[#0066FF]/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
"use client";

import { Menu } from "lucide-react";
import { useAdminNav } from "./AdminNavContext";

export default function AdminMobileMenuButton() {
  const { toggleMobileNav } = useAdminNav();

  return (
    <button
      onClick={toggleMobileNav}
      className="lg:hidden p-2 rounded-xl bg-[#07090E] border border-white/10 text-slate-300 hover:border-[#00D2FF] hover:text-[#00D2FF] shadow-sm transition flex items-center justify-center cursor-pointer"
      aria-label="Open admin navigation menu"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}

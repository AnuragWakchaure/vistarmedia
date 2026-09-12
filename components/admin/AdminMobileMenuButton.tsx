"use client";

import { Menu } from "lucide-react";
import { useAdminNav } from "./AdminNavContext";

export default function AdminMobileMenuButton() {
  const { toggleMobileNav } = useAdminNav();

  return (
    <button
      onClick={toggleMobileNav}
      className="lg:hidden p-2 rounded-xl bg-white border-2 border-stone-200 text-stone-800 hover:border-[#B80F0A] hover:text-[#B80F0A] shadow-sm transition flex items-center justify-center cursor-pointer"
      aria-label="Open admin navigation menu"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}

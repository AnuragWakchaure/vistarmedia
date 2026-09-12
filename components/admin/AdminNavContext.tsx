"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface AdminNavContextType {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
}

const AdminNavContext = createContext<AdminNavContextType>({
  isMobileOpen: false,
  setIsMobileOpen: () => {},
  toggleMobileNav: () => {},
  closeMobileNav: () => {},
});

export function AdminNavProvider({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar automatically on navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  return (
    <AdminNavContext.Provider
      value={{
        isMobileOpen,
        setIsMobileOpen,
        toggleMobileNav: () => setIsMobileOpen((prev) => !prev),
        closeMobileNav: () => setIsMobileOpen(false),
      }}
    >
      {children}
    </AdminNavContext.Provider>
  );
}

export function useAdminNav() {
  return useContext(AdminNavContext);
}

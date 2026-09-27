"use client";

import React, { useEffect, useState, useTransition, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function NavigationProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [, startTransition] = useTransition();

  // Reset / complete progress whenever the route changes
  useEffect(() => {
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
        setLoading(false);
        setTimeout(() => setProgress(0), 200);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept click on any link that causes route navigation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Ignore clicks with modifier keys (new tab, etc.) or default prevented
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;

      if (!anchor) return;

      const targetAttr = anchor.getAttribute("target");
      if (targetAttr && targetAttr !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
        return;
      }

      // Check URL destination
      try {
        const currentUrl = new URL(window.location.href);
        const destinationUrl = new URL(anchor.href, window.location.href);

        // Ignore external domains
        if (destinationUrl.origin !== currentUrl.origin) return;

        // Ignore same page anchor/hash scrolls
        if (
          destinationUrl.pathname === currentUrl.pathname &&
          destinationUrl.search === currentUrl.search &&
          destinationUrl.hash
        ) {
          return;
        }

        // If navigating to a different path or query param
        if (
          destinationUrl.pathname !== currentUrl.pathname ||
          destinationUrl.search !== currentUrl.search
        ) {
          startTransition(() => {
            setLoading(true);
            setVisible(true);
            setProgress(18);
          });
        }
      } catch {
        // Ignore invalid URLs
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => document.removeEventListener("click", handleAnchorClick, true);
  }, []);

  // Smoothly increment progress while loading
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) return prev; // Hold at 88% until route resolves
        const increment = Math.max(1, (90 - prev) * 0.15);
        return Math.min(prev + increment, 88);
      });
    }, 120);

    // Safety timeout: reset if taking longer than 12s
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
      setVisible(false);
      setProgress(0);
    }, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, [loading]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
    >
      {/* Top clean progress bar */}
      <div
        className="h-[2px] bg-[#00B8F0] shadow-xs transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Floating subtle spinner indicator on longer loads */}
      {loading && progress > 30 && (
        <div className="fixed top-3.5 right-4 z-[9999] flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#0E131E]/95 border border-white/10 backdrop-blur-md shadow-md animate-fade-in pointer-events-none">
          <div className="w-3 h-3 rounded-full border-2 border-[#00B8F0] border-t-transparent animate-spin" />
          <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-300 uppercase">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
}

export default function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressInner />
    </Suspense>
  );
}

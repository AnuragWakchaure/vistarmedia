import React from "react";

export default function AdminLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Top Header Skeleton */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-white/10 rounded-lg" />
          <div className="h-4 w-72 bg-white/5 rounded-md" />
        </div>
        <div className="h-10 w-32 bg-white/10 rounded-xl" />
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#07111A] border border-white/5 space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-white/10 rounded" />
              <div className="w-8 h-8 rounded-lg bg-white/10" />
            </div>
            <div className="h-8 w-20 bg-white/15 rounded-lg" />
            <div className="h-3 w-36 bg-white/5 rounded" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="rounded-2xl bg-[#07111A] border border-white/5 p-6 space-y-4">
        <div className="h-5 w-40 bg-white/10 rounded" />
        <div className="space-y-2.5 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-full bg-white/[0.04] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

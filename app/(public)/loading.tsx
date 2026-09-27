import React from "react";
import Image from "next/image";

export default function PublicLoading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center relative px-4 select-none">
      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Crisp Brand Emblem */}
        <div className="relative w-12 h-12 rounded-xl bg-[#090D14] border border-white/10 p-2 flex items-center justify-center shadow-md">
          <Image
            src="/images/logo.png"
            alt="VISTAR Loading"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </div>

        {/* Brand Name & Sleek Progress Bar */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="font-anton text-lg tracking-wider text-slate-900">
            VISTAR MEDIA
          </div>

          <div className="w-36 h-0.5 bg-slate-200 rounded-full overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 bg-[#00B8F0] w-1/2 rounded-full animate-[shimmer_1.4s_infinite_ease-in-out]" />
          </div>

          <p className="text-[10px] font-mono text-slate-500 font-semibold tracking-wider uppercase">
            Loading
          </p>
        </div>
      </div>
    </div>
  );
}

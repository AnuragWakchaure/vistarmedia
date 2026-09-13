import React from "react";
import Image from "next/image";

export default function PublicLoading() {
  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-center relative px-4 select-none overflow-hidden">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center space-y-5">
        {/* Animated Brand Emblem with glowing pulse rings */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-[#00C8FF]/20 to-[#009DFF]/20 blur-md animate-pulse" />
          <div className="relative w-14 h-14 rounded-2xl bg-[#07111A] border border-cyan-500/30 p-2 flex items-center justify-center shadow-[0_0_25px_rgba(0,200,255,0.2)]">
            <Image
              src="/images/logo.png"
              alt="VISTAR Loading"
              width={40}
              height={40}
              className="object-contain animate-pulse"
              priority
            />
          </div>
        </div>

        {/* Brand Name & Animated Shimmer Bar */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="font-anton text-xl tracking-wider text-white">
            VISTAR MEDIA
          </div>

          <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00C8FF] via-[#38BDF8] to-[#009DFF] w-1/2 rounded-full animate-[shimmer_1.4s_infinite_ease-in-out]" />
          </div>

          <p className="text-[11px] font-mono text-cyan-400 font-medium tracking-widest uppercase">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}

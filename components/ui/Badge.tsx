import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "info" | "success" | "warning" | "destructive" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#00B8F0]/10 text-[#00B8F0] border-[#00B8F0]/30",
    info: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    destructive: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    neutral: "bg-white/[0.06] text-slate-300 border-white/10",
  };

  const dotColors = {
    default: "bg-[#00B8F0]",
    info: "bg-sky-400",
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    destructive: "bg-rose-400",
    neutral: "bg-slate-400",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-[11px] gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-md border tracking-wide uppercase leading-none select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />}
      {children}
    </span>
  );
}

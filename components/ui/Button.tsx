import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  isLoading?: boolean;
  pill?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      isLoading = false,
      pill = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isSpinnerActive = loading || isLoading;

    const baseStyles =
      "inline-flex items-center justify-center font-semibold text-xs transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8F0]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.99] select-none";

    const variantStyles = {
      primary:
        "bg-[#00B8F0] hover:bg-[#00A3D9] text-[#05080D] font-bold shadow-xs hover:shadow-sm",
      secondary:
        "bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/10 hover:border-white/20",
      outline:
        "bg-transparent border border-white/15 hover:border-white/30 text-white hover:bg-white/[0.04]",
      ghost:
        "bg-transparent hover:bg-white/[0.08] text-slate-300 hover:text-white",
      destructive:
        "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 hover:border-rose-500/40",
    };

    const sizeStyles = {
      xs: "h-7 px-2.5 text-[11px] gap-1.5",
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-xs tracking-wider gap-2",
      lg: "h-11 px-5 text-sm gap-2",
    };

    const radiusStyles = pill ? "rounded-full" : "rounded-lg";

    return (
      <button
        ref={ref}
        disabled={disabled || isSpinnerActive}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          radiusStyles,
          className
        )}
        {...props}
      >
        {isSpinnerActive && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

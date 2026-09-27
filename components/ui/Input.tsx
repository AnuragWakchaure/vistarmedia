import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      leftIcon,
      rightIcon,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-300 select-none"
          >
            {label}
            {props.required && <span className="text-rose-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={cn(
              "w-full h-10 px-3.5 text-xs text-white placeholder-slate-500 bg-[#0E131E] border border-white/10 rounded-lg transition-colors duration-150 font-medium",
              "focus:outline-none focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/40",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              leftIcon ? "pl-10" : "",
              rightIcon ? "pr-10" : "",
              error ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/30" : "",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-slate-400 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-[11px] font-medium text-rose-400">{error}</p>}
        {helperText && !error && (
          <p className="text-[11px] font-normal text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, id, children, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-slate-300 select-none"
          >
            {label}
            {props.required && <span className="text-rose-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full h-10 pl-3.5 pr-9 text-xs text-white bg-[#0E131E] border border-white/10 rounded-lg transition-colors duration-150 font-medium appearance-none cursor-pointer",
              "focus:outline-none focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/40",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "[&>option]:bg-[#0E131E] [&>option]:text-white",
              error ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/30" : "",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
        </div>
        {error && <p className="text-[11px] font-medium text-rose-400">{error}</p>}
        {helperText && !error && (
          <p className="text-[11px] font-normal text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

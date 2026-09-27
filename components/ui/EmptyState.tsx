import React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-10 sm:p-14 rounded-xl border border-dashed border-white/10 bg-[#0E131E]/60 space-y-3.5",
        className
      )}
    >
      {icon && (
        <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400">
          {icon}
        </div>
      )}
      <div className="space-y-1 max-w-sm">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        {description && (
          <p className="text-xs text-slate-400 font-normal leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

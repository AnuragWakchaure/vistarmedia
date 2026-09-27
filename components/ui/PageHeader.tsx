import React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  badge?: React.ReactNode;
  title: string;
  description?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  badge,
  title,
  description,
  subtitle,
  actions,
  className,
}: PageHeaderProps) {
  const descText = description || subtitle;

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/[0.06]",
        className
      )}
    >
      <div className="space-y-1.5 max-w-2xl">
        {badge && (
          <div>
            {typeof badge === "string" ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-[#00B8F0]/10 text-[#00B8F0] border border-[#00B8F0]/25">
                {badge}
              </span>
            ) : (
              badge
            )}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h1>
        {descText && (
          <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
            {descText}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2.5 shrink-0 sm:self-end">
          {actions}
        </div>
      )}
    </div>
  );
}

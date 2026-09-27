import { auth } from "@/lib/auth/session";
import { UserCheck, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import AdminMobileMenuButton from "./AdminMobileMenuButton";

export default async function AdminHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="h-16 bg-[#0B0F18]/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Drawer Trigger */}
        <AdminMobileMenuButton />

        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-slate-300 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00B8F0]" />
          <span className="hidden sm:inline">Admin Console</span>
          <span className="sm:hidden">Console</span>
        </div>
        <span className="hidden xl:inline text-xs text-slate-500 font-normal">
          &bull; Maharashtra Creator Ecosystem
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:pl-3 border-l border-white/[0.08]">
          <div className="text-right hidden xs:block">
            <div className="text-xs font-semibold text-white leading-tight truncate max-w-[140px]">
              {user?.name || "Administrator"}
            </div>
            <div className="text-[10px] text-slate-400 font-mono font-medium uppercase">
              {(user as any)?.role || "SUPER_ADMIN"}
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-[#00B8F0] shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
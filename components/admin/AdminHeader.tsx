import { auth } from "@/lib/auth/session";
import { UserCheck, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import AdminMobileMenuButton from "./AdminMobileMenuButton";

export default async function AdminHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="h-16 sm:h-20 bg-[#0D121D]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-md">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Drawer Trigger */}
        <AdminMobileMenuButton />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-[11px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-[#00D2FF]" />
          <span className="hidden sm:inline">VISTAR Admin Console</span>
          <span className="sm:hidden">Console</span>
        </div>
        <span className="hidden xl:inline text-xs text-slate-500 font-medium">
          &bull; Maharashtra Creator Ecosystem
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#00D2FF] border border-[#00D2FF]/30 text-[11px] font-bold uppercase tracking-wider transition shadow-sm hover:scale-[1.02]"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-white/10">
          <div className="text-right hidden xs:block">
            <div className="text-xs font-bold text-white leading-tight truncate max-w-[120px]">
              {user?.name || "Administrator"}
            </div>
            <div className="text-[10px] text-[#00D2FF] font-mono font-bold uppercase">
              {(user as any)?.role || "SUPER_ADMIN"}
            </div>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/40 flex items-center justify-center text-[#00D2FF] shadow-sm shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
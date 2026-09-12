import { auth } from "@/lib/auth/session";
import { UserCheck } from "lucide-react";

export default async function AdminHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="h-16 bg-[#080C14] border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="text-xs text-slate-400">
        Maharashtra Influencer Ecosystem &bull; CMS Engine
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-xs font-semibold text-white">{user?.name || "Administrator"}</div>
          <div className="text-[10px] text-[#0066FF] font-mono">{(user as any)?.role || "SUPER_ADMIN"}</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
          <UserCheck className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
import { getAdminsAction } from "@/actions/auth.actions";
import { getCurrentUser } from "@/lib/auth/session";
import AdminSecuritySection from "@/components/admin/AdminSecuritySection";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminsManagementPage() {
  const [admins, currentUser] = await Promise.all([
    getAdminsAction(),
    getCurrentUser(),
  ]);

  return (
    <div className="max-w-6xl space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Security & Access Control</span>
        </div>
        <h1 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
          Admin Access & Credentials
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          Manage administrator passwords, create new team members, and control system access privileges.
        </p>
      </div>

      <AdminSecuritySection
        admins={admins}
        currentUserEmail={currentUser?.email || undefined}
      />
    </div>
  );
}

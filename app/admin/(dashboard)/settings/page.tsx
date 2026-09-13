import { getSettingsAction } from "@/actions/settings.actions";
import SettingsForm from "@/components/admin/SettingsForm";
import { Settings as SettingsIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettingsAction();

  return (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)]">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>Agency Configuration</span>
        </div>
        <h1 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
          Global Agency Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          Configure site-wide contact data, WhatsApp live chat routing number, address, and social links.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-[#0D121D]/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">Administrator Access & Credentials</h3>
          <p className="text-xs text-slate-400">Change your password or manage team administrator accounts.</p>
        </div>
        <a
          href="/admin/admins"
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#00D2FF] text-slate-200 hover:text-black font-bold text-xs uppercase tracking-wider transition shrink-0 inline-flex items-center gap-1.5"
        >
          <span>Manage Admins &rarr;</span>
        </a>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  );
}
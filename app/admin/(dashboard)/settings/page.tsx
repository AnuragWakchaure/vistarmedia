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

      <SettingsForm initialData={settings} />
    </div>
  );
}
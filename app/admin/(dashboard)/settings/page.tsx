import { getSettingsAction } from "@/actions/settings.actions";
import SettingsForm from "@/components/admin/SettingsForm";
import { Settings as SettingsIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettingsAction();

  return (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>Agency Configuration</span>
        </div>
        <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
          Global Agency Settings
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Configure site-wide contact data, WhatsApp live chat routing number, address, and social links.
        </p>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  );
}
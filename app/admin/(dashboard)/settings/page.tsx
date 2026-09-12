import { getSettingsAction } from "@/actions/settings.actions";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettingsAction();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Global Agency Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure site-wide contact data, the live WhatsApp routing number, and social endpoints.
        </p>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  );
}
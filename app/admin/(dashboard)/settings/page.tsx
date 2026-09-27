import { getSettingsAction } from "@/actions/settings.actions";
import SettingsForm from "@/components/admin/SettingsForm";
import Link from "next/link";
import { PageHeader, Badge, Card, Button } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettingsAction();

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        badge={
          <Badge variant="default" dot size="sm">
            Agency Configuration
          </Badge>
        }
        title="Global Agency Settings"
        description="Configure site-wide contact data, WhatsApp live chat routing number, address, and social links."
      />

      <Card className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold text-white">Administrator Access & Credentials</h3>
          <p className="text-xs text-slate-400">Change your password or manage team administrator accounts.</p>
        </div>
        <Link href="/admin/admins">
          <Button variant="secondary" size="sm">
            Manage Admins &rarr;
          </Button>
        </Link>
      </Card>

      <SettingsForm initialData={settings} />
    </div>
  );
}
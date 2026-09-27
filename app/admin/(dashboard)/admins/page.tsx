import { getAdminsAction } from "@/actions/auth.actions";
import { getCurrentUser } from "@/lib/auth/session";
import AdminSecuritySection from "@/components/admin/AdminSecuritySection";
import { PageHeader, Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AdminsManagementPage() {
  const [admins, currentUser] = await Promise.all([
    getAdminsAction(),
    getCurrentUser(),
  ]);

  return (
    <div className="max-w-6xl space-y-8">
      <PageHeader
        badge={
          <Badge variant="default" dot size="sm">
            Security & Access Control
          </Badge>
        }
        title="Admin Access & Credentials"
        description="Manage administrator passwords, onboard new team members, and control access privileges."
      />

      <AdminSecuritySection
        admins={admins}
        currentUserEmail={currentUser?.email || undefined}
      />
    </div>
  );
}

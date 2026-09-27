import CreatorForm from "@/components/admin/CreatorForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NewCreatorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="New Roster Entry"
        title="Add New Creator"
        subtitle="Create a verified creator profile in the VISTAR Maharashtra network."
      />
      <CreatorForm />
    </div>
  );
}
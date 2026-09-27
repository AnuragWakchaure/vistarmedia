import { connectDB } from "@/lib/db/client";
import { Creator } from "@/models/Creator";
import CreatorForm from "@/components/admin/CreatorForm";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";

export const dynamic = "force-dynamic";

export default async function EditCreatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();

  const creator = await Creator.findById(id).lean();
  if (!creator) return notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Edit Roster Profile"
        title={`Edit ${creator.name}`}
        subtitle="Update profile information, metrics, or category tags."
      />
      <CreatorForm initialData={JSON.parse(JSON.stringify(creator))} />
    </div>
  );
}
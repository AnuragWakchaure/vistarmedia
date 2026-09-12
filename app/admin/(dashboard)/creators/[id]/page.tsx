import { connectDB } from "@/lib/db/client";
import { Creator } from "@/models/Creator";
import CreatorForm from "@/components/admin/CreatorForm";
import { notFound } from "next/navigation";

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Edit Creator</h1>
        <p className="text-xs text-slate-400 mt-1">
          Update profile information, metrics, or category tags.
        </p>
      </div>
      <CreatorForm initialData={JSON.parse(JSON.stringify(creator))} />
    </div>
  );
}
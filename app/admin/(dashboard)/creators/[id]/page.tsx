import { connectDB } from "@/lib/db/client";
import { Creator } from "@/models/Creator";
import CreatorForm from "@/components/admin/CreatorForm";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";

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
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Edit Roster Profile</span>
        </div>
        <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
          Edit {creator.name}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Update profile information, metrics, or category tags.
        </p>
      </div>
      <CreatorForm initialData={JSON.parse(JSON.stringify(creator))} />
    </div>
  );
}
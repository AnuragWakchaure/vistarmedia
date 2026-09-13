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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Edit Roster Profile</span>
        </div>
        <h1 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
          Edit {creator.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          Update profile information, metrics, or category tags.
        </p>
      </div>
      <CreatorForm initialData={JSON.parse(JSON.stringify(creator))} />
    </div>
  );
}
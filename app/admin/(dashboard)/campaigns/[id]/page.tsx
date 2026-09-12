import { connectDB } from "@/lib/db/client";
import { Campaign } from "@/models/Campaign";
import { getCampaignFormDataAction } from "@/actions/campaign.actions";
import CampaignForm from "@/components/admin/CampaignForm";
import { notFound } from "next/navigation";
import { Film } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();

  const [campaign, { brands, creators }] = await Promise.all([
    Campaign.findById(id).lean(),
    getCampaignFormDataAction(),
  ]);

  if (!campaign) return notFound();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
          <Film className="w-3.5 h-3.5" />
          <span>Edit Case Study</span>
        </div>
        <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
          Edit {campaign.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Update case study results, creators involved, or strategy notes.
        </p>
      </div>
      <CampaignForm
        initialData={JSON.parse(JSON.stringify(campaign))}
        brands={brands}
        creators={creators}
      />
    </div>
  );
}
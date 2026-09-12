import { getCampaignFormDataAction } from "@/actions/campaign.actions";
import CampaignForm from "@/components/admin/CampaignForm";
import { Film } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewCampaignPage() {
  const { brands, creators } = await getCampaignFormDataAction();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
          <Film className="w-3.5 h-3.5" />
          <span>New Case Study</span>
        </div>
        <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
          Publish New Campaign
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Publish a new brand collaboration or regional marketing case study.
        </p>
      </div>
      <CampaignForm brands={brands} creators={creators} />
    </div>
  );
}
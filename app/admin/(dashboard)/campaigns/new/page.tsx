import { getCampaignFormDataAction } from "@/actions/campaign.actions";
import CampaignForm from "@/components/admin/CampaignForm";
import { Film } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewCampaignPage() {
  const { brands, creators } = await getCampaignFormDataAction();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.15)]">
          <Film className="w-3.5 h-3.5" />
          <span>New Case Study</span>
        </div>
        <h1 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight">
          Publish New Campaign
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          Publish a new brand collaboration or regional marketing case study.
        </p>
      </div>
      <CampaignForm brands={brands} creators={creators} />
    </div>
  );
}
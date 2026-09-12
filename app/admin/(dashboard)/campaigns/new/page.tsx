import { getCampaignFormDataAction } from "@/actions/campaign.actions";
import CampaignForm from "@/components/admin/CampaignForm";

export const dynamic = "force-dynamic";

export default async function NewCampaignPage() {
  const { brands, creators } = await getCampaignFormDataAction();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">New Campaign Case Study</h1>
        <p className="text-xs text-slate-400 mt-1">
          Publish a new brand collaboration or marketing case study.
        </p>
      </div>
      <CampaignForm brands={brands} creators={creators} />
    </div>
  );
}
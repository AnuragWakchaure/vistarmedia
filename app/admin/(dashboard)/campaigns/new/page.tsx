import { getCampaignFormDataAction } from "@/actions/campaign.actions";
import CampaignForm from "@/components/admin/CampaignForm";
import { PageHeader } from "@/components/ui/PageHeader";

export const dynamic = "force-dynamic";

export default async function NewCampaignPage() {
  const { brands, creators } = await getCampaignFormDataAction();

  return (
    <div className="space-y-6">
      <PageHeader
        badge="New Case Study"
        title="Publish New Campaign"
        subtitle="Publish a new brand collaboration or regional marketing case study."
      />
      <CampaignForm brands={brands} creators={creators} />
    </div>
  );
}
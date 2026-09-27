import { connectDB } from "@/lib/db/client";
import { Campaign } from "@/models/Campaign";
import { getCampaignFormDataAction } from "@/actions/campaign.actions";
import CampaignForm from "@/components/admin/CampaignForm";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";

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
      <PageHeader
        badge="Edit Case Study"
        title={`Edit ${campaign.title}`}
        subtitle="Update case study results, creators involved, or strategy notes."
      />
      <CampaignForm
        initialData={JSON.parse(JSON.stringify(campaign))}
        brands={brands}
        creators={creators}
      />
    </div>
  );
}
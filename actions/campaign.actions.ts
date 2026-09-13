"use server";

import { connectDB } from "@/lib/db/client";
import { Campaign } from "@/models/Campaign";
import { Brand } from "@/models/Brand";
import { Creator } from "@/models/Creator";
import { CampaignInputSchema } from "@/lib/validations/campaign.schema";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

const DEFAULT_CAMPAIGNS = [
  {
    _id: "cp1",
    title: "Mahindra Tractors Mega Kisan Utsav",
    slug: "mahindra-tractors-mega-kisan-utsav",
    description: "Multi-creator vernacular agri campaign across Western Maharashtra driving awareness and test drives.",
    featuredImage: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
    industry: "Automobile & Agriculture",
    status: "PUBLISHED",
    featured: true,
    results: [
      { metric: "Total Video Views", value: "4.2M+" },
      { metric: "Engagement Rate", value: "8.4%" },
      { metric: "Dealer Enquiries", value: "1,200+" },
    ],
  },
  {
    _id: "cp2",
    title: "Sahyadri Farms Fresh Export Launch",
    slug: "sahyadri-farms-fresh-export-launch",
    description: "Vernacular food creator campaign celebrating local farm-to-table produce and retail distribution.",
    featuredImage: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format&fit=crop&q=80",
    industry: "FMCG & Agriculture",
    status: "PUBLISHED",
    featured: true,
    results: [
      { metric: "Content Impressions", value: "3.1M+" },
      { metric: "Recipe Shares", value: "85K+" },
    ],
  },
];

export async function getCampaignsAction(params?: {
  search?: string;
  industry?: string;
  status?: string;
}) {
  try {
    await connectDB();
    const query: any = {};

    if (params?.search) {
      query.$or = [
        { title: { $regex: params.search, $options: "i" } },
        { description: { $regex: params.search, $options: "i" } },
      ];
    }
    if (params?.industry && params.industry !== "ALL") {
      query.industry = params.industry;
    }
    if (params?.status && params.status !== "ALL") {
      query.status = params.status;
    }

    const campaigns = await Campaign.find(query)
      .populate("brandId", "name logo")
      .sort({ createdAt: -1 })
      .lean();

    if (!campaigns || campaigns.length === 0) {
      return DEFAULT_CAMPAIGNS;
    }

    return JSON.parse(JSON.stringify(campaigns));
  } catch (error) {
    console.warn("[Campaigns] Database unreachable, serving default campaigns:", error);
    return DEFAULT_CAMPAIGNS;
  }
}

export async function getCampaignFormDataAction() {
  await connectDB();
  const [brands, creators] = await Promise.all([
    Brand.find({ status: "ACTIVE" }).select("name logo").sort({ name: 1 }).lean(),
    Creator.find({ status: "PUBLISHED" }).select("name location").sort({ name: 1 }).lean(),
  ]);

  return {
    brands: JSON.parse(JSON.stringify(brands)),
    creators: JSON.parse(JSON.stringify(creators)),
  };
}

export async function createCampaignAction(data: any) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"]);
  await connectDB();

  const validated = CampaignInputSchema.parse(data);

  const exists = await Campaign.findOne({ slug: validated.slug });
  if (exists) {
    throw new Error("A campaign with this slug already exists.");
  }

  const campaign = await Campaign.create({
    ...validated,
    publishedAt: validated.status === "PUBLISHED" ? new Date() : undefined,
  });

  revalidatePath("/admin/campaigns");
  revalidatePath("/campaigns");
  revalidatePath(`/campaigns/${validated.slug}`);
  return JSON.parse(JSON.stringify(campaign));
}

export async function updateCampaignAction(id: string, data: any) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"]);
  await connectDB();

  const validated = CampaignInputSchema.parse(data);

  const existing = await Campaign.findById(id);
  if (!existing) throw new Error("Campaign not found");

  const publishedAt =
    validated.status === "PUBLISHED" && !existing.publishedAt
      ? new Date()
      : existing.publishedAt;

  const updated = await Campaign.findByIdAndUpdate(
    id,
    { ...validated, publishedAt },
    { new: true }
  );

  revalidatePath("/admin/campaigns");
  revalidatePath(`/admin/campaigns/${id}`);
  revalidatePath("/campaigns");
  revalidatePath(`/campaigns/${validated.slug}`);
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteCampaignAction(id: string) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await Campaign.findByIdAndDelete(id);
  revalidatePath("/admin/campaigns");
  revalidatePath("/campaigns");
  return { success: true };
}
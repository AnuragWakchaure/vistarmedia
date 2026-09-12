import { MetadataRoute } from "next";
import { connectDB } from "@/lib/db/client";
import { Campaign } from "@/models/Campaign";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://vistar.agency";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/creators`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/campaigns`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    await connectDB();
    const campaigns = await Campaign.find({ status: "PUBLISHED" }, "slug updatedAt").lean();
    const campaignRoutes: MetadataRoute.Sitemap = campaigns.map((camp: any) => ({
      url: `${baseUrl}/campaigns/${camp.slug}`,
      lastModified: camp.updatedAt || new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...campaignRoutes];
  } catch {
    return staticRoutes;
  }
}

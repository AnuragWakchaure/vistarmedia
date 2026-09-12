import { z } from "zod";

export const CampaignResultSchema = z.object({
  metric: z.string().min(1, "Metric is required"),
  value: z.string().min(1, "Value is required"),
  label: z.string().min(1, "Label is required"),
  isDemo: z.boolean().default(false),
});

export const CampaignVideoSchema = z.object({
  title: z.string().default(""),
  url: z.string().url("Must be a valid video link"),
  platform: z.string().default("Instagram"),
});

export const CampaignInputSchema = z.object({
  brandId: z.string().min(1, "Brand is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(2, "Slug is required"),
  industry: z.string().min(2, "Industry is required"),
  campaignType: z.string().min(2, "Campaign type is required"),
  location: z.string().default("Maharashtra"),
  objective: z.string().min(10, "Objective must be at least 10 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  coverImage: z.string().url("Cover image must be a valid URL"),
  gallery: z.array(z.string()).default([]),
  videos: z.array(CampaignVideoSchema).default([]),
  creatorIds: z.array(z.string()).default([]),
  results: z.array(CampaignResultSchema).default([]),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export type CampaignInput = z.infer<typeof CampaignInputSchema>;
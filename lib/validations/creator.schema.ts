import { z } from "zod";

export const CreatorPlatformSchema = z.object({
  platform: z.enum(["Instagram", "YouTube", "Facebook", "Other"]),
  handle: z.string().min(1, "Handle is required"),
  profileUrl: z.string().url("Must be a valid URL"),
  followerCount: z.coerce.number().min(0).default(0),
});

export const CreatorInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug is required"),
  profileImage: z.string().url("Profile image must be a valid URL"),
  bio: z.string().max(500).default(""),
  location: z.string().min(2, "Location is required"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  platforms: z.array(CreatorPlatformSchema).default([]),
  totalFollowers: z.coerce.number().min(0).default(0),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  displayOrder: z.coerce.number().default(0),
});

export type CreatorInput = z.infer<typeof CreatorInputSchema>;
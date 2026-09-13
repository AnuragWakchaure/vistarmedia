"use server";

import { connectDB } from "@/lib/db/client";
import { Creator } from "@/models/Creator";
import { CreatorInputSchema } from "@/lib/validations/creator.schema";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

const DEFAULT_CREATORS = [
  {
    _id: "c1",
    name: "Sachin Shete",
    slug: "sachin-shete",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bio: "Pioneering Marathi agri-content creator, modern farming techniques, rural innovation.",
    location: "Ahilyanagar",
    categories: ["Agriculture", "Marathi Content"],
    totalFollowers: 680000,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 1,
    platforms: [
      { platform: "YouTube", handle: "@SachinSheteOfficial", profileUrl: "https://youtube.com", followerCount: 450000 },
      { platform: "Instagram", handle: "@sachin_shete_agri", profileUrl: "https://instagram.com", followerCount: 230000 },
    ],
  },
  {
    _id: "c2",
    name: "Pooja Patil",
    slug: "pooja-patil",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bio: "Authentic Maharashtrian culinary explorer, traditional recipes, and local street food curation.",
    location: "Pune",
    categories: ["Food", "Lifestyle", "Marathi Content"],
    totalFollowers: 320000,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 2,
    platforms: [
      { platform: "Instagram", handle: "@pooja_taste_mh", profileUrl: "https://instagram.com", followerCount: 210000 },
      { platform: "YouTube", handle: "@PoojaPatilKitchen", profileUrl: "https://youtube.com", followerCount: 110000 },
    ],
  },
  {
    _id: "c3",
    name: "Rohan Deshmukh",
    slug: "rohan-deshmukh",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    bio: "Consumer tech, smartphone reviews in Marathi, gadget testing, and smart automotive systems.",
    location: "Mumbai",
    categories: ["Technology", "Automobile", "Marathi Content"],
    totalFollowers: 450000,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 3,
    platforms: [
      { platform: "YouTube", handle: "@MarathiTechRohan", profileUrl: "https://youtube.com", followerCount: 310000 },
      { platform: "Instagram", handle: "@rohan_tech_reviews", profileUrl: "https://instagram.com", followerCount: 140000 },
    ],
  },
  {
    _id: "c4",
    name: "Tanvi Kulkarni",
    slug: "tanvi-kulkarni",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    bio: "Pune city lifestyle, fashion styling, and authentic daily situational comedy reels.",
    location: "Pune",
    categories: ["Fashion", "Lifestyle", "Comedy"],
    totalFollowers: 275000,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 4,
    platforms: [
      { platform: "Instagram", handle: "@tanvi_kulkarni_official", profileUrl: "https://instagram.com", followerCount: 275000 },
    ],
  },
];

export async function getCreatorsAction(params?: {
  search?: string;
  category?: string;
  location?: string;
  status?: string;
}) {
  try {
    await connectDB();
    const query: any = {};

    if (params?.search) {
      query.$or = [
        { name: { $regex: params.search, $options: "i" } },
        { bio: { $regex: params.search, $options: "i" } },
      ];
    }
    if (params?.category && params.category !== "ALL") {
      query.categories = params.category;
    }
    if (params?.location && params.location !== "ALL") {
      query.location = params.location;
    }
    if (params?.status && params.status !== "ALL") {
      query.status = params.status;
    }

    const creators = await Creator.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    if (!creators || creators.length === 0) {
      return DEFAULT_CREATORS;
    }

    return JSON.parse(JSON.stringify(creators));
  } catch (error) {
    console.warn("[Creators] Database unreachable, serving default creators:", error);
    return DEFAULT_CREATORS;
  }
}

export async function createCreatorAction(data: any) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"]);
  await connectDB();

  const validated = CreatorInputSchema.parse(data);

  const exists = await Creator.findOne({ slug: validated.slug });
  if (exists) {
    throw new Error("A creator with this slug already exists.");
  }

  const creator = await Creator.create(validated);
  revalidatePath("/admin/creators");
  revalidatePath("/creators");
  return JSON.parse(JSON.stringify(creator));
}

export async function updateCreatorAction(id: string, data: any) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"]);
  await connectDB();

  const validated = CreatorInputSchema.parse(data);

  const updated = await Creator.findByIdAndUpdate(id, validated, { new: true });
  if (!updated) throw new Error("Creator not found");

  revalidatePath("/admin/creators");
  revalidatePath(`/admin/creators/${id}`);
  revalidatePath("/creators");
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteCreatorAction(id: string) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await Creator.findByIdAndDelete(id);
  revalidatePath("/admin/creators");
  revalidatePath("/creators");
  return { success: true };
}

export async function toggleCreatorStatusAction(id: string, status: "DRAFT" | "PUBLISHED" | "ARCHIVED") {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"]);
  await connectDB();

  const updated = await Creator.findByIdAndUpdate(id, { status }, { new: true });
  revalidatePath("/admin/creators");
  revalidatePath("/creators");
  return JSON.parse(JSON.stringify(updated));
}
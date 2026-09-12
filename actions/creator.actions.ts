"use server";

import { connectDB } from "@/lib/db/client";
import { Creator } from "@/models/Creator";
import { CreatorInputSchema } from "@/lib/validations/creator.schema";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function getCreatorsAction(params?: {
  search?: string;
  category?: string;
  location?: string;
  status?: string;
}) {
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

  return JSON.parse(JSON.stringify(creators));
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
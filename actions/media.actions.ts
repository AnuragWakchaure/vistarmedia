"use server";

import { connectDB } from "@/lib/db/client";
import { Media } from "@/models/Media";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function getMediaAction() {
  await connectDB();
  const media = await Media.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(media));
}

export async function createMediaAction(formData: FormData) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"]);
  await connectDB();

  await Media.create({
    name: formData.get("name") as string,
    url: formData.get("url") as string,
    type: ((formData.get("type") as string) || "IMAGE") as "IMAGE" | "VIDEO" | "LOGO" | "DOCUMENT",
    altText: (formData.get("altText") as string) || "",
  });

  revalidatePath("/admin/media");
}

export async function deleteMediaAction(id: string) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await Media.findByIdAndDelete(id);
  revalidatePath("/admin/media");
}
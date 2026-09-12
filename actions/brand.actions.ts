"use server";

import { connectDB } from "@/lib/db/client";
import { Brand } from "@/models/Brand";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function getBrandsAction() {
  await connectDB();
  const brands = await Brand.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(brands));
}

export async function createBrandAction(formData: FormData) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await Brand.create({
    name: formData.get("name") as string,
    logo: formData.get("logo") as string,
    website: (formData.get("website") as string) || "",
    description: (formData.get("description") as string) || "",
    displayOrder: Number(formData.get("displayOrder") || 0),
    status: ((formData.get("status") as string) || "ACTIVE") as "ACTIVE" | "INACTIVE",
    featured: formData.get("featured") === "on",
  });

  revalidatePath("/admin/brands");
  revalidatePath("/");
}

export async function deleteBrandAction(id: string) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await Brand.findByIdAndDelete(id);
  revalidatePath("/admin/brands");
  revalidatePath("/");
}
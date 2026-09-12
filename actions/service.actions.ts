"use server";

import { connectDB } from "@/lib/db/client";
import { Service } from "@/models/Service";
import { requireAdminRole } from "@/lib/auth/session";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getServicesAction() {
  await connectDB();
  const services = await Service.find().sort({ displayOrder: 1 }).lean();
  return JSON.parse(JSON.stringify(services));
}

export async function createServiceAction(formData: FormData) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  const title = formData.get("title") as string;
  await Service.create({
    title,
    slug: slugify(title),
    shortDescription: formData.get("shortDescription") as string,
    displayOrder: Number(formData.get("displayOrder") || 0),
    status: ((formData.get("status") as string) || "ACTIVE") as "ACTIVE" | "INACTIVE",
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function deleteServiceAction(id: string) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await Service.findByIdAndDelete(id);
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}
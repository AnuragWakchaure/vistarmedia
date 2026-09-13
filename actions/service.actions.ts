"use server";

import { connectDB } from "@/lib/db/client";
import { Service } from "@/models/Service";
import { requireAdminRole } from "@/lib/auth/session";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { DEFAULT_SERVICES } from "@/lib/data/services-data";

export async function getServicesAction() {
  try {
    await connectDB();
    const services = await Service.find().sort({ displayOrder: 1 }).lean();
    if (!services || services.length === 0) {
      return DEFAULT_SERVICES;
    }
    return JSON.parse(JSON.stringify(services));
  } catch (error) {
    console.warn("[Services] Database unreachable, serving default services:", error);
    return DEFAULT_SERVICES;
  }
}

export async function createServiceAction(formData: FormData) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  const title = formData.get("title") as string;
  const image = ((formData.get("image") as string) || "").trim();

  await Service.create({
    title,
    slug: slugify(title),
    shortDescription: formData.get("shortDescription") as string,
    image,
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
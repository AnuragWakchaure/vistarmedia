"use server";

import { connectDB } from "@/lib/db/client";
import { Brand } from "@/models/Brand";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

const DEFAULT_BRANDS = [
  { _id: "b1", name: "Mahindra Tractors", logo: "/images/brands/mahindra-tractors.png", website: "https://mahindratractor.com", displayOrder: 1, featured: true, status: "ACTIVE" },
  { _id: "b2", name: "TVS Motors", logo: "/images/brands/tvs-motors.png", website: "https://tvsmotor.com", displayOrder: 2, featured: true, status: "ACTIVE" },
  { _id: "b3", name: "Siddhant Seeds", logo: "/images/brands/siddhant-seeds.png", website: "https://siddhantseeds.com", displayOrder: 3, featured: true, status: "ACTIVE" },
];

export async function getBrandsAction() {
  try {
    await connectDB();
    const brands = await Brand.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    if (!brands || brands.length === 0) {
      return DEFAULT_BRANDS;
    }
    return JSON.parse(JSON.stringify(brands));
  } catch (error) {
    console.warn("[Brands] Database unreachable, serving fallback brands:", error);
    return DEFAULT_BRANDS;
  }
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
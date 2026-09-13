"use server";

import { connectDB } from "@/lib/db/client";
import { CreatorLocation, ICreatorLocation } from "@/models/CreatorLocation";
import { DEFAULT_CREATOR_LOCATIONS, CreatorLocationItem } from "@/lib/data/maharashtra-geo";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function getCreatorLocationsAction(): Promise<CreatorLocationItem[]> {
  try {
    await connectDB();
    const locations = await CreatorLocation.find({ active: true })
      .sort({ displayOrder: 1, creatorCount: -1 })
      .lean();

    if (!locations || locations.length === 0) {
      return DEFAULT_CREATOR_LOCATIONS;
    }

    return locations.map((loc: any) => ({
      _id: loc._id.toString(),
      name: loc.name,
      lat: loc.latitude,
      lon: loc.longitude,
      creatorCount: loc.creatorCount,
      countDisplay: loc.countDisplay || `${loc.creatorCount}+`,
      category: loc.category,
      description: loc.description,
      active: loc.active,
      displayOrder: loc.displayOrder,
    }));
  } catch (error) {
    console.error("Error fetching creator locations from DB, using fallback:", error);
    return DEFAULT_CREATOR_LOCATIONS;
  }
}

export async function createLocationAction(formData: FormData) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await CreatorLocation.create({
    name: formData.get("name") as string,
    latitude: Number(formData.get("latitude")),
    longitude: Number(formData.get("longitude")),
    creatorCount: Number(formData.get("creatorCount") || 0),
    countDisplay: (formData.get("countDisplay") as string) || `${formData.get("creatorCount")}+`,
    category: (formData.get("category") as string) || "General Vernacular",
    description: (formData.get("description") as string) || "",
    displayOrder: Number(formData.get("displayOrder") || 0),
    active: formData.get("active") !== "false",
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateLocationAction(id: string, formData: FormData) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await CreatorLocation.findByIdAndUpdate(id, {
    name: formData.get("name") as string,
    latitude: Number(formData.get("latitude")),
    longitude: Number(formData.get("longitude")),
    creatorCount: Number(formData.get("creatorCount") || 0),
    countDisplay: (formData.get("countDisplay") as string) || `${formData.get("creatorCount")}+`,
    category: (formData.get("category") as string) || "General Vernacular",
    description: (formData.get("description") as string) || "",
    displayOrder: Number(formData.get("displayOrder") || 0),
    active: formData.get("active") !== "false",
    updatedAt: new Date(),
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteLocationAction(id: string) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await CreatorLocation.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/admin");
}

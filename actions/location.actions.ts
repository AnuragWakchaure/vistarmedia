"use server";

import { connectDB } from "@/lib/db/client";
import { CreatorLocation, ICreatorLocation } from "@/models/CreatorLocation";
import { DEFAULT_CREATOR_LOCATIONS, CreatorLocationItem } from "@/lib/data/maharashtra-geo";
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
    console.error("Error fetching creator locations from DB, using defaults:", error);
    return DEFAULT_CREATOR_LOCATIONS;
  }
}

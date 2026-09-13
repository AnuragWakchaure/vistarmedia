"use server";

import { connectDB } from "@/lib/db/client";
import { Statistic } from "@/models/Statistic";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

const DEFAULT_STATS = [
  { _id: "s1", label: "Creators Roster", value: "500", suffix: "+", description: "Top verified creators across Maharashtra", displayOrder: 1, status: "ACTIVE" },
  { _id: "s2", label: "Audience Reach", value: "25", suffix: "M+", description: "Monthly vernacular impressions generated", displayOrder: 2, status: "ACTIVE" },
  { _id: "s3", label: "Brand Campaigns", value: "120", suffix: "+", description: "Delivered for leading national & regional brands", displayOrder: 3, status: "ACTIVE" },
  { _id: "s4", label: "Regional Coverage", value: "36", suffix: " Districts", description: "Comprehensive footprint across Maharashtra", displayOrder: 4, status: "ACTIVE" },
];

export async function getStatisticsAction() {
  try {
    await connectDB();
    const stats = await Statistic.find().sort({ displayOrder: 1 }).lean();
    if (!stats || stats.length === 0) {
      return DEFAULT_STATS;
    }
    return JSON.parse(JSON.stringify(stats));
  } catch (error) {
    console.warn("[Statistics] Database unreachable, serving fallback statistics:", error);
    return DEFAULT_STATS;
  }
}

export async function createStatisticAction(formData: FormData) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await Statistic.create({
    label: formData.get("label") as string,
    value: formData.get("value") as string,
    suffix: (formData.get("suffix") as string) || "",
    description: (formData.get("description") as string) || "",
    displayOrder: Number(formData.get("displayOrder") || 0),
    status: "ACTIVE",
  });

  revalidatePath("/admin/statistics");
  revalidatePath("/");
}

export async function deleteStatisticAction(id: string) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await Statistic.findByIdAndDelete(id);
  revalidatePath("/admin/statistics");
  revalidatePath("/");
}
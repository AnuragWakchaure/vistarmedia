"use server";

import { connectDB } from "@/lib/db/client";
import { Statistic } from "@/models/Statistic";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

const DEFAULT_STATS = [
  { _id: "s1", label: "Verified Creators", value: "200", suffix: "+", description: "Over 200 handpicked regional creators vetted for authentic engagement", displayOrder: 1, status: "ACTIVE" },
  { _id: "s2", label: "Districts Covered", value: "35", suffix: "+", description: "Deep geographic presence across Pune, Mumbai, Nashik, Kolhapur, and rural belts", displayOrder: 2, status: "ACTIVE" },
  { _id: "s3", label: "Vernacular Resonance", value: "3.8", suffix: "x", description: "Culturally tuned Marathi content delivering higher brand recall", displayOrder: 3, status: "ACTIVE" },
  { _id: "s4", label: "Bot Pod Inflation", value: "0", suffix: "%", description: "Transparent real-time telemetry and 100% human-verified auditing", displayOrder: 4, status: "ACTIVE" },
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
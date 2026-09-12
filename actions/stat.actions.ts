"use server";

import { connectDB } from "@/lib/db/client";
import { Statistic } from "@/models/Statistic";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function getStatisticsAction() {
  await connectDB();
  const stats = await Statistic.find().sort({ displayOrder: 1 }).lean();
  return JSON.parse(JSON.stringify(stats));
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
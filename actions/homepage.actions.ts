"use server";

import { connectDB } from "@/lib/db/client";
import { Homepage } from "@/models/Homepage";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function getHomepageContentAction() {
  await connectDB();
  let content = await Homepage.findOne().lean();

  if (!content) {
    content = await Homepage.create({});
    content = JSON.parse(JSON.stringify(content));
  }

  return JSON.parse(JSON.stringify(content));
}

export async function updateHomepageContentAction(formData: FormData) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"]);
  await connectDB();

  const payload = {
    heroHeading: formData.get("heroHeading") as string,
    heroSubheading: formData.get("heroSubheading") as string,
    heroHighlight: formData.get("heroHighlight") as string,
    primaryCtaText: formData.get("primaryCtaText") as string,
    secondaryCtaText: formData.get("secondaryCtaText") as string,
    whyUsHeading: formData.get("whyUsHeading") as string,
    whyUsDescription: formData.get("whyUsDescription") as string,
    creatorsHeading: formData.get("creatorsHeading") as string,
    creatorsDescription: formData.get("creatorsDescription") as string,
    maharashtraHeading: formData.get("maharashtraHeading") as string,
    maharashtraDescription: formData.get("maharashtraDescription") as string,
  };

  const updated = await Homepage.findOneAndUpdate({}, payload, {
    new: true,
    upsert: true,
  });

  revalidatePath("/");
  revalidatePath("/admin/homepage");
  return JSON.parse(JSON.stringify(updated));
}
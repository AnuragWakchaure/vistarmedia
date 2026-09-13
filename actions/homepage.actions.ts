"use server";

import { connectDB } from "@/lib/db/client";
import { Homepage } from "@/models/Homepage";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

const DEFAULT_HOMEPAGE_CONTENT = {
  heroHeading: "Scale Your Brand with Maharashtra's Top Vernacular Creators",
  heroSubheading: "We connect visionary brands with high-engagement Marathi creators, influencers, and digital storytellers across Pune, Mumbai, Nashik, Kolhapur, and beyond.",
  heroHighlight: "Maharashtra's #1 Regional Agency",
  primaryCtaText: "Get In Touch",
  secondaryCtaText: "Explore Creators",
  whyUsHeading: "Why Leading Brands Trust VISTAR",
  whyUsDescription: "Hyperlocal vernacular reach with transparent data-driven influencer campaigns.",
  creatorsHeading: "Maharashtra's Premier Talent Roster",
  creatorsDescription: "Handpicked regional voices with loyal engaged communities.",
  maharashtraHeading: "Hyperlocal Footprint Across Maharashtra",
  maharashtraDescription: "Deep creator presence across 36 districts with authentic vernacular resonance.",
};

export async function getHomepageContentAction() {
  try {
    await connectDB();
    let content = await Homepage.findOne().lean();

    if (!content) {
      content = await Homepage.create(DEFAULT_HOMEPAGE_CONTENT);
    }

    return JSON.parse(JSON.stringify(content));
  } catch (error) {
    console.warn("[Homepage] Falling back to default content:", error);
    return DEFAULT_HOMEPAGE_CONTENT;
  }
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
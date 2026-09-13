"use server";

import { connectDB } from "@/lib/db/client";
import { Settings } from "@/models/Settings";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const SettingsUpdateSchema = z.object({
  companyName: z.string().default("VISTAR"),
  whatsappNumber: z.string().min(10, "Valid WhatsApp number required"),
  whatsappDefaultMessage: z.string().min(5, "Default greeting required"),
  phone: z.string().min(10, "Phone number required"),
  email: z.string().email("Valid agency email required"),
  address: z.string().min(3, "Address required"),
  instagramUrl: z.string().optional().default(""),
  linkedinUrl: z.string().optional().default(""),
  youtubeUrl: z.string().optional().default(""),
  facebookUrl: z.string().optional().default(""),
});

const DEFAULT_SETTINGS = {
  companyName: "VISTAR",
  whatsappNumber: "+91 83088 68478",
  whatsappDefaultMessage:
    "Hi VISTAR, I'm interested in an influencer marketing campaign for my brand. I would like to discuss my campaign requirements.",
  phone: "+91 83088 68478",
  email: "connect@vistar.in",
  address: "Pune & Mumbai, Maharashtra, India",
  instagramUrl: "https://instagram.com",
  linkedinUrl: "https://linkedin.com",
  youtubeUrl: "https://youtube.com",
  facebookUrl: "https://facebook.com",
};

export async function getSettingsAction() {
  try {
    await connectDB();
    let settings = await Settings.findOne().lean();

    if (!settings) {
      settings = await Settings.create(DEFAULT_SETTINGS);
    } else if (
      settings.phone === "+91 98765 43210" ||
      settings.phone === "+919876543210" ||
      !settings.phone ||
      settings.whatsappNumber === "+919876543210" ||
      settings.whatsappNumber === "+91 98765 43210"
    ) {
      await Settings.updateOne(
        { _id: (settings as any)._id },
        { $set: { phone: "+91 83088 68478", whatsappNumber: "+91 83088 68478" } }
      );
      (settings as any).phone = "+91 83088 68478";
      (settings as any).whatsappNumber = "+91 83088 68478";
    }

    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    console.warn("[Settings] Falling back to default settings due to database connection issue:", error);
    return DEFAULT_SETTINGS;
  }
}

export async function updateSettingsAction(data: any) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  const validated = SettingsUpdateSchema.parse(data);

  const updated = await Settings.findOneAndUpdate({}, validated, {
    new: true,
    upsert: true,
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return JSON.parse(JSON.stringify(updated));
}
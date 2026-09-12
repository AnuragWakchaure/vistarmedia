"use server";

import { connectDB } from "@/lib/db/client";
import { Testimonial } from "@/models/Testimonial";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function getTestimonialsAction() {
  await connectDB();
  const list = await Testimonial.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(list));
}

export async function createTestimonialAction(formData: FormData) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await Testimonial.create({
    personName: formData.get("personName") as string,
    designation: formData.get("designation") as string,
    company: formData.get("company") as string,
    photo: (formData.get("photo") as string) || "",
    testimonial: formData.get("testimonial") as string,
    featured: formData.get("featured") === "on",
    displayOrder: Number(formData.get("displayOrder") || 0),
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonialAction(id: string) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  await Testimonial.findByIdAndDelete(id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
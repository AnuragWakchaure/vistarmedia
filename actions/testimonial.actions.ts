"use server";

import { connectDB } from "@/lib/db/client";
import { Testimonial } from "@/models/Testimonial";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

const DEFAULT_TESTIMONIALS = [
  {
    _id: "t1",
    personName: "Vikram Sardesai",
    designation: "Head of Regional Marketing",
    company: "Mahindra Agri",
    photo: "/images/testimonials/testimonial-1.webp",
    testimonial: "VISTAR delivered unparalleled reach across rural Maharashtra for our tractor campaign. Highly recommended!",
    featured: true,
    displayOrder: 1,
  },
  {
    _id: "t2",
    personName: "Ananya Deshpande",
    designation: "Brand Lead",
    company: "Sahyadri Farms",
    photo: "/images/testimonials/testimonial-2.webp",
    testimonial: "The regional storytelling and authenticity of VISTAR's Marathi creator network drove a 4x increase in engagement.",
    featured: true,
    displayOrder: 2,
  },
];

export async function getTestimonialsAction() {
  try {
    await connectDB();
    const list = await Testimonial.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    if (!list || list.length === 0) {
      return DEFAULT_TESTIMONIALS;
    }
    return JSON.parse(JSON.stringify(list));
  } catch (error) {
    console.warn("[Testimonials] Database unreachable, serving fallback testimonials:", error);
    return DEFAULT_TESTIMONIALS;
  }
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
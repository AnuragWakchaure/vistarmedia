"use server";

import { connectDB } from "@/lib/db/client";
import { Testimonial } from "@/models/Testimonial";
import { requireAdminRole } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

const DEFAULT_TESTIMONIALS = [
  {
    _id: "t1",
    personName: "Anand Deshmukh",
    designation: "Marketing Head",
    company: "Mahindra Tractors",
    photo: "/images/brands/mahindra-tractors.png",
    testimonial:
      "VISTAR transformed our tractor and agricultural machinery campaigns into high-impact Marathi creator stories, delivering a 3.4x surge in direct dealer inquiries across rural Maharashtra.",
    featured: true,
    displayOrder: 1,
  },
  {
    _id: "t2",
    personName: "Priyanka Kadam",
    designation: "Brand Lead",
    company: "Sahyadri Natural Foods",
    photo: "/images/testimonials/testimonial-2.webp",
    testimonial:
      "Vernacular storytelling brought authentic local trust that generic agencies couldn't replicate. Generated immediate consumer adoption across Western Maharashtra.",
    featured: true,
    displayOrder: 2,
  },
  {
    _id: "t3",
    personName: "Naukrivalaa (Rohan Patil)",
    designation: "Creator (670K+ Followers)",
    company: "Educational Vernacular Channel",
    photo: "/images/testimonials/testimonial-3.webp",
    testimonial:
      "Seamless creator workflow with clear briefs, transparent pricing, timely payments, and brand partnerships that genuinely respect Marathi audiences.",
    featured: true,
    displayOrder: 3,
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
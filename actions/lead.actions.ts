"use server";

import { connectDB } from "@/lib/db/client";
import { Lead } from "@/models/Lead";
import {
  LeadSubmissionSchema,
  LeadStatusUpdateSchema,
  LeadNoteSchema,
} from "@/lib/validations/lead.schema";
import { requireAdminRole, getCurrentUser } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function submitCampaignEnquiryAction(data: any) {
  await connectDB();

  const validated = LeadSubmissionSchema.parse(data);

  // Anti-spam check: prevent duplicate submissions within 5 minutes from same email
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const recentSubmission = await Lead.findOne({
    email: validated.email.toLowerCase().trim(),
    createdAt: { $gte: fiveMinutesAgo },
  });

  if (recentSubmission) {
    throw new Error(
      "We received your recent enquiry. Our team is reviewing it and will reach out shortly."
    );
  }

  const newLead = await Lead.create({
    ...validated,
    email: validated.email.toLowerCase().trim(),
    status: "NEW",
    leadSource: "WEBSITE_CAMPAIGN_FORM",
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { success: true, leadId: newLead._id.toString() };
}

export async function getLeadsAction(params?: {
  search?: string;
  status?: string;
  industry?: string;
}) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  const query: any = {};

  if (params?.search) {
    query.$or = [
      { name: { $regex: params.search, $options: "i" } },
      { brand: { $regex: params.search, $options: "i" } },
      { email: { $regex: params.search, $options: "i" } },
      { phone: { $regex: params.search, $options: "i" } },
    ];
  }

  if (params?.status && params.status !== "ALL") {
    query.status = params.status;
  }

  if (params?.industry && params.industry !== "ALL") {
    query.industry = params.industry;
  }

  const leads = await Lead.find(query).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(leads));
}

export async function updateLeadStatusAction(id: string, status: string) {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  const validated = LeadStatusUpdateSchema.parse({ status });
  const updated = await Lead.findByIdAndUpdate(
    id,
    { status: validated.status },
    { new: true }
  );

  if (!updated) throw new Error("Lead not found");

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin");
  return JSON.parse(JSON.stringify(updated));
}

export async function addLeadNoteAction(id: string, noteBody: string) {
  const user = await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  const validated = LeadNoteSchema.parse({
    body: noteBody,
    author: user.name || "Admin",
  });

  const updated = await Lead.findByIdAndUpdate(
    id,
    {
      $push: {
        notes: {
          body: validated.body,
          author: validated.author,
          createdAt: new Date(),
        },
      },
    },
    { new: true }
  );

  if (!updated) throw new Error("Lead not found");

  revalidatePath(`/admin/leads/${id}`);
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteLeadAction(id: string) {
  await requireAdminRole(["SUPER_ADMIN"]);
  await connectDB();

  await Lead.findByIdAndDelete(id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { success: true };
}
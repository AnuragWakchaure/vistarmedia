import { z } from "zod";

export const LeadSubmissionSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  brand: z.string().min(2, "Company name is required"),
  services: z.array(z.string()).default([]),
  requirements: z.string().min(5, "Please enter your message"),
  phone: z.string().optional().default(""),
  websiteOrInstagram: z.string().optional().default(""),
  industry: z.string().optional().default("General"),
  campaignType: z.string().optional().default("Enquiry"),
  targetLocation: z.string().optional().default("Maharashtra"),
  budget: z.string().optional().default("To be discussed"),
});

export const LeadStatusUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"]),
});

export const LeadNoteSchema = z.object({
  body: z.string().min(1, "Note cannot be empty"),
  author: z.string().default("Admin"),
});

export type LeadSubmissionInput = z.infer<typeof LeadSubmissionSchema>;
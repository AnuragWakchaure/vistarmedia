import { Schema, model, models, Model } from "mongoose";

export interface ILeadNote {
  body: string;
  author: string;
  createdAt: Date;
}

export interface ILead {
  _id: string;
  name: string;
  brand: string;
  phone: string;
  email: string;
  websiteOrInstagram?: string;
  industry: string;
  campaignType: string;
  targetLocation: string;
  budget: string;
  requirements: string;
  leadSource: string;
  status: "NEW" | "CONTACTED" | "PROPOSAL_SENT" | "NEGOTIATION" | "WON" | "LOST";
  notes: ILeadNote[];
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    websiteOrInstagram: { type: String, default: "" },
    industry: { type: String, required: true },
    campaignType: { type: String, required: true },
    targetLocation: { type: String, required: true },
    budget: { type: String, required: true },
    requirements: { type: String, required: true },
    leadSource: { type: String, default: "WEBSITE_INQUIRY" },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"],
      default: "NEW",
      index: true,
    },
    notes: [
      {
        body: { type: String, required: true },
        author: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Lead: Model<ILead> = models.Lead || model<ILead>("Lead", LeadSchema);
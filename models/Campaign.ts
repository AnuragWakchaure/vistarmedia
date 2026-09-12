import { Schema, model, models, Model, Types } from "mongoose";

export interface ICampaignResult {
  metric: string;
  value: string;
  label: string;
  isDemo: boolean;
}

export interface ICampaign {
  _id: string;
  brandId: Types.ObjectId;
  title: string;
  slug: string;
  industry: string;
  campaignType: string;
  location: string;
  objective: string;
  description: string;
  coverImage: string;
  gallery: string[];
  videos: { title: string; url: string; platform: string }[];
  creatorIds: Types.ObjectId[];
  results: ICampaignResult[];
  testimonialId?: Types.ObjectId;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema<ICampaign>(
  {
    brandId: { type: Schema.Types.ObjectId, ref: "Brand", required: true, index: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    industry: { type: String, required: true, index: true },
    campaignType: { type: String, required: true },
    location: { type: String, default: "Maharashtra" },
    objective: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    gallery: { type: [String], default: [] },
    videos: [
      {
        title: { type: String },
        url: { type: String },
        platform: { type: String, default: "Instagram" },
      },
    ],
    creatorIds: [{ type: Schema.Types.ObjectId, ref: "Creator" }],
    results: [
      {
        metric: { type: String, required: true },
        value: { type: String, required: true },
        label: { type: String, required: true },
        isDemo: { type: Boolean, default: false },
      },
    ],
    testimonialId: { type: Schema.Types.ObjectId, ref: "Testimonial", default: null },
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      default: "DRAFT",
      index: true,
    },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export const Campaign: Model<ICampaign> = models.Campaign || model<ICampaign>("Campaign", CampaignSchema);
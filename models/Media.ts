import { Schema, model, models, Model } from "mongoose";

export interface IMedia {
  name: string;
  url: string;
  type: "IMAGE" | "VIDEO" | "LOGO" | "DOCUMENT";
  altText?: string;
  size?: number;
}

const MediaSchema = new Schema<IMedia>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ["IMAGE", "VIDEO", "LOGO", "DOCUMENT"], default: "IMAGE" },
    altText: { type: String, default: "" },
    size: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Media: Model<IMedia> =
  models.Media || model<IMedia>("Media", MediaSchema);
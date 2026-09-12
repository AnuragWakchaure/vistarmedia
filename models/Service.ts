import { Schema, model, models, Model } from "mongoose";

export interface IService {
  title: string;
  slug: string;
  shortDescription: string;
  detailedContent?: string;
  icon?: string;
  displayOrder: number;
  status: "ACTIVE" | "INACTIVE";
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    detailedContent: { type: String, default: "" },
    icon: { type: String, default: "Layers" },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
  },
  { timestamps: true }
);

export const Service: Model<IService> =
  models.Service || model<IService>("Service", ServiceSchema);
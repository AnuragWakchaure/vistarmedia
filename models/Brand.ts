import { Schema, model, models, Model } from "mongoose";

export interface IBrand {
  _id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  displayOrder: number;
  featured: boolean;
  status: "ACTIVE" | "INACTIVE";
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    logo: { type: String, required: true },
    website: { type: String, default: "" },
    description: { type: String, default: "" },
    displayOrder: { type: Number, default: 0 },
    featured: { type: Boolean, default: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
  },
  { timestamps: true }
);

export const Brand: Model<IBrand> = models.Brand || model<IBrand>("Brand", BrandSchema);
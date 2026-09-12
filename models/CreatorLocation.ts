import { Schema, model, models, Model } from "mongoose";

export interface ICreatorLocation {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  creatorCount: number;
  countDisplay: string;
  category: string;
  description: string;
  displayOrder: number;
  active: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CreatorLocationSchema = new Schema<ICreatorLocation>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    creatorCount: { type: Number, required: true, default: 0 },
    countDisplay: { type: String, default: "" },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CreatorLocation: Model<ICreatorLocation> =
  models.CreatorLocation || model<ICreatorLocation>("CreatorLocation", CreatorLocationSchema);

import { Schema, model, models, Model } from "mongoose";

export interface ICreatorPlatform {
  platform: "Instagram" | "YouTube" | "Facebook" | "Other";
  handle: string;
  profileUrl: string;
  followerCount: number;
}

export interface ICreator {
  _id: string;
  name: string;
  slug: string;
  profileImage: string;
  bio: string;
  location: string;
  categories: string[];
  platforms: ICreatorPlatform[];
  totalFollowers: number;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const CreatorSchema = new Schema<ICreator>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    profileImage: { type: String, required: true },
    bio: { type: String, default: "" },
    location: { type: String, required: true, index: true },
    categories: { type: [String], default: [], index: true },
    platforms: [
      {
        platform: { type: String, enum: ["Instagram", "YouTube", "Facebook", "Other"], required: true },
        handle: { type: String, required: true },
        profileUrl: { type: String, required: true },
        followerCount: { type: Number, default: 0 },
      },
    ],
    totalFollowers: { type: Number, default: 0, index: -1 },
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      default: "DRAFT",
      index: true,
    },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Creator: Model<ICreator> = models.Creator || model<ICreator>("Creator", CreatorSchema);
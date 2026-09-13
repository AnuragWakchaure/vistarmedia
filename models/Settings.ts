import { Schema, model, models, Model } from "mongoose";

export interface ISettings {
  companyName: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  phone: string;
  email: string;
  address: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
}

const SettingsSchema = new Schema<ISettings>(
  {
    companyName: { type: String, default: "VISTAR" },
    whatsappNumber: { type: String, required: true, default: "+91 83088 68478" },
    whatsappDefaultMessage: {
      type: String,
      default: "Hi VISTAR, I'm interested in an influencer marketing campaign for my brand.",
    },
    phone: { type: String, required: true, default: "+91 83088 68478" },
    email: { type: String, required: true, default: "connect@vistar.in" },
    address: { type: String, default: "Maharashtra, India" },
    instagramUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    youtubeUrl: { type: String, default: "" },
    facebookUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Settings: Model<ISettings> =
  models.Settings || model<ISettings>("Settings", SettingsSchema);
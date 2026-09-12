import { Schema, model, models, Model } from "mongoose";

export interface ITestimonial {
  personName: string;
  designation: string;
  company: string;
  photo?: string;
  testimonial: string;
  featured: boolean;
  status: "ACTIVE" | "INACTIVE";
  displayOrder: number;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    personName: { type: String, required: true },
    designation: { type: String, required: true },
    company: { type: String, required: true },
    photo: { type: String, default: "" },
    testimonial: { type: String, required: true },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial: Model<ITestimonial> =
  models.Testimonial || model<ITestimonial>("Testimonial", TestimonialSchema);
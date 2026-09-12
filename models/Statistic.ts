import { Schema, model, models, Model } from "mongoose";

export interface IStatistic {
  _id: string;
  label: string;
  value: string;
  suffix: string;
  description: string;
  displayOrder: number;
  status: "ACTIVE" | "INACTIVE";
}

const StatisticSchema = new Schema<IStatistic>(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    suffix: { type: String, default: "" },
    description: { type: String, default: "" },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
  },
  { timestamps: true }
);

export const Statistic: Model<IStatistic> =
  models.Statistic || model<IStatistic>("Statistic", StatisticSchema);
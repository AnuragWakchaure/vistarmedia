import { Schema, model, models, Model } from "mongoose";

export interface IHomepage {
  heroHeading: string;
  heroSubheading: string;
  heroHighlight: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  whyUsHeading: string;
  whyUsDescription: string;
  creatorsHeading: string;
  creatorsDescription: string;
  maharashtraHeading: string;
  maharashtraDescription: string;
}

const HomepageSchema = new Schema<IHomepage>(
  {
    heroHeading: {
      type: String,
      default: "Influencer Marketing That Makes Brands Stand Out.",
    },
    heroSubheading: {
      type: String,
      default:
        "Connect your brand with verified regional creators, engage targeted local audiences across urban hubs and rural heartlands, and execute high-converting campaigns people genuinely remember.",
    },
    heroHighlight: {
      type: String,
      default: "200+ Creators Connected Across Maharashtra",
    },
    primaryCtaText: { type: String, default: "START YOUR CAMPAIGN" },
    secondaryCtaText: { type: String, default: "VIEW OUR CAMPAIGNS" },
    whyUsHeading: {
      type: String,
      default: "Built Specifically for Maharashtra's High-Growth Brands",
    },
    whyUsDescription: {
      type: String,
      default:
        "We bridge the gap between enterprise marketing expectations and the real regional creator landscape.",
    },
    creatorsHeading: {
      type: String,
      default: "200+ Creators. One Powerful Network.",
    },
    creatorsDescription: {
      type: String,
      default:
        "From local micro-creators to established influencers, VISTAR connects brands with creators across Maharashtra.",
    },
    maharashtraHeading: {
      type: String,
      default: "Reaching Maharashtra: From Metro Hubs to Agricultural Heartlands",
    },
    maharashtraDescription: {
      type: String,
      default:
        "Our network spans urban metros and rural farming clusters, giving brands authenticated local trust that generic agencies cannot match.",
    },
  },
  { timestamps: true }
);

export const Homepage: Model<IHomepage> =
  models.Homepage || model<IHomepage>("Homepage", HomepageSchema);
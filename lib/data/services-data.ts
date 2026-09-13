export interface ServiceItem {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  image: string;
  tag?: string;
  displayOrder: number;
  status: "ACTIVE" | "INACTIVE";
}

export const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80";

export const SERVICE_IMAGE_MAP: Record<string, string> = {
  "regional-influencer-campaigns":
    "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&auto=format&fit=crop&q=80",
  "influencer-marketing":
    "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&auto=format&fit=crop&q=80",
  "regional-influencer-marketing":
    "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&auto=format&fit=crop&q=80",
  "vernacular-content-production":
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
  "creator-campaigns":
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
  "reels-short-form-content":
    "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&auto=format&fit=crop&q=80",
  "ugc-content-creation":
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80",
  "hyperlocal-brand-activations":
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
  "event-influencer-campaigns":
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
  "creator-talent-management":
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
  "campaign-management":
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
  "performance-reporting":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
};

export const SERVICE_TAG_MAP: Record<string, string> = {
  "regional-influencer-campaigns": "Creator Network",
  "influencer-marketing": "Creator Network",
  "regional-influencer-marketing": "Creator Network",
  "vernacular-content-production": "Video & Reels",
  "creator-campaigns": "Video & Reels",
  "reels-short-form-content": "Viral Formats",
  "ugc-content-creation": "High Conversion",
  "hyperlocal-brand-activations": "On-Ground Events",
  "event-influencer-campaigns": "On-Ground Events",
  "creator-talent-management": "Exclusive Talent",
  "campaign-management": "Turnkey Delivery",
  "performance-reporting": "Analytics & Audit",
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    _id: "sv1",
    title: "Regional Influencer Campaigns",
    slug: "regional-influencer-campaigns",
    shortDescription: "End-to-end strategic campaign execution with top Marathi creators across Maharashtra.",
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&auto=format&fit=crop&q=80",
    tag: "Creator Network",
    displayOrder: 1,
    status: "ACTIVE",
  },
  {
    _id: "sv2",
    title: "Vernacular Content Production",
    slug: "vernacular-content-production",
    shortDescription: "High-impact video reels, brand integrations, and authentic vernacular storytelling.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
    tag: "Video & Reels",
    displayOrder: 2,
    status: "ACTIVE",
  },
  {
    _id: "sv3",
    title: "Creator Talent Management",
    slug: "creator-talent-management",
    shortDescription: "Exclusive representation for Maharashtra's premier digital influencers and artists.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    tag: "Exclusive Talent",
    displayOrder: 3,
    status: "ACTIVE",
  },
  {
    _id: "sv4",
    title: "Hyperlocal Brand Activations",
    slug: "hyperlocal-brand-activations",
    shortDescription: "District-level marketing reaching tier-2 and tier-3 consumers across Maharashtra.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    tag: "On-Ground Events",
    displayOrder: 4,
    status: "ACTIVE",
  },
  {
    _id: "sv5",
    title: "UGC Content Creation",
    slug: "ugc-content-creation",
    shortDescription: "Authentic user-generated video reviews, product unboxings, and relatable creator stories.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80",
    tag: "High Conversion",
    displayOrder: 5,
    status: "ACTIVE",
  },
  {
    _id: "sv6",
    title: "Reels & Short-Form Video",
    slug: "reels-short-form-content",
    shortDescription: "Viral-engineered short-form content optimized for Instagram Reels and YouTube Shorts.",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&auto=format&fit=crop&q=80",
    tag: "Viral Formats",
    displayOrder: 6,
    status: "ACTIVE",
  },
  {
    _id: "sv7",
    title: "Turnkey Campaign Management",
    slug: "campaign-management",
    shortDescription: "Complete creator briefing, legal contracting, vernacular script approvals, and execution.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    tag: "Turnkey Delivery",
    displayOrder: 7,
    status: "ACTIVE",
  },
  {
    _id: "sv8",
    title: "Performance Tracking & ROI",
    slug: "performance-reporting",
    shortDescription: "Transparent UTM tracking, verified impression telemetry, and zero-bot reporting audit.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    tag: "Analytics & Audit",
    displayOrder: 8,
    status: "ACTIVE",
  },
];

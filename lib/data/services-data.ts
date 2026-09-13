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

export const DEFAULT_FALLBACK_IMAGE = "/images/services/service-default.webp";

export const SERVICE_IMAGE_MAP: Record<string, string> = {
  "regional-influencer-campaigns": "/images/services/service-campaign-mgmt.webp",
  "influencer-marketing": "/images/services/service-campaign-mgmt.webp",
  "regional-influencer-marketing": "/images/services/service-campaign-mgmt.webp",
  "vernacular-content-production": "/images/services/service-vernacular-strategy.webp",
  "creator-campaigns": "/images/services/service-creator-discovery.webp",
  "reels-short-form-content": "/images/services/service-performance.webp",
  "ugc-content-creation": "/images/services/service-multi-platform.webp",
  "hyperlocal-brand-activations": "/images/services/service-hyperlocal-activation.webp",
  "event-influencer-campaigns": "/images/services/service-hyperlocal-activation.webp",
  "creator-talent-management": "/images/services/service-creator-discovery.webp",
  "campaign-management": "/images/services/service-storytelling.webp",
  "performance-reporting": "/images/services/service-analytics.webp",
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
    image: "/images/services/service-campaign-mgmt.webp",
    tag: "Creator Network",
    displayOrder: 1,
    status: "ACTIVE",
  },
  {
    _id: "sv2",
    title: "Vernacular Content Production",
    slug: "vernacular-content-production",
    shortDescription: "High-impact video reels, brand integrations, and authentic vernacular storytelling.",
    image: "/images/services/service-vernacular-strategy.webp",
    tag: "Video & Reels",
    displayOrder: 2,
    status: "ACTIVE",
  },
  {
    _id: "sv3",
    title: "Creator Talent Management",
    slug: "creator-talent-management",
    shortDescription: "Exclusive representation for Maharashtra's premier digital influencers and artists.",
    image: "/images/services/service-creator-discovery.webp",
    tag: "Exclusive Talent",
    displayOrder: 3,
    status: "ACTIVE",
  },
  {
    _id: "sv4",
    title: "Hyperlocal Brand Activations",
    slug: "hyperlocal-brand-activations",
    shortDescription: "District-level marketing reaching tier-2 and tier-3 consumers across Maharashtra.",
    image: "/images/services/service-hyperlocal-activation.webp",
    tag: "On-Ground Events",
    displayOrder: 4,
    status: "ACTIVE",
  },
  {
    _id: "sv5",
    title: "UGC Content Creation",
    slug: "ugc-content-creation",
    shortDescription: "Authentic user-generated video reviews, product unboxings, and relatable creator stories.",
    image: "/images/services/service-multi-platform.webp",
    tag: "High Conversion",
    displayOrder: 5,
    status: "ACTIVE",
  },
  {
    _id: "sv6",
    title: "Reels & Short-Form Video",
    slug: "reels-short-form-content",
    shortDescription: "Viral-engineered short-form content optimized for Instagram Reels and YouTube Shorts.",
    image: "/images/services/service-performance.webp",
    tag: "Viral Formats",
    displayOrder: 6,
    status: "ACTIVE",
  },
  {
    _id: "sv7",
    title: "Turnkey Campaign Management",
    slug: "campaign-management",
    shortDescription: "Complete creator briefing, legal contracting, vernacular script approvals, and execution.",
    image: "/images/services/service-storytelling.webp",
    tag: "Turnkey Delivery",
    displayOrder: 7,
    status: "ACTIVE",
  },
  {
    _id: "sv8",
    title: "Performance Tracking & ROI",
    slug: "performance-reporting",
    shortDescription: "Transparent UTM tracking, verified impression telemetry, and zero-bot reporting audit.",
    image: "/images/services/service-analytics.webp",
    tag: "Analytics & Audit",
    displayOrder: 8,
    status: "ACTIVE",
  },
];

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { Settings } from "../models/Settings";
import { Brand } from "../models/Brand";
import { Statistic } from "../models/Statistic";
import { Campaign } from "../models/Campaign";
import { Creator } from "../models/Creator";
import { CreatorLocation } from "../models/CreatorLocation";

const MONGODB_URI = process.env.MONGODB_URI;

const SAMPLE_LOCATIONS = [
  {
    name: "Mumbai",
    latitude: 19.0760,
    longitude: 72.8777,
    creatorCount: 50,
    countDisplay: "50+",
    category: "Entertainment & Fashion",
    description: "Maharashtra's media, Bollywood, fashion & creator headquarters.",
    displayOrder: 1,
    active: true,
    featured: true,
  },
  {
    name: "Pune",
    latitude: 18.5204,
    longitude: 73.8567,
    creatorCount: 45,
    countDisplay: "45+",
    category: "Tech & Urban Lifestyle",
    description: "Youth, tech, automobile & urban lifestyle Marathi creator ecosystem.",
    displayOrder: 2,
    active: true,
    featured: true,
  },
  {
    name: "Nashik",
    latitude: 19.9975,
    longitude: 73.7898,
    creatorCount: 25,
    countDisplay: "25+",
    category: "Agriculture & Food",
    description: "Agri-tech, winery, culinary & North Maharashtra regional voice.",
    displayOrder: 3,
    active: true,
    featured: true,
  },
  {
    name: "Ahilyanagar",
    latitude: 19.0948,
    longitude: 74.7480,
    creatorCount: 20,
    countDisplay: "20+",
    category: "Rural Agriculture & Machinery",
    description: "Sugar belt, farming machinery, dairy & rural economy storytellers.",
    displayOrder: 4,
    active: true,
    featured: true,
  },
  {
    name: "Chhatrapati Sambhajinagar",
    latitude: 19.8762,
    longitude: 75.3433,
    creatorCount: 20,
    countDisplay: "20+",
    category: "Regional Commerce",
    description: "Marathwada regional commerce, industrial hub & heritage tourism.",
    displayOrder: 5,
    active: true,
    featured: true,
  },
  {
    name: "Kolhapur",
    latitude: 16.7050,
    longitude: 74.2433,
    creatorCount: 20,
    countDisplay: "20+",
    category: "Cultural & Vernacular Reach",
    description: "Historic cultural capital, sugarcane industry & South Maharashtra powerhouse.",
    displayOrder: 6,
    active: true,
    featured: true,
  },
  {
    name: "Nagpur",
    latitude: 21.1458,
    longitude: 79.0882,
    creatorCount: 25,
    countDisplay: "25+",
    category: "Vidarbha Regional Hub",
    description: "Vidarbha commercial center, logistics hub & central India gateway.",
    displayOrder: 7,
    active: true,
    featured: true,
  },
  {
    name: "Satara",
    latitude: 17.6805,
    longitude: 74.0183,
    creatorCount: 15,
    countDisplay: "15+",
    category: "Agri-Business & Dairy",
    description: "Western Ghats agriculture, tourism & dairy farming influencers.",
    displayOrder: 8,
    active: true,
    featured: true,
  },
  {
    name: "Sangli",
    latitude: 16.8524,
    longitude: 74.5815,
    creatorCount: 15,
    countDisplay: "15+",
    category: "Agri-Business & Dairy",
    description: "Turmeric capital, sugar cooperatives & Krishna river basin network.",
    displayOrder: 9,
    active: true,
    featured: true,
  },
];

const SAMPLE_CREATORS = [
  {
    name: "Sachin Shete",
    slug: "sachin-shete",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bio: "Modern agriculture practitioner and rural Marathi storyteller breaking down modern farming tools and tractors.",
    location: "Ahilyanagar",
    categories: ["Agriculture", "Marathi Content"],
    totalFollowers: 185000,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 1,
    platforms: [
      { platform: "Instagram", handle: "@sachin_shete_agri", profileUrl: "https://instagram.com", followerCount: 120000 },
      { platform: "YouTube", handle: "@SachinSheteFarming", profileUrl: "https://youtube.com", followerCount: 65000 },
    ],
  },
  {
    name: "Pooja Patil",
    slug: "pooja-patil",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bio: "Authentic Maharashtrian culinary explorer, traditional recipes, and local street food curation.",
    location: "Pune",
    categories: ["Food", "Lifestyle", "Marathi Content"],
    totalFollowers: 320000,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 2,
    platforms: [
      { platform: "Instagram", handle: "@pooja_taste_mh", profileUrl: "https://instagram.com", followerCount: 210000 },
      { platform: "YouTube", handle: "@PoojaPatilKitchen", profileUrl: "https://youtube.com", followerCount: 110000 },
    ],
  },
  {
    name: "Rohan Deshmukh",
    slug: "rohan-deshmukh",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    bio: "Consumer tech, smartphone reviews in Marathi, gadget testing, and smart automotive systems.",
    location: "Mumbai",
    categories: ["Technology", "Automobile", "Marathi Content"],
    totalFollowers: 450000,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 3,
    platforms: [
      { platform: "YouTube", handle: "@MarathiTechRohan", profileUrl: "https://youtube.com", followerCount: 310000 },
      { platform: "Instagram", handle: "@rohan_tech_reviews", profileUrl: "https://instagram.com", followerCount: 140000 },
    ],
  },
  {
    name: "Tanvi Kulkarni",
    slug: "tanvi-kulkarni",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    bio: "Pune city lifestyle, fashion styling, and authentic daily situational comedy reels.",
    location: "Pune",
    categories: ["Fashion", "Lifestyle", "Comedy"],
    totalFollowers: 275000,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 4,
    platforms: [
      { platform: "Instagram", handle: "@tanvi_kulkarni_official", profileUrl: "https://instagram.com", followerCount: 275000 },
    ],
  },
  {
    name: "Ganesh Shinde",
    slug: "ganesh-shinde",
    profileImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    bio: "Agri-machinery reviews, rural lifestyle, tractor pull tests, and village vlogs across Western Maharashtra.",
    location: "Kolhapur",
    categories: ["Agriculture", "Automobile", "Marathi Content"],
    totalFollowers: 190000,
    featured: false,
    status: "PUBLISHED",
    displayOrder: 5,
    platforms: [
      { platform: "YouTube", handle: "@GaneshShindeMH", profileUrl: "https://youtube.com", followerCount: 140000 },
      { platform: "Instagram", handle: "@ganesh_tractor_vlogs", profileUrl: "https://instagram.com", followerCount: 50000 },
    ],
  },
  {
    name: "Swapnil Jadhav",
    slug: "swapnil-jadhav",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    bio: "Relatable family humor, vernacular standup comedy, and high-engagement viral reels.",
    location: "Nashik",
    categories: ["Comedy", "Marathi Content"],
    totalFollowers: 520000,
    featured: true,
    status: "PUBLISHED",
    displayOrder: 6,
    platforms: [
      { platform: "Instagram", handle: "@swapnil_jadhav_reels", profileUrl: "https://instagram.com", followerCount: 380000 },
      { platform: "YouTube", handle: "@SwapnilJadhavComedy", profileUrl: "https://youtube.com", followerCount: 140000 },
    ],
  },
  {
    name: "Komal Gaikwad",
    slug: "komal-gaikwad",
    profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    bio: "Marathwada heritage travel, historical forts, local cuisine, and budget exploration.",
    location: "Chhatrapati Sambhajinagar",
    categories: ["Travel", "Lifestyle", "Marathi Content"],
    totalFollowers: 160000,
    featured: false,
    status: "PUBLISHED",
    displayOrder: 7,
    platforms: [
      { platform: "Instagram", handle: "@komal_explores_mh", profileUrl: "https://instagram.com", followerCount: 160000 },
    ],
  },
  {
    name: "Amey Joshi",
    slug: "amey-joshi",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    bio: "Two-wheeler enthusiast, motorcycle track days, road trips, and commuter vehicle testing.",
    location: "Pune",
    categories: ["Automobile", "Travel"],
    totalFollowers: 210000,
    featured: false,
    status: "PUBLISHED",
    displayOrder: 8,
    platforms: [
      { platform: "YouTube", handle: "@AmeyRiderMH", profileUrl: "https://youtube.com", followerCount: 150000 },
      { platform: "Instagram", handle: "@amey_on_wheels", profileUrl: "https://instagram.com", followerCount: 60000 },
    ],
  },
];

const SAMPLE_BRANDS = [
  {
    name: "Government of Maharashtra",
    logo: "/images/brands/gov-maharashtra.png",
    website: "https://maharashtra.gov.in",
    description: "State Government of Maharashtra public awareness and initiative campaigns.",
    displayOrder: 1,
    featured: true,
    status: "ACTIVE",
  },
  {
    name: "Government of India",
    logo: "/images/brands/gov-india.png",
    website: "https://india.gov.in",
    description: "National Government of India public outreach and digital campaigns.",
    displayOrder: 2,
    featured: true,
    status: "ACTIVE",
  },
  {
    name: "Mahindra Tractors",
    logo: "/images/brands/mahindra.png",
    website: "https://mahindratractor.com",
    description: "Leading tractor and agricultural equipment manufacturer in India.",
    displayOrder: 3,
    featured: true,
    status: "ACTIVE",
  },
  {
    name: "Tata Motors",
    logo: "/images/brands/tata.png",
    website: "https://tatamotors.com",
    description: "Pioneering Indian automotive and commercial vehicle manufacturer.",
    displayOrder: 4,
    featured: true,
    status: "ACTIVE",
  },
  {
    name: "Sahyadri Farms",
    logo: "/images/brands/sahyadri-farms.png",
    website: "https://sahyadrifarms.com",
    description: "India's largest farmer-producer company specializing in fresh fruits and agro-products.",
    displayOrder: 5,
    featured: true,
    status: "ACTIVE",
  },
  {
    name: "FinMarathi",
    logo: "/images/brands/finmarathi.png",
    website: "https://finmarathi.com",
    description: "Maharashtra's leading Marathi financial education and investment network.",
    displayOrder: 6,
    featured: true,
    status: "ACTIVE",
  },
  {
    name: "TVS Motors",
    logo: "/images/brands/tvs-motors.png",
    website: "https://tvsmotor.com",
    description: "Multinational two-wheeler and three-wheeler manufacturing giant.",
    displayOrder: 7,
    featured: true,
    status: "ACTIVE",
  },
];

async function seed() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI missing in environment variables.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB. Seeding creators, brands & locations...");

  for (const c of SAMPLE_CREATORS) {
    await Creator.findOneAndUpdate(
      { slug: c.slug },
      { ...c, updatedAt: new Date() },
      { upsert: true, returnDocument: "after" }
    );
    console.log(`[✓] Seeded Creator: ${c.name} (${c.location} — ${c.categories.join(", ")})`);
  }

  for (const b of SAMPLE_BRANDS) {
    await Brand.findOneAndUpdate(
      { name: b.name },
      { ...b, updatedAt: new Date() },
      { upsert: true, returnDocument: "after" }
    );
    console.log(`[✓] Seeded Brand: ${b.name} (${b.logo})`);
  }

  for (const loc of SAMPLE_LOCATIONS) {
    await CreatorLocation.findOneAndUpdate(
      { name: loc.name },
      { ...loc, updatedAt: new Date() },
      { upsert: true, returnDocument: "after" }
    );
    console.log(`[✓] Seeded Location: ${loc.name} (${loc.countDisplay})`);
  }

  // Seed Super Admin
  const adminEmail = "admin@vistar.in";
  const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(defaultPassword, salt);

  await User.findOneAndUpdate(
    { email: adminEmail },
    {
      name: "VISTAR Super Admin",
      email: adminEmail,
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
      updatedAt: new Date(),
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log(`[✓] Seeded Super Admin: ${adminEmail} (password: ${defaultPassword})`);

  console.log(`\nSuccessfully seeded creators, brands, locations, and admin into MongoDB!`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
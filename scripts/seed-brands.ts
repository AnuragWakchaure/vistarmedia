import { connectDB } from "../lib/db/client";
import { Brand } from "../models/Brand";

const BRANDS = [
  {
    name: "Government of Maharashtra",
    logo: "/images/brands/gov-maharashtra.png",
    website: "https://maharashtra.gov.in",
    description: "State Government of Maharashtra public awareness and initiative campaigns.",
    displayOrder: 1,
    featured: true,
    status: "ACTIVE"
  },
  {
    name: "Government of India",
    logo: "/images/brands/gov-india.png",
    website: "https://india.gov.in",
    description: "National Government of India public outreach and digital campaigns.",
    displayOrder: 2,
    featured: true,
    status: "ACTIVE"
  },
  {
    name: "Mahindra Tractors",
    logo: "/images/brands/mahindra.png",
    website: "https://mahindratractor.com",
    description: "Leading tractor and agricultural equipment manufacturer in India.",
    displayOrder: 3,
    featured: true,
    status: "ACTIVE"
  },
  {
    name: "Tata Motors",
    logo: "/images/brands/tata.png",
    website: "https://tatamotors.com",
    description: "Pioneering Indian automotive and commercial vehicle manufacturer.",
    displayOrder: 4,
    featured: true,
    status: "ACTIVE"
  },
  {
    name: "Sahyadri Farms",
    logo: "/images/brands/sahyadri-farms.png",
    website: "https://sahyadrifarms.com",
    description: "India's largest farmer-producer company specializing in fresh fruits and agro-products.",
    displayOrder: 5,
    featured: true,
    status: "ACTIVE"
  },
  {
    name: "FinMarathi",
    logo: "/images/brands/finmarathi.png",
    website: "https://finmarathi.com",
    description: "Maharashtra's leading Marathi financial education and investment network.",
    displayOrder: 6,
    featured: true,
    status: "ACTIVE"
  },
  {
    name: "TVS Motors",
    logo: "/images/brands/tvs-motors.png",
    website: "https://tvsmotor.com",
    description: "Multinational two-wheeler and three-wheeler manufacturing giant.",
    displayOrder: 7,
    featured: true,
    status: "ACTIVE"
  }
];

async function seedBrands() {
  await connectDB();
  console.log("Connected to MongoDB. Seeding Brand logos...");

  for (const b of BRANDS) {
    await Brand.findOneAndUpdate(
      { name: b.name },
      { ...b, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    console.log(`[✓] Seeded Brand: ${b.name} (${b.logo})`);
  }

  const count = await Brand.countDocuments({ status: "ACTIVE" });
  console.log(`\nSuccessfully verified ${count} active brands in MongoDB.`);
  process.exit(0);
}

seedBrands().catch((err) => {
  console.error("Error seeding brands:", err);
  process.exit(1);
});

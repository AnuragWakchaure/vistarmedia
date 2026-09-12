import { connectDB } from "../lib/db/client";
import { CreatorLocation } from "../models/CreatorLocation";

const LOCATIONS = [
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

async function seedLocations() {
  await connectDB();
  console.log("Connected to MongoDB. Seeding Creator Locations...");

  for (const loc of LOCATIONS) {
    await CreatorLocation.findOneAndUpdate(
      { name: loc.name },
      { ...loc, updatedAt: new Date() },
      { upsert: true, returnDocument: "after" }
    );
    console.log(`[✓] Seeded Location: ${loc.name} (${loc.countDisplay} creators, ${loc.latitude}°N, ${loc.longitude}°E)`);
  }

  const count = await CreatorLocation.countDocuments({ active: true });
  console.log(`\nSuccessfully verified ${count} active creator locations in MongoDB.`);
  process.exit(0);
}

seedLocations().catch((err) => {
  console.error("Error seeding locations:", err);
  process.exit(1);
});

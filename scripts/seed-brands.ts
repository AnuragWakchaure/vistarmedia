import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    website: { type: String, default: "" },
    description: { type: String, default: "" },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

async function main() {
  if (!MONGODB_URI) {
    console.error("No MONGODB_URI found.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  const existingBrands = await Brand.find().lean();
  console.log("Existing brands in DB:", existingBrands.map((b: any) => b.name));

  const brandsToAdd = [
    {
      name: "Bhoomi22.com",
      logo: "/images/brands/bhoomi-22.jpeg",
      website: "https://bhoomi22.com",
      description: "Agritech and land management platform",
      displayOrder: 4,
      status: "ACTIVE",
      featured: true,
    },
    {
      name: "Pashukhata App",
      logo: "/images/brands/pashukhata.jpeg",
      website: "https://pashukhata.com",
      description: "Digital dairy and cattle ledger application",
      displayOrder: 5,
      status: "ACTIVE",
      featured: true,
    },
  ];

  for (const b of brandsToAdd) {
    const exists = await Brand.findOne({
      $or: [
        { name: { $regex: new RegExp(`^${b.name}$`, "i") } },
        { logo: b.logo }
      ]
    });
    if (!exists) {
      const created = await Brand.create(b);
      console.log(`Created brand: ${created.name}`);
    } else {
      console.log(`Brand already exists: ${exists.name}, updating logo to ${b.logo}`);
      exists.name = b.name;
      exists.logo = b.logo;
      exists.status = "ACTIVE";
      await exists.save();
    }
  }

  const allBrands = await Brand.find().lean();
  console.log("All brands in DB now:", allBrands.map((b: any) => ({ name: b.name, logo: b.logo, status: b.status })));
  process.exit(0);
}

main().catch((err) => {
  console.error("Error seeding brands:", err);
  process.exit(1);
});

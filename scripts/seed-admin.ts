import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB:", mongoose.connection.db?.databaseName);

  const email = "admin@vistar.in";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.findOneAndUpdate(
    { email },
    {
      name: "VISTAR Super Admin",
      email,
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
      updatedAt: new Date(),
    },
    { upsert: true, returnDocument: "after" }
  );

  console.log("=========================================");
  console.log("Admin account successfully seeded/updated!");
  console.log("Email:   ", user.email);
  console.log("Password:", password);
  console.log("Role:    ", user.role);
  console.log("Active:  ", user.isActive);
  console.log("=========================================");

  // Verify bcrypt immediately
  const isValid = await bcrypt.compare(password, user.passwordHash);
  console.log("Password verification check:", isValid ? "PASSED [✓]" : "FAILED [✗]");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Error setting admin password:", err);
  process.exit(1);
});

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/client";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET() {
  const result: Record<string, any> = {
    timestamp: new Date().toISOString(),
    env: {
      hasMongoUri: !!process.env.MONGODB_URI,
      hasAuthSecret: !!(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET),
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "not set",
    },
    database: {
      connected: false,
      error: null,
      adminExists: false,
      userCount: 0,
    },
  };

  try {
    await connectDB();
    result.database.connected = true;

    const count = await User.countDocuments();
    result.database.userCount = count;

    const admin = await User.findOne({ email: "admin@vistar.in" });
    result.database.adminExists = !!admin;
  } catch (err: any) {
    result.database.connected = false;
    result.database.error = err?.message || "Unknown database error";
  }

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json().catch(() => ({}));
    const email = (body.email || "admin@vistar.in").toLowerCase().trim();
    const password = body.password || process.env.ADMIN_PASSWORD || "admin123";

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

    return NextResponse.json({
      success: true,
      message: `Admin account '${email}' configured successfully with password '${password}'.`,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to configure admin account.",
      },
      { status: 500 }
    );
  }
}

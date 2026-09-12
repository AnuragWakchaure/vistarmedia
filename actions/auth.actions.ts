"use server";

import { signIn, signOut } from "@/lib/auth/session";
import { AuthError } from "next-auth";
import { connectDB } from "@/lib/db/client";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function loginAdminAction(formData: FormData) {
  const email = ((formData.get("email") as string) || "").toLowerCase().trim();
  const password = (formData.get("password") as string) || "";
  const callbackUrl = (formData.get("callbackUrl") as string) || "/admin";

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  // Diagnostic Pre-Check 1: Database Connectivity
  try {
    await connectDB();
  } catch (dbError: any) {
    console.error("[Login] DB Connection Error:", dbError);
    return {
      error: `Database connection failed: ${dbError?.message || "Could not reach MongoDB Atlas"}. Please check MONGODB_URI in Vercel and ensure 0.0.0.0/0 is allowed in MongoDB Atlas Network Access.`,
    };
  }

  // Diagnostic Pre-Check 2: User Lookup & Password verification
  try {
    let user = await User.findOne({ email });

    // Auto-provision Super Admin if missing
    if (!user) {
      if (email === "admin@vistar.in") {
        const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(defaultPassword, salt);
        user = await User.create({
          name: "VISTAR Super Admin",
          email: "admin@vistar.in",
          passwordHash,
          role: "SUPER_ADMIN",
          isActive: true,
        });
      } else {
        return {
          error: `No user account found for "${email}". The default admin email is admin@vistar.in`,
        };
      }
    }

    if (!user.isActive) {
      return { error: "This administrator account is deactivated." };
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return {
        error: "Incorrect password. The default admin password is 'admin123'.",
      };
    }
  } catch (lookupErr: any) {
    console.error("[Login] Lookup error:", lookupErr);
    return {
      error: `Database query error: ${lookupErr?.message || "Failed to query user"}`,
    };
  }

  // Perform NextAuth Session Creation
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: callbackUrl,
    });
    return { success: true, redirectUrl: callbackUrl };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Authentication session error. Please check AUTH_SECRET in Vercel.",
          };
        default:
          return { error: `Authentication failed (${error.type}).` };
      }
    }
    // Re-throw or return success if redirect occurred
    return { success: true, redirectUrl: callbackUrl };
  }
}

export async function resetDefaultAdminAction() {
  try {
    await connectDB();
    const email = "admin@vistar.in";
    const password = "admin123";
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate(
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

    return {
      success: true,
      message: "Admin credentials reset to admin@vistar.in / admin123",
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to reset admin credentials.",
    };
  }
}

export async function logoutAdminAction() {
  await signOut({ redirectTo: "/admin/login" });
}
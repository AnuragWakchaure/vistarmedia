"use server";

import { signIn, signOut, getCurrentUser, requireAdminRole } from "@/lib/auth/session";
import { AuthError } from "next-auth";
import { connectDB } from "@/lib/db/client";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

/**
 * Handle Administrator Login Verification
 */
export async function loginAdminAction(formData: FormData) {
  const email = ((formData.get("email") as string) || "").toLowerCase().trim();
  const password = (formData.get("password") as string) || "";
  const callbackUrl = (formData.get("callbackUrl") as string) || "/admin";

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  // Pre-check 1: Database Connectivity
  try {
    await connectDB();
  } catch (dbError: any) {
    console.error("[Login] DB Connection Error:", dbError);
    return {
      error: `Database connection failed. Please check MONGODB_URI connectivity.`,
    };
  }

  // Pre-check 2: User Lookup & Password Verification
  try {
    let user = await User.findOne({ email });

    // Auto-provision default Super Admin if missing
    if (!user && email === "admin@vistar.in") {
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
      console.log("[Auth] Provisioned default Super Admin account for admin@vistar.in");
    }

    if (!user) {
      return {
        error: "Invalid email or password. Please verify your credentials.",
      };
    }

    if (!user.isActive) {
      return {
        error: "This administrator account has been deactivated. Please contact the Super Admin.",
      };
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return {
        error: "Invalid email or password. Please verify your credentials.",
      };
    }
  } catch (lookupErr: any) {
    console.error("[Login] Lookup error:", lookupErr);
    return {
      error: `Authentication service error: ${lookupErr?.message || "Failed to query user"}.`,
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
            error: "Invalid email or password.",
          };
        default:
          return { error: `Authentication failed (${error.type}).` };
      }
    }
    return { success: true, redirectUrl: callbackUrl };
  }
}

/**
 * Change Authenticated Administrator Password
 */
export async function changePasswordAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || !user.email) {
    return { error: "You must be signed in to change your password." };
  }

  const currentPassword = (formData.get("currentPassword") as string) || "";
  const newPassword = (formData.get("newPassword") as string) || "";
  const confirmPassword = (formData.get("confirmPassword") as string) || "";

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "Please fill in all password fields." };
  }

  if (newPassword.length < 6) {
    return { error: "New password must be at least 6 characters long." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New password and confirmation do not match." };
  }

  try {
    await connectDB();
    const dbUser = await User.findOne({ email: user.email.toLowerCase().trim() });
    if (!dbUser) {
      return { error: "User account not found in database." };
    }

    const isCurrentValid = await bcrypt.compare(currentPassword, dbUser.passwordHash);
    if (!isCurrentValid) {
      return { error: "Current password is incorrect." };
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    dbUser.passwordHash = newHash;
    dbUser.updatedAt = new Date();
    await dbUser.save();

    return {
      success: true,
      message: "Your password has been changed successfully.",
    };
  } catch (err: any) {
    console.error("[ChangePassword] Error:", err);
    return { error: err?.message || "Failed to update password." };
  }
}

/**
 * Fetch List of All Administrators
 */
export async function getAdminsAction() {
  await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  try {
    await connectDB();
    const users = await User.find()
      .select("-passwordHash")
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(users));
  } catch (err: any) {
    console.error("[GetAdmins] Error:", err);
    return [];
  }
}

/**
 * Create a New Administrator Account
 */
export async function createAdminAction(formData: FormData) {
  const currentUser = await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  const name = ((formData.get("name") as string) || "").trim();
  const email = ((formData.get("email") as string) || "").toLowerCase().trim();
  const password = (formData.get("password") as string) || "";
  const role = (formData.get("role") as string) || "ADMIN";

  if (!name || !email || !password) {
    return { error: "Name, email, and password are all required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  // Only SUPER_ADMIN can create another SUPER_ADMIN
  if (role === "SUPER_ADMIN" && (currentUser as any).role !== "SUPER_ADMIN") {
    return { error: "Only Super Admins can assign the Super Admin role." };
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return { error: `An administrator account with email "${email}" already exists.` };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      passwordHash,
      role: role as "SUPER_ADMIN" | "ADMIN" | "CONTENT_MANAGER",
      isActive: true,
    });

    revalidatePath("/admin/admins");
    return {
      success: true,
      message: `Administrator "${name}" (${email}) created successfully.`,
    };
  } catch (err: any) {
    console.error("[CreateAdmin] Error:", err);
    return { error: err?.message || "Failed to create administrator." };
  }
}

/**
 * Toggle Administrator Active Status
 */
export async function toggleAdminStatusAction(id: string) {
  const currentUser = await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  const target = await User.findById(id);
  if (!target) {
    return { error: "Administrator account not found." };
  }

  // Prevent admin from deactivating themselves
  if (target.email === currentUser.email) {
    return { error: "You cannot deactivate your own administrator account." };
  }

  // Prevent non-SUPER_ADMIN from deactivating a SUPER_ADMIN
  if (target.role === "SUPER_ADMIN" && (currentUser as any).role !== "SUPER_ADMIN") {
    return { error: "Only Super Admins can modify other Super Admin accounts." };
  }

  target.isActive = !target.isActive;
  target.updatedAt = new Date();
  await target.save();

  revalidatePath("/admin/admins");
  return {
    success: true,
    message: `Account status updated to ${target.isActive ? "Active" : "Deactivated"}.`,
  };
}

/**
 * Delete Administrator Account
 */
export async function deleteAdminAction(id: string) {
  const currentUser = await requireAdminRole(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();

  const target = await User.findById(id);
  if (!target) {
    return { error: "Administrator account not found." };
  }

  // Prevent admin from deleting themselves
  if (target.email === currentUser.email) {
    return { error: "You cannot delete your own administrator account." };
  }

  // Prevent deletion of primary super admin
  if (target.email === "admin@vistar.in") {
    return { error: "The primary Super Admin account cannot be deleted." };
  }

  if (target.role === "SUPER_ADMIN" && (currentUser as any).role !== "SUPER_ADMIN") {
    return { error: "Only Super Admins can delete Super Admin accounts." };
  }

  await User.findByIdAndDelete(id);

  revalidatePath("/admin/admins");
  return {
    success: true,
    message: "Administrator account deleted successfully.",
  };
}

/**
 * Administrator Sign Out
 */
export async function logoutAdminAction() {
  await signOut({ redirectTo: "/admin/login" });
}
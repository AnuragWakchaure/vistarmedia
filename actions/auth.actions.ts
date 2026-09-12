"use server";

import { signIn, signOut } from "@/lib/auth/session";
import { AuthError } from "next-auth";

export async function loginAdminAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/admin";

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Authentication failed. Please try again." };
      }
    }
    // Re-throw redirect exceptions Next.js uses internally
    throw error;
  }
}

export async function logoutAdminAction() {
  await signOut({ redirectTo: "/admin/login" });
}
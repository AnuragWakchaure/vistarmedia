import NextAuth from "next-auth";
import { authConfig } from "./config";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export async function requireAdminRole(allowedRoles: string[] = ["SUPER_ADMIN", "ADMIN"]) {
  const user = await getCurrentUser();
  if (!user || !allowedRoles.includes((user as any).role)) {
    throw new Error("Unauthorized: Insufficient permissions");
  }
  return user;
}
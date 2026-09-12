import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db/client";
import { User } from "@/models/User";
import { z } from "zod";
import { edgeAuthConfig } from "./edge-config";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authConfig: NextAuthConfig = {
  ...edgeAuthConfig,
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          console.error("[Auth Error] Invalid login format:", parsed.error.format());
          return null;
        }

        try {
          await connectDB();

          const targetEmail = parsed.data.email.toLowerCase().trim();
          let user = await User.findOne({ email: targetEmail });

          // Self-healing: if no user exists at all in the DB, auto-provision default Super Admin
          if (!user) {
            const count = await User.countDocuments();
            if (count === 0 && targetEmail === "admin@vistar.in") {
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
              console.log("[Auth] Auto-provisioned initial Super Admin account.");
            } else {
              console.warn(`[Auth Warning] No user found with email: ${targetEmail}`);
              return null;
            }
          }

          if (!user.isActive) {
            console.warn(`[Auth Warning] User account is deactivated: ${targetEmail}`);
            return null;
          }

          const isValid = await bcrypt.compare(
            parsed.data.password,
            user.passwordHash
          );

          if (!isValid) {
            console.warn(`[Auth Warning] Password mismatch for: ${targetEmail}`);
            return null;
          }

          user.lastLoginAt = new Date();
          await user.save();

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (dbError) {
          console.error("[Auth Error] Database connection or query error during authorization:", dbError);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};
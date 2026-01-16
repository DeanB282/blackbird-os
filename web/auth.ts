// web/auth.ts

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Dev-only fallback secret so the app always has something in development
const devFallbackSecret = "dev-only-secret-do-not-use-in-prod";

const authSecret =
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV === "development" ? devFallbackSecret : undefined);

// In non-dev, we *must* have a real secret from env
if (!authSecret) {
  throw new Error(
    "AUTH_SECRET / NEXTAUTH_SECRET is missing. " +
      "Set it in your environment (e.g. web/.env.local) before starting the app."
  );
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  secret: authSecret,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // PHASE A ONLY: simple dev login
        const devEmail = process.env.DEV_ADMIN_EMAIL;
        const devPassword = process.env.DEV_ADMIN_PASSWORD;

        if (
          devEmail &&
          devPassword &&
          credentials.email === devEmail &&
          credentials.password === devPassword
        ) {
          return {
            id: "dev-admin",
            email: credentials.email,
            name: "Dev Admin",
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
});

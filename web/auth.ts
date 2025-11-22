import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const ADMIN_EMAIL = process.env.DEV_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD;
const PARTNER_EMAIL = process.env.DEV_PARTNER_EMAIL;

const config = {
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Dev credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
async authorize(credentials) {
  // Basic guard
  if (!credentials?.email || !credentials.password) return null

  // 1) Hard-coded dev admin
  if (
    ADMIN_EMAIL &&
    ADMIN_PASSWORD &&
    credentials.email === ADMIN_EMAIL &&
    credentials.password === ADMIN_PASSWORD
  ) {
    return {
      id: "admin",
      email: ADMIN_EMAIL,
      name: "Dean (Dev Admin)",
      role: "admin",
    }
  }

  // 2) Hard-coded dev partner
  if (
    PARTNER_EMAIL &&
    ADMIN_PASSWORD &&
    credentials.email === PARTNER_EMAIL &&
    credentials.password === ADMIN_PASSWORD
  ) {
    return {
      id: "partner",
      email: PARTNER_EMAIL,
      name: "Demo Partner",
      role: "partner",
    }
  }

  // 3) Fallback: any email that knows the dev password, treated as a normal user
  if (ADMIN_PASSWORD && credentials.password === ADMIN_PASSWORD) {
    return {
      id: credentials.email,
      email: credentials.email,
      name: credentials.email,
      role: "user",
    }
  }

  // Invalid credentials
  return null
}
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When user logs in, copy role onto the token
      if (user && (user as any).role) {
        token.role = (user as any).role;
      }

      if (!token.role) {
        token.role = "user";
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export const {
  auth,
  handlers,
  signIn,
  signOut,
} = NextAuth(config);

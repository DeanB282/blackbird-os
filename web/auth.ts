// web/auth.ts

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Guard so TypeScript knows credentials are present
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

import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js configuration.
 *
 * This file is imported by middleware, which runs in the Edge runtime, so it
 * must NOT import Prisma, bcrypt, or anything else that needs Node APIs.
 * The Credentials provider (which hits the database) lives in `auth.ts`.
 */
export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        const role = token.role;
        if (role === "ADMIN" || role === "AGENT") {
          session.user.role = role;
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

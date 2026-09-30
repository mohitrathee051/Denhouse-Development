import { PrismaClient } from "@prisma/client";

/**
 * Server-only Prisma singleton.
 *
 * NEVER import this file from a Client Component. It is only ever used from
 * Server Components, Server Actions, and Route Handlers.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

import "server-only";
import { auth } from "@/lib/auth";

export class UnauthorizedError extends Error {
  constructor() {
    super("You must be signed in as an admin to perform this action.");
  }
}

/**
 * Every Server Action that creates, updates, or deletes data calls this
 * FIRST. The frontend hiding a button is never sufficient protection.
 */
export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user) {
    throw new UnauthorizedError();
  }
  return session;
}

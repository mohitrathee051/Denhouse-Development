import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Admin (service-role) Supabase client.
 *
 * `server-only` guarantees a build-time error if this module is ever
 * imported from a Client Component. SUPABASE_SERVICE_ROLE_KEY must never be
 * prefixed with NEXT_PUBLIC_ and must never be sent to the browser.
 */
export function getSupabaseAdminClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase admin client is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

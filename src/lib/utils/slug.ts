import slugify from "slugify";

export function toSlug(input: string): string {
  return slugify(input, { lower: true, strict: true, trim: true });
}

/**
 * Given a desired base slug and a lookup function that checks whether a slug
 * is already taken (optionally excluding a given record id, e.g. when
 * editing), returns a guaranteed-unique slug by appending `-2`, `-3`, etc.
 */
export async function generateUniqueSlug(
  base: string,
  isTaken: (candidate: string) => Promise<boolean>,
): Promise<string> {
  const root = toSlug(base);
  let candidate = root;
  let suffix = 2;

  // Bounded loop — a real catalog will never need hundreds of collisions.
  while (await isTaken(candidate)) {
    candidate = `${root}-${suffix}`;
    suffix += 1;
    if (suffix > 500) {
      throw new Error("Could not generate a unique slug after 500 attempts.");
    }
  }

  return candidate;
}

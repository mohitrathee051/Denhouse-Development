import type { NextConfig } from "next";

/**
 * Next.js configuration for Denhouse Group.
 *
 * `images.remotePatterns` is set to allow Next/Image to optimize images
 * served from Supabase Storage. Replace `<project-ref>` behaviour is
 * handled automatically because Supabase project URLs always follow the
 * `https://<project-ref>.supabase.co` pattern - any project will match.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Admin image uploads use Server Actions. The framework default is 1 MB,
  // while the uploader accepts images up to 5 MB each.
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },

  images: {
    // Supabase Storage URLs are already public CDN assets. Loading them
    // directly avoids Next's optimizer timing out while proxying uploads.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // Placeholder photography for demo/seed listings ONLY, until real
        // Denhouse Group photography is uploaded through the admin panel.
        // Safe to remove once no seeded demo data remains in production.
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  eslint: {
    // Lint is run explicitly in CI (`npm run lint`) and must stay clean.
    // We do not ignore errors during builds.
    ignoreDuringBuilds: false,
  },

  typescript: {
    // Type errors must never be silenced to force a build through.
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

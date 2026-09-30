import type { Config } from "tailwindcss";

/**
 * Denhouse Group design system.
 *
 * Color usage guide:
 * - navy      -> primary brand color, headings, primary buttons, admin sidebar
 * - slate     -> secondary dark surface (cards on dark backgrounds, footer)
 * - gold      -> accent ONLY (badges, dividers, premium highlights) - never
 *                used as a large background fill, and never the sole carrier
 *                of meaning (always paired with text/icon, per WCAG 1.4.1)
 * - surface   -> page background
 * - ink       -> body text
 * - muted     -> secondary/supporting text
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F172A",
          50: "#F1F5F9",
          100: "#E2E8F0",
          400: "#334155",
          500: "#1E293B",
          600: "#172035",
          700: "#0F172A",
          900: "#080D18",
        },
        slate: {
          DEFAULT: "#1E293B",
        },
        gold: {
          DEFAULT: "#C9A227",
          50: "#FBF4DD",
          400: "#D9B94F",
          500: "#C9A227",
          600: "#A8841C",
        },
        surface: "#F8FAFC",
        ink: "#0F172A",
        muted: "#64748B",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "0.75rem",
      },
      boxShadow: {
        card: "0 2px 8px 0 rgb(15 23 42 / 0.06), 0 1px 2px 0 rgb(15 23 42 / 0.04)",
        "card-hover": "0 12px 24px -6px rgb(15 23 42 / 0.12), 0 4px 8px -2px rgb(15 23 42 / 0.06)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/typography"),
  ],
};

export default config;

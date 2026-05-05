import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        "border-subtle": "var(--border-subtle)",
        brand: "var(--brand)",
        "brand-hover": "var(--brand-hover)",
        "brand-muted": "var(--brand-muted)",
      },
      boxShadow: {
        card: "0 1px 3px rgb(15 23 42 / 0.06), 0 8px 24px rgb(15 23 42 / 0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;

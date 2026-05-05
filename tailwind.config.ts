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
        sans: [
          "var(--font-inter-tight)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        "xa-deep": "var(--xa-deep)",
        "xa-deeper": "var(--xa-deeper)",
        "xa-night": "var(--xa-night)",
        "xa-line": "var(--xa-line)",
        "xa-cyan": "var(--xa-cyan)",
        "xa-magenta": "var(--xa-magenta)",
        "xa-gold": "var(--xa-gold)",
        "xa-gold-bright": "var(--xa-gold-bright)",
        "xa-cream": "var(--xa-cream)",
        "xa-ink": "var(--xa-ink)",
        "xa-ink-soft": "var(--xa-ink-soft)",
        "xa-ink-dim": "var(--xa-ink-dim)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        /* Compat con componentes anteriores → mapeo a marca */
        brand: "var(--xa-gold)",
        "brand-hover": "var(--xa-gold-bright)",
        "brand-muted": "var(--xa-cyan)",
        surface: "var(--xa-night)",
        "surface-muted": "var(--xa-deeper)",
        "border-subtle": "var(--xa-line)",
        muted: "var(--xa-ink-soft)",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(244, 230, 191, 0.08), 0 24px 80px -20px rgba(0, 0, 0, 0.55), 0 0 40px -10px rgba(45, 212, 255, 0.08)",
        glow: "0 0 32px rgba(45, 212, 255, 0.15), 0 0 64px rgba(214, 51, 108, 0.08)",
      },
      backgroundImage: {
        "gradient-xa": "linear-gradient(135deg, var(--xa-cyan) 0%, var(--xa-magenta) 100%)",
        "gradient-gold": "linear-gradient(90deg, var(--xa-gold) 0%, var(--xa-gold-bright) 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ── Maison Marquise colour system ──────────────────────────────────────
      colors: {
        // Neutrals – ivoire chaud & ardoise profond
        ivory:   { DEFAULT: "#FAF7F2", 100: "#FDF9F5", 200: "#FAF7F2", 300: "#F2EBE0" },
        stone:   { DEFAULT: "#E8E0D5", 100: "#EDE6DC", 200: "#E8E0D5", 300: "#D9CFBF" },
        charcoal:{ DEFAULT: "#2A2724", 100: "#3D3935", 200: "#2A2724", 300: "#1A1816" },

        // Brand – or chaud, terre, blush
        gold:    { DEFAULT: "#C9A96E", light: "#D9BE90", dark: "#A8854A" },
        terracotta:{ DEFAULT: "#B5705A", light: "#CC8875", dark: "#8C5040" },
        blush:   { DEFAULT: "#E8D5CC", light: "#F2E5DE", dark: "#CCBAB0" },

        // Sémantique – alias vers les tokens ci-dessus
        brand: {
          bg:       "#FAF7F2",   // ivory.DEFAULT
          surface:  "#F2EBE0",   // ivory.300
          border:   "#E8E0D5",   // stone.DEFAULT
          text:     "#2A2724",   // charcoal.DEFAULT
          muted:    "#6B6560",
          accent:   "#C9A96E",   // gold.DEFAULT
          highlight:"#B5705A",   // terracotta.DEFAULT
        },
      },

      // ── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        serif:     ["var(--font-cormorant)", "Georgia", "serif"],
        sans:      ["var(--font-montserrat)", "system-ui", "sans-serif"],
        script:    ["var(--font-parisienne)", "cursive"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl":  ["clamp(2.25rem, 6vw, 5rem)", { lineHeight: "1.1",  letterSpacing: "-0.015em" }],
        "display-lg":  ["clamp(1.75rem, 4vw, 3.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },

      // ── Spacing & layout ───────────────────────────────────────────────────
      spacing: {
        "section": "clamp(4rem, 10vw, 8rem)",
      },
      maxWidth: {
        "brand": "1320px",
      },

      // ── Motion ─────────────────────────────────────────────────────────────
      transitionTimingFunction: {
        "brand-ease": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },

      // ── Shadows ────────────────────────────────────────────────────────────
      boxShadow: {
        "warm-sm": "0 2px 8px 0 rgba(42, 39, 36, 0.06)",
        "warm-md": "0 4px 20px 0 rgba(42, 39, 36, 0.10)",
        "warm-lg": "0 8px 40px 0 rgba(42, 39, 36, 0.14)",
        "gold":    "0 0 0 1px rgba(201, 169, 110, 0.4), 0 4px 20px 0 rgba(201, 169, 110, 0.15)",
      },

      // ── Border radius ──────────────────────────────────────────────────────
      borderRadius: {
        "brand": "2px", // volontairement sobre
      },

      // ── Keyframes pour animations légères ─────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "line-grow": {
          "0%":   { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up":   "fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "fade-in":   "fade-in 0.6s ease forwards",
        "line-grow": "line-grow 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

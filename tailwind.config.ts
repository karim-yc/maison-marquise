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
      // ── Palette officielle Maison Marquise ─────────────────────────────────
      colors: {
        // Neutres premium (80 % de l'usage)
        "noir-marquise":  "#111111",
        "ivoire-maison":  "#F7F3EC",
        "blanc-marbre":   "#FAFAF8",
        "or-champagne":   "#B99A5F",
        "gris-marbre":    "#D8D6D1",
        "gris-texte":     "#4A4A4A",

        // Accents gourmands (20 % de l'usage)
        "brun-marquis":   "#6F5A2E",
        "caramel":        "#C7843E",
        "framboise":      "#A6192E",
        "pistache":       "#9A9B55",

        // Alias sémantiques pour l'usage dans les composants
        brand: {
          bg:        "#FAFAF8",   // blanc-marbre – fond principal
          surface:   "#F7F3EC",   // ivoire-maison – surfaces/cartes
          border:    "#D8D6D1",   // gris-marbre
          text:      "#111111",   // noir-marquise
          muted:     "#4A4A4A",   // gris-texte
          accent:    "#B99A5F",   // or-champagne
          warm:      "#C7843E",   // caramel
          bold:      "#A6192E",   // framboise
          earth:     "#6F5A2E",   // brun-marquis
          soft:      "#9A9B55",   // pistache
        },
      },

      // ── Typographie ─────────────────────────────────────────────────────────
      fontFamily: {
        serif:  ["var(--font-cormorant)", "Georgia", "serif"],
        sans:   ["var(--font-montserrat)", "system-ui", "sans-serif"],
        script: ["var(--font-parisienne)", "cursive"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 8vw, 7rem)",   { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl":  ["clamp(2.25rem, 6vw, 5rem)", { lineHeight: "1.1",  letterSpacing: "-0.015em" }],
        "display-lg":  ["clamp(1.75rem, 4vw, 3.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-md":  ["clamp(1.375rem, 3vw, 2.25rem)", { lineHeight: "1.2" }],
      },

      // ── Layout ──────────────────────────────────────────────────────────────
      maxWidth: { brand: "1320px" },
      screens: {
        // Mobile-first – breakpoints officiels du brief
        sm:  "320px",
        md:  "768px",
        lg:  "1024px",
        xl:  "1440px",
      },

      // ── Motion ──────────────────────────────────────────────────────────────
      transitionTimingFunction: {
        "brand": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      transitionDuration: { "400": "400ms", "600": "600ms", "800": "800ms" },

      // ── Ombres chaudes ──────────────────────────────────────────────────────
      boxShadow: {
        "warm-xs": "0 1px 4px 0 rgba(17, 17, 17, 0.05)",
        "warm-sm": "0 2px 8px 0 rgba(17, 17, 17, 0.07)",
        "warm-md": "0 4px 20px 0 rgba(17, 17, 17, 0.10)",
        "warm-lg": "0 8px 40px 0 rgba(17, 17, 17, 0.13)",
        "gold":    "0 0 0 1px rgba(185, 154, 95, 0.35), 0 4px 20px 0 rgba(185, 154, 95, 0.12)",
      },

      // ── Border radius minimal (esthétique sobre) ─────────────────────────────
      borderRadius: { brand: "2px" },

      // ── Keyframes ────────────────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in":   { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "line-grow": { "0%": { transform: "scaleX(0)" }, "100%": { transform: "scaleX(1)" } },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up":   "fade-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "fade-in":   "fade-in 0.6s ease both",
        "line-grow": "line-grow 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "shimmer":   "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

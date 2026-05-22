/**
 * Tokens de marque Maison Marquise – source de vérité unique.
 * Utilisés pour la documentation de la charte et les composants dynamiques.
 * Ces valeurs DOIVENT correspondre exactement à tailwind.config.ts.
 */

export const colors = {
  ivory: {
    100: "#FDF9F5",
    200: "#FAF7F2",
    300: "#F2EBE0",
  },
  stone: {
    100: "#EDE6DC",
    200: "#E8E0D5",
    300: "#D9CFBF",
  },
  charcoal: {
    100: "#3D3935",
    200: "#2A2724",
    300: "#1A1816",
  },
  gold: {
    light: "#D9BE90",
    DEFAULT: "#C9A96E",
    dark: "#A8854A",
  },
  terracotta: {
    light: "#CC8875",
    DEFAULT: "#B5705A",
    dark: "#8C5040",
  },
  blush: {
    light: "#F2E5DE",
    DEFAULT: "#E8D5CC",
    dark: "#CCBAB0",
  },
  muted: "#6B6560",
} as const;

export const typography = {
  fonts: {
    serif:  { name: "Cormorant Garamond", variable: "--font-cormorant", category: "Serif" },
    sans:   { name: "Montserrat",         variable: "--font-montserrat", category: "Sans-serif" },
    script: { name: "Parisienne",         variable: "--font-parisienne", category: "Script" },
  },
  weights: {
    light:   300,
    regular: 400,
    medium:  500,
    semibold: 600,
  },
  scale: {
    "display-2xl": "clamp(3rem, 8vw, 7rem)",
    "display-xl":  "clamp(2.25rem, 6vw, 5rem)",
    "display-lg":  "clamp(1.75rem, 4vw, 3.5rem)",
    body:          "1rem",
    small:         "0.875rem",
    label:         "0.6875rem",
  },
} as const;

export const spacing = {
  section: "clamp(4rem, 10vw, 8rem)",
  container: {
    maxWidth: "1320px",
    paddingInline: "clamp(1.25rem, 5vw, 5rem)",
  },
} as const;

export type BrandColor = keyof typeof colors;
export type BrandFont  = keyof typeof typography.fonts;

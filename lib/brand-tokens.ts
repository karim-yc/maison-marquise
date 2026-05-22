/**
 * Tokens Maison Marquise — source de vérité unique.
 * Toute valeur ici DOIT correspondre à tailwind.config.ts et globals.css.
 * Utilisé pour la documentation de la charte et les composants dynamiques.
 */

// ── Palette officielle ────────────────────────────────────────────────────────
export const palette = {
  // 80 % – Neutres premium
  "noir-marquise":  { hex: "#111111", label: "Noir Marquise",   usage: "Texte, logo, éléments forts" },
  "ivoire-maison":  { hex: "#F7F3EC", label: "Ivoire Maison",   usage: "Surfaces, cartes, fonds chauds" },
  "blanc-marbre":   { hex: "#FAFAF8", label: "Blanc Marbre",    usage: "Fond principal, respiration" },
  "or-champagne":   { hex: "#B99A5F", label: "Or Champagne",    usage: "Accent, filets, boutons secondaires" },
  "gris-marbre":    { hex: "#D8D6D1", label: "Gris Marbre",     usage: "Bordures, séparateurs" },
  "gris-texte":     { hex: "#4A4A4A", label: "Gris Texte",      usage: "Corps de texte, légendes" },

  // 20 % – Accents gourmands
  "brun-marquis":   { hex: "#6F5A2E", label: "Brun Marquis",    usage: "Profondeur, packaging café" },
  "caramel":        { hex: "#C7843E", label: "Caramel Pâtissier", usage: "Chaleur, illustrations, cup latte" },
  "framboise":      { hex: "#A6192E", label: "Framboise Signature", usage: "Signature, éditions limitées" },
  "pistache":       { hex: "#9A9B55", label: "Pistache Fine",   usage: "Fraîcheur, univers printemps" },
} as const;

export type PaletteKey = keyof typeof palette;

// Groupes pour la documentation de la charte
export const paletteGroups = {
  premium: ["noir-marquise", "ivoire-maison", "blanc-marbre", "or-champagne", "gris-marbre", "gris-texte"] as PaletteKey[],
  gourmand: ["brun-marquis", "caramel", "framboise", "pistache"] as PaletteKey[],
};

// ── Typographie ───────────────────────────────────────────────────────────────
export const typography = {
  fonts: {
    serif: {
      name: "Cormorant Garamond",
      variable: "--font-cormorant",
      category: "Serif",
      usage: "Titres, noms de produits, citations",
      weights: [
        { label: "Light 300",    value: 300 },
        { label: "Regular 400",  value: 400 },
        { label: "Medium 500",   value: 500 },
        { label: "SemiBold 600", value: 600 },
      ],
    },
    sans: {
      name: "Montserrat",
      variable: "--font-montserrat",
      category: "Sans-serif",
      usage: "Corps, labels, prix, navigation",
      weights: [
        { label: "Light 300",    value: 300 },
        { label: "Regular 400",  value: 400 },
        { label: "Medium 500",   value: 500 },
        { label: "SemiBold 600", value: 600 },
      ],
    },
    script: {
      name: "Parisienne",
      variable: "--font-parisienne",
      category: "Script",
      usage: "Signature, accroche poétique, packaging",
      weights: [{ label: "Regular 400", value: 400 }],
    },
  },
  scale: {
    "display-2xl": { size: "clamp(3rem, 8vw, 7rem)",       lh: "1.05" },
    "display-xl":  { size: "clamp(2.25rem, 6vw, 5rem)",    lh: "1.1"  },
    "display-lg":  { size: "clamp(1.75rem, 4vw, 3.5rem)",  lh: "1.15" },
    "display-md":  { size: "clamp(1.375rem, 3vw, 2.25rem)", lh: "1.2" },
    body:          { size: "1rem",      lh: "1.65" },
    small:         { size: "0.875rem",  lh: "1.5"  },
    label:         { size: "0.6875rem", lh: "1.4"  },
  },
} as const;

// ── Identité & baseline ───────────────────────────────────────────────────────
export const brand = {
  name:       "Maison Marquise",
  baseline:   "BIEN PLUS QU'UNE BOULANGERIE",
  positioning: "Pâtisserie fine, généreuse et accessible.",
  tagline:    "Le raffinement gourmand, accessible à tous.",
  monogram:   "M",
} as const;

// ── Règles typographiques éditoriales ─────────────────────────────────────────
export const toneOfVoice = {
  avoid:  ["luxe froid", "prétentieux", "exceptionnel (répété)", "dinguerie", "trop commercial"],
  prefer: ["préparé avec soin", "création maison", "pause gourmande", "goût du détail", "savoir-faire", "générosité maîtrisée"],
} as const;

// ── Structure des formules menu ───────────────────────────────────────────────
export const menuStructure = [
  "Logo",
  "Nom de la formule",
  "Prix visible",
  "Contenu principal",
  "Inclus dans la formule",
  "Supplément éventuel",
] as const;

// ── Univers visuels ───────────────────────────────────────────────────────────
export const visualUniverses = {
  maison:    { colors: ["blanc-marbre", "noir-marquise", "or-champagne"],        desc: "Sobre, noble, quotidien premium" },
  gourmand:  { colors: ["ivoire-maison", "caramel", "framboise", "pistache"],    desc: "Chaleureux, appétissant, accessible" },
  signature: { colors: ["noir-marquise", "or-champagne", "framboise"],           desc: "Contrasté, fort, éditions limitées" },
} as const;

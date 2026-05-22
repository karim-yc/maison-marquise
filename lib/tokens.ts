// ─────────────────────────────────────────────────────────────────────────────
// MAISON MARQUISE — Design Tokens (JS/TS mirror de tailwind.config.ts)
// Utilisé dans les composants dynamiques, la charte et les maquettes.
// NE PAS modifier sans synchroniser tailwind.config.ts.
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. Palette officielle ─────────────────────────────────────────────────────
export const palette = [
  // Groupe Premium (80 % des usages)
  {
    group: "premium" as const,
    name: "Noir Marquise",
    token: "noir-marquise",
    hex: "#111111",
    cmyk: "C0 M0 Y0 K93",
    pantone: "Black 6 C",
    usage: "Texte, logo, icônes, éléments forts",
  },
  {
    group: "premium" as const,
    name: "Ivoire Maison",
    token: "ivoire-maison",
    hex: "#F7F3EC",
    cmyk: "C2 M2 Y6 K0",
    pantone: "9183 C",
    usage: "Surfaces, cartes, fonds chauds",
  },
  {
    group: "premium" as const,
    name: "Blanc Marbre",
    token: "blanc-marbre",
    hex: "#FAFAF8",
    cmyk: "C1 M0 Y2 K0",
    pantone: "White",
    usage: "Fond principal, espaces de respiration",
  },
  {
    group: "premium" as const,
    name: "Or Champagne",
    token: "or-champagne",
    hex: "#B99A5F",
    cmyk: "C15 M30 Y60 K25",
    pantone: "7508 C",
    usage: "Accents, filets, boutons secondaires, packaging",
  },
  {
    group: "premium" as const,
    name: "Gris Marbre",
    token: "gris-marbre",
    hex: "#D8D6D1",
    cmyk: "C4 M3 Y5 K15",
    pantone: "9224 C",
    usage: "Bordures, séparateurs, fonds neutres",
  },
  {
    group: "premium" as const,
    name: "Gris Texte",
    token: "gris-texte",
    hex: "#4A4A4A",
    cmyk: "C0 M0 Y0 K71",
    pantone: "Cool Gray 10 C",
    usage: "Corps de texte, légendes, labels",
  },

  // Groupe Gourmand (20 % des usages)
  {
    group: "gourmand" as const,
    name: "Caramel Pâtissier",
    token: "caramel",
    hex: "#C7843E",
    cmyk: "C10 M45 Y75 K10",
    pantone: "7513 C",
    usage: "Chaleur, cup latte, illustrations",
  },
  {
    group: "gourmand" as const,
    name: "Framboise Signature",
    token: "framboise",
    hex: "#A6192E",
    cmyk: "C10 M90 Y65 K30",
    pantone: "200 C",
    usage: "Signature, éditions limitées, alerte douce",
  },
  {
    group: "gourmand" as const,
    name: "Pistache Fine",
    token: "pistache",
    hex: "#9A9B55",
    cmyk: "C30 M20 Y65 K20",
    pantone: "7492 C",
    usage: "Fraîcheur, univers printemps-été",
  },
  {
    group: "gourmand" as const,
    name: "Brun Marquis",
    token: "brun-marquis",
    hex: "#6F5A2E",
    cmyk: "C25 M40 Y80 K40",
    pantone: "7530 C",
    usage: "Profondeur, packaging café, brun chaud",
  },
] as const;

export type PaletteEntry = (typeof palette)[number];
export type PaletteGroup = PaletteEntry["group"];
export type PaletteToken = PaletteEntry["token"];

export const premiumColors  = palette.filter((c) => c.group === "premium");
export const gourmandColors = palette.filter((c) => c.group === "gourmand");

// ── 2. Typographie ────────────────────────────────────────────────────────────
export const typography = {
  fonts: {
    serif: {
      name: "Cormorant Garamond",
      cssVar: "--font-cormorant",
      tailwind: "font-serif",
      role: "Titres, noms de produits, citations, prix",
      weights: [
        { label: "Light",    value: 300, italic: true  },
        { label: "Regular",  value: 400, italic: true  },
        { label: "Medium",   value: 500, italic: true  },
        { label: "SemiBold", value: 600, italic: false },
      ],
    },
    sans: {
      name: "Montserrat",
      cssVar: "--font-montserrat",
      tailwind: "font-sans",
      role: "Corps, labels, navigation, prix lisibles",
      weights: [
        { label: "Light",    value: 300, italic: false },
        { label: "Regular",  value: 400, italic: false },
        { label: "Medium",   value: 500, italic: false },
        { label: "SemiBold", value: 600, italic: false },
      ],
    },
    script: {
      name: "Parisienne",
      cssVar: "--font-parisienne",
      tailwind: "font-script",
      role: "Signature, accroches poétiques, packaging — usage exclusif",
      weights: [
        { label: "Regular", value: 400, italic: false },
      ],
    },
  },

  // Pangram maison (pour les spécimens)
  specimen: {
    serif:  "L'art de sublimer chaque instant gourmand.",
    sans:   "Préparé avec soin, chaque matin depuis toujours.",
    script: "Maison Marquise",
    numbers: "0 1 2 3 4 5 6 7 8 9 , . € %",
  },

  rules: [
    "Limiter les blocs entiers en capitales espacées",
    "Réserver la Parisienne aux accents et signatures uniquement",
    "Prix et informations pratiques toujours en Montserrat lisible",
    "Cormorant en italic pour les citations et accroches éditoriales",
  ],
} as const;

// ── 3. Identité de marque ─────────────────────────────────────────────────────
export const brand = {
  name:        "Maison Marquise",
  baseline:    "BIEN PLUS QU'UNE BOULANGERIE",
  positioning: "Pâtisserie fine, généreuse et accessible.",
  tagline:     "Le raffinement gourmand, accessible à tous.",
  monogram:    "M",

  keywords: [
    "Élégante",
    "Sobre",
    "Premium",
    "Proche",
    "Gourmande",
    "Chaleureuse",
    "Accessible",
  ] as string[],

  voice: {
    avoid:  [
      "luxe froid",
      "prétentieux",
      "trop commercial",
      "trop populaire",
      '"dinguerie"',
      '"exceptionnel" répété',
    ],
    prefer: [
      "préparé avec soin",
      "création maison",
      "pause gourmande",
      "goût du détail",
      "plaisir simple",
      "savoir-faire",
      "générosité maîtrisée",
    ],
  },
} as const;

// ── 4. Formules menu ──────────────────────────────────────────────────────────
export interface FormulaItem {
  name: string;
  price: string;
  choices: string[];
  included: string[];
  supplement?: string;
}

export const menuExamples: FormulaItem[] = [
  {
    name:       "Formule Signature",
    price:      "9,90 €",
    choices:    ["Wrap", "Panini", "Mauricette", "Crudités"],
    included:   ["Boisson 33 cl", "Dessert au choix selon vitrine"],
    supplement: "Pâtisserie signature : +2,50 €",
  },
  {
    name:       "Formule Petite Pause",
    price:      "6,50 €",
    choices:    ["Viennoiserie du jour", "Toast beurre", "Madeleine maison"],
    included:   ["Café ou thé au choix"],
    supplement: "Jus pressé du matin : +1,80 €",
  },
];

// ── 5. Packaging ──────────────────────────────────────────────────────────────
export const packaging = [
  {
    id:       "cup-coffee",
    name:     "Cup Coffee",
    desc:     "Sobre, quotidien premium",
    tagline:  "Une pause préparée avec soin",
    colors:   { bg: "#F7F3EC", text: "#111111", accent: "#111111" },
    notes:    "Ivoire + logo noir. Silhouette minimaliste.",
  },
  {
    id:       "cup-latte",
    name:     "Cup Latte",
    desc:     "Chaleur et douceur caramel",
    tagline:  "Le goût d'une pause douce",
    colors:   { bg: "#C7843E", text: "#F7F3EC", accent: "#B99A5F" },
    notes:    "Caramel + logo ivoire ou or. Courbe inspirée du lait versé.",
  },
  {
    id:       "cup-iced",
    name:     "Cup Transparent",
    desc:     "Iced latte & cocktails",
    tagline:  "Maison Marquise",
    colors:   { bg: "transparent", text: "#6F5A2E", accent: "#B99A5F" },
    notes:    "Transparent + bande brun doré demi-opaque. Laisse voir la boisson.",
  },
  {
    id:       "box-patisserie",
    name:     "Boîte Pâtissière 16×16",
    desc:     "Ivoire mat, or discret",
    tagline:  "Préparé avec soin pour vous",
    colors:   { bg: "#F7F3EC", text: "#111111", accent: "#B99A5F" },
    notes:    "Ivoire mat · logo noir ou doré centré · filet or · monogramme M.",
  },
] as const;

export type PackagingItem = (typeof packaging)[number];

// ── 6. Univers visuels ────────────────────────────────────────────────────────
export const visualUniverses = [
  {
    id:     "maison",
    name:   "Univers Maison",
    desc:   "Le quotidien premium. Blanc, marbre, noir, doré subtil.",
    colors: ["#FAFAF8", "#D8D6D1", "#111111", "#B99A5F"],
    mood:   "Sobre · Architectural · Intemporel",
  },
  {
    id:     "gourmand",
    name:   "Univers Gourmand",
    desc:   "La chaleur de la maison. Ivoire, caramel, framboise, pistache.",
    colors: ["#F7F3EC", "#C7843E", "#A6192E", "#9A9B55"],
    mood:   "Chaleureux · Appétissant · Généreux",
  },
  {
    id:     "signature",
    name:   "Univers Signature",
    desc:   "L'édition limitée. Noir, photo forte, contraste assumé.",
    colors: ["#111111", "#B99A5F", "#A6192E", "#F7F3EC"],
    mood:   "Fort · Contrasté · Collectible",
  },
] as const;

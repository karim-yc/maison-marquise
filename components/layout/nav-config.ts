// ─────────────────────────────────────────────────────────────────────────────
// Navigation — configuration centrale des ancres du brandbook
// Modifier ici pour ajouter/réordonner les sections.
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  id:    string;   // ancre HTML (#id)
  label: string;   // texte affiché
  index: string;   // numérotation magazine "01"…"08"
}

export const NAV_ITEMS: NavItem[] = [
  { id: "adn",          label: "ADN",          index: "01" },
  { id: "logo",         label: "Logo",         index: "02" },
  { id: "couleurs",     label: "Couleurs",     index: "03" },
  { id: "typographies", label: "Typographies", index: "04" },
  { id: "menus",        label: "Formules",     index: "05" },
  { id: "packaging",    label: "Packaging",    index: "06" },
  { id: "univers",      label: "Univers",      index: "07" },
];

export const BRAND = {
  name:     "Maison Marquise",
  monogram: "M",
  baseline: "Bien plus qu'une boulangerie",
  year:     new Date().getFullYear(),
} as const;

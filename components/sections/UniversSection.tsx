"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// UniversSection — Les 3 univers visuels de Maison Marquise
//
// Chaque univers est une grande carte immersive avec :
//   · Fond teinté spécifique à l'univers
//   · Composition typographique editorial
//   · Mini-palette de couleurs
//   · Exemples d'usage concrets
//   · Ambiance / mots-clés
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Définition des 3 univers ──────────────────────────────────────────────────
const UNIVERS = [
  {
    id:      "maison",
    index:   "01",
    name:    "Univers Maison",
    tagline: "L'excellence du quotidien",
    desc:    "Supports officiels, menus, façades, packaging principal. La base sobre et premium de la marque — là où chaque détail compte.",
    ambiance: ["Élégante", "Claire", "Premium", "Maîtrisée"],
    usages:  [
      "Menus & cartes",
      "Façade & enseigne",
      "Documents officiels",
      "Packaging principal",
      "Site web",
      "Papeterie marque",
    ],
    palette: [
      { hex: "#FAFAF8", label: "Blanc Marbre",  border: "rgba(17,17,17,0.08)" },
      { hex: "#F7F3EC", label: "Ivoire Maison", border: "rgba(17,17,17,0.08)" },
      { hex: "#D8D6D1", label: "Gris Marbre",   border: "rgba(17,17,17,0.08)" },
      { hex: "#111111", label: "Noir Marquise", border: "transparent" },
      { hex: "#B99A5F", label: "Or Champagne",  border: "transparent" },
    ],
    // Composition visuelle CSS
    bg:         "#F7F3EC",
    bgGradient: "linear-gradient(135deg, #FAFAF8 0%, #F7F3EC 55%, #EDE7DC 100%)",
    textColor:  "#111111",
    accentColor:"#B99A5F",
    muteColor:  "#4A4A4A",
    number:     "I",
  },
  {
    id:      "gourmand",
    index:   "02",
    name:    "Univers Gourmand",
    tagline: "La chaleur de la maison",
    desc:    "Produits, vitrines, réseaux sociaux, créations saisonnières. L'identité chaude et généreuse — proche, appétissante, accessible.",
    ambiance: ["Chaleureuse", "Généreuse", "Accessible", "Vivante"],
    usages:  [
      "Fiches produits",
      "Réseaux sociaux",
      "Vitrines & PLV",
      "Créations saisonnières",
      "Emballages cadeau",
      "Communication événement",
    ],
    palette: [
      { hex: "#F7F3EC", label: "Ivoire Maison",    border: "rgba(17,17,17,0.08)" },
      { hex: "#C7843E", label: "Caramel Pâtissier", border: "transparent" },
      { hex: "#A6192E", label: "Framboise Signature", border: "transparent" },
      { hex: "#9A9B55", label: "Pistache Fine",     border: "transparent" },
      { hex: "#6F5A2E", label: "Brun Marquis",      border: "transparent" },
    ],
    bg:         "#F0E8DC",
    bgGradient: "linear-gradient(135deg, #F7F3EC 0%, #EDD8BE 50%, #E8C8A0 100%)",
    textColor:  "#2A1A08",
    accentColor:"#C7843E",
    muteColor:  "#6F5A2E",
    number:     "II",
  },
  {
    id:      "signature",
    index:   "03",
    name:    "Univers Signature",
    tagline: "L'édition qui marque",
    desc:    "Collaborations, éditions limitées, lancements spéciaux. L'identité éditoriale forte — contrastée, mémorable, événementielle.",
    ambiance: ["Forte", "Éditoriale", "Événementielle", "Collectible"],
    usages:  [
      "Éditions limitées",
      "Collaborations",
      "Lancements produits",
      "Campagnes créatives",
      "Packaging premium",
      "Direction photo forte",
    ],
    palette: [
      { hex: "#111111", label: "Noir Marquise",  border: "rgba(255,255,255,0.1)" },
      { hex: "#1A1816", label: "Noir profond",   border: "rgba(255,255,255,0.08)" },
      { hex: "#B99A5F", label: "Or Champagne",   border: "transparent" },
      { hex: "#F7F3EC", label: "Ivoire Maison",  border: "rgba(255,255,255,0.15)" },
      { hex: "#A6192E", label: "Framboise",       border: "transparent" },
    ],
    bg:         "#111111",
    bgGradient: "linear-gradient(135deg, #1A1816 0%, #111111 50%, #0A0A08 100%)",
    textColor:  "#F7F3EC",
    accentColor:"#B99A5F",
    muteColor:  "#D8D6D1",
    number:     "III",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Composition décorative propre à chaque univers
// ─────────────────────────────────────────────────────────────────────────────

function UniversDecor({ id }: { id: string }) {
  if (id === "maison") {
    return (
      <svg viewBox="0 0 320 220" className="w-full h-full" aria-hidden="true">
        {/* Grille marbre légère */}
        <line x1="0"   y1="55"  x2="320" y2="55"  stroke="#B99A5F" strokeWidth="0.4" opacity="0.18" />
        <line x1="0"   y1="110" x2="320" y2="110" stroke="#B99A5F" strokeWidth="0.4" opacity="0.10" />
        <line x1="0"   y1="165" x2="320" y2="165" stroke="#B99A5F" strokeWidth="0.4" opacity="0.18" />
        <line x1="80"  y1="0"   x2="80"  y2="220" stroke="#B99A5F" strokeWidth="0.4" opacity="0.10" />
        <line x1="160" y1="0"   x2="160" y2="220" stroke="#B99A5F" strokeWidth="0.4" opacity="0.18" />
        <line x1="240" y1="0"   x2="240" y2="220" stroke="#B99A5F" strokeWidth="0.4" opacity="0.10" />

        {/* Grand M centré */}
        <text x="160" y="175" textAnchor="middle"
          fontFamily="Georgia, serif" fontSize="160" fontWeight="300" fontStyle="italic"
          fill="#111111" opacity="0.055" letterSpacing="-4">
          M
        </text>

        {/* Filets encadrant */}
        <rect x="18" y="18" width="284" height="184" rx="1"
          fill="none" stroke="#B99A5F" strokeWidth="0.5" opacity="0.15" />
        <rect x="24" y="24" width="272" height="172" rx="1"
          fill="none" stroke="#B99A5F" strokeWidth="0.3" opacity="0.08" />

        {/* Losange or central */}
        <polygon points="160,90 168,102 160,114 152,102"
          fill="#B99A5F" opacity="0.18" />
      </svg>
    );
  }

  if (id === "gourmand") {
    return (
      <svg viewBox="0 0 320 220" className="w-full h-full" aria-hidden="true">
        {/* Cercles organiques évoquant les pâtisseries */}
        <circle cx="60"  cy="55"  r="38" fill="#C7843E" opacity="0.12" />
        <circle cx="260" cy="160" r="52" fill="#A6192E" opacity="0.10" />
        <circle cx="160" cy="110" r="70" fill="#9A9B55" opacity="0.07" />
        <circle cx="40"  cy="175" r="28" fill="#6F5A2E" opacity="0.10" />
        <circle cx="290" cy="40"  r="30" fill="#C7843E" opacity="0.09" />

        {/* M fantôme */}
        <text x="160" y="170" textAnchor="middle"
          fontFamily="Georgia, serif" fontSize="150" fontWeight="300" fontStyle="italic"
          fill="#6F5A2E" opacity="0.06">
          M
        </text>

        {/* Points décoratifs */}
        {[40, 90, 140, 190, 240, 280].map((x) =>
          [30, 80, 130, 180].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#C7843E" opacity="0.12" />
          ))
        )}
      </svg>
    );
  }

  // Signature — géométrique fort
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" aria-hidden="true">
      {/* Bloc plein or en coin haut droit */}
      <rect x="220" y="0" width="100" height="4" fill="#B99A5F" opacity="0.6" />
      <rect x="316" y="0" width="4" height="80" fill="#B99A5F" opacity="0.6" />

      {/* Bloc plein or en coin bas gauche */}
      <rect x="0" y="216" width="100" height="4" fill="#B99A5F" opacity="0.6" />
      <rect x="0" y="140" width="4" height="80" fill="#B99A5F" opacity="0.6" />

      {/* Diagonale structurante */}
      <line x1="0" y1="220" x2="320" y2="0" stroke="#B99A5F" strokeWidth="0.4" opacity="0.12" />

      {/* Grand M blanc — très grand, partiellement visible */}
      <text x="230" y="240" textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="220" fontWeight="300" fontStyle="italic"
        fill="#F7F3EC" opacity="0.06" letterSpacing="-6">
        M
      </text>

      {/* Rectangle éditorial */}
      <rect x="18" y="18" width="200" height="3" fill="#B99A5F" opacity="0.35" />
      <rect x="18" y="18" width="3"   height="60" fill="#B99A5F" opacity="0.35" />

      {/* Lignes scan */}
      {[60, 80, 100, 120, 140].map((y) => (
        <line key={y} x1="24" y1={y} x2="200" y2={y}
          stroke="#F7F3EC" strokeWidth="0.3" opacity="0.06" />
      ))}

      {/* Point fort or */}
      <circle cx="40" cy="180" r="6" fill="#B99A5F" opacity="0.40" />
      <circle cx="280" cy="40" r="4" fill="#B99A5F" opacity="0.30" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UniversCard — carte d'univers individuelle
// ─────────────────────────────────────────────────────────────────────────────

function UniversCard({ univers, index }: { univers: typeof UNIVERS[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const [hovered, setHovered] = useState(false);

  const isDark = univers.id === "signature";

  return (
    <motion.article
      ref={ref}
      className="relative rounded-[3px] overflow-hidden flex flex-col cursor-default"
      style={{
        background: univers.bgGradient,
        boxShadow: isDark
          ? "0 8px 40px rgba(17,17,17,0.25), 0 0 0 1px rgba(185,154,95,0.15)"
          : "0 4px 24px rgba(17,17,17,0.08), 0 0 0 1px rgba(17,17,17,0.06)",
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.14, ease: EASE_SPRING }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${univers.name} — ${univers.tagline}`}
    >
      {/* ── Zone visuelle décorative ────────────────────────────────── */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <div className="absolute inset-0">
          <UniversDecor id={univers.id} />
        </div>

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
          aria-hidden="true"
        />

        {/* Numéro romain flottant */}
        <motion.span
          className="absolute top-5 right-6 font-serif font-light leading-none select-none"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            color: univers.accentColor,
            opacity: 0.35,
            letterSpacing: "0.04em",
          }}
          animate={{ opacity: hovered ? 0.55 : 0.35 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          {univers.number}
        </motion.span>

        {/* Tagline grande taille — positionnée en bas de la zone déco */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <motion.p
            className="font-serif font-light italic leading-none text-balance"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: univers.textColor,
              opacity: 0.82,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 0.82, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.14 + 0.3, ease: EASE_SPRING }}
          >
            {univers.tagline}
          </motion.p>
        </div>

        {/* Dégradé de fondu vers la zone inférieure */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${univers.bg})` }}
          aria-hidden="true"
        />
      </div>

      {/* ── Contenu informatif ──────────────────────────────────────── */}
      <div className="flex flex-col gap-6 p-6 md:p-8 flex-1">

        {/* Nom + index */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              className="label-mm"
              style={{ color: univers.accentColor, opacity: 0.8 }}
            >
              {univers.index} — Univers
            </span>
            <h3
              className="font-serif font-light leading-tight mt-1"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: univers.textColor,
              }}
            >
              {univers.name.replace("Univers ", "")}
            </h3>
          </div>

          {/* Mots ambiance */}
          <div className="flex flex-wrap justify-end gap-1.5 max-w-[140px]">
            {univers.ambiance.slice(0, 2).map((word) => (
              <span
                key={word}
                className="chip-mm text-[0.55rem]"
                style={{
                  borderColor: `${univers.accentColor}35`,
                  color: univers.accentColor,
                  opacity: 0.8,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p
          className="font-sans text-ui-lg leading-relaxed"
          style={{ color: univers.muteColor }}
        >
          {univers.desc}
        </p>

        {/* Séparateur */}
        <div
          className="h-px w-full"
          style={{ background: `linear-gradient(90deg, ${univers.accentColor}40, transparent)` }}
          aria-hidden="true"
        />

        {/* Palette + usages côte à côte */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Mini-palette */}
          <div className="space-y-2.5">
            <p className="label-mm" style={{ color: univers.muteColor, opacity: 0.55 }}>
              Palette
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {univers.palette.map((c, i) => (
                <motion.div
                  key={c.hex}
                  className="flex flex-col items-center gap-1.5"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.14 + 0.4 + i * 0.06, duration: 0.45, ease: EASE_SPRING }}
                  title={c.label}
                >
                  <div
                    className="w-7 h-7 rounded-full transition-transform duration-300 hover:scale-110"
                    style={{
                      backgroundColor: c.hex,
                      border: `1px solid ${c.border}`,
                      boxShadow: isDark ? "0 0 0 1px rgba(255,255,255,0.04)" : "0 1px 3px rgba(17,17,17,0.08)",
                    }}
                  />
                </motion.div>
              ))}
            </div>
            <div className="space-y-1 mt-1">
              {univers.palette.slice(0, 3).map((c) => (
                <div key={c.hex} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.hex, border: `1px solid ${c.border}` }} />
                  <span className="font-sans text-[0.6rem] tracking-wide" style={{ color: univers.muteColor, opacity: 0.65 }}>
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Usages */}
          <div className="space-y-2.5">
            <p className="label-mm" style={{ color: univers.muteColor, opacity: 0.55 }}>
              Usages
            </p>
            <ul className="space-y-1.5" role="list">
              {univers.usages.map((usage, i) => (
                <motion.li
                  key={usage}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.14 + 0.45 + i * 0.05, duration: 0.4, ease: EASE }}
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: univers.accentColor, opacity: 0.7 }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-sans text-ui leading-tight"
                    style={{ color: univers.muteColor, opacity: 0.85 }}
                  >
                    {usage}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tous les mots ambiance */}
        <div className="flex flex-wrap gap-2 pt-1">
          {univers.ambiance.map((word) => (
            <span
              key={word}
              className="font-sans text-[0.6rem] font-medium tracking-[0.15em] uppercase"
              style={{ color: univers.accentColor, opacity: 0.45 }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Panneau comparatif — les 3 univers côte à côte, version compacte
// ─────────────────────────────────────────────────────────────────────────────

function ComparativePanel() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-[3px] border border-gris-marbre bg-blanc-marbre overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* En-tête */}
      <div className="px-6 py-4 border-b border-gris-marbre bg-ivoire-maison flex items-center justify-between">
        <div>
          <span className="label-mm text-gris-texte">Vue comparative</span>
          <h3 className="font-serif text-d-sm font-light text-noir-marquise mt-1">
            Quand utiliser quel univers ?
          </h3>
        </div>
      </div>

      {/* Tableau comparatif */}
      <div className="divide-y divide-gris-marbre/40">
        {/* Headers */}
        <div className="grid grid-cols-4 divide-x divide-gris-marbre/40">
          <div className="px-4 py-3 bg-ivoire-maison/50">
            <span className="label-mm text-gris-texte/50">Critère</span>
          </div>
          {UNIVERS.map((u) => (
            <div key={u.id} className="px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: u.accentColor }} aria-hidden="true" />
                <span className="label-mm text-gris-texte">{u.name.replace("Univers ", "")}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lignes */}
        {[
          {
            label:  "Ton",
            values: ["Sobre, maîtrisé", "Chaleureux, généreux", "Fort, éditorial"],
          },
          {
            label:  "Fréquence",
            values: ["Quotidien", "Régulier", "Ponctuel"],
          },
          {
            label:  "Supports",
            values: ["Officiel", "Produit & digital", "Événementiel"],
          },
          {
            label:  "Photo",
            values: ["Lumière douce, précise", "Texture, appétence", "Contraste fort, pose"],
          },
        ].map((row, i) => (
          <motion.div
            key={row.label}
            className={cn("grid grid-cols-4 divide-x divide-gris-marbre/40", i % 2 !== 0 && "bg-ivoire-maison/30")}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: EASE }}
          >
            <div className="px-4 py-3 bg-ivoire-maison/30">
              <span className="font-sans text-ui font-medium text-gris-texte">{row.label}</span>
            </div>
            {row.values.map((val, j) => (
              <div key={j} className="px-4 py-3">
                <span className="font-sans text-ui text-gris-texte leading-snug">{val}</span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────

export function UniversSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="univers"
      className="relative w-full bg-blanc-marbre overflow-hidden"
      aria-labelledby="univers-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

      {/* Fond subtil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(185,154,95,0.04) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-mm py-section relative">

        {/* ══ EN-TÊTE ══════════════════════════════════════════════════ */}
        <div ref={headerRef} className="mb-14 md:mb-20 max-w-2xl">
          <motion.span
            className="label-mm text-gris-texte"
            initial={{ opacity: 0, y: -8 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Univers visuels
          </motion.span>

          <div className="flex items-start gap-4 mt-3">
            <motion.span
              className="font-serif font-light text-gris-marbre/35 leading-none shrink-0 select-none"
              style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={headerIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
              aria-hidden="true"
            >
              07
            </motion.span>
            <div className="pt-1 md:pt-2">
              <motion.h2
                id="univers-title"
                className="font-serif font-light text-noir-marquise text-balance leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE_SPRING }}
              >
                Trois univers, un territoire
              </motion.h2>
              <motion.div
                className="h-px mt-4"
                style={{ background: "linear-gradient(90deg, #B99A5F, transparent)", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={headerIn ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: EASE_SPRING }}
                aria-hidden="true"
              />
            </div>
          </div>

          <motion.p
            className="mt-6 font-sans text-body-lg text-gris-texte leading-relaxed max-w-reading"
            initial={{ opacity: 0, y: 12 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            Chaque univers a sa palette, son énergie, son contexte.
            Ensemble, ils couvrent l'intégralité du territoire de marque Maison Marquise.
          </motion.p>
        </div>

        {/* ══ GRILLE 3 UNIVERS ═════════════════════════════════════════ */}
        {/*
          Mobile : 1 colonne empilée
          MD     : 1 colonne pleine largeur (cartes larges)
          LG     : 3 colonnes égales
        */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-14 md:mb-20"
          role="list"
          aria-label="Les trois univers visuels de Maison Marquise"
        >
          {UNIVERS.map((u, i) => (
            <div key={u.id} role="listitem">
              <UniversCard univers={u} index={i} />
            </div>
          ))}
        </div>

        {/* ══ TABLEAU COMPARATIF ══════════════════════════════════════ */}
        <ComparativePanel />

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

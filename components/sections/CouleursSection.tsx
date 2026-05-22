"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// CouleursSection — Palette officielle Maison Marquise
//
// Structure :
//   · En-tête (index 03, titre, intro)
//   · Règle 80 / 20 — barre de proportion animée
//   · Grille premium (6 couleurs × grande carte)
//   · Grille gourmande (4 couleurs × grande carte)
//   · Panneau usage contextuel (tableau de correspondances)
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Palette complète (avec usages enrichis du brief) ─────────────────────────
const PREMIUM = [
  {
    name:    "Noir Marquise",
    token:   "noir-marquise",
    hex:     "#111111",
    usage:   "Logo, titres, contraste, premium",
    cmyk:    "C0 M0 Y0 K93",
    pantone: "Black 6 C",
    light:   false,
  },
  {
    name:    "Ivoire Maison",
    token:   "ivoire-maison",
    hex:     "#F7F3EC",
    usage:   "Fonds chaleureux, menus, packaging clair",
    cmyk:    "C2 M2 Y6 K0",
    pantone: "9183 C",
    light:   true,
  },
  {
    name:    "Blanc Marbre",
    token:   "blanc-marbre",
    hex:     "#FAFAF8",
    usage:   "Fonds lumineux, façade, supports clairs",
    cmyk:    "C1 M0 Y2 K0",
    pantone: "White",
    light:   true,
  },
  {
    name:    "Or Champagne",
    token:   "or-champagne",
    hex:     "#B99A5F",
    usage:   "Détails premium, filets, dorure, pictogrammes",
    cmyk:    "C15 M30 Y60 K25",
    pantone: "7508 C",
    light:   false,
  },
  {
    name:    "Gris Marbre",
    token:   "gris-marbre",
    hex:     "#D8D6D1",
    usage:   "Lignes, fonds secondaires, texture",
    cmyk:    "C4 M3 Y5 K15",
    pantone: "9224 C",
    light:   false,
  },
  {
    name:    "Gris Texte",
    token:   "gris-texte",
    hex:     "#4A4A4A",
    usage:   "Descriptions, textes secondaires",
    cmyk:    "C0 M0 Y0 K71",
    pantone: "Cool Gray 10 C",
    light:   false,
  },
] as const;

const GOURMAND = [
  {
    name:    "Brun Marquis",
    token:   "brun-marquis",
    hex:     "#6F5A2E",
    usage:   "Chaleur, pâtisserie, café, bandeaux",
    cmyk:    "C25 M40 Y80 K40",
    pantone: "7530 C",
    light:   false,
  },
  {
    name:    "Caramel Pâtissier",
    token:   "caramel",
    hex:     "#C7843E",
    usage:   "Coffee time, viennoiserie, gourmandise",
    cmyk:    "C10 M45 Y75 K10",
    pantone: "7513 C",
    light:   false,
  },
  {
    name:    "Framboise Signature",
    token:   "framboise",
    hex:     "#A6192E",
    usage:   "Fruits rouges, émotion, événements",
    cmyk:    "C10 M90 Y65 K30",
    pantone: "200 C",
    light:   false,
  },
  {
    name:    "Pistache Fine",
    token:   "pistache",
    hex:     "#9A9B55",
    usage:   "Fraîcheur, créations pistache, accents",
    cmyk:    "C30 M20 Y65 K20",
    pantone: "7492 C",
    light:   false,
  },
] as const;

type ColorEntry = (typeof PREMIUM)[number] | (typeof GOURMAND)[number];

// ── Usages contextuels ────────────────────────────────────────────────────────
const USAGE_ROWS = [
  { context: "Fond principal",     colors: ["#FAFAF8", "#F7F3EC"] },
  { context: "Texte courant",      colors: ["#111111", "#4A4A4A"] },
  { context: "Accent or",          colors: ["#B99A5F"] },
  { context: "Filets & bordures",  colors: ["#D8D6D1", "#B99A5F"] },
  { context: "Packaging café",     colors: ["#6F5A2E", "#C7843E"] },
  { context: "Événementiel",       colors: ["#A6192E", "#9A9B55"] },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Retourne true si le contraste blanc est lisible sur ce fond */
function needsLightText(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) < 145;
}

// ─────────────────────────────────────────────────────────────────────────────
// ColorCard — carte couleur individuelle avec copie hex
// ─────────────────────────────────────────────────────────────────────────────

interface ColorCardProps {
  color:      ColorEntry;
  size?:      "md" | "lg";
  animDelay?: number;
}

function ColorCard({ color, size = "md", animDelay = 0 }: ColorCardProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  const [copied, setCopied] = useState(false);
  const onLight  = !needsLightText(color.hex); // texte sombre sur fond clair

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silencieux */ }
  }, [color.hex]);

  const swatchH = size === "lg" ? "h-40 md:h-48" : "h-28 md:h-32";

  return (
    <motion.article
      ref={ref}
      className={cn(
        "group flex flex-col rounded-[3px] overflow-hidden",
        "border transition-shadow duration-400",
        "hover:shadow-md",
        onLight ? "border-gris-marbre" : "border-transparent shadow-sm",
      )}
      style={{ boxShadow: onLight ? undefined : `0 0 0 1px ${color.hex}22` }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: animDelay / 1000, ease: EASE }}
      aria-label={`Couleur ${color.name} — ${color.hex}`}
    >
      {/* ── Pastille ──────────────────────────────────────────────────── */}
      <button
        className={cn("relative overflow-hidden w-full cursor-pointer", swatchH)}
        style={{ backgroundColor: color.hex }}
        onClick={handleCopy}
        aria-label={`Copier ${color.hex}`}
        title="Cliquer pour copier le code HEX"
      >
        {/* Overlay copie au hover */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center gap-2",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-250",
          "bg-black/10 backdrop-blur-[1px]",
        )}>
          <Copy
            size={13}
            strokeWidth={1.5}
            className={needsLightText(color.hex) ? "text-white/80" : "text-black/50"}
          />
          <span className={cn(
            "font-sans text-[0.6rem] font-medium tracking-[0.15em] uppercase",
            needsLightText(color.hex) ? "text-white/80" : "text-black/50",
          )}>
            Copier
          </span>
        </div>

        {/* Confirmation copie */}
        <AnimatePresence>
          {copied && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-2 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Check
                size={14}
                strokeWidth={2.5}
                className={needsLightText(color.hex) ? "text-white" : "text-black/70"}
              />
              <span className={cn(
                "font-sans text-[0.6rem] font-medium tracking-[0.15em] uppercase",
                needsLightText(color.hex) ? "text-white" : "text-black/70",
              )}>
                Copié
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hex flottant dans le swatch (visible sans hover) */}
        <span className={cn(
          "absolute bottom-3 right-3",
          "font-mono text-[0.6rem] tracking-wide",
          "transition-opacity duration-250 group-hover:opacity-0",
          needsLightText(color.hex) ? "text-white/50" : "text-black/30",
        )}>
          {color.hex.toUpperCase()}
        </span>
      </button>

      {/* ── Infos ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-2.5 p-4 bg-blanc-marbre border-t border-gris-marbre/60">

        {/* Nom */}
        <div>
          <p className="font-sans text-ui-lg font-medium text-noir-marquise leading-tight">
            {color.name}
          </p>
          <p className="font-mono text-[0.65rem] text-gris-texte/70 tracking-wide mt-0.5">
            {color.hex.toUpperCase()}
          </p>
        </div>

        {/* Usage */}
        <p className="font-sans text-ui text-gris-texte leading-snug flex-1">
          {color.usage}
        </p>

        {/* Métadonnées techniques */}
        <div className={cn(
          "pt-2.5 border-t border-gris-marbre/50",
          "flex items-center justify-between gap-2",
        )}>
          <span className="label-mm text-gris-texte/40 text-[0.55rem]">
            {"cmyk" in color ? color.cmyk : ""}
          </span>
          <span className="label-mm text-gris-texte/40 text-[0.55rem] text-right">
            {"pantone" in color ? color.pantone : ""}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Règle 80/20 — barre de proportion animée
// ─────────────────────────────────────────────────────────────────────────────

function ProportionRule() {
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
      <div className="p-6 md:p-8 space-y-6">

        {/* Titre */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label-mm text-gris-texte">Règle d'usage fondamentale</span>
            <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">
              La règle 80 / 20
            </h3>
          </div>
          <p className="font-sans text-ui text-gris-texte max-w-sm leading-relaxed">
            Toute composition Maison Marquise respecte
            cette proportion entre couleurs sobre et accent gourmand.
          </p>
        </div>

        {/* Barre de proportion */}
        <div className="space-y-3">
          <div className="relative h-12 md:h-14 rounded-[2px] overflow-hidden flex">
            {/* 80% premium */}
            <motion.div
              className="h-full flex items-center justify-start pl-4 md:pl-6"
              style={{ backgroundColor: "#111111", flexShrink: 0 }}
              initial={{ width: "0%" }}
              animate={inView ? { width: "80%" } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE_SPRING }}
            >
              <motion.span
                className="font-serif text-xl md:text-2xl font-light text-ivoire-maison/80 leading-none whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                80 %
              </motion.span>
            </motion.div>

            {/* 20% gourmand */}
            <motion.div
              className="h-full flex items-center justify-end pr-4 md:pr-6 flex-1"
              style={{ backgroundColor: "#C7843E" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.span
                className="font-serif text-xl md:text-2xl font-light text-blanc-marbre/90 leading-none whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                20 %
              </motion.span>
            </motion.div>
          </div>

          {/* Légendes */}
          <div className="flex">
            <div className="flex items-center gap-2 flex-[4]">
              <span className="w-2.5 h-2.5 rounded-full bg-noir-marquise shrink-0" aria-hidden="true" />
              <span className="font-sans text-ui text-gris-texte">
                Sobre et premium — ivoire, blanc, noir, or
              </span>
            </div>
            <div className="flex items-center gap-2 flex-[1] justify-end">
              <span className="w-2.5 h-2.5 rounded-full bg-caramel shrink-0" aria-hidden="true" />
              <span className="font-sans text-ui text-gris-texte whitespace-nowrap">
                Gourmand
              </span>
            </div>
          </div>
        </div>

        {/* Pastilles couleur groupées */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gris-marbre/50">
          {/* Groupe premium */}
          <div className="space-y-2">
            <span className="label-mm text-gris-texte/50">Groupe sobre & premium</span>
            <div className="flex flex-wrap gap-2">
              {PREMIUM.map((c) => (
                <div
                  key={c.hex}
                  className="flex items-center gap-1.5 group/dot"
                  title={c.name}
                >
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shrink-0 transition-transform duration-200 group-hover/dot:scale-110"
                    style={{ backgroundColor: c.hex }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Groupe gourmand */}
          <div className="space-y-2">
            <span className="label-mm text-gris-texte/50">Groupe gourmand & chaleureux</span>
            <div className="flex flex-wrap gap-2">
              {GOURMAND.map((c) => (
                <div
                  key={c.hex}
                  className="flex items-center gap-1.5 group/dot"
                  title={c.name}
                >
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shrink-0 transition-transform duration-200 group-hover/dot:scale-110"
                    style={{ backgroundColor: c.hex }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tableau correspondances contextuelles
// ─────────────────────────────────────────────────────────────────────────────

function UsageTable() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-[3px] border border-gris-marbre overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      role="table"
      aria-label="Correspondances couleurs par contexte d'usage"
    >
      {/* En-tête tableau */}
      <div
        className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 bg-ivoire-maison border-b border-gris-marbre"
        role="row"
      >
        <span className="label-mm text-gris-texte" role="columnheader">Contexte d'usage</span>
        <span className="label-mm text-gris-texte" role="columnheader">Couleurs associées</span>
      </div>

      {/* Lignes */}
      {USAGE_ROWS.map((row, i) => (
        <motion.div
          key={row.context}
          className={cn(
            "grid grid-cols-[1fr_auto] gap-4 items-center px-5 py-3.5",
            "border-b border-gris-marbre/40 last:border-0",
            i % 2 === 0 ? "bg-blanc-marbre" : "bg-ivoire-maison/40",
          )}
          role="row"
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: EASE }}
        >
          <span
            className="font-sans text-ui-lg text-noir-marquise"
            role="cell"
          >
            {row.context}
          </span>
          <div className="flex items-center gap-1.5" role="cell">
            {row.colors.map((hex) => (
              <div
                key={hex}
                className="w-6 h-6 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: hex }}
                title={hex}
                aria-label={hex}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────

export function CouleursSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="couleurs"
      className="relative w-full bg-ivoire-maison overflow-hidden"
      aria-labelledby="couleurs-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

      {/* M fantôme — haut droit */}
      <div
        className="absolute -top-24 -right-16 font-serif font-light leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(16rem, 36vw, 44rem)", color: "rgba(185,154,95,0.06)" }}
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
            Palette officielle
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
              03
            </motion.span>
            <div className="pt-1 md:pt-2">
              <motion.h2
                id="couleurs-title"
                className="font-serif font-light text-noir-marquise text-balance leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE_SPRING }}
              >
                Les couleurs officielles
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
            Dix couleurs pensées ensemble. Six sobres et premium,
            quatre gourmandes et chaleureuses. Cliquez sur chaque
            carte pour copier le code HEX.
          </motion.p>
        </div>

        {/* ══ RÈGLE 80 / 20 ════════════════════════════════════════════ */}
        <div className="mb-14 md:mb-18">
          <ProportionRule />
        </div>

        {/* ══ PALETTE PREMIUM ══════════════════════════════════════════ */}
        <div className="mb-12 md:mb-16">
          <motion.div
            className="mb-7 flex items-end gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div>
              <span className="label-mm text-gris-texte">Groupe principal</span>
              <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">
                Sobre &amp; premium
              </h3>
            </div>
            {/* Badge proportion */}
            <span className="chip-mm mb-1">80 %</span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {PREMIUM.map((color, i) => (
              <ColorCard
                key={color.token}
                color={color}
                size="lg"
                animDelay={i * 75}
              />
            ))}
          </div>
        </div>

        {/* Séparateur éditorial */}
        <div className="relative mb-12 md:mb-16 flex items-center gap-6">
          <div className="flex-1 h-px bg-gris-marbre/60" />
          <span className="font-script text-2xl text-or-champagne/40 select-none" aria-hidden="true">M</span>
          <div className="flex-1 h-px bg-gris-marbre/60" />
        </div>

        {/* ══ PALETTE GOURMANDE ════════════════════════════════════════ */}
        <div className="mb-14 md:mb-20">
          <motion.div
            className="mb-7 flex items-end gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div>
              <span className="label-mm text-gris-texte">Groupe accent</span>
              <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">
                Gourmand &amp; chaleureux
              </h3>
            </div>
            <span className="chip-mm mb-1">20 %</span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {GOURMAND.map((color, i) => (
              <ColorCard
                key={color.token}
                color={color}
                size="lg"
                animDelay={i * 90}
              />
            ))}
          </div>
        </div>

        {/* ══ TABLEAU USAGE CONTEXTUEL ═════════════════════════════════ */}
        <div>
          <motion.div
            className="mb-7"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="label-mm text-gris-texte">Guide pratique</span>
            <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">
              Quelle couleur, quel usage ?
            </h3>
            <div
              className="h-px mt-4 w-14"
              style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }}
              aria-hidden="true"
            />
          </motion.div>

          <UsageTable />
        </div>

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Copy, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Palette avec RGB calculé ──────────────────────────────────────────────────
const PREMIUM = [
  {
    name: "Noir Marquise",   token: "noir-marquise",
    hex: "#111111", rgb: "R17 G17 B17",
    cmyk: "C0 M0 Y0 K93",    pantone: "Black 6 C",
    usage: "Logo, titres, contraste, premium", light: false,
  },
  {
    name: "Ivoire Maison",   token: "ivoire-maison",
    hex: "#F7F3EC", rgb: "R247 G243 B236",
    cmyk: "C2 M2 Y6 K0",     pantone: "9183 C",
    usage: "Fonds chaleureux, menus, packaging clair", light: true,
  },
  {
    name: "Blanc Marbre",    token: "blanc-marbre",
    hex: "#FAFAF8", rgb: "R250 G250 B248",
    cmyk: "C1 M0 Y2 K0",     pantone: "White",
    usage: "Fonds lumineux, façade, supports clairs", light: true,
  },
  {
    name: "Or Champagne",    token: "or-champagne",
    hex: "#B99A5F", rgb: "R185 G154 B95",
    cmyk: "C15 M30 Y60 K25", pantone: "7508 C",
    usage: "Détails premium, filets, dorure", light: false,
  },
  {
    name: "Gris Marbre",     token: "gris-marbre",
    hex: "#D8D6D1", rgb: "R216 G214 B209",
    cmyk: "C4 M3 Y5 K15",   pantone: "9224 C",
    usage: "Lignes, fonds secondaires, texture", light: false,
  },
  {
    name: "Gris Texte",      token: "gris-texte",
    hex: "#4A4A4A", rgb: "R74 G74 B74",
    cmyk: "C0 M0 Y0 K71",    pantone: "Cool Gray 10 C",
    usage: "Descriptions, textes secondaires", light: false,
  },
] as const;

const GOURMAND = [
  {
    name: "Brun Marquis",       token: "brun-marquis",
    hex: "#6F5A2E", rgb: "R111 G90 B46",
    cmyk: "C25 M40 Y80 K40",  pantone: "7530 C",
    usage: "Chaleur, pâtisserie, café, bandeaux", light: false,
  },
  {
    name: "Caramel Pâtissier",  token: "caramel",
    hex: "#C7843E", rgb: "R199 G132 B62",
    cmyk: "C10 M45 Y75 K10",  pantone: "7513 C",
    usage: "Coffee time, viennoiserie, gourmandise", light: false,
  },
  {
    name: "Framboise Signature",token: "framboise",
    hex: "#A6192E", rgb: "R166 G25 B46",
    cmyk: "C10 M90 Y65 K30",  pantone: "200 C",
    usage: "Fruits rouges, émotion, événements", light: false,
  },
  {
    name: "Pistache Fine",      token: "pistache",
    hex: "#9A9B55", rgb: "R154 G155 B85",
    cmyk: "C30 M20 Y65 K20",  pantone: "7492 C",
    usage: "Fraîcheur, créations pistache, accents", light: false,
  },
] as const;

type ColorEntry = (typeof PREMIUM)[number] | (typeof GOURMAND)[number];

const USAGE_ROWS = [
  { context: "Fond principal",    colors: ["#FAFAF8", "#F7F3EC"] },
  { context: "Texte courant",     colors: ["#111111", "#4A4A4A"] },
  { context: "Accent or",         colors: ["#B99A5F"] },
  { context: "Filets & bordures", colors: ["#D8D6D1", "#B99A5F"] },
  { context: "Packaging café",    colors: ["#6F5A2E", "#C7843E"] },
  { context: "Événementiel",      colors: ["#A6192E", "#9A9B55"] },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function needsLightText(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) < 145;
}

// ─────────────────────────────────────────────────────────────────────────────
// CopyChip — bouton copie inline pour un code
// ─────────────────────────────────────────────────────────────────────────────
function CopyChip({
  value,
  label,
  muted = false,
}: {
  value: string;
  label?: string;
  muted?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* silencieux */ }
  }, [value]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group/chip inline-flex items-center gap-1.5 rounded-[2px] px-2 py-1",
        "border transition-all duration-200",
        "font-mono text-[0.62rem] tracking-wide",
        muted
          ? "border-gris-marbre/50 text-gris-texte/50 hover:border-noir-marquise/30 hover:text-noir-marquise/80 hover:bg-gris-marbre/20"
          : "border-gris-marbre text-gris-texte hover:border-or-champagne/60 hover:text-noir-marquise hover:bg-ivoire-maison",
      )}
      aria-label={`Copier ${label ?? value}`}
      title={`Cliquer pour copier : ${value}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="ok"
            className="flex items-center gap-1 text-pistache"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check size={9} strokeWidth={2.5} />
            Copié
          </motion.span>
        ) : (
          <motion.span
            key="val"
            className="flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Copy
              size={9}
              strokeWidth={1.5}
              className="opacity-0 group-hover/chip:opacity-60 transition-opacity"
            />
            {value}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ColorCard — carte couleur avec infos techniques déroulantes
// ─────────────────────────────────────────────────────────────────────────────
function ColorCard({ color, animDelay = 0 }: { color: ColorEntry; animDelay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  const [open, setOpen] = useState(false);
  const light = !needsLightText(color.hex);

  return (
    <motion.article
      ref={ref}
      className={cn(
        "flex flex-col rounded-[3px] overflow-hidden",
        "border transition-shadow duration-400 hover:shadow-md",
        light ? "border-gris-marbre" : "border-transparent shadow-sm",
      )}
      style={{ boxShadow: light ? undefined : `0 0 0 1px ${color.hex}22` }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: animDelay / 1000, ease: EASE }}
      aria-label={`Couleur ${color.name}`}
    >
      {/* ── Swatch cliquable (copie HEX) ─────────────────────────────── */}
      <button
        className="relative w-full h-28 md:h-36 cursor-pointer group/sw overflow-hidden"
        style={{ backgroundColor: color.hex }}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(color.hex);
          } catch { /* silencieux */ }
        }}
        aria-label={`Copier HEX ${color.hex}`}
        title="Cliquer pour copier le HEX"
      >
        {/* Overlay hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 group-hover/sw:opacity-100 transition-opacity duration-200 bg-black/10 backdrop-blur-[1px]">
          <Copy size={12} strokeWidth={1.5} className={needsLightText(color.hex) ? "text-white/80" : "text-black/50"} />
          <span className={cn("font-sans text-[0.58rem] font-medium tracking-[0.15em] uppercase", needsLightText(color.hex) ? "text-white/80" : "text-black/50")}>
            Copier HEX
          </span>
        </div>
        {/* HEX en bas à droite */}
        <span className={cn(
          "absolute bottom-2.5 right-3 font-mono text-[0.58rem] tracking-wide transition-opacity duration-200 group-hover/sw:opacity-0",
          needsLightText(color.hex) ? "text-white/45" : "text-black/25",
        )}>
          {color.hex.toUpperCase()}
        </span>
      </button>

      {/* ── Infos principales ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-blanc-marbre border-t border-gris-marbre/60">
        <div className="px-4 pt-3.5 pb-3 space-y-2">

          {/* Nom */}
          <p className="font-sans text-[0.8rem] font-medium text-noir-marquise leading-tight">
            {color.name}
          </p>

          {/* HEX copiable */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="label-mm text-gris-texte/40 w-8">HEX</span>
            <CopyChip value={color.hex.toUpperCase()} />
          </div>

          {/* Usage */}
          <p className="font-sans text-[0.68rem] text-gris-texte/70 leading-snug">
            {color.usage}
          </p>
        </div>

        {/* ── Zone déroulante — infos techniques ─────────────────────── */}
        <div className="border-t border-gris-marbre/50 mt-auto">
          <button
            className="w-full flex items-center justify-between px-4 py-2.5 text-left group/tog hover:bg-gris-marbre/20 transition-colors duration-150"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-label={`${open ? "Masquer" : "Voir"} les codes techniques pour ${color.name}`}
          >
            <span className="label-mm text-gris-texte/40 group-hover/tog:text-gris-texte/70 transition-colors">
              RGB · CMYK · Pantone
            </span>
            <ChevronDown
              size={12}
              strokeWidth={1.5}
              className={cn(
                "text-gris-texte/30 group-hover/tog:text-gris-texte/60 transition-all duration-200",
                open && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-3.5 pt-1 space-y-2 bg-ivoire-maison/50">
                  {/* RGB */}
                  <div className="flex items-center gap-1.5">
                    <span className="label-mm text-gris-texte/40 w-8">RGB</span>
                    <CopyChip value={color.rgb} muted />
                  </div>
                  {/* CMYK */}
                  <div className="flex items-center gap-1.5">
                    <span className="label-mm text-gris-texte/40 w-8">CMYK</span>
                    <CopyChip value={color.cmyk} muted />
                  </div>
                  {/* Pantone */}
                  <div className="flex items-center gap-1.5">
                    <span className="label-mm text-gris-texte/40 w-8">PMS</span>
                    <CopyChip value={color.pantone} muted />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProportionRule — règle 80/20
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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label-mm text-gris-texte">Règle d&apos;usage fondamentale</span>
            <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">La règle 80 / 20</h3>
          </div>
          <p className="font-sans text-ui text-gris-texte max-w-sm leading-relaxed">
            Toute composition Maison Marquise respecte cette proportion entre couleurs sobres et accents gourmands.
          </p>
        </div>

        <div className="space-y-3">
          <div className="relative h-12 md:h-14 rounded-[2px] overflow-hidden flex">
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

          <div className="flex">
            <div className="flex items-center gap-2 flex-[4]">
              <span className="w-2.5 h-2.5 rounded-full bg-noir-marquise shrink-0" aria-hidden="true" />
              <span className="font-sans text-ui text-gris-texte">Sobre et premium — ivoire, blanc, noir, or</span>
            </div>
            <div className="flex items-center gap-2 flex-[1] justify-end">
              <span className="w-2.5 h-2.5 rounded-full bg-caramel shrink-0" aria-hidden="true" />
              <span className="font-sans text-ui text-gris-texte whitespace-nowrap">Gourmand</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gris-marbre/50">
          <div className="space-y-2">
            <span className="label-mm text-gris-texte/50">Groupe sobre &amp; premium</span>
            <div className="flex flex-wrap gap-2">
              {PREMIUM.map((c) => (
                <div key={c.hex} className="w-5 h-5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: c.hex }} title={c.name} />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <span className="label-mm text-gris-texte/50">Groupe gourmand &amp; chaleureux</span>
            <div className="flex flex-wrap gap-2">
              {GOURMAND.map((c) => (
                <div key={c.hex} className="w-5 h-5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: c.hex }} title={c.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UsageTable — correspondances contextuelles
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
      <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 bg-ivoire-maison border-b border-gris-marbre" role="row">
        <span className="label-mm text-gris-texte" role="columnheader">Contexte d&apos;usage</span>
        <span className="label-mm text-gris-texte" role="columnheader">Couleurs associées</span>
      </div>
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
          <span className="font-sans text-ui-lg text-noir-marquise" role="cell">{row.context}</span>
          <div className="flex items-center gap-1.5" role="cell">
            {row.colors.map((hex) => (
              <div key={hex} className="w-6 h-6 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: hex }} title={hex} aria-label={hex} />
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
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-ivoire-maison overflow-hidden"
      aria-labelledby="couleurs-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

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
            Dix couleurs officielles — cliquez sur chaque pastille pour copier le code HEX.
            Les codes RGB, CMYK et Pantone sont disponibles en dépliant chaque carte.
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
              <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">Sobre &amp; premium</h3>
            </div>
            <span className="chip-mm mb-1">80 %</span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {PREMIUM.map((color, i) => (
              <ColorCard key={color.token} color={color} animDelay={i * 65} />
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div className="relative mb-12 md:mb-16 flex items-center gap-6">
          <div className="flex-1 h-px bg-gris-marbre/60" />
          <div className="w-4 h-px bg-or-champagne/40" aria-hidden="true" />
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
              <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">Gourmand &amp; chaleureux</h3>
            </div>
            <span className="chip-mm mb-1">20 %</span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {GOURMAND.map((color, i) => (
              <ColorCard key={color.token} color={color} animDelay={i * 80} />
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
            <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">Quelle couleur, quel usage ?</h3>
            <div className="h-px mt-4 w-14" style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }} aria-hidden="true" />
          </motion.div>
          <UsageTable />
        </div>

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

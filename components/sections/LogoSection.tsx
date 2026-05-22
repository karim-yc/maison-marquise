"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Ban, Maximize2, SunDim, Layers, Shrink, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// LogoSection — Système logo Maison Marquise
//
// Structure :
//   · En-tête (index 02, titre, intro)
//   · Grille déclinaisons × 4 (chaque carte : fond clair + fond sombre + usages)
//   · Section trichromie (noir / blanc / or / brun)
//   · Règles d'usage (Don'ts visuels)
//   · Zone de respiration interactive
//
// ASSETS : tous les logos sont des composants SVG inline pour permettre
// la trichromie (changement de couleur via fill CSS).
// Remplacer par <Image> next/image dès réception des fichiers officiels.
//
// ─────────────────────────────────────────────────────────────────────────────

const EASE       = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1] as const;

// ── Déclinaisons ─────────────────────────────────────────────────────────────
const VARIANTS = [
  {
    id:     "full",
    label:  "Logo complet",
    badge:  "Usage principal",
    usages: ["Façade & enseignes", "Documents officiels", "Menus & cartes", "Supports de marque"],
    desc:   "La version de référence. Signature script, filet or et baseline. À utiliser sur tous les supports premium et documents officiels.",
  },
  {
    id:     "no-baseline",
    label:  "Sans baseline",
    badge:  "Usage secondaire",
    usages: ["Packaging", "Réseaux sociaux", "Cartes de visite", "Supports réduits"],
    desc:   "Version épurée sans la baseline. Idéale quand l'espace est contraint ou quand le contexte rend la baseline redondante.",
  },
  {
    id:     "monogram",
    label:  "Monogramme M",
    badge:  "Usage pictogramme",
    usages: ["Favicon & app icon", "Sticker & pastille", "Motif packaging", "Pictogramme"],
    desc:   "Le monogramme seul. Unité minimale de la marque. Reconnaissable, polyvalent, utilisable en très petit format.",
  },
  {
    id:     "horizontal",
    label:  "Version horizontale",
    badge:  "Usage banneau",
    usages: ["Site web header", "Enseignes longues", "Signatures email", "Bandeaux"],
    desc:   "Disposition horizontale pour les contextes à largeur contrainte. Le M précède le nom complet sur une seule ligne.",
  },
] as const;

type VariantId = typeof VARIANTS[number]["id"];

// ── Règles à ne pas faire ─────────────────────────────────────────────────────
const DONTS = [
  { icon: Maximize2,  label: "Ne pas déformer",             desc: "Conserver les proportions d'origine en toutes circonstances." },
  { icon: SunDim,     label: "Ne pas ajouter d'ombre",      desc: "Ni drop-shadow, ni inner-shadow, ni effet de relief." },
  { icon: Layers,     label: "Ne pas utiliser sur fond chargé", desc: "Le logo demande un fond uni et dégagé pour respirer." },
  { icon: Shrink,     label: "Éviter la baseline en petit", desc: "En dessous de 120 px de large, préférer la version sans baseline." },
  { icon: Ban,        label: "Ne pas recoloriser librement", desc: "Seules les déclinaisons officielles sont autorisées." },
  { icon: Info,       label: "Respecter la zone de repos",  desc: "Espace libre minimum = hauteur du M tout autour du logo." },
] as const;

// ── Couleurs trichromie ───────────────────────────────────────────────────────
const COLORWAYS = [
  { label: "Noir Marquise", fill: "#111111", bg: "#F7F3EC", border: "#D8D6D1",       textOnBg: "#111111", name: "Sur ivoire" },
  { label: "Blanc Marbre",  fill: "#FAFAF8", bg: "#111111", border: "rgba(185,154,95,0.2)", textOnBg: "#F7F3EC", name: "Sur noir" },
  { label: "Or Champagne",  fill: "#B99A5F", bg: "#111111", border: "rgba(185,154,95,0.2)", textOnBg: "#B99A5F", name: "Or sur noir" },
  { label: "Brun Doré",     fill: "#6F5A2E", bg: "#F7F3EC", border: "#D8D6D1",       textOnBg: "#6F5A2E", name: "Brun sur ivoire" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// SVG LOGOS INLINE
// ⚠️  PLACEHOLDER — Remplacer chaque <LogoSvg*> par un <Image> next/image
// pointant vers les fichiers officiels reçus du graphiste :
//   /public/assets/logo-full.svg
//   /public/assets/logo-no-baseline.svg
//   /public/assets/logo-monogram.svg
//   /public/assets/logo-horizontal.svg
// ─────────────────────────────────────────────────────────────────────────────

function LogoFull({ fill, className }: { fill: string; className?: string }) {
  return (
    // ⚠️ PLACEHOLDER — remplacer par : <Image src="/assets/logo-full.svg" ... />
    <svg viewBox="0 0 340 110" className={cn("w-full h-auto", className)} aria-label="Maison Marquise — logo complet">
      <text x="170" y="66" textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif" fontSize="54"
        fontWeight="400" fontStyle="italic" letterSpacing="-1" fill={fill}>
        Maison Marquise
      </text>
      <line x1="40" y1="77" x2="300" y2="77" stroke={fill} strokeWidth="0.7" opacity="0.45"/>
      <text x="170" y="96" textAnchor="middle"
        fontFamily="Arial, sans-serif" fontSize="7.5" fontWeight="500" letterSpacing="3.5" fill={fill} opacity="0.65">
        BIEN PLUS QU'UNE BOULANGERIE
      </text>
    </svg>
  );
}

function LogoNoBaseline({ fill, className }: { fill: string; className?: string }) {
  return (
    // ⚠️ PLACEHOLDER — remplacer par : <Image src="/assets/logo-no-baseline.svg" ... />
    <svg viewBox="0 0 300 72" className={cn("w-full h-auto", className)} aria-label="Maison Marquise">
      <text x="150" y="56" textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif" fontSize="52"
        fontWeight="400" fontStyle="italic" letterSpacing="-1" fill={fill}>
        Maison Marquise
      </text>
    </svg>
  );
}

function LogoMonogram({ fill, className }: { fill: string; className?: string }) {
  return (
    // ⚠️ PLACEHOLDER — remplacer par : <Image src="/assets/logo-monogram.svg" ... />
    <svg viewBox="0 0 72 80" className={cn("h-full w-auto", className)} aria-label="M — Maison Marquise">
      <text x="36" y="68" textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif" fontSize="74"
        fontWeight="300" fontStyle="italic" fill={fill}>
        M
      </text>
    </svg>
  );
}

function LogoHorizontal({ fill, className }: { fill: string; className?: string }) {
  return (
    // ⚠️ PLACEHOLDER — remplacer par : <Image src="/assets/logo-horizontal.svg" ... />
    <svg viewBox="0 0 440 68" className={cn("w-full h-auto", className)} aria-label="Maison Marquise — version horizontale">
      <text x="30" y="52" fontFamily="Georgia, serif" fontSize="48"
        fontWeight="300" fontStyle="italic" fill={fill}>M</text>
      <line x1="66" y1="12" x2="66" y2="56" stroke={fill} strokeWidth="0.7" opacity="0.4"/>
      <text x="80" y="37" fontFamily="Georgia, serif" fontSize="24"
        fontWeight="400" fontStyle="italic" letterSpacing="-0.5" fill={fill}>
        Maison Marquise
      </text>
      <text x="82" y="55" fontFamily="Arial, sans-serif" fontSize="6.5"
        fontWeight="500" letterSpacing="3" fill={fill} opacity="0.6">
        BIEN PLUS QU'UNE BOULANGERIE
      </text>
    </svg>
  );
}

const LOGO_COMPONENTS: Record<VariantId, typeof LogoFull> = {
  "full":        LogoFull,
  "no-baseline": LogoNoBaseline,
  "monogram":    LogoMonogram,
  "horizontal":  LogoHorizontal,
};

// ─────────────────────────────────────────────────────────────────────────────
// SOUS-COMPOSANTS
// ─────────────────────────────────────────────────────────────────────────────

// ── Carte déclinaison ─────────────────────────────────────────────────────────
function VariantCard({
  variant,
  index,
}: {
  variant: typeof VARIANTS[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const Logo   = LOGO_COMPONENTS[variant.id];
  const isMonogram = variant.id === "monogram";

  return (
    <motion.article
      ref={ref}
      className="flex flex-col rounded-[3px] overflow-hidden border border-gris-marbre bg-blanc-marbre"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      aria-label={`Déclinaison logo : ${variant.label}`}
    >
      {/* Previews : clair + sombre */}
      <div className="grid grid-cols-2 divide-x divide-gris-marbre">

        {/* Fond clair */}
        <div
          className={cn(
            "flex items-center justify-center p-6 md:p-8 min-h-36 md:min-h-44 bg-ivoire-maison",
            isMonogram && "py-8",
          )}
          aria-label="Logo sur fond clair"
        >
          <div className={cn("w-full", isMonogram ? "max-w-[64px] mx-auto" : "max-w-[200px] md:max-w-[240px] mx-auto")}>
            {/* Zone de respiration visualisée — toujours visible, subtile */}
            <div className="relative">
              <div
                className="absolute -inset-[clamp(0.5rem,2vw,1rem)] border border-dashed border-or-champagne/15 rounded-[2px] pointer-events-none"
                aria-hidden="true"
              />
              <Logo fill="#111111" />
            </div>
          </div>
        </div>

        {/* Fond sombre */}
        <div
          className={cn(
            "flex items-center justify-center p-6 md:p-8 min-h-36 md:min-h-44 bg-noir-marquise",
            isMonogram && "py-8",
          )}
          aria-label="Logo sur fond sombre"
        >
          <div className={cn("w-full", isMonogram ? "max-w-[64px] mx-auto" : "max-w-[200px] md:max-w-[240px] mx-auto")}>
            <div className="relative">
              <div
                className="absolute -inset-[clamp(0.5rem,2vw,1rem)] border border-dashed border-or-champagne/20 rounded-[2px] pointer-events-none"
                aria-hidden="true"
              />
              <Logo fill="#F7F3EC" />
            </div>
          </div>
        </div>
      </div>

      {/* Légende fond clair / fond sombre */}
      <div className="grid grid-cols-2 divide-x divide-gris-marbre border-t border-gris-marbre">
        <p className="label-mm text-gris-texte/50 px-4 py-2 text-center">Fond clair</p>
        <p className="label-mm text-gris-texte/50 px-4 py-2 text-center">Fond sombre</p>
      </div>

      {/* Informations */}
      <div className="p-5 md:p-6 space-y-4 border-t border-gris-marbre">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-d-sm font-light text-noir-marquise leading-tight">
            {variant.label}
          </h3>
          <span className="chip-mm shrink-0">{variant.badge}</span>
        </div>

        <p className="font-sans text-ui text-gris-texte leading-relaxed">
          {variant.desc}
        </p>

        {/* Usages */}
        <div className="pt-2 border-t border-gris-marbre/60">
          <p className="label-mm text-gris-texte/50 mb-2.5">Usages recommandés</p>
          <ul className="space-y-1.5" role="list">
            {variant.usages.map((usage) => (
              <li key={usage} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-or-champagne rounded-full shrink-0" aria-hidden="true" />
                <span className="font-sans text-ui text-gris-texte">{usage}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

// ── Carte trichromie ──────────────────────────────────────────────────────────
function ColorwayCard({
  colorway,
  index,
}: {
  colorway: typeof COLORWAYS[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-[3px] overflow-hidden"
      style={{ border: `1px solid ${colorway.border}` }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_SPRING }}
    >
      {/* Preview logo */}
      <div
        className="flex items-center justify-center p-8 md:p-10 min-h-32 md:min-h-40"
        style={{ backgroundColor: colorway.bg }}
      >
        <div className="w-full max-w-[160px] mx-auto">
          <LogoNoBaseline fill={colorway.fill} />
        </div>
      </div>

      {/* Label */}
      <div
        className="px-4 py-3 border-t"
        style={{ borderColor: colorway.border, backgroundColor: colorway.bg }}
      >
        <p
          className="label-mm"
          style={{ color: colorway.textOnBg, opacity: 0.7 }}
        >
          {colorway.name}
        </p>
        <p
          className="font-mono text-[0.6rem] mt-0.5"
          style={{ color: colorway.fill, opacity: 0.8 }}
        >
          {colorway.fill}
        </p>
      </div>
    </motion.div>
  );
}

// ── Carte règle Don't ─────────────────────────────────────────────────────────
function DontCard({
  rule,
  index,
}: {
  rule: typeof DONTS[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const Icon   = rule.icon;

  return (
    <motion.div
      ref={ref}
      className={cn(
        "flex items-start gap-4 p-5 rounded-[3px]",
        "border border-framboise/15 bg-blanc-marbre",
        "border-l-2 border-l-framboise/40",
      )}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
    >
      <div className="flex items-center justify-center w-8 h-8 shrink-0 bg-framboise/8 rounded-[2px] mt-0.5">
        <Icon size={14} strokeWidth={1.5} className="text-framboise" aria-hidden="true" />
      </div>
      <div className="space-y-1 min-w-0">
        <p className="font-sans text-ui-lg font-medium text-noir-marquise">{rule.label}</p>
        <p className="font-sans text-ui text-gris-texte leading-relaxed">{rule.desc}</p>
      </div>
    </motion.div>
  );
}

// ── Zone de respiration interactive ──────────────────────────────────────────
function ClearSpaceDemo() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const [showZone, setShowZone] = useState(true);

  return (
    <motion.div
      ref={ref}
      className="rounded-[3px] border border-gris-marbre bg-blanc-marbre overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Contrôle */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gris-marbre bg-ivoire-maison">
        <p className="label-mm text-gris-texte">Zone de respiration</p>
        <button
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-[2px]",
            "font-sans text-[0.6rem] font-medium tracking-[0.14em] uppercase",
            "border transition-colors duration-200",
            showZone
              ? "border-or-champagne text-or-champagne bg-or-champagne/5 hover:bg-or-champagne/10"
              : "border-gris-marbre text-gris-texte hover:border-noir-marquise hover:text-noir-marquise",
          )}
          onClick={() => setShowZone(v => !v)}
          aria-pressed={showZone}
        >
          <span className={cn(
            "w-1.5 h-1.5 rounded-full transition-colors",
            showZone ? "bg-or-champagne" : "bg-gris-marbre",
          )} aria-hidden="true" />
          {showZone ? "Zone visible" : "Zone masquée"}
        </button>
      </div>

      {/* Démonstration visuelle */}
      <div className="relative flex items-center justify-center bg-ivoire-maison min-h-56 md:min-h-64 p-12">

        {/* Grille de fond — marbre discret */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        {/* Zone de respiration */}
        <AnimatePresence>
          {showZone && (
            <motion.div
              className="absolute inset-[10%] border border-dashed border-or-champagne/40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              aria-hidden="true"
            >
              {/* Labels des côtés */}
              {(["top", "bottom", "left", "right"] as const).map((side) => (
                <div
                  key={side}
                  className={cn(
                    "absolute font-sans text-[0.5rem] tracking-[0.15em] uppercase text-or-champagne/70",
                    side === "top"    && "-top-4 left-1/2 -translate-x-1/2",
                    side === "bottom" && "-bottom-4 left-1/2 -translate-x-1/2",
                    side === "left"   && "top-1/2 -translate-y-1/2 -left-8 [writing-mode:vertical-rl] rotate-180",
                    side === "right"  && "top-1/2 -translate-y-1/2 -right-8 [writing-mode:vertical-rl]",
                  )}
                  aria-hidden="true"
                >
                  = hauteur M
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo centré */}
        <div className="relative z-raised w-full max-w-[220px] mx-auto">
          <LogoFull fill="#111111" />
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gris-marbre">
        <p className="font-sans text-ui text-gris-texte leading-relaxed max-w-reading">
          L'espace minimum tout autour du logo correspond à la hauteur du M.
          Cet espace ne peut contenir aucun autre élément graphique ou typographique.
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export function LogoSection() {
  const headerRef     = useRef<HTMLDivElement>(null);
  const trichromieRef = useRef<HTMLDivElement>(null);
  const dontsRef      = useRef<HTMLDivElement>(null);

  const headerIn     = useInView(headerRef,     { once: true, margin: "-80px 0px" });
  const trichromieIn = useInView(trichromieRef, { once: true, margin: "-60px 0px" });
  const dontsIn      = useInView(dontsRef,      { once: true, margin: "-60px 0px" });

  return (
    <section
      id="logo"
      className="relative w-full bg-blanc-marbre overflow-hidden"
      aria-labelledby="logo-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

      {/* M fantôme — coin haut droit */}
      <div
        className="absolute -top-20 -right-12 font-serif font-light leading-none select-none pointer-events-none text-gris-marbre/6"
        style={{ fontSize: "clamp(18rem, 38vw, 46rem)" }}
        aria-hidden="true"
      >
        M
      </div>

      <div className="container-mm py-section relative">

        {/* ══ EN-TÊTE ══════════════════════════════════════════════════════ */}
        <div ref={headerRef} className="mb-14 md:mb-20 max-w-2xl">
          <motion.span
            className="label-mm text-gris-texte"
            initial={{ opacity: 0, y: -8 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Système logo
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
              02
            </motion.span>

            <div className="pt-1 md:pt-2">
              <motion.h2
                id="logo-title"
                className="font-serif font-light text-noir-marquise text-balance leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE_SPRING }}
              >
                Le logo Maison Marquise
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
            Quatre déclinaisons officielles pour couvrir l'ensemble des supports.
            Chaque version respecte une zone de respiration équivalente à la hauteur du&nbsp;M.
          </motion.p>

          {/* Bannière asset */}
          <motion.div
            className="mt-6 flex items-start gap-2.5 px-4 py-3 border border-caramel/30 bg-caramel/4 rounded-[2px]"
            initial={{ opacity: 0 }}
            animate={headerIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            role="note"
            aria-label="Information sur les assets logo"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-caramel mt-1.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-sans text-[0.65rem] font-medium tracking-[0.12em] uppercase text-caramel">
                Assets placeholder actifs
              </p>
              <p className="font-sans text-[0.7rem] text-caramel/70 mt-1 leading-snug">
                Déposer les SVG officiels dans{" "}
                <code className="font-mono text-caramel/80">/public/assets/</code>{" "}
                puis passer <code className="font-mono text-caramel/80">LOGO_MODE = "official"</code>{" "}
                dans <code className="font-mono text-caramel/80">HeroLogo.tsx</code>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ══ GRILLE DÉCLINAISONS ══════════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16 md:mb-20"
          role="list"
          aria-label="Déclinaisons du logo Maison Marquise"
        >
          {VARIANTS.map((v, i) => (
            <div key={v.id} role="listitem">
              <VariantCard variant={v} index={i} />
            </div>
          ))}
        </div>

        {/* ══ TRICHROMIE ════════════════════════════════════════════════════ */}
        <div ref={trichromieRef} className="mb-16 md:mb-20">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={trichromieIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="label-mm text-gris-texte">Déclinaisons couleur</span>
            <h3 className="font-serif text-d-md font-light text-noir-marquise mt-2">
              Versions approuvées
            </h3>
            <div
              className="h-px mt-4 w-16"
              style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }}
              aria-hidden="true"
            />
            <p className="mt-4 font-sans text-ui-lg text-gris-texte leading-relaxed max-w-reading">
              Seules ces quatre combinaisons couleur/fond sont autorisées.
              Toute autre teinte constitue un usage non officiel.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {COLORWAYS.map((cw, i) => (
              <ColorwayCard key={cw.label} colorway={cw} index={i} />
            ))}
          </div>
        </div>

        {/* ══ ZONE DE RESPIRATION ══════════════════════════════════════════ */}
        <div className="mb-16 md:mb-20">
          <div className="mb-8">
            <span className="label-mm text-gris-texte">Règle fondamentale</span>
            <h3 className="font-serif text-d-md font-light text-noir-marquise mt-2">
              Zone de respiration
            </h3>
            <div
              className="h-px mt-4 w-16"
              style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }}
              aria-hidden="true"
            />
          </div>
          <ClearSpaceDemo />
        </div>

        {/* ══ RÈGLES DON'T ════════════════════════════════════════════════ */}
        <div ref={dontsRef}>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={dontsIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="label-mm text-framboise/80">Règles d'usage</span>
            <h3 className="font-serif text-d-md font-light text-noir-marquise mt-2">
              Ce qu'il ne faut jamais faire
            </h3>
            <div
              className="h-px mt-4 w-16"
              style={{ background: "linear-gradient(90deg, #A6192E, transparent)" }}
              aria-hidden="true"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DONTS.map((rule, i) => (
              <DontCard key={rule.label} rule={rule} index={i} />
            ))}
          </div>
        </div>

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Ban, Maximize2, SunDim, Layers, Shrink, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoFull, LogoVariant, LogoMonogram } from "@/components/brand/LogoSvg";

// ─────────────────────────────────────────────────────────────────────────────
// LogoSection — Système logo & ressources Maison Marquise
// ─────────────────────────────────────────────────────────────────────────────

const EASE       = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1] as const;

// ── Déclinaisons ─────────────────────────────────────────────────────────────
const VARIANTS = [
  {
    id:        "full",
    label:     "Logo complet",
    badge:     "Usage principal",
    usages:    ["Façade & enseignes", "Documents officiels", "Menus & cartes", "Supports de marque"],
    desc:      "La version de référence. Mark M, nom complet et baseline. À utiliser sur tous les supports premium.",
    minSize:   "120 px de largeur minimum",
    fondOk:    "Ivoire · Blanc marbre · Noir Marquise",
    fondEviter: "Fond photographique · Fond coloré non approuvé",
    files:     ["SVG (complet)", "PNG (blanc)", "PNG (transparent)", "PDF"],
  },
  {
    id:        "no-baseline",
    label:     "Sans baseline",
    badge:     "Usage secondaire",
    usages:    ["Packaging", "Réseaux sociaux", "Cartes de visite", "Supports réduits"],
    desc:      "Version épurée sans la baseline. Idéale quand l'espace est contraint ou le contexte suffit.",
    minSize:   "80 px de largeur minimum",
    fondOk:    "Ivoire · Blanc marbre · Noir Marquise",
    fondEviter: "Fond photographique · Couleurs non approuvées",
    files:     ["SVG (sans baseline)", "PNG (blanc)", "PNG (transparent)"],
  },
  {
    id:        "monogram",
    label:     "Monogramme M",
    badge:     "Usage pictogramme",
    usages:    ["Favicon & app icon", "Sticker & pastille", "Motif packaging", "Pictogramme"],
    desc:      "L'unité minimale de la marque. Reconnaissable, polyvalent, utilisable en très petit format.",
    minSize:   "24 px minimum (favicon) · 30 mm pour impression",
    fondOk:    "Ivoire · Noir · Or Champagne",
    fondEviter: "Fond surchargé · Fond couleur non approuvé",
    files:     ["SVG (monogramme)", "PNG (blanc)", "PNG (transparent)"],
  },
  {
    id:        "horizontal",
    label:     "Version horizontale",
    badge:     "Usage banneau",
    usages:    ["Site web header", "Enseignes longues", "Signatures email", "Bandeaux"],
    desc:      "Le M précède le nom complet sur une seule ligne. Pour contextes à largeur contrainte.",
    minSize:   "200 px de largeur minimum",
    fondOk:    "Ivoire · Blanc marbre · Noir Marquise",
    fondEviter: "Fond photographique · Formats très étroits",
    files:     ["SVG (complet)", "PNG (blanc)", "PNG (transparent)"],
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


function LogoFullAdapter({ fill, className }: { fill: string; className?: string }) {
  return <LogoFull className={cn("w-full h-auto", className)} style={{ color: fill }} aria-hidden={true} />;
}
function LogoNoBaseline({ fill, className }: { fill: string; className?: string }) {
  return <LogoVariant className={cn("w-full h-auto", className)} style={{ color: fill }} aria-hidden={true} />;
}
function LogoMonogramAdapter({ fill, className }: { fill: string; className?: string }) {
  return <LogoMonogram className={cn("h-full w-auto", className)} style={{ color: fill }} aria-hidden={true} />;
}
function LogoHorizontal({ fill, className }: { fill: string; className?: string }) {
  return <LogoVariant className={cn("w-full h-auto", className)} style={{ color: fill }} aria-hidden={true} />;
}

const LOGO_COMPONENTS: Record<VariantId, (p: { fill: string; className?: string }) => React.JSX.Element> = {
  "full":        LogoFullAdapter,
  "no-baseline": LogoNoBaseline,
  "monogram":    LogoMonogramAdapter,
  "horizontal":  LogoHorizontal,
};

// ─────────────────────────────────────────────────────────────────────────────
// SOUS-COMPOSANTS
// ─────────────────────────────────────────────────────────────────────────────

// ── Boutons de téléchargement logo ───────────────────────────────────────────
// SVG disponibles dès maintenant ; PNG/PDF à intégrer plus tard.
const LOGO_FILE_URLS: Record<string, string | null> = {
  // SVG officiels
  "SVG (complet)":        "/assets/LOGO_complet.svg",
  "SVG (sans baseline)":  "/assets/LOGO_sans_M.svg",
  "SVG (monogramme)":     "/assets/FAVICON.svg",
  // PNG — fond blanc
  "PNG (blanc)":          null, // géré par variante
  // PNG — fond transparent
  "PNG (transparent)":    null,
  // PDF — à produire
  "PDF":                  null,
};

// URLs PNG par variante
const LOGO_PNG_URLS: Record<string, { blanc: string; transparent: string }> = {
  "full":        { blanc: "/assets/LOGO_complet_fond_blanc.png",    transparent: "/assets/LOGO_complet_transparent.png" },
  "no-baseline": { blanc: "/assets/LOGO_sans_M_fond_blanc.png",     transparent: "/assets/LOGO_sans_M_transparent.png" },
  "monogram":    { blanc: "/assets/LOGO_monogramme_fond_blanc.png", transparent: "/assets/LOGO_monogramme_transparent.png" },
  "horizontal":  { blanc: "/assets/LOGO_complet_fond_blanc.png",    transparent: "/assets/LOGO_complet_transparent.png" },
};

function DownloadButtons({ files, variantId }: { files: readonly string[]; variantId?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gris-marbre/60">
      <span className="label-mm text-gris-texte/45 w-full mb-1">Télécharger</span>
      {files.map((fmt) => {
        let url = LOGO_FILE_URLS[fmt] ?? null;
        // PNG — résoudre via la variante si disponible
        if (fmt === "PNG (blanc)" && variantId && LOGO_PNG_URLS[variantId])
          url = LOGO_PNG_URLS[variantId].blanc;
        if (fmt === "PNG (transparent)" && variantId && LOGO_PNG_URLS[variantId])
          url = LOGO_PNG_URLS[variantId].transparent;
        const DownloadIcon = (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 1v5M2.5 4l2.5 3 2.5-3M1 8h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        );
        if (url) {
          return (
            <a
              key={fmt}
              href={url}
              download
              className={[
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px]",
                "font-sans text-[0.58rem] font-medium tracking-[0.12em] uppercase",
                "border border-or-champagne/40 text-noir-marquise bg-ivoire-maison",
                "hover:border-or-champagne hover:bg-or-champagne/5 transition-colors duration-200",
              ].join(" ")}
              aria-label={`Télécharger ${fmt}`}
            >
              {DownloadIcon}
              {fmt}
            </a>
          );
        }
        return (
          <button
            key={fmt}
            disabled
            className={[
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px]",
              "font-sans text-[0.58rem] font-medium tracking-[0.12em] uppercase",
              "border border-gris-marbre text-gris-texte/35 bg-blanc-marbre cursor-not-allowed",
            ].join(" ")}
            title={`${fmt} — bientôt disponible`}
          >
            {DownloadIcon}
            {fmt}
          </button>
        );
      })}
    </div>
  );
}

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
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x divide-gris-marbre">

        {/* Fond clair */}
        <div
          className={cn(
            "flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-28 sm:min-h-36 md:min-h-44 bg-ivoire-maison",
            isMonogram && "py-8",
          )}
          aria-label="Logo sur fond clair"
        >
          <div className={cn("relative w-full", isMonogram ? "max-w-[64px] mx-auto" : "max-w-[200px] md:max-w-[240px] mx-auto")}>
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
            "flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-28 sm:min-h-36 md:min-h-44 bg-noir-marquise",
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
      <div className="hidden sm:grid grid-cols-2 divide-x divide-gris-marbre border-t border-gris-marbre">
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

        {/* Specs prestataire */}
        <div className="space-y-1.5">
          <div className="flex gap-2 items-baseline">
            <span className="label-mm text-gris-texte/40 shrink-0 w-20">Taille min.</span>
            <span className="font-sans text-[0.72rem] text-gris-texte">{variant.minSize}</span>
          </div>
          <div className="flex gap-2 items-baseline">
            <span className="label-mm text-gris-texte/40 shrink-0 w-20">Fonds OK</span>
            <span className="font-sans text-[0.72rem] text-gris-texte">{variant.fondOk}</span>
          </div>
          <div className="flex gap-2 items-baseline">
            <span className="label-mm text-framboise/50 shrink-0 w-20">À éviter</span>
            <span className="font-sans text-[0.72rem] text-gris-texte">{variant.fondEviter}</span>
          </div>
        </div>

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

        {/* Boutons téléchargement */}
        <DownloadButtons files={variant.files} variantId={variant.id} />
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

      {/* Démonstration visuelle — grille 3×3 */}
      <div className="bg-ivoire-maison px-4 py-8 md:px-8">
        <div
          className="grid mx-auto"
          style={{ gridTemplateColumns: "auto 1fr auto", maxWidth: 560 }}
          aria-hidden="true"
        >
          {/* Ligne haute — M centré sur le bord supérieur */}
          <div />
          <AnimatePresence>
            {showZone ? (
              <motion.div className="flex flex-col items-center justify-end pb-1"
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
                <div className="w-7 md:w-9 text-or-champagne/70"><LogoMonogram aria-hidden /></div>
                <div className="w-px h-4 md:h-5 bg-or-champagne/40" />
              </motion.div>
            ) : <div className="h-8" />}
          </AnimatePresence>
          <div />

          {/* Ligne centrale — M gauche · Logo · M droit */}
          <AnimatePresence>
            {showZone ? (
              <motion.div className="flex flex-row items-center justify-end pr-1"
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.3 }}>
                <div className="h-px w-4 md:w-5 bg-or-champagne/40 shrink-0" />
                <div className="w-7 md:w-9 text-or-champagne/70 shrink-0"><LogoMonogram aria-hidden /></div>
              </motion.div>
            ) : <div className="w-4" />}
          </AnimatePresence>

          {/* Logo avec cadre pointillé */}
          <div className="relative flex items-center justify-center py-5">
            <AnimatePresence>
              {showZone && (
                <motion.div
                  className="absolute inset-0 border border-dashed border-or-champagne/50 rounded-[2px] pointer-events-none"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              )}
            </AnimatePresence>
            <LogoFull style={{ color: "#111111" }} aria-hidden />
          </div>

          <AnimatePresence>
            {showZone ? (
              <motion.div className="flex flex-row items-center justify-start pl-1"
                initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }} transition={{ duration: 0.3 }}>
                <div className="w-7 md:w-9 text-or-champagne/70 shrink-0"><LogoMonogram aria-hidden /></div>
                <div className="h-px w-4 md:w-5 bg-or-champagne/40 shrink-0" />
              </motion.div>
            ) : <div className="w-4" />}
          </AnimatePresence>

          {/* Ligne basse — M centré sur le bord inférieur */}
          <div />
          <AnimatePresence>
            {showZone ? (
              <motion.div className="flex flex-col items-center justify-start pt-1"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.3 }}>
                <div className="w-px h-4 md:h-5 bg-or-champagne/40" />
                <div className="w-7 md:w-9 text-or-champagne/70"><LogoMonogram aria-hidden /></div>
              </motion.div>
            ) : <div className="h-8" />}
          </AnimatePresence>
          <div />
        </div>

        {/* Légende */}
        <AnimatePresence>
          {showZone && (
            <motion.p
              className="text-center font-sans text-[0.58rem] text-or-champagne/55 tracking-[0.1em] mt-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }} aria-hidden="true"
            >
              = hauteur du M sur chaque côté
            </motion.p>
          )}
        </AnimatePresence>
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
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-blanc-marbre overflow-hidden"
      aria-labelledby="logo-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

        {/* M fantôme supprimé */}

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

          {/* Bouton pack logos global */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={headerIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          >
            <a
              href="/assets/logos-maison-marquise.zip"
              download="logos-maison-marquise.zip"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-[2px] border border-or-champagne/40 bg-ivoire-maison text-noir-marquise font-sans text-[0.65rem] font-medium tracking-[0.14em] uppercase hover:border-or-champagne hover:bg-or-champagne/5 transition-colors duration-200"
              aria-label="Télécharger le pack logos complet — SVG officiels"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M6.5 1v7M3.5 5.5l3 3.5 3-3.5M1 10.5h11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Télécharger le pack logos
              <span className="ml-1 px-1.5 py-0.5 bg-or-champagne/15 rounded-[2px] text-[0.5rem] font-medium tracking-wide normal-case text-or-champagne/80">
                ZIP · SVG
              </span>
            </a>
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

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <span className="label-mm text-framboise/80">Règles d&apos;usage</span>
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

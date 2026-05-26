"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// TypographiesSection — Système typographique Maison Marquise
// Orienté prestataires : graphistes, développeurs, imprimeurs.
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Données des 3 polices ─────────────────────────────────────────────────────
const FONTS = [
  {
    index:   "01",
    name:    "Cormorant Garamond",
    role:    "Titres élégants",
    tagline: "CRÉATIONS MAISON",
    sample:  "L'art de sublimer chaque instant.",
    fontClass: "font-serif",
    fontStyle: { fontWeight: 300, fontStyle: "italic" as const },
    bg:      "bg-ivoire-maison",
    dark:    false,
    weights: ["Light 300", "Light Italic 300", "Regular 400", "Italic 400", "Medium 500", "SemiBold 600"],
    usages: [
      "Titres H1, H2, H3 éditoriaux",
      "Noms de créations et produits signature",
      "Citations et accroches premium",
      "Prix mis en valeur (format Cormorant Medium)",
    ],
    interdits: [
      "Corps de texte courant (trop délicat en petit)",
      "Boutons et labels interactifs",
      "Textes entiers en capitales",
    ],
    sizes: [
      { label: "Display",   spec: "clamp(2.5rem → 6rem)", note: "Titres héros, couverture" },
      { label: "H2",        spec: "2rem — Light",         note: "Titres de section" },
      { label: "H3",        spec: "1.5rem — Regular",     note: "Sous-titres" },
      { label: "Prix",      spec: "1.75rem — Medium",     note: "Format lisibilité maximale" },
    ],
    source:  "Google Fonts",
    sourceUrl: "https://fonts.google.com/specimen/Cormorant+Garamond",
    npm:     "@fontsource/cormorant-garamond",
  },
  {
    index:   "02",
    name:    "Montserrat",
    role:    "Texte courant & lisibilité",
    tagline: "UNE PAUSE PRÉPARÉE AVEC SOIN.",
    sample:  "Une pause gourmande préparée avec soin.",
    fontClass: "font-sans",
    fontStyle: { fontWeight: 400, fontStyle: "normal" as const },
    bg:      "bg-blanc-marbre",
    dark:    false,
    weights: ["Light 300", "Regular 400", "Medium 500", "SemiBold 600"],
    usages: [
      "Corps de texte, menus, descriptions",
      "Informations pratiques et prix",
      "Labels et signalétique boutique",
      "Boutons et navigation",
    ],
    interdits: [
      "Titres principaux (utiliser Cormorant)",
      "Accents décoratifs (utiliser Parisienne)",
      "Paragraphes entiers en uppercase espacé",
    ],
    sizes: [
      { label: "Label",   spec: "0.6875rem — Medium 500", note: "Espacement 0.15–0.25em" },
      { label: "Body",    spec: "1rem — Regular 400",      note: "Ligne de base" },
      { label: "Body+",   spec: "1rem — Medium 500",       note: "Corps renforcé" },
      { label: "Caption", spec: "0.8125rem — Regular",     note: "Mentions, notes" },
    ],
    source:  "Google Fonts",
    sourceUrl: "https://fonts.google.com/specimen/Montserrat",
    npm:     "@fontsource/montserrat",
  },
  {
    index:   "03",
    name:    "Parisienne",
    role:    "Accent manuscrit exclusif",
    tagline: "Signature",
    sample:  "Préparé avec soin",
    fontClass: "font-script",
    fontStyle: { fontWeight: 400, fontStyle: "normal" as const },
    bg:      "bg-noir-marquise",
    dark:    true,
    weights: ["Regular 400 (seule graisse disponible)"],
    usages: [
      "Signature officielle Maison Marquise",
      "Accroche packaging — un seul usage par composition",
      "Élément décoratif unique sur fond premium",
    ],
    interdits: [
      "Jamais en bloc de texte courant",
      "Jamais en dessous de 24px / 8mm impression",
      "Jamais combinée à une autre police script",
      "Jamais pour des prix ou informations pratiques",
    ],
    sizes: [
      { label: "Minimum", spec: "24px écran · 8mm impression", note: "En dessous = illisible" },
      { label: "Standard", spec: "clamp(2rem → 4rem)",          note: "Packaging, signature" },
      { label: "Display",  spec: "clamp(4rem → 8rem)",          note: "Hero, façade" },
    ],
    source:  "Google Fonts",
    sourceUrl: "https://fonts.google.com/specimen/Parisienne",
    npm:     "@fontsource/parisienne",
  },
] as const;

// ── Règles essentielles ───────────────────────────────────────────────────────
const RULES_DO = [
  "Cormorant pour faire rêver — titres, noms de créations, citations.",
  "Montserrat pour informer clairement — corps, menus, prix, labels.",
  "Parisienne uniquement en accent — un seul usage par composition.",
] as const;

const RULES_DONT = [
  "Longs textes en capitales espacées — illisible au-delà de 5 mots.",
  "Parisienne en petite taille ou en bloc de texte courant.",
  "Prix en police script ou ultra-light — toujours en Cormorant Medium minimum.",
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// FontCard — carte typographie compacte orientée prestataire
// ─────────────────────────────────────────────────────────────────────────────
function FontCard({
  font,
  index,
}: {
  font: typeof FONTS[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.article
      ref={ref}
      className={cn(
        "rounded-[3px] overflow-hidden border",
        font.dark ? "border-or-champagne/15" : "border-gris-marbre",
        "flex flex-col",
      )}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: EASE_SPRING }}
      aria-label={`Police ${font.name} — ${font.role}`}
    >
      {/* ── Zone specimen ─────────────────────────────────────────────── */}
      <div className={cn("px-7 md:px-10 py-9 md:py-11", font.bg)}>
        {/* Index + Nom */}
        <div className="flex items-baseline gap-3 mb-5">
          <span
            className={cn(
              "font-serif font-light text-2xl leading-none select-none",
              font.dark ? "text-or-champagne/25" : "text-gris-marbre/40"
            )}
            aria-hidden="true"
          >
            {font.index}
          </span>
          <div>
            <p className={cn("font-sans text-[0.6rem] font-medium tracking-[0.18em] uppercase mb-0.5", font.dark ? "text-or-champagne/50" : "text-gris-texte/50")}>
              {font.role}
            </p>
            <h3 className={cn("font-sans font-medium text-base", font.dark ? "text-ivoire-maison" : "text-noir-marquise")}>
              {font.name}
            </h3>
          </div>
        </div>

        {/* Specimen display */}
        <p
          className={cn("leading-tight mb-2", font.fontClass, font.dark ? "text-ivoire-maison/90" : "text-noir-marquise")}
          style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", ...font.fontStyle }}
        >
          {font.tagline}
        </p>
        <p
          className={cn("leading-relaxed", font.fontClass, font.dark ? "text-gris-marbre/55" : "text-gris-texte/70")}
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", fontWeight: 300, fontStyle: "italic" }}
        >
          {font.sample}
        </p>

        {/* Graisses disponibles */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {font.weights.map((w) => (
            <span
              key={w}
              className={cn(
                "inline-flex px-2 py-0.5 rounded-[2px] font-sans text-[0.55rem] font-medium tracking-[0.08em]",
                font.dark
                  ? "bg-ivoire-maison/8 text-ivoire-maison/45 border border-ivoire-maison/10"
                  : "bg-noir-marquise/5 text-gris-texte/55 border border-gris-marbre"
              )}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ── Infos prestataire ─────────────────────────────────────────── */}
      <div className={cn("flex-1 flex flex-col", font.dark ? "bg-noir-marquise" : "bg-blanc-marbre")}>

        {/* Usages + Interdits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gris-marbre/30 border-t border-gris-marbre/20">

          <div className="px-6 py-5 space-y-2.5">
            <div className="flex items-center gap-1.5 mb-3">
              <Check size={11} strokeWidth={2} className="text-pistache" />
              <span className="label-mm text-pistache">Usages recommandés</span>
            </div>
            <ul className="space-y-1.5" role="list">
              {font.usages.map((u) => (
                <li key={u} className={cn("font-sans text-[0.72rem] leading-snug flex gap-2 items-start", font.dark ? "text-gris-marbre/65" : "text-gris-texte")}>
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-or-champagne/50 shrink-0" aria-hidden="true" />
                  {u}
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6 py-5 space-y-2.5">
            <div className="flex items-center gap-1.5 mb-3">
              <AlertTriangle size={11} strokeWidth={1.8} className="text-framboise" />
              <span className="label-mm text-framboise">À ne jamais faire</span>
            </div>
            <ul className="space-y-1.5" role="list">
              {font.interdits.map((u) => (
                <li key={u} className={cn("font-sans text-[0.72rem] leading-snug flex gap-2 items-start", font.dark ? "text-gris-marbre/65" : "text-gris-texte")}>
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-framboise/40 shrink-0" aria-hidden="true" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tailles conseillées */}
        <div className={cn("border-t px-6 py-5", font.dark ? "border-or-champagne/10" : "border-gris-marbre/40")}>
          <p className={cn("label-mm mb-3", font.dark ? "text-gris-marbre/40" : "text-gris-texte/45")}>
            Niveaux conseillés
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {font.sizes.map((s) => (
              <div key={s.label} className={cn("rounded-[2px] px-3 py-2.5 space-y-1", font.dark ? "bg-ivoire-maison/5" : "bg-ivoire-maison/60")}>
                <p className={cn("font-sans text-[0.58rem] font-medium tracking-[0.12em] uppercase", font.dark ? "text-or-champagne/50" : "text-gris-texte/50")}>
                  {s.label}
                </p>
                <p className={cn("font-mono text-[0.62rem]", font.dark ? "text-ivoire-maison/70" : "text-noir-marquise/80")}>
                  {s.spec}
                </p>
                <p className={cn("font-sans text-[0.6rem]", font.dark ? "text-gris-marbre/40" : "text-gris-texte/50")}>
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Source & accès */}
        <div className={cn("mt-auto border-t px-6 py-4 flex flex-wrap items-center justify-between gap-3", font.dark ? "border-or-champagne/10" : "border-gris-marbre/40")}>
          <div className="space-y-0.5">
            <p className={cn("label-mm", font.dark ? "text-gris-marbre/35" : "text-gris-texte/40")}>Source légale</p>
            <code className={cn("font-mono text-[0.65rem]", font.dark ? "text-ivoire-maison/45" : "text-gris-texte/60")}>
              {font.npm}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={font.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border",
                "font-sans text-[0.58rem] font-medium tracking-[0.12em] uppercase",
                "transition-colors duration-200",
                font.dark
                  ? "border-or-champagne/25 text-or-champagne/60 hover:border-or-champagne/50 hover:text-or-champagne/90"
                  : "border-gris-marbre text-gris-texte/60 hover:border-noir-marquise/40 hover:text-noir-marquise",
              )}
              aria-label={`Voir ${font.name} sur ${font.source}`}
            >
              <ExternalLink size={9} strokeWidth={1.5} />
              {font.source}
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Règles essentielles — do / don't
// ─────────────────────────────────────────────────────────────────────────────
function RulesPanel() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Do */}
      <div className="rounded-[3px] border border-pistache/20 border-l-2 border-l-pistache/50 bg-blanc-marbre p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Check size={13} strokeWidth={2} className="text-pistache" />
          <span className="label-mm text-pistache">À retenir</span>
        </div>
        <ul className="space-y-2.5">
          {RULES_DO.map((r) => (
            <li key={r} className="font-sans text-ui text-gris-texte leading-snug flex gap-2 items-start">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-pistache/60 shrink-0" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Don't */}
      <div className="rounded-[3px] border border-framboise/15 border-l-2 border-l-framboise/40 bg-blanc-marbre p-5 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle size={13} strokeWidth={1.8} className="text-framboise" />
          <span className="label-mm text-framboise">À éviter</span>
        </div>
        <ul className="space-y-2.5">
          {RULES_DONT.map((r) => (
            <li key={r} className="font-sans text-ui text-gris-texte leading-snug flex gap-2 items-start">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-framboise/40 shrink-0" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export function TypographiesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="typographies"
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-ivoire-maison overflow-hidden"
      aria-labelledby="typo-title"
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
            Système typographique
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
              04
            </motion.span>
            <div className="pt-1 md:pt-2">
              <motion.h2
                id="typo-title"
                className="font-serif font-light text-noir-marquise text-balance leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE_SPRING }}
              >
                Trois polices, une voix
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
            Chaque police a un rôle défini. Les substitutions sont interdites.
            Les polices sont disponibles gratuitement sur Google Fonts et via npm.
          </motion.p>

          {/* Aperçu rapide + bouton download */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            animate={headerIn ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="font-serif font-light italic text-noir-marquise text-2xl leading-none">Cormorant</span>
              <span className="text-gris-marbre/50 text-sm" aria-hidden="true">·</span>
              <span className="font-sans font-medium text-noir-marquise text-sm tracking-wide">Montserrat</span>
              <span className="text-gris-marbre/50 text-sm" aria-hidden="true">·</span>
              <span className="font-script text-noir-marquise text-2xl leading-none">Parisienne</span>
            </div>

            <a
              href="/assets/fonts-maison-marquise.zip"
              download="fonts-maison-marquise.zip"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[2px] border border-or-champagne/40 bg-ivoire-maison text-noir-marquise font-sans text-[0.6rem] font-medium tracking-[0.12em] uppercase hover:border-or-champagne hover:bg-or-champagne/5 transition-colors duration-200"
              aria-label="Télécharger les polices Maison Marquise — WOFF2"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1v7M3 5.5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Télécharger les polices
              <span className="px-1.5 py-0.5 bg-or-champagne/15 rounded-[2px] text-[0.5rem] normal-case tracking-normal text-or-champagne/80 font-medium">ZIP · WOFF2</span>
            </a>
          </motion.div>
        </div>

        {/* ══ 3 CARTES POLICES ════════════════════════════════════════ */}
        <div className="space-y-5 mb-14 md:mb-20">
          {FONTS.map((font, i) => (
            <FontCard key={font.name} font={font} index={i} />
          ))}
        </div>

        {/* ══ RÈGLES ESSENTIELLES ══════════════════════════════════════ */}
        <div>
          <motion.div
            className="mb-7"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="label-mm text-gris-texte">Règles d&apos;usage</span>
            <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">
              Ce qu&apos;il faut retenir
            </h3>
            <div className="h-px mt-4 w-14" style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }} aria-hidden="true" />
          </motion.div>
          <RulesPanel />
        </div>

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

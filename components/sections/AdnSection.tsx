"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Heart,
  Crown,
  Users,
  Fingerprint,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// AdnSection — Les 5 piliers identitaires de Maison Marquise.
//
// Composition :
//   · Label + titre + intro centrés
//   · Baseline officielle en Cormorant italic
//   · Grille 5 piliers — cartes avec icône, numéro, titre, texte
//   · Bande signature en bas (noir Marquise)
// ─────────────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    index:  "01",
    icon:   Sparkles,
    title:  "Savoir-faire",
    text:   "Le geste, la précision et la finition au service du goût.",
    accent: "or-champagne" as const,
  },
  {
    index:  "02",
    icon:   Heart,
    title:  "Générosité",
    text:   "Des créations gourmandes, visuelles et pensées pour le plaisir.",
    accent: "caramel" as const,
  },
  {
    index:  "03",
    icon:   Crown,
    title:  "Élégance",
    text:   "Une identité sobre, premium et maîtrisée.",
    accent: "or-champagne" as const,
  },
  {
    index:  "04",
    icon:   Users,
    title:  "Proximité",
    text:   "Une maison accueillante, accessible et humaine.",
    accent: "pistache" as const,
  },
  {
    index:  "05",
    icon:   Fingerprint,
    title:  "Signature",
    text:   "Un univers reconnaissable, porté par le monogramme M, le marbre, l'ivoire et les détails dorés.",
    accent: "or-champagne" as const,
  },
] as const;

// Couleurs d'accent → valeurs CSS (pas de Tailwind dynamique)
const ACCENT_HEX: Record<typeof PILLARS[number]["accent"], string> = {
  "or-champagne": "#B99A5F",
  "caramel":      "#C7843E",
  "pistache":     "#9A9B55",
};

// Easing partagé
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// ── Pillar Card ───────────────────────────────────────────────────────────────
interface PillarCardProps {
  pillar: typeof PILLARS[number];
  index: number;
  isLast: boolean;
}

function PillarCard({ pillar, index, isLast }: PillarCardProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const Icon   = pillar.icon;
  const hex    = ACCENT_HEX[pillar.accent];

  return (
    <motion.article
      ref={ref}
      className={cn(
        "group relative flex flex-col gap-5",
        "bg-blanc-marbre border border-gris-marbre rounded-[3px]",
        "p-6 md:p-8",
        "transition-shadow duration-500",
        "hover:shadow-md hover:border-or-champagne/30",
        // La 5ème carte s'étire sur 2 colonnes en md (grille 2 col)
        // et prend 1 col en lg (grille 5)
        isLast && "md:col-span-2 lg:col-span-1",
      )}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    >

      {/* Filet accent en haut — s'étire au hover */}
      <div
        className="absolute top-0 left-6 right-6 h-px transition-all duration-500 group-hover:left-0 group-hover:right-0"
        style={{ background: `linear-gradient(90deg, transparent, ${hex}, transparent)`, opacity: 0.5 }}
        aria-hidden="true"
      />

      {/* ── En-tête : icône + index ─────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        {/* Icône dans un carré sobre */}
        <div
          className="flex items-center justify-center w-10 h-10 rounded-[2px] shrink-0 transition-colors duration-300"
          style={{ backgroundColor: `${hex}12` }}
          aria-hidden="true"
        >
          <Icon
            size={17}
            strokeWidth={1.4}
            style={{ color: hex }}
          />
        </div>

        {/* Numéro Cormorant — grand, fantôme */}
        <span
          className="font-serif font-light leading-none select-none text-gris-marbre transition-colors duration-500 group-hover:text-or-champagne/30"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          aria-hidden="true"
        >
          {pillar.index}
        </span>
      </div>

      {/* ── Corps ──────────────────────────────────────────────────────── */}
      <div className="space-y-3 flex-1">
        <h3 className="font-serif text-d-sm font-light text-noir-marquise leading-snug">
          {pillar.title}
        </h3>
        <p className="font-sans text-ui-lg text-gris-texte leading-relaxed">
          {pillar.text}
        </p>
      </div>

      {/* ── Trait accent bas — invisible, révélé au hover ──────────────── */}
      <div className="mt-auto pt-4 overflow-hidden">
        <motion.div
          className="h-px"
          style={{ background: `linear-gradient(90deg, ${hex}, transparent)` }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
      </div>
    </motion.article>
  );
}

// ── Section principale ────────────────────────────────────────────────────────
export function AdnSection() {
  const headerRef   = useRef<HTMLDivElement>(null);
  const baselineRef = useRef<HTMLDivElement>(null);
  const bandeRef    = useRef<HTMLDivElement>(null);

  const headerIn   = useInView(headerRef,   { once: true, margin: "-80px 0px" });
  const baselineIn = useInView(baselineRef, { once: true, margin: "-60px 0px" });
  const bandeIn    = useInView(bandeRef,    { once: true, margin: "-60px 0px" });

  return (
    <section
      id="adn"
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-ivoire-maison overflow-hidden"
      aria-labelledby="adn-title"
    >
      {/* Filet or supérieur */}
      <div className="line-gold w-full" aria-hidden="true" />

        {/* M fantôme supprimé */}

      <div className="container-mm py-section relative">

        {/* ══ EN-TÊTE ════════════════════════════════════════════════════ */}
        <div ref={headerRef} className="mb-14 md:mb-20 max-w-2xl">

          {/* Label */}
          <motion.span
            className="label-mm text-gris-texte"
            initial={{ opacity: 0, y: -8 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Identité de marque
          </motion.span>

          {/* Index + titre */}
          <div className="flex items-start gap-4 mt-3">
            <motion.span
              className="font-serif font-light text-gris-marbre/40 leading-none shrink-0 select-none"
              style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={headerIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
              aria-hidden="true"
            >
              01
            </motion.span>

            <div className="pt-1 md:pt-2">
              <motion.h2
                id="adn-title"
                className="font-serif font-light text-noir-marquise text-balance leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                ADN de marque
              </motion.h2>

              {/* Filet or */}
              <motion.div
                className="h-px mt-4 mb-0"
                style={{
                  background: "linear-gradient(90deg, #B99A5F, transparent)",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={headerIn ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Intro */}
          <motion.p
            className="mt-6 font-sans text-body-lg text-gris-texte leading-relaxed max-w-reading"
            initial={{ opacity: 0, y: 12 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            Maison Marquise rend la pâtisserie fine accessible, généreuse et élégante.
          </motion.p>
        </div>

        {/* ══ GRILLE PILIERS ═════════════════════════════════════════════ */}
        {/*
          Mobile     : 1 colonne
          SM (375px) : 1 colonne
          MD (768px) : 2 colonnes (5ème carte → col-span-2)
          LG (1024px): 5 colonnes égales
        */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5"
          role="list"
          aria-label="Les cinq piliers de Maison Marquise"
        >
          {PILLARS.map((pillar, i) => (
            <div key={pillar.title} role="listitem">
              <PillarCard
                pillar={pillar}
                index={i}
                isLast={i === PILLARS.length - 1}
              />
            </div>
          ))}
        </div>

        {/* ══ PHRASE ÉDITORIALE ══════════════════════════════════════════ */}
        <div ref={baselineRef} className="mt-16 md:mt-20">
          <motion.blockquote
            className="relative"
            initial={{ opacity: 0, y: 16 }}
            animate={baselineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* Guillemet décoratif */}
            <span
              className="absolute -top-6 -left-2 font-serif text-7xl text-or-champagne/20 leading-none select-none"
              aria-hidden="true"
            >
              "
            </span>

            <div className="pl-0 md:pl-4 border-l-2 border-or-champagne/30 ml-0 md:ml-2">
              <p
                className="font-serif italic font-light text-noir-marquise text-balance"
                style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)" }}
              >
                Le raffinement gourmand, accessible à tous.
              </p>
              <p className="mt-3 label-mm text-or-champagne tracking-[0.25em]">
                Baseline officielle · Maison Marquise
              </p>
            </div>
          </motion.blockquote>
        </div>
      </div>

      {/* ══ BANDE SIGNATURE NOIRE ══════════════════════════════════════ */}
      <div ref={bandeRef} className="relative bg-noir-marquise overflow-hidden" aria-hidden="true">

        {/* Filet or en haut de la bande */}
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, #B99A5F 30%, #B99A5F 70%, transparent)" }}
        />

        <div className="container-mm py-6 md:py-8">
          <motion.div
            className="flex flex-wrap items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            animate={bandeIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* Mots-clés alignés horizontalement */}
            <div className="flex flex-wrap items-center gap-3 md:gap-5">
              {(["Élégante", "Sobre", "Premium", "Proche", "Gourmande", "Accessible"] as const).map((kw, i) => (
                <motion.span
                  key={kw}
                  className="font-sans text-[0.6rem] font-medium tracking-[0.2em] uppercase text-ivoire-maison/50"
                  initial={{ opacity: 0, x: -8 }}
                  animate={bandeIn ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: EASE }}
                >
                  {kw}
                  {i < 5 && (
                    <span className="ml-3 md:ml-5 text-or-champagne/40" aria-hidden="true">·</span>
                  )}
                </motion.span>
              ))}
            </div>

            {/* Monogramme M */}
            {/* monogramme retiré */}
          </motion.div>
        </div>
      </div>

      {/* Filet or inférieur */}
      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}
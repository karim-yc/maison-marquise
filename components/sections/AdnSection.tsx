"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Heart,
  Crown,
  Coffee,
  Fingerprint,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    index:  "01",
    icon:   Sparkles,
    title:  "Savoir-faire",
    text:   "Des gestes précis, des recettes maîtrisées et des finitions soignées au service du goût.",
    accent: "or-champagne" as const,
  },
  {
    index:  "02",
    icon:   Heart,
    title:  "Générosité",
    text:   "Des vitrines abondantes, des créations visuelles et une offre sucrée-salée pensée pour tous les moments de la journée.",
    accent: "caramel" as const,
  },
  {
    index:  "03",
    icon:   Crown,
    title:  "Élégance",
    text:   "Un univers sobre et premium, porté par le marbre, l&apos;ivoire, le noir profond et les détails dorés.",
    accent: "or-champagne" as const,
  },
  {
    index:  "04",
    icon:   Coffee,
    title:  "Expérience",
    text:   "Un salon de thé chaleureux, des packagings soignés et une pause gourmande qui se vit autant qu&apos;elle se déguste.",
    accent: "pistache" as const,
  },
  {
    index:  "05",
    icon:   Fingerprint,
    title:  "Signature",
    text:   "Un territoire reconnaissable : le monogramme M, les créations signatures, les boissons gourmandes et l&apos;élégance accessible.",
    accent: "or-champagne" as const,
  },
] as const;

const ACCENT_HEX: Record<typeof PILLARS[number]["accent"], string> = {
  "or-champagne": "#B99A5F",
  "caramel":      "#C7843E",
  "pistache":     "#9A9B55",
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

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
        isLast && "md:col-span-2 lg:col-span-1",
      )}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    >
      {/* Filet accent haut */}
      <div
        className="absolute top-0 left-6 right-6 h-px transition-all duration-500 group-hover:left-0 group-hover:right-0"
        style={{ background: `linear-gradient(90deg, transparent, ${hex}, transparent)`, opacity: 0.5 }}
        aria-hidden="true"
      />

      {/* Icône + index */}
      <div className="flex items-start justify-between">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-[2px] shrink-0"
          style={{ backgroundColor: `${hex}12` }}
          aria-hidden="true"
        >
          <Icon size={17} strokeWidth={1.4} style={{ color: hex }} />
        </div>
        <span
          className="font-serif font-light leading-none select-none text-gris-marbre transition-colors duration-500 group-hover:text-or-champagne/30"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          aria-hidden="true"
        >
          {pillar.index}
        </span>
      </div>

      {/* Corps */}
      <div className="space-y-3 flex-1">
        <h3 className="font-serif text-d-sm font-light text-noir-marquise leading-snug">
          {pillar.title}
        </h3>
        <p
          className="font-sans text-ui-lg text-gris-texte leading-relaxed"
          dangerouslySetInnerHTML={{ __html: pillar.text }}
        />
      </div>

      {/* Trait accent bas */}
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
      <div className="line-gold w-full" aria-hidden="true" />

      <div className="container-mm py-section relative">

        {/* ══ EN-TÊTE ════════════════════════════════════════════════════ */}
        <div ref={headerRef} className="mb-14 md:mb-20 max-w-2xl">

          <motion.span
            className="label-mm text-gris-texte"
            initial={{ opacity: 0, y: -8 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Identité de marque
          </motion.span>

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
              <motion.div
                className="h-px mt-4"
                style={{ background: "linear-gradient(90deg, #B99A5F, transparent)", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={headerIn ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Phrase principale */}
          <motion.p
            className="mt-6 font-serif italic font-light text-noir-marquise leading-snug text-balance"
            style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            Maison Marquise réinvente la boulangerie-pâtisserie en une expérience premium, généreuse et accessible.
          </motion.p>

          {/* Texte d'introduction */}
          <motion.p
            className="mt-4 font-sans text-body-lg text-gris-texte leading-relaxed max-w-reading"
            initial={{ opacity: 0, y: 12 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
          >
            Entre savoir-faire artisanal, créations gourmandes, coffee time et pause salée,
            Maison Marquise propose bien plus qu&apos;une boulangerie : une maison de goût,
            de plaisir et d&apos;élégance au quotidien.
          </motion.p>
        </div>

        {/* ══ GRILLE PILIERS ═════════════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5"
          role="list"
          aria-label="Les cinq piliers de Maison Marquise"
        >
          {PILLARS.map((pillar, i) => (
            <div key={pillar.title} role="listitem">
              <PillarCard pillar={pillar} index={i} isLast={i === PILLARS.length - 1} />
            </div>
          ))}
        </div>

        {/* ══ CITATION FINALE ════════════════════════════════════════════ */}
        <div ref={baselineRef} className="mt-16 md:mt-20">
          <motion.blockquote
            className="relative"
            initial={{ opacity: 0, y: 16 }}
            animate={baselineIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span
              className="absolute -top-6 -left-2 font-serif text-7xl text-or-champagne/20 leading-none select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <div className="pl-0 md:pl-4 border-l-2 border-or-champagne/30 ml-0 md:ml-2">
              <p
                className="font-serif italic font-light text-noir-marquise text-balance"
                style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)" }}
              >
                L&apos;élégance gourmande du quotidien.
              </p>
              <p className="mt-3 label-mm text-or-champagne tracking-[0.25em]">
                Baseline officielle · Maison Marquise
              </p>
            </div>
          </motion.blockquote>
        </div>
      </div>

      {/* ══ BANDE SIGNATURE NOIRE ══════════════════════════════════════ */}
      <div ref={bandeRef} className="relative bg-noir-marquise overflow-hidden">
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, #B99A5F 30%, #B99A5F 70%, transparent)" }}
          aria-hidden="true"
        />
        <div className="container-mm py-6 md:py-8">
          <motion.div
            className="flex flex-wrap items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            animate={bandeIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="flex flex-wrap items-center gap-3 md:gap-5">
              {(["Premium", "Artisanal", "Généreux", "Élégant", "Gourmand", "Accessible"] as const).map((kw, i) => (
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
          </motion.div>
        </div>
      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

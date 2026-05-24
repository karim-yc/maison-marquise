"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// ArchitectureSection — Charte architecturale Maison Marquise
// Usage : architectes, décorateurs, agenceurs, signalétique, prestataires boutique
// Source : MAISON_MARQUISE_CHARTE.pdf — Création Artesia Studio
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Matières architecturales ─────────────────────────────────────────────────
const MATIERES = [
  { name: "Ivoire · Pierre claire",  hex: "#F7F3EC", note: "Luminosité, douceur, premium" },
  { name: "Bois nervuré",            hex: "#8B6347", note: "Chaleur, artisanat, naturel" },
  { name: "Noir",                    hex: "#111111", note: "Contraste, structure, stores" },
  { name: "Or Champagne",            hex: "#B99A5F", note: "Accent premium, à utiliser avec retenue" },
  { name: "Terre cuite",             hex: "#C45D2A", note: "Chaleur architecturale, plafond, murs" },
  { name: "Végétal",                 hex: "#6B7A3D", note: "Fraîcheur, respiration, confort" },
] as const;

const AFAIRE   = [
  "Garder une ambiance chaude et premium.",
  "Mettre les produits au centre de l'expérience.",
  "Utiliser la lumière pour valoriser vitrines et comptoirs.",
  "Garder une circulation client simple.",
  "Harmoniser façade, packaging, menus et intérieur.",
  "Utiliser le monogramme M comme repère architectural.",
] as const;

const AEVITER  = [
  "Trop charger les murs.",
  "Multiplier les logos partout.",
  "Utiliser des matériaux froids sans bois ou lumière.",
  "Créer une boutique trop showroom.",
  "Rendre les menu boards illisibles.",
  "Utiliser des couleurs hors charte sans justification.",
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// PhotoCard — image avec label hover
// ─────────────────────────────────────────────────────────────────────────────
function PhotoCard({
  src, alt, label, tall = false,
}: {
  src: string; alt: string; label: string; tall?: boolean;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-[3px] group",
        tall ? "row-span-2" : "row-span-1",
      )}
      style={{ minHeight: tall ? 400 : 200 }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE_SPRING }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        quality={80}
      />
      {/* Label overlay au bas */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-noir-marquise/70 to-transparent" />
      <div className="absolute bottom-3 left-4">
        <span className="font-sans text-[0.55rem] font-medium tracking-[0.16em] uppercase text-ivoire-maison/80">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RuleBlock — bloc de règles avec titre, texte, liste
// ─────────────────────────────────────────────────────────────────────────────
function RuleBlock({
  index, title, text, rules,
}: {
  index: string; title: string; text: string; rules: readonly string[];
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE_SPRING }}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-serif font-light text-2xl text-gris-marbre/40 select-none" aria-hidden="true">
          {index}
        </span>
        <div>
          <h3 className="font-serif font-light text-noir-marquise" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
            {title}
          </h3>
          <div className="h-px mt-1.5 w-10" style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }} aria-hidden="true" />
        </div>
      </div>
      <p className="font-sans text-body-lg text-gris-texte leading-relaxed">{text}</p>
      <ul className="space-y-1.5" role="list">
        {rules.map((r) => (
          <li key={r} className="flex items-start gap-2.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-or-champagne/70 shrink-0" aria-hidden="true" />
            <span className="font-sans text-ui text-gris-texte">{r}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export function ArchitectureSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px 0px" });
  const matRef    = useRef<HTMLDivElement>(null);
  const matIn     = useInView(matRef, { once: true, margin: "-60px 0px" });
  const doRef     = useRef<HTMLDivElement>(null);
  const doIn      = useInView(doRef, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="architecture"
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-blanc-marbre overflow-hidden"
      aria-labelledby="archi-title"
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
            Façade · Boutique · Salon de thé · Signalétique
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
              06
            </motion.span>
            <div className="pt-1 md:pt-2">
              <motion.h2
                id="archi-title"
                className="font-serif font-light text-noir-marquise text-balance leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE_SPRING }}
              >
                Charte architecturale
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
            L&apos;identité Maison Marquise ne s&apos;arrête pas au logo ou au packaging.
            Elle se prolonge dans l&apos;espace : une architecture chaleureuse, premium et lisible,
            pensée pour mettre en valeur les produits, guider le client et créer une expérience
            cohérente du trottoir jusqu&apos;au salon de thé.
          </motion.p>

          {/* Bouton téléchargement PDF */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={headerIn ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a
              href="/assets/charte-architecturale.pdf"
              download="Maison-Marquise-Charte-Architecturale.pdf"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-[2px] border border-or-champagne/40 bg-ivoire-maison text-noir-marquise font-sans text-[0.65rem] font-medium tracking-[0.14em] uppercase hover:border-or-champagne hover:bg-or-champagne/5 transition-colors duration-200"
              aria-label="Télécharger la charte architecturale PDF"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M6.5 1v7M3.5 5.5l3 3.5 3-3.5M1 10.5h11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Télécharger la charte architecturale
              <span className="px-1.5 py-0.5 bg-or-champagne/15 rounded-[2px] text-[0.5rem] normal-case tracking-normal text-or-champagne/80 font-medium">
                PDF · 20 Mo
              </span>
            </a>
          </motion.div>
        </div>

        {/* ══ FAÇADE ══════════════════════════════════════════════════ */}
        <div className="mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Grille images façade */}
          <div className="grid grid-cols-2 gap-3 h-72 md:h-80">
            <PhotoCard src="/assets/archi/facade-1.jpg" alt="Façade Maison Marquise — vue angle" label="Façade · Vue angle" tall />
            <PhotoCard src="/assets/archi/facade-2.jpg" alt="Façade Maison Marquise — vue frontale" label="Façade · Vue frontale" />
          </div>
          {/* Règles */}
          <RuleBlock
            index="01"
            title="Façade & visibilité"
            text="La façade doit être claire, élégante et immédiatement identifiable. L'enseigne reste lisible à distance, avec une présence sobre du noir, de l'ivoire et du monogramme M."
            rules={[
              "Enseigne lisible depuis la rue.",
              "Stores noirs avec marquage discret.",
              "Vitrines ouvertes sur les produits et l'intérieur.",
              "Logo utilisé avec sobriété.",
              "Terrasse cohérente avec l'univers boutique.",
            ]}
          />
        </div>

        {/* ══ RDC ══════════════════════════════════════════════════════ */}
        <div className="mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Règles — à gauche sur desktop */}
          <div className="order-2 lg:order-1">
            <RuleBlock
              index="02"
              title="RDC — Espace de vente"
              text="Le rez-de-chaussée concentre l'expérience de vente : vitrines gourmandes, comptoir, coffee bar et signalétique. L'espace doit rester lumineux, généreux et lisible."
              rules={[
                "Vitrines produits généreuses et bien éclairées.",
                "Comptoir clair, premium et fonctionnel.",
                "Coffee bar identifiable.",
                "Parcours client fluide.",
                "Signalétique simple, lisible et intégrée.",
              ]}
            />
          </div>
          {/* Grille images RDC */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-3" style={{ gridTemplateRows: "1fr 1fr" }}>
            <div className="col-span-2 relative rounded-[3px] overflow-hidden h-48 md:h-56 group">
              <Image src="/assets/archi/rdc-1.jpg" alt="RDC Maison Marquise — vue panoramique" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 1024px) 100vw, 50vw" quality={80} />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-noir-marquise/60 to-transparent" />
              <span className="absolute bottom-3 left-4 font-sans text-[0.55rem] font-medium tracking-[0.16em] uppercase text-ivoire-maison/80">RDC · Vue panoramique</span>
            </div>
            <PhotoCard src="/assets/archi/rdc-2.jpg" alt="Comptoir barista Maison Marquise" label="Comptoir · Barista" />
            <PhotoCard src="/assets/archi/rdc-3.jpg" alt="Coffee Bar Maison Marquise" label="Coffee Bar" />
          </div>
        </div>

        {/* ══ ÉTAGE 1 — SALON DE THÉ ══════════════════════════════════ */}
        <div className="mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Grille images étage */}
          <div className="grid grid-cols-2 gap-3 h-72 md:h-80">
            <PhotoCard src="/assets/archi/etage-1.jpg" alt="Étage 1 — salon de thé vue large" label="Étage 1 · Vue large" tall />
            <PhotoCard src="/assets/archi/ambiance.jpg" alt="Alcôve M lumineux — ambiance bois" label="Alcôve · M lumineux" />
          </div>
          {/* Règles */}
          <RuleBlock
            index="03"
            title="Salon de thé & étage"
            text="L'étage prolonge l'expérience avec un salon de thé chaleureux et confortable. Les assises, alcôves, miroirs et plantes créent une ambiance plus intime, cohérente avec l'identité premium."
            rules={[
              "Assises confortables et élégantes.",
              "Espaces plus calmes et chaleureux.",
              "Présence végétale maîtrisée.",
              "Miroirs et arches pour créer de la profondeur.",
              "Signalétique étage claire.",
              "Ambiance premium mais accueillante.",
            ]}
          />
        </div>

        {/* ══ MATIÈRES & COULEURS ══════════════════════════════════════ */}
        <div ref={matRef} className="mb-16 md:mb-20">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={matIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-serif font-light text-2xl text-gris-marbre/40 select-none" aria-hidden="true">04</span>
              <h3 className="font-serif font-light text-noir-marquise" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                Matières &amp; couleurs architecturales
              </h3>
            </div>
            <div className="h-px w-10 ml-10" style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }} aria-hidden="true" />
            <p className="mt-3 font-sans text-body-lg text-gris-texte leading-relaxed max-w-reading ml-10">
              L&apos;architecture reprend les codes de la marque, mais les rend plus sensoriels.
              Ces matières doivent créer une boutique premium sans devenir froide.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {MATIERES.map((m, i) => (
              <motion.div
                key={m.name}
                className="rounded-[3px] overflow-hidden border border-gris-marbre bg-blanc-marbre"
                initial={{ opacity: 0, y: 16 }}
                animate={matIn ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5, ease: EASE_SPRING }}
              >
                {/* Swatch */}
                <div className="h-14 md:h-16" style={{ backgroundColor: m.hex }} aria-hidden="true" />
                <div className="p-3 space-y-1">
                  <p className="font-sans text-[0.65rem] font-medium text-noir-marquise leading-tight">{m.name}</p>
                  <p className="font-sans text-[0.6rem] text-gris-texte/60 leading-snug">{m.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══ SIGNALÉTIQUE ═════════════════════════════════════════════ */}
        <div className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
            <RuleBlock
              index="05"
              title="Signalétique boutique"
              text="La signalétique doit guider sans surcharger. Elle doit rester visible, courte et cohérente avec les typographies et couleurs de la charte graphique."
              rules={[
                "Textes courts, très bonne lisibilité.",
                "Contraste suffisant sur fond ivoire ou noir.",
                "Usage du logo limité aux zones clés.",
                "Monogramme M possible en repère mural, vitrine ou comptoir.",
                "Menu boards intégrés naturellement à l'architecture.",
              ]}
            />
            {/* Image étage 2 */}
            <div className="relative rounded-[3px] overflow-hidden h-56 md:h-64 group">
              <Image src="/assets/archi/etage-2.jpg" alt="Signalétique étage — salon de thé Maison Marquise" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 1024px) 100vw, 50vw" quality={80} />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-noir-marquise/60 to-transparent" />
              <span className="absolute bottom-3 left-4 font-sans text-[0.55rem] font-medium tracking-[0.16em] uppercase text-ivoire-maison/80">Signalétique · Salon de thé</span>
            </div>
          </div>
        </div>

        {/* ══ À FAIRE / À ÉVITER ═══════════════════════════════════════ */}
        <div ref={doRef}>
          <motion.div
            className="mb-7"
            initial={{ opacity: 0, y: 10 }}
            animate={doIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="label-mm text-gris-texte">Règles essentielles</span>
            <h3 className="font-serif font-light text-noir-marquise mt-1" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
              À faire &amp; à éviter
            </h3>
            <div className="h-px mt-2 w-14" style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }} aria-hidden="true" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={doIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            {/* À faire */}
            <div className="rounded-[3px] border-l-2 border-l-pistache/50 border border-pistache/15 bg-blanc-marbre p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Check size={13} strokeWidth={2} className="text-pistache" />
                <span className="label-mm text-pistache">À faire</span>
              </div>
              <ul className="space-y-2" role="list">
                {AFAIRE.map((r) => (
                  <li key={r} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-pistache/60 shrink-0" aria-hidden="true" />
                    <span className="font-sans text-ui text-gris-texte leading-snug">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* À éviter */}
            <div className="rounded-[3px] border-l-2 border-l-framboise/40 border border-framboise/15 bg-blanc-marbre p-5 space-y-3">
              <div className="flex items-center gap-2">
                <X size={13} strokeWidth={2} className="text-framboise" />
                <span className="label-mm text-framboise">À éviter</span>
              </div>
              <ul className="space-y-2" role="list">
                {AEVITER.map((r) => (
                  <li key={r} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-framboise/40 shrink-0" aria-hidden="true" />
                    <span className="font-sans text-ui text-gris-texte leading-snug">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

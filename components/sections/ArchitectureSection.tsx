"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Matières ──────────────────────────────────────────────────────────────────
const MATIERES = [
  { name: "Ivoire & pierre", hex: "#F7F3EC", desc: "Luminosité, douceur, premium" },
  { name: "Bois nervuré",    hex: "#8B6347", desc: "Chaleur, artisanat, naturel" },
  { name: "Noir profond",    hex: "#111111", desc: "Contraste, structure, stores" },
  { name: "Or champagne",    hex: "#B99A5F", desc: "Accent premium — avec retenue" },
  { name: "Terre cuite",     hex: "#C45D2A", desc: "Plafond, murs, chaleur arch." },
  { name: "Végétal",         hex: "#6B7A3D", desc: "Fraîcheur, respiration" },
] as const;

const AFAIRE = [
  "Ambiance chaude et premium.",
  "Produits au centre de l'expérience.",
  "Lumière pour valoriser vitrines et comptoirs.",
  "Circulation client simple et fluide.",
  "Harmonie façade, packaging, menus, intérieur.",
  "Monogramme M comme repère architectural.",
] as const;

const AEVITER = [
  "Murs trop chargés.",
  "Logos multipliés partout.",
  "Matériaux froids sans chaleur ni lumière.",
  "Boutique trop showroom.",
  "Menu boards illisibles.",
  "Couleurs hors charte sans justification.",
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Composant — Séparateur de bloc
// ─────────────────────────────────────────────────────────────────────────────
function BlockDivider() {
  return (
    <div className="flex items-center gap-4 py-2" aria-hidden="true">
      <div className="flex-1 h-px bg-gris-marbre/50" />
      <div className="w-1 h-1 rotate-45 bg-or-champagne/40" />
      <div className="flex-1 h-px bg-gris-marbre/50" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Composant — Numéro discret
// ─────────────────────────────────────────────────────────────────────────────
function BlockNumber({ n }: { n: string }) {
  return (
    <span
      className="font-serif font-light text-gris-marbre/35 leading-none select-none"
      style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)" }}
      aria-hidden="true"
    >
      {n}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Composant — Titre de bloc
// ─────────────────────────────────────────────────────────────────────────────
function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h3
        className="font-serif font-light text-noir-marquise leading-tight"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
      >
        {children}
      </h3>
      <div
        className="h-px w-12 mt-3"
        style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }}
        aria-hidden="true"
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Composant — Liste de règles
// ─────────────────────────────────────────────────────────────────────────────
function RuleList({ rules }: { rules: readonly string[] }) {
  return (
    <ul className="space-y-2.5" role="list">
      {rules.map((r) => (
        <li key={r} className="flex items-start gap-3">
          <span className="mt-2 w-1 h-1 rounded-full bg-or-champagne/70 shrink-0" aria-hidden="true" />
          <span className="font-sans text-ui text-gris-texte leading-snug">{r}</span>
        </li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Composant — Image cadrée avec légende
// ─────────────────────────────────────────────────────────────────────────────
function ArchPhoto({
  src, alt, label, aspect = "16/9", className,
}: {
  src: string; alt: string; label?: string;
  aspect?: string; className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[3px] group", className)}>
      <div style={{ aspectRatio: aspect }} className="relative">
        <Image
          src={src} alt={alt} fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          quality={82}
        />
      </div>
      {label && (
        <p className="mt-2 font-sans text-[0.55rem] font-medium tracking-[0.18em] uppercase text-gris-texte/50">
          {label}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export function ArchitectureSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const b1Ref     = useRef<HTMLDivElement>(null);
  const b2Ref     = useRef<HTMLDivElement>(null);
  const b3Ref     = useRef<HTMLDivElement>(null);
  const b4Ref     = useRef<HTMLDivElement>(null);
  const b5Ref     = useRef<HTMLDivElement>(null);
  const b6Ref     = useRef<HTMLDivElement>(null);

  const headerIn = useInView(headerRef, { once: true, margin: "-80px 0px" });
  const b1In     = useInView(b1Ref, { once: true, margin: "-60px 0px" });
  const b2In     = useInView(b2Ref, { once: true, margin: "-60px 0px" });
  const b3In     = useInView(b3Ref, { once: true, margin: "-60px 0px" });
  const b4In     = useInView(b4Ref, { once: true, margin: "-60px 0px" });
  const b5In     = useInView(b5Ref, { once: true, margin: "-60px 0px" });
  const b6In     = useInView(b6Ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="architecture"
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-blanc-marbre overflow-hidden"
      aria-labelledby="archi-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

      <div className="container-mm py-section space-y-20 md:space-y-28">

        {/* ══════════════════════════════════════════════════════════════
            EN-TÊTE
        ══════════════════════════════════════════════════════════════ */}
        <div ref={headerRef}>
          {/* Numéro décoratif + titre */}
          <motion.span
            className="label-mm text-gris-texte block mb-4"
            initial={{ opacity: 0, y: -8 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Façade · Boutique · Salon de thé · Signalétique
          </motion.span>

          <div className="flex items-start gap-5">
            <motion.span
              className="font-serif font-light text-gris-marbre/25 leading-none shrink-0 select-none hidden sm:block"
              style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
              initial={{ opacity: 0, x: -24 }}
              animate={headerIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
              aria-hidden="true"
            >
              06
            </motion.span>

            <div className="flex-1 pt-1 md:pt-3">
              <motion.h2
                id="archi-title"
                className="font-serif font-light text-noir-marquise leading-none text-balance"
                style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
                initial={{ opacity: 0, y: 18 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE_SPRING }}
              >
                Charte architecturale
              </motion.h2>

              <motion.div
                className="h-px mt-5"
                style={{ background: "linear-gradient(90deg, #B99A5F, transparent)", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={headerIn ? { scaleX: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.3, ease: EASE_SPRING }}
                aria-hidden="true"
              />

              <motion.p
                className="mt-6 font-sans text-body-lg text-gris-texte leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              >
                L&apos;identité Maison Marquise se prolonge dans l&apos;espace : une architecture
                chaleureuse, premium et lisible, pensée pour mettre en valeur les produits,
                guider le client et créer une expérience cohérente du trottoir jusqu&apos;au salon de thé.
              </motion.p>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={headerIn ? { opacity: 1 } : {}}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <a
                  href="/assets/charte-architecturale.pdf"
                  download="Maison-Marquise-Charte-Architecturale.pdf"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-[2px] border border-or-champagne/40 bg-ivoire-maison text-noir-marquise font-sans text-[0.65rem] font-medium tracking-[0.14em] uppercase hover:border-or-champagne hover:bg-or-champagne/5 transition-colors duration-200"
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
          </div>
        </div>

        <BlockDivider />

        {/* ══════════════════════════════════════════════════════════════
            BLOC 01 — FAÇADE & VISIBILITÉ
            Image grande à gauche · Texte + règles à droite
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          ref={b1Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
          initial={{ opacity: 0, y: 28 }}
          animate={b1In ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_SPRING }}
        >
          {/* Colonne gauche — images */}
          <div className="space-y-3">
            <ArchPhoto
              src="/assets/archi/facade-2.jpg"
              alt="Façade principale Maison Marquise — vue frontale"
              aspect="16/9"
            />
            <ArchPhoto
              src="/assets/archi/facade-1.jpg"
              alt="Façade Maison Marquise — vue angle"
              aspect="16/9"
              label="Façade · Vue angle de rue"
            />
          </div>

          {/* Colonne droite — texte */}
          <div className="space-y-6 lg:pt-2">
            <div className="flex items-end gap-3">
              <BlockNumber n="01" />
              <BlockTitle>Façade &amp; visibilité</BlockTitle>
            </div>
            <p className="font-sans text-body-lg text-gris-texte leading-relaxed">
              La façade doit être claire, élégante et identifiable depuis la rue.
              L&apos;enseigne reste lisible à distance avec une présence sobre du noir,
              de l&apos;ivoire et du monogramme M.
            </p>
            <RuleList rules={[
              "Enseigne lisible depuis la rue.",
              "Stores noirs avec marquage discret.",
              "Vitrines ouvertes sur les produits et l'intérieur.",
              "Logo utilisé avec sobriété.",
              "Terrasse cohérente avec l'univers boutique.",
            ]} />
          </div>
        </motion.div>

        <BlockDivider />

        {/* ══════════════════════════════════════════════════════════════
            BLOC 02 — RDC — ESPACE DE VENTE
            Grande image panoramique · Texte + 2 images secondaires
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          ref={b2Ref}
          className="space-y-8"
          initial={{ opacity: 0, y: 28 }}
          animate={b2In ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_SPRING }}
        >
          {/* Grande image panoramique */}
          <ArchPhoto
            src="/assets/archi/rdc-1.jpg"
            alt="RDC Maison Marquise — vue panoramique espace de vente"
            aspect="21/9"
            label="RDC · Vue panoramique"
          />

          {/* Texte + 2 images secondaires */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Texte + règles */}
            <div className="space-y-6">
              <div className="flex items-end gap-3">
                <BlockNumber n="02" />
                <BlockTitle>RDC — Espace de vente</BlockTitle>
              </div>
              <p className="font-sans text-body-lg text-gris-texte leading-relaxed">
                Le rez-de-chaussée concentre l&apos;expérience de vente : vitrines gourmandes,
                comptoir, coffee bar et signalétique. L&apos;espace doit rester lumineux,
                généreux et immédiatement lisible.
              </p>
              <RuleList rules={[
                "Vitrines produits généreuses et bien éclairées.",
                "Comptoir clair, premium et fonctionnel.",
                "Coffee bar identifiable et distinct.",
                "Parcours client fluide.",
                "Signalétique simple et intégrée.",
              ]} />
            </div>

            {/* 2 images secondaires */}
            <div className="space-y-3">
              <ArchPhoto
                src="/assets/archi/rdc-2.jpg"
                alt="Comptoir barista Maison Marquise"
                aspect="16/9"
                label="Comptoir · Espace barista"
              />
              <ArchPhoto
                src="/assets/archi/rdc-3.jpg"
                alt="Coffee Bar Maison Marquise"
                aspect="16/9"
                label="Coffee Bar"
              />
            </div>
          </div>
        </motion.div>

        <BlockDivider />

        {/* ══════════════════════════════════════════════════════════════
            BLOC 03 — SALON DE THÉ & ÉTAGE
            Image principale · 2 images secondaires · Texte
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          ref={b3Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
          initial={{ opacity: 0, y: 28 }}
          animate={b3In ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_SPRING }}
        >
          {/* Colonne gauche — texte */}
          <div className="space-y-6 lg:pt-2 order-2 lg:order-1">
            <div className="flex items-end gap-3">
              <BlockNumber n="03" />
              <BlockTitle>Salon de thé &amp; étage</BlockTitle>
            </div>
            <p className="font-sans text-body-lg text-gris-texte leading-relaxed">
              L&apos;étage prolonge l&apos;expérience avec un salon de thé chaleureux.
              Assises, alcôves, miroirs et végétal créent une ambiance plus intime,
              cohérente avec l&apos;identité premium de la marque.
            </p>
            <RuleList rules={[
              "Assises confortables et élégantes.",
              "Espaces plus calmes et chaleureux.",
              "Présence végétale maîtrisée.",
              "Miroirs et arches pour créer de la profondeur.",
              "Ambiance premium mais accueillante.",
            ]} />
          </div>

          {/* Colonne droite — images */}
          <div className="space-y-3 order-1 lg:order-2">
            <ArchPhoto
              src="/assets/archi/etage-1.jpg"
              alt="Salon de thé Maison Marquise — vue large étage"
              aspect="16/9"
              label="Étage 1 · Vue large"
            />
            <ArchPhoto
              src="/assets/archi/ambiance.jpg"
              alt="Alcôve M lumineux — bois et lumière douce"
              aspect="16/9"
              label="Alcôve · Monogramme M rétroéclairé"
            />
          </div>
        </motion.div>

        <BlockDivider />

        {/* ══════════════════════════════════════════════════════════════
            BLOC 04 — MATIÈRES & COULEURS ARCHITECTURALES
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          ref={b4Ref}
          className="space-y-10"
          initial={{ opacity: 0, y: 28 }}
          animate={b4In ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_SPRING }}
        >
          <div className="flex items-end gap-3">
            <BlockNumber n="04" />
            <div>
              <BlockTitle>Matières &amp; couleurs architecturales</BlockTitle>
              <p className="mt-4 font-sans text-body-lg text-gris-texte leading-relaxed max-w-xl">
                L&apos;architecture reprend les codes de la marque, mais les rend plus sensoriels.
                Ces matières créent une boutique premium sans devenir froide.
              </p>
            </div>
          </div>

          {/* 6 cartes matières — même hauteur, grille propre */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {MATIERES.map((m) => (
              <div
                key={m.name}
                className="flex flex-col rounded-[3px] overflow-hidden border border-gris-marbre bg-blanc-marbre"
              >
                {/* Swatch couleur */}
                <div className="h-16 w-full shrink-0" style={{ backgroundColor: m.hex }} aria-hidden="true" />
                {/* Texte */}
                <div className="flex-1 p-3 space-y-1.5">
                  <p className="font-sans text-[0.68rem] font-semibold text-noir-marquise leading-snug">
                    {m.name}
                  </p>
                  <p className="font-sans text-[0.6rem] text-gris-texte/65 leading-snug">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <BlockDivider />

        {/* ══════════════════════════════════════════════════════════════
            BLOC 05 — SIGNALÉTIQUE BOUTIQUE
            Texte à gauche · Grande image à droite
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          ref={b5Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          initial={{ opacity: 0, y: 28 }}
          animate={b5In ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_SPRING }}
        >
          {/* Gauche — texte */}
          <div className="space-y-6">
            <div className="flex items-end gap-3">
              <BlockNumber n="05" />
              <BlockTitle>Signalétique boutique</BlockTitle>
            </div>
            <p className="font-sans text-body-lg text-gris-texte leading-relaxed">
              La signalétique doit guider sans surcharger. Elle doit rester visible,
              courte et cohérente avec les typographies et couleurs de la charte graphique.
            </p>
            <RuleList rules={[
              "Textes courts et très lisibles.",
              "Contraste fort sur fond ivoire ou noir.",
              "Logo réservé aux zones clés.",
              "Monogramme M en repère mural ou vitrine.",
              "Menu boards intégrés à l'architecture.",
            ]} />
          </div>

          {/* Droite — grande image */}
          <ArchPhoto
            src="/assets/archi/etage-2.jpg"
            alt="Signalétique salon de thé — étage Maison Marquise"
            aspect="4/3"
            label="Signalétique · Salon de thé"
          />
        </motion.div>

        <BlockDivider />

        {/* ══════════════════════════════════════════════════════════════
            BLOC 06 — À FAIRE / À ÉVITER
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          ref={b6Ref}
          className="space-y-8"
          initial={{ opacity: 0, y: 24 }}
          animate={b6In ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div>
            <span className="label-mm text-gris-texte">Règles essentielles</span>
            <h3
              className="font-serif font-light text-noir-marquise mt-1"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              À faire &amp; à éviter
            </h3>
            <div className="h-px w-12 mt-3" style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }} aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* À faire */}
            <div className="flex flex-col gap-5 rounded-[3px] border border-or-champagne/25 border-l-2 border-l-or-champagne/60 bg-ivoire-maison/60 p-6 md:p-8">
              <div className="flex items-center gap-2.5">
                <Check size={14} strokeWidth={2} className="text-pistache shrink-0" />
                <span className="font-sans text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-pistache">
                  À faire
                </span>
              </div>
              <ul className="space-y-3" role="list">
                {AFAIRE.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-pistache/60 shrink-0" aria-hidden="true" />
                    <span className="font-sans text-ui text-gris-texte leading-snug">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* À éviter */}
            <div className="flex flex-col gap-5 rounded-[3px] border border-framboise/15 border-l-2 border-l-framboise/40 bg-blanc-marbre p-6 md:p-8">
              <div className="flex items-center gap-2.5">
                <X size={14} strokeWidth={2} className="text-framboise shrink-0" />
                <span className="font-sans text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-framboise">
                  À éviter
                </span>
              </div>
              <ul className="space-y-3" role="list">
                {AEVITER.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-framboise/40 shrink-0" aria-hidden="true" />
                    <span className="font-sans text-ui text-gris-texte leading-snug">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

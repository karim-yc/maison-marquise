"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// ApplicationsSection — Galerie d'applications de marque
//
// Objectif : montrer comment la marque s'applique sur chaque support,
// sans répéter les règles déjà documentées dans Logo, Couleurs, Packaging.
//
// 6 supports : Façade · Packaging · Réseaux sociaux ·
//              Étiquettes · Menu board · Signalétique intérieure
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── 6 applications ────────────────────────────────────────────────────────────
const APPLICATIONS = [
  {
    id:        "facade",
    index:     "01",
    name:      "Façade & Enseigne",
    objectif:  "Rendre la marque identifiable depuis la rue, dès le premier regard.",
    rule:      "Logo complet centré sur fond ivoire ou blanc marbre. Zone de respiration maximale. Lisibilité garantie à 10 mètres minimum.",
    specs:     ["Logo officiel complet obligatoire", "Taille minimum : 60 cm de large", "Fond uni uniquement — pas de fond photographique"],
    template:  null,
    bg:        "bg-ivoire-maison",
  },
  {
    id:        "packaging",
    index:     "02",
    name:      "Packaging",
    objectif:  "Prolonger l'expérience Maison Marquise dans chaque objet tenu en main.",
    rule:      "Palette restreinte : ivoire, noir, or champagne. Monogramme M ou logo sans baseline. Finition mate ou dorure or champagne.",
    specs:     ["3 couleurs maximum par support", "Monogramme M si espace < 3 cm", "Référez-vous à la section Packaging pour les templates"],
    template:  null,
    bg:        "bg-blanc-marbre",
  },
  {
    id:        "reseaux",
    index:     "03",
    name:      "Réseaux sociaux",
    objectif:  "Créer une présence reconnaissable, premium et cohérente en ligne.",
    rule:      "Produit héros centré sur fond ivoire ou noir. Texte court, 1 message par visuel. Utiliser l'Univers Maison ou Gourmand selon la saison.",
    specs:     ["Format carré 1:1 ou vertical 9:16", "Polices : Cormorant ou Montserrat uniquement", "Pas d'effet, filtre ou ombre sur le logo"],
    template:  "Template réseaux sociaux",
    bg:        "bg-blanc-marbre",
  },
  {
    id:        "etiquettes",
    index:     "04",
    name:      "Étiquettes produit",
    objectif:  "Permettre une lecture immédiate du produit, du prix et de la marque en vitrine.",
    rule:      "Nom produit en Cormorant Medium. Prix en Montserrat Regular. Description en une ligne maximum. Fond ivoire ou blanc.",
    specs:     ["Nom produit — Cormorant Medium 14pt min.", "Prix — Montserrat Regular 16pt min.", "Max 3 lignes au total"],
    template:  "Template étiquette produit",
    bg:        "bg-ivoire-maison",
  },
  {
    id:        "menuboard",
    index:     "05",
    name:      "Menu board",
    objectif:  "Rendre l'offre lisible à distance, en boutique ou en terrasse.",
    rule:      "Prix visible en priorité. Fond clair. Hiérarchie simple : titre formule → contenu → prix → option. Logo en en-tête centré.",
    specs:     ["Taille minimale : A3 impression, 50 cm écran", "Prix en Cormorant Medium — jamais en script", "Séparateur or champagne entre les sections"],
    template:  "Template menu board",
    bg:        "bg-blanc-marbre",
  },
  {
    id:        "signaletique",
    index:     "06",
    name:      "Signalétique intérieure",
    objectif:  "Guider le client en boutique tout en renforçant l'identité de la marque.",
    rule:      "Montserrat Medium pour tous les panneaux. Fond ivoire ou noir selon la zone. Pictogrammes minimalistes, pas d'illustration.",
    specs:     ["Labels — Montserrat Medium 500, espacement 0.15em", "Fond ivoire clair ou noir profond", "Aucun autre style typographique"],
    template:  null,
    bg:        "bg-ivoire-maison",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// AppCard — carte application propre
// ─────────────────────────────────────────────────────────────────────────────
function AppCard({
  app,
  index,
}: {
  app: typeof APPLICATIONS[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.article
      ref={ref}
      className="flex flex-col rounded-[3px] overflow-hidden border border-gris-marbre bg-blanc-marbre group hover:shadow-md hover:border-or-champagne/25 transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: EASE_SPRING }}
    >
      {/* ── En-tête coloré ────────────────────────────────────────────── */}
      <div className={cn("px-5 py-5 border-b border-gris-marbre/50", app.bg)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-baseline gap-2.5">
            <span
              className="font-serif font-light text-2xl leading-none text-gris-marbre/40 select-none"
              aria-hidden="true"
            >
              {app.index}
            </span>
            <h3 className="font-serif font-light text-noir-marquise text-lg leading-tight">
              {app.name}
            </h3>
          </div>
          {/* Filet or hover */}
          <div
            className="w-4 h-px mt-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: "#B99A5F" }}
            aria-hidden="true"
          />
        </div>

        {/* Objectif */}
        <p className="font-sans text-[0.75rem] text-gris-texte/70 leading-snug mt-3 italic">
          {app.objectif}
        </p>
      </div>

      {/* ── Corps ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 p-5 flex-1">

        {/* Règle principale */}
        <div>
          <p className="label-mm text-gris-texte/40 mb-1.5">Règle principale</p>
          <p className="font-sans text-ui text-gris-texte leading-relaxed">
            {app.rule}
          </p>
        </div>

        {/* Specs */}
        <div className="space-y-1.5">
          {app.specs.map((spec) => (
            <div key={spec} className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-or-champagne/60 shrink-0" aria-hidden="true" />
              <span className="font-sans text-[0.72rem] text-gris-texte/70 leading-snug">{spec}</span>
            </div>
          ))}
        </div>

        {/* Bouton template */}
        {app.template && (
          <div className="mt-auto pt-3 border-t border-gris-marbre/50">
            <button
              disabled
              className="inline-flex items-center gap-2 px-3 py-2 rounded-[2px] border border-gris-marbre bg-ivoire-maison/60 text-gris-texte/40 cursor-not-allowed font-sans text-[0.58rem] font-medium tracking-[0.1em] uppercase w-full justify-center"
              title={`${app.template} — bientôt disponible`}
              aria-label={`${app.template} — bientôt disponible`}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M5.5 1v6M3 4.5l2.5 3 2.5-3M1 9.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {app.template}
              <span className="text-[0.48rem] text-gris-texte/25 normal-case tracking-normal font-normal">— bientôt</span>
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Panneau de clôture
// ─────────────────────────────────────────────────────────────────────────────
function ClosingNote() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-[3px] bg-noir-marquise border border-or-champagne/15 overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, #B99A5F 30%, #B99A5F 70%, transparent)" }}
        aria-hidden="true"
      />
      <div className="px-6 md:px-10 py-8 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <blockquote>
          <p
            className="font-serif italic font-light text-ivoire-maison/85 leading-snug"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
          >
            La marque vit dans chaque détail.
            Un support bien conçu renforce la cohérence
            et la valeur perçue de Maison Marquise.
          </p>
          <p className="mt-3 font-sans text-[0.6rem] tracking-[0.18em] uppercase text-or-champagne/50">
            Charte officielle · Maison Marquise
          </p>
        </blockquote>

        <div className="space-y-2.5">
          {[
            "Un logo par support — jamais déformé.",
            "3 couleurs maximum par application.",
            "Le prix toujours lisible, jamais stylisé à l'excès.",
            "Favicon & app icon → voir section Logo.",
          ].map((rule, i) => (
            <motion.div
              key={rule}
              className="flex items-baseline gap-3"
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.45, ease: EASE }}
            >
              <span className="font-serif font-light text-or-champagne/25 text-sm shrink-0 w-5 text-right">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-sans text-[0.72rem] text-gris-marbre/55 leading-snug">{rule}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, #B99A5F 30%, #B99A5F 70%, transparent)" }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export function ApplicationsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="applications"
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-ivoire-maison overflow-hidden"
      aria-labelledby="applications-title"
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
            Applications de marque
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
              08
            </motion.span>
            <div className="pt-1 md:pt-2">
              <motion.h2
                id="applications-title"
                className="font-serif font-light text-noir-marquise text-balance leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE_SPRING }}
              >
                Partout, la même marque
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
            Comment appliquer l&apos;identité Maison Marquise sur chaque support concret.
            Les règles de logo, couleurs et packaging sont documentées dans leurs sections respectives.
          </motion.p>
        </div>

        {/* ══ GRILLE 6 APPLICATIONS ════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 md:mb-16"
          role="list"
          aria-label="Applications de marque Maison Marquise"
        >
          {APPLICATIONS.map((app, i) => (
            <div key={app.id} role="listitem">
              <AppCard app={app} index={i} />
            </div>
          ))}
        </div>

        {/* ══ NOTE FINALE ══════════════════════════════════════════════ */}
        <ClosingNote />

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

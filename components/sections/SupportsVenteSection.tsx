"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// SupportsVenteSection — Règles de présentation des offres Maison Marquise
//
// Section de charte graphique : on ne présente pas le menu complet,
// on montre comment les menus, formules et étiquettes doivent être conçus.
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ─────────────────────────────────────────────────────────────────────────────
// Données des 4 blocs
// ─────────────────────────────────────────────────────────────────────────────
const BLOCKS = [
  {
    id:       "formule",
    index:    "01",
    type:     "Hiérarchie d'une formule",
    accentBg: "bg-blanc-marbre",
    dark:     false,
    example:  {
      name:     "Formule Signature",
      desc:     "Plat signature + boisson 33 cl + dessert classique",
      price:    "9,90 €",
      extra:    "Dessert premium : +2,50 €",
    },
    rules: [
      "Le nom de la formule doit être immédiatement visible.",
      "Le prix doit être lisible en moins de deux secondes.",
      "Le contenu inclus doit rester court.",
      "Les suppléments doivent être séparés visuellement.",
      "Le menu doit être plus lisible que décoratif.",
    ],
  },
  {
    id:       "produit",
    index:    "02",
    type:     "Fiche produit signature",
    accentBg: "bg-noir-marquise",
    dark:     true,
    example:  {
      name:     "L'Effiloché",
      desc:     "Pain moelleux, viande fondante, oignons caramélisés, touche de truffe.",
      price:    "8,90 €",
      extra:    null,
    },
    rules: [
      "Le nom du produit est prioritaire.",
      "La description doit donner envie sans être trop longue.",
      "Le prix doit rester visible et aligné.",
      "Une photo produit peut accompagner la fiche si disponible.",
    ],
  },
  {
    id:       "coffee",
    index:    "03",
    type:     "Affichage coffee time",
    accentBg: "bg-blanc-marbre",
    dark:     false,
    example:  {
      name:     "Iced Latte Marquise",
      desc:     "Lait frais, café glacé, notes gourmandes.",
      price:    "4,50 €",
      extra:    null,
    },
    rules: [
      "Les boissons doivent rester faciles à comparer.",
      "Les noms signatures peuvent être plus expressifs.",
      "Les prix doivent suivre un format uniforme.",
      "Les visuels doivent renforcer l'envie sans gêner la lecture.",
    ],
  },
  {
    id:       "etiquette",
    index:    "04",
    type:     "Étiquette vitrine",
    accentBg: "bg-ivoire-maison",
    dark:     false,
    example:  {
      name:     "Millefeuille Marquise",
      desc:     "Crème légère · Feuilletage caramélisé",
      price:    "4,90 €",
      extra:    null,
    },
    rules: [
      "Nom court, immédiatement identifiable.",
      "Description en une ligne maximum.",
      "Prix bien lisible, sans décoration excessive.",
      "Allergènes ou mentions utiles en petit format si nécessaire.",
    ],
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// ExempleVisuel — simulation d'un support de vente
// ─────────────────────────────────────────────────────────────────────────────
function ExempleVisuel({
  example,
  dark,
  type,
}: {
  example: typeof BLOCKS[number]["example"];
  dark: boolean;
  type: string;
}) {
  const isEtiquette = type === "Étiquette vitrine";

  return (
    <div
      className={cn(
        "rounded-[2px] border",
        dark
          ? "bg-noir-marquise border-or-champagne/20"
          : "bg-blanc-marbre border-gris-marbre",
        isEtiquette && "border-dashed"
      )}
      aria-label={`Exemple visuel : ${example.name}`}
    >
      {/* Label interne */}
      <div
        className={cn(
          "px-4 py-2 border-b text-[0.55rem] font-sans font-medium tracking-[0.18em] uppercase",
          dark
            ? "border-or-champagne/15 text-or-champagne/50"
            : "border-gris-marbre text-gris-texte/40"
        )}
      >
        {type}
      </div>

      <div className="px-5 py-5 space-y-3">
        {/* Nom */}
        <div className="space-y-0.5">
          <p
            className={cn(
              "font-serif font-light leading-snug",
              dark ? "text-ivoire-maison" : "text-noir-marquise",
              isEtiquette ? "text-base" : "text-xl"
            )}
          >
            {example.name}
          </p>
          {/* Filet or */}
          <div
            className="h-px w-8"
            style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }}
            aria-hidden="true"
          />
        </div>

        {/* Description */}
        <p
          className={cn(
            "font-sans text-sm leading-relaxed",
            dark ? "text-gris-marbre/65" : "text-gris-texte/80"
          )}
        >
          {example.desc}
        </p>

        {/* Prix + supplément */}
        <div className="flex items-baseline justify-between gap-4">
          <p
            className={cn(
              "font-serif font-light",
              dark ? "text-or-champagne" : "text-noir-marquise",
              isEtiquette ? "text-lg" : "text-2xl"
            )}
          >
            {example.price}
          </p>
          {example.extra && (
            <p
              className="font-sans text-[0.65rem] text-gris-texte/50 border-t border-dashed border-gris-marbre pt-1"
            >
              {example.extra}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Carte règle
// ─────────────────────────────────────────────────────────────────────────────
function RuleCard({
  block,
  index,
}: {
  block: typeof BLOCKS[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.article
      ref={ref}
      className="flex flex-col rounded-[3px] overflow-hidden border border-gris-marbre bg-blanc-marbre"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease: EASE_SPRING }}
    >
      {/* En-tête de la carte */}
      <div
        className={cn(
          "px-5 py-4 border-b border-gris-marbre flex items-center gap-3",
          block.dark ? "bg-noir-marquise" : "bg-ivoire-maison"
        )}
      >
        <span
          className={cn(
            "font-serif font-light text-xl leading-none select-none",
            block.dark ? "text-or-champagne/40" : "text-gris-marbre/50"
          )}
          aria-hidden="true"
        >
          {block.index}
        </span>
        <div>
          <p
            className={cn(
              "font-sans text-[0.6rem] font-medium tracking-[0.16em] uppercase",
              block.dark ? "text-or-champagne/60" : "text-gris-texte/50"
            )}
          >
            Exemple
          </p>
          <h3
            className={cn(
              "font-serif font-light leading-tight mt-0.5",
              block.dark ? "text-ivoire-maison" : "text-noir-marquise",
              "text-base"
            )}
          >
            {block.type}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5 flex-1">
        {/* Exemple visuel */}
        <ExempleVisuel
          example={block.example}
          dark={block.dark}
          type={block.type}
        />

        {/* Règles */}
        <div className="space-y-2.5 mt-auto">
          <p className="label-mm text-gris-texte/45">Règles</p>
          <ul className="space-y-1.5" role="list">
            {block.rules.map((rule) => (
              <li
                key={rule}
                className="flex items-start gap-2 font-sans text-[0.75rem] text-gris-texte leading-snug"
              >
                <span
                  className="mt-1.5 w-1 h-1 rounded-full bg-or-champagne/60 shrink-0"
                  aria-hidden="true"
                />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export function SupportsVenteSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="menus"
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-blanc-marbre overflow-hidden"
      aria-labelledby="menus-title"
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
            Menus · Formules · Étiquettes · Affichage boutique
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
              05
            </motion.span>
            <div className="pt-1 md:pt-2">
              <motion.h2
                id="menus-title"
                className="font-serif font-light text-noir-marquise text-balance leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE_SPRING }}
              >
                Supports de vente
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
            Les supports de vente Maison Marquise doivent traduire l&apos;élégance
            de la marque tout en restant immédiatement lisibles. Chaque offre est
            présentée avec une hiérarchie simple : nom, contenu, prix et option éventuelle.
          </motion.p>
        </div>

        {/* ══ GRILLE 4 BLOCS ═══════════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5"
          role="list"
          aria-label="Règles de présentation des supports de vente Maison Marquise"
        >
          {BLOCKS.map((block, i) => (
            <div key={block.id} role="listitem">
              <RuleCard block={block} index={i} />
            </div>
          ))}
        </div>

        {/* ══ NOTE ÉDITORIALE ══════════════════════════════════════════ */}
        <motion.div
          className="mt-10 md:mt-14 flex items-start gap-4 p-5 md:p-6 rounded-[3px] border border-or-champagne/20 bg-ivoire-maison"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div
            className="w-px self-stretch bg-or-champagne/40 shrink-0"
            aria-hidden="true"
          />
          <div className="space-y-1">
            <p className="label-mm text-or-champagne/70">Principe directeur</p>
            <p className="font-serif italic font-light text-noir-marquise"
              style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
              La lisibilité passe avant la décoration.
              Un menu bien conçu est un menu qu&apos;on lit sans effort.
            </p>
          </div>
        </motion.div>

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// TypographiesSection — Système typographique Maison Marquise
//
// Structure :
//   · En-tête (index 04, titre, intro)
//   · Spécimen 01 — Cormorant Garamond (fond ivoire, grande zone display)
//   · Spécimen 02 — Montserrat (fond blanc, hiérarchie de corps)
//   · Spécimen 03 — Parisienne (fond noir Marquise, usage exclusif)
//   · Règles d'usage — 3 Do + 3 Don't en grille éditoriale
//   · Prix demo — lisibilité maximale
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Données ───────────────────────────────────────────────────────────────────

const CORMORANT_WEIGHTS = [
  { label: "Light 300",    value: 300, style: "normal" },
  { label: "Light Italic", value: 300, style: "italic" },
  { label: "Regular 400",  value: 400, style: "normal" },
  { label: "Italic 400",   value: 400, style: "italic" },
  { label: "Medium 500",   value: 500, style: "normal" },
  { label: "SemiBold 600", value: 600, style: "normal" },
] as const;

const MONTSERRAT_WEIGHTS = [
  { label: "Light 300",    value: 300 },
  { label: "Regular 400",  value: 400 },
  { label: "Medium 500",   value: 500 },
  { label: "SemiBold 600", value: 600 },
] as const;

// Hiérarchie corps Montserrat pour le tableau de styles
const MONTSERRAT_SCALE = [
  { role: "Titre H2",          size: "2rem",      weight: 300, sample: "Formules du jour", isSerif: false },
  { role: "Titre H3",          size: "1.5rem",    weight: 400, sample: "Viennoiseries maison", isSerif: false },
  { role: "Body — courant",    size: "1rem",       weight: 400, sample: "Une pause gourmande préparée avec soin.", isSerif: false },
  { role: "Body — renforcé",   size: "1rem",       weight: 500, sample: "Ouvert du mardi au dimanche.", isSerif: false },
  { role: "Label — espacé",    size: "0.6875rem",  weight: 500, sample: "COLLECTION AUTOMNE", isSerif: false },
  { role: "Prix — lisible",    size: "1.75rem",    weight: 400, sample: "9,90 €", isSerif: true },
  { role: "Caption",           size: "0.8125rem",  weight: 400, sample: "Disponible selon la vitrine.", isSerif: false },
] as const;

const RULES = {
  do: [
    { title: "Cormorant pour faire rêver",        desc: "Titres de sections, noms de créations, citations éditoriales. La graisse light en italic est la plus élégante." },
    { title: "Montserrat pour informer clairement", desc: "Corps de texte, menus, prix, descriptions pratiques. Toujours en minuscules ou casse naturelle." },
    { title: "Parisienne uniquement en accent",   desc: "Signature, accroche packaging, élément décoratif unique par composition. Jamais en bloc." },
  ],
  dont: [
    { title: "Éviter les longs textes en capitales", desc: "Les majuscules espacées sont réservées aux labels courts (3–5 mots max). Un paragraphe entier en caps nuit à la lecture." },
    { title: "Éviter les textes trop espacés",    desc: "Letter-spacing > 0.25em sur plus d&apos;une ligne devient illisible. L&apos;espacement est un outil, pas un style systématique." },
    { title: "Garder les prix très lisibles",     desc: "Les prix s'affichent toujours en Cormorant Medium ou Montserrat Regular, jamais en script ou en ultra-light." },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// En-tête partagé pour chaque spécimen
// ─────────────────────────────────────────────────────────────────────────────

function SpecimenHeader({
  index, name, role, isDark = false,
}: {
  index: string; name: string; role: string; isDark?: boolean;
}) {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-5",
      "border-b",
      isDark ? "border-or-champagne/15" : "border-gris-marbre",
    )}>
      <div className="flex items-baseline gap-3">
        <span className={cn(
          "font-serif font-light text-2xl leading-none",
          isDark ? "text-or-champagne/30" : "text-gris-marbre",
        )}>
          {index}
        </span>
        <div>
          <h3 className={cn(
            "font-sans text-ui-lg font-medium",
            isDark ? "text-ivoire-maison" : "text-noir-marquise",
          )}>
            {name}
          </h3>
          <p className={cn(
            "label-mm mt-0.5",
            isDark ? "text-gris-marbre/60" : "text-gris-texte/70",
          )}>
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Spécimen 01 — Cormorant Garamond
// ─────────────────────────────────────────────────────────────────────────────

function CormorantSpecimen() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.article
      ref={ref}
      className="rounded-[3px] border border-gris-marbre bg-ivoire-maison overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE_SPRING }}
      aria-label="Spécimen Cormorant Garamond"
    >
      <div className="p-7 md:p-10 space-y-10">
        <SpecimenHeader
          index="01"
          name="Cormorant Garamond"
          role="Titres élégants · Noms de créations · Citations · Prix"
        />

        {/* Grande zone display */}
        <div className="space-y-1">
          <p className="label-mm text-gris-texte/50 mb-4">Affichage display</p>

          {/* Ligne principale — très grand, light italic */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9, ease: EASE_SPRING }}
          >
            <p
              className="font-serif font-light italic text-noir-marquise leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
              lang="fr"
            >
              Créations
            </p>
            <p
              className="font-serif font-light text-noir-marquise leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
              lang="fr"
            >
              Maison
            </p>
          </motion.div>

          {/* Sous-titre exemple */}
          <motion.p
            className="font-serif font-light italic text-gris-texte"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Pâtisserie fine, généreuse et accessible.
          </motion.p>
        </div>

        {/* Filet or */}
        <motion.div
          className="h-px"
          style={{ background: "linear-gradient(90deg, #B99A5F, transparent)", transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: EASE_SPRING }}
          aria-hidden="true"
        />

        {/* Alphabet complet */}
        <div className="space-y-3">
          <p className="label-mm text-gris-texte/50">Alphabet & chiffres</p>
          <p
            className="font-serif font-light text-noir-marquise/60 leading-relaxed tracking-wide"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
          >
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm
          </p>
          <p
            className="font-serif font-light text-noir-marquise/60 leading-relaxed tracking-wide"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
          >
            Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
          </p>
          <p
            className="font-serif font-light text-noir-marquise/50 leading-relaxed tracking-wide"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
          >
            0 1 2 3 4 5 6 7 8 9 &nbsp; , . : ; ! ? € %
          </p>
        </div>

        {/* Grille des graisses */}
        <div className="space-y-3">
          <p className="label-mm text-gris-texte/50">Déclinaisons de graisse</p>
          <div className="divide-y divide-gris-marbre/50">
            {CORMORANT_WEIGHTS.map((w, i) => (
              <motion.div
                key={`${w.value}-${w.style}`}
                className="flex items-baseline gap-4 md:gap-6 py-3 first:pt-0 last:pb-0"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: EASE }}
              >
                <span className="label-mm text-gris-texte/40 w-28 shrink-0">
                  {w.label}
                </span>
                <span
                  className="font-serif text-noir-marquise leading-snug flex-1"
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    fontWeight: w.value,
                    fontStyle: w.style,
                  }}
                >
                  L'art de sublimer chaque instant.
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Spécimen 02 — Montserrat
// ─────────────────────────────────────────────────────────────────────────────

function MontserratSpecimen() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.article
      ref={ref}
      className="rounded-[3px] border border-gris-marbre bg-blanc-marbre overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: EASE_SPRING }}
      aria-label="Spécimen Montserrat"
    >
      <div className="p-7 md:p-10 space-y-10">
        <SpecimenHeader
          index="02"
          name="Montserrat"
          role="Texte courant · Menus · Prix · Informations pratiques"
        />

        {/* Zone display corps */}
        <div className="space-y-4">
          <p className="label-mm text-gris-texte/50">Affichage corps</p>

          <motion.p
            className="font-sans font-light text-noir-marquise leading-relaxed text-balance"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE_SPRING }}
          >
            Une pause gourmande
            <br />
            préparée avec soin.
          </motion.p>

          <motion.p
            className="font-sans font-medium text-gris-texte"
            style={{ fontSize: "clamp(0.8rem, 1.5vw, 1rem)", letterSpacing: "0.18em", textTransform: "uppercase" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Collection Automne · Maison Marquise
          </motion.p>
        </div>

        {/* Filet neutre */}
        <div className="h-px bg-gris-marbre/60" aria-hidden="true" />

        {/* Alphabet */}
        <div className="space-y-3">
          <p className="label-mm text-gris-texte/50">Alphabet & chiffres</p>
          <p className="font-sans font-light text-noir-marquise/50 leading-loose tracking-wider text-sm md:text-base">
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
          </p>
          <p className="font-sans font-light text-noir-marquise/40 leading-loose tracking-wider text-sm md:text-base">
            0 1 2 3 4 5 6 7 8 9 &nbsp; , . : ; ! ? € %
          </p>
        </div>

        {/* Hiérarchie de styles */}
        <div className="space-y-3">
          <p className="label-mm text-gris-texte/50">Hiérarchie de styles</p>
          <div className="divide-y divide-gris-marbre/50">
            {MONTSERRAT_SCALE.map((item, i) => (
              <motion.div
                key={item.role}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 md:gap-6 py-3 first:pt-0 last:pb-0"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.5, ease: EASE }}
              >
                <span className="label-mm text-gris-texte/40 sm:w-32 shrink-0">
                  {item.role}
                </span>
                <span
                  className={cn("text-noir-marquise leading-snug", item.isSerif ? "font-serif" : "font-sans")}
                  style={{ fontSize: item.size, fontWeight: item.weight }}
                >
                  {item.sample}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grille des graisses */}
        <div className="space-y-3">
          <p className="label-mm text-gris-texte/50">Déclinaisons de graisse</p>
          <div className="divide-y divide-gris-marbre/50">
            {MONTSERRAT_WEIGHTS.map((w, i) => (
              <motion.div
                key={w.value}
                className="flex items-baseline gap-4 md:gap-6 py-3 first:pt-0 last:pb-0"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: EASE }}
              >
                <span className="label-mm text-gris-texte/40 w-28 shrink-0">
                  {w.label}
                </span>
                <span
                  className="font-sans text-noir-marquise text-lg leading-snug"
                  style={{ fontWeight: w.value }}
                >
                  Préparé avec soin, chaque matin.
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Spécimen 03 — Parisienne
// ─────────────────────────────────────────────────────────────────────────────

function ParisienneSpecimen() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.article
      ref={ref}
      className="rounded-[3px] bg-noir-marquise border border-or-champagne/20 overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.15, ease: EASE_SPRING }}
      aria-label="Spécimen Parisienne"
    >
      <div className="p-7 md:p-10 space-y-10">
        <SpecimenHeader
          index="03"
          name="Parisienne"
          role="Accent manuscrit · Signature · Packaging · Usage exclusif"
          isDark
        />

        {/* Grande zone display — très aérée */}
        <div className="space-y-8">
          <p className="label-mm text-gris-marbre/50">Signature officielle</p>

          <motion.div
            className="py-4"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.25, duration: 1, ease: EASE_SPRING }}
          >
            <p
              className="font-script text-ivoire-maison leading-none"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              Maison Marquise
            </p>
          </motion.div>

          {/* Filet or */}
          <motion.div
            className="h-px"
            style={{ background: "linear-gradient(90deg, transparent, #B99A5F, transparent)", transformOrigin: "center" }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 1.1, ease: EASE_SPRING }}
            aria-hidden="true"
          />

          {/* Exemples secondaires */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            {[
              { label: "Accroche packaging",  text: "Préparé avec soin",  size: "clamp(2rem, 5vw, 3.5rem)" },
              { label: "Signature courte",    text: "Signature",           size: "clamp(2.5rem, 6vw, 4.5rem)" },
            ].map(({ label, text, size }, i) => (
              <motion.div
                key={label}
                className="space-y-2"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 + i * 0.12, duration: 0.7, ease: EASE }}
              >
                <p className="label-mm text-gris-marbre/40">{label}</p>
                <p
                  className="font-script text-ivoire-maison/80 leading-none"
                  style={{ fontSize: size }}
                >
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Règle d'usage exclusive */}
        <div className="pt-6 border-t border-or-champagne/15">
          <div className="flex items-start gap-3 p-4 border border-or-champagne/20 bg-or-champagne/5 rounded-[2px]">
            <AlertTriangle size={14} strokeWidth={1.5} className="text-or-champagne/70 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="font-sans text-[0.7rem] font-medium tracking-[0.12em] uppercase text-or-champagne/80">
                Usage exclusif
              </p>
              <p className="font-sans text-ui text-gris-marbre/60 leading-relaxed">
                La Parisienne ne s'utilise jamais en bloc de texte courant, jamais
                en dessous de 24&nbsp;px et jamais combinée avec d'autres fontes
                en script. Un seul usage par composition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Règles Do / Don't
// ─────────────────────────────────────────────────────────────────────────────

function RulesGrid() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Do */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 mb-5">
          <Check size={14} strokeWidth={2} className="text-pistache" />
          <span className="label-mm text-pistache">À faire</span>
        </div>
        {RULES.do.map((rule, i) => (
          <motion.div
            key={rule.title}
            className="p-5 rounded-[3px] border border-pistache/20 border-l-2 border-l-pistache/50 bg-blanc-marbre"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.09, duration: 0.55, ease: EASE }}
          >
            <p className="font-sans text-ui-lg font-medium text-noir-marquise mb-1.5">
              {rule.title}
            </p>
            <p className="font-sans text-ui text-gris-texte leading-relaxed">
              {rule.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Don't */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 mb-5">
          <AlertTriangle size={14} strokeWidth={1.8} className="text-framboise" />
          <span className="label-mm text-framboise">À éviter</span>
        </div>
        {RULES.dont.map((rule, i) => (
          <motion.div
            key={rule.title}
            className="p-5 rounded-[3px] border border-framboise/15 border-l-2 border-l-framboise/40 bg-blanc-marbre"
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.09, duration: 0.55, ease: EASE }}
          >
            <p className="font-sans text-ui-lg font-medium text-noir-marquise mb-1.5">
              {rule.title}
            </p>
            <p className="font-sans text-ui text-gris-texte leading-relaxed">
              {rule.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Démo prix — lisibilité en situation
// ─────────────────────────────────────────────────────────────────────────────

function PriceDemo() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  const examples = [
    { label: "Formule déjeuner",  price: "9,90 €",  font: "font-serif",  weight: 500, note: "Cormorant Medium — recommandé" },
    { label: "Pâtisserie",        price: "4,50 €",  font: "font-serif",  weight: 400, note: "Cormorant Regular — acceptable" },
    { label: "Boisson",           price: "3,00 €",  font: "font-sans",   weight: 500, note: "Montserrat Medium — lisible" },
    { label: "Menu enfant",       price: "7,50 €",  font: "font-sans",   weight: 600, note: "Montserrat SemiBold — fort" },
  ] as const;

  return (
    <motion.div
      ref={ref}
      className="rounded-[3px] border border-gris-marbre bg-blanc-marbre overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="px-6 py-4 border-b border-gris-marbre bg-ivoire-maison">
        <span className="label-mm text-gris-texte">Règle prioritaire</span>
        <h3 className="font-serif text-d-sm font-light text-noir-marquise mt-1">
          Les prix — lisibilité maximale
        </h3>
      </div>

      <div className="p-6 md:p-8">
        <p className="font-sans text-ui text-gris-texte leading-relaxed mb-8 max-w-reading">
          Les prix ne s'affichent jamais en Parisienne ni en Cormorant Light.
          La lisibilité prime sur l'esthétique — le client doit pouvoir lire
          le prix en un coup d'œil.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {examples.map((ex, i) => (
            <motion.div
              key={ex.label}
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: EASE }}
            >
              <span className="label-mm text-gris-texte/50">{ex.label}</span>
              <span
                className={cn("text-noir-marquise leading-none", ex.font)}
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: ex.weight }}
              >
                {ex.price}
              </span>
              <span className="font-sans text-[0.6rem] text-gris-texte/40 leading-snug">
                {ex.note}
              </span>
            </motion.div>
          ))}
        </div>
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
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-blanc-marbre overflow-hidden"
      aria-labelledby="typo-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

        {/* M fantôme supprimé */}

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
            Chaque police a un rôle précis. Ensemble, elles forment
            une voix reconnaissable — élégante, claire et humaine.
          </motion.p>

          {/* Aperçu rapide des trois fontes */}
          <motion.div
            className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2"
            initial={{ opacity: 0 }}
            animate={headerIn ? { opacity: 1 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <span className="font-serif font-light italic text-noir-marquise text-2xl leading-none">
              Cormorant
            </span>
            <span className="text-gris-marbre/50 text-sm" aria-hidden="true">·</span>
            <span className="font-sans font-medium text-noir-marquise text-sm tracking-wide">
              Montserrat
            </span>
            <span className="text-gris-marbre/50 text-sm" aria-hidden="true">·</span>
            <span className="font-script text-noir-marquise text-2xl leading-none">
              Parisienne
            </span>
          </motion.div>
        </div>

        {/* ══ SPÉCIMENS ════════════════════════════════════════════════ */}
        <div className="space-y-6 mb-14 md:mb-20">
          <CormorantSpecimen />
          <MontserratSpecimen />
          <ParisienneSpecimen />
        </div>

        {/* ══ PRIX ════════════════════════════════════════════════════ */}
        <div className="mb-14 md:mb-20">
          <PriceDemo />
        </div>

        {/* ══ RÈGLES ══════════════════════════════════════════════════ */}
        <div>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="label-mm text-gris-texte">Guide d&apos;usage</span>
            <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">
              Règles typographiques
            </h3>
            <div
              className="h-px mt-4 w-14"
              style={{ background: "linear-gradient(90deg, #B99A5F, transparent)" }}
              aria-hidden="true"
            />
          </motion.div>
          <RulesGrid />
        </div>

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

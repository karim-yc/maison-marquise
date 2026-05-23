"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { LogoMonogram } from "@/components/brand/LogoSvg";

// ─────────────────────────────────────────────────────────────────────────────
// ApplicationsSection — Applications de marque Maison Marquise
//
// 8 cartes : façade, packaging, réseaux sociaux, carte de visite,
//            étiquettes, stickers, favicon, menu boutique.
//
// Chaque carte = mini-visuel CSS inline + usage + règle principale.
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Données ───────────────────────────────────────────────────────────────────
const APPLICATIONS = [
  {
    id:      "facade",
    index:   "01",
    name:    "Façade & Enseigne",
    usage:   "Vitrine physique, devanture, signalétique extérieure",
    rule:    "Logo complet sur fond ivoire ou marbre. Lisibilité à 10 mètres. Zone de respiration maximale.",
    details: ["Logo officiel complet", "Fond clair uni", "Taille minimum 60 cm"],
  },
  {
    id:      "packaging",
    index:   "02",
    name:    "Packaging",
    usage:   "Cups, boîtes, sachets, rubans, étiquettes volantes",
    rule:    "Ivoire, noir, or champagne. Monogramme M discret. Tagline manuscrite ou gravée.",
    details: ["Palette restreinte 3 couleurs", "Finition mate ou vernis satiné", "Dorure or champagne"],
  },
  {
    id:      "reseaux",
    index:   "03",
    name:    "Réseaux sociaux",
    usage:   "Instagram, Facebook, posts produit, stories, vitrines",
    rule:    "Produit héros centré, lumière douce, texte court. Fond ivoire ou noir selon l'univers.",
    details: ["Format carré ou 9/16", "1 message par visuel", "Police Montserrat ou Cormorant"],
  },
  {
    id:      "carte",
    index:   "04",
    name:    "Carte de visite",
    usage:   "Contact commercial, remise client, packaging premium",
    rule:    "Recto : logo complet. Verso : coordonnées en Montserrat. Fond ivoire ou noir mat.",
    details: ["85 × 55 mm standard", "Papier 350 g ivoire mat", "Dorure or optionnelle"],
  },
  {
    id:      "etiquettes",
    index:   "05",
    name:    "Étiquettes produit",
    usage:   "Pâtisseries individuelles, bocaux, confiture, coffrets",
    rule:    "Nom produit lisible en Cormorant. Prix clair en Montserrat. Description courte en italic.",
    details: ["Nom produit — Cormorant Medium", "Prix — Montserrat Regular", "Max 3 lignes"],
  },
  {
    id:      "stickers",
    index:   "06",
    name:    "Stickers & Pastilles",
    usage:   "Fermeture packaging, décoration cup, coffrets cadeaux",
    rule:    "Monogramme M seul, ou logo sans baseline. Fond or champagne, ivoire ou noir.",
    details: ["Ø 30 mm à 50 mm", "Monogramme M prioritaire", "Formes : rond ou carré"],
  },
  {
    id:      "favicon",
    index:   "07",
    name:    "Favicon & App icon",
    usage:   "Site web, application, profil réseaux sociaux",
    rule:    "Monogramme M seul sur fond noir ou ivoire. Jamais le logo complet en petit format.",
    details: ["16×16, 32×32, 192×192 px", "M Cormorant italic", "Fond noir ou ivoire"],
  },
  {
    id:      "menu",
    index:   "08",
    name:    "Menu boutique",
    usage:   "Tableau ardoise, menu papier, carte A4/A3",
    rule:    "Structure 6 éléments : logo, nom formule, prix visible, contenu, inclus, supplément.",
    details: ["Logo en haut centré", "Prix en Cormorant Medium", "Séparateur or champagne"],
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Mini-visuels CSS — un par application
// ─────────────────────────────────────────────────────────────────────────────

function VisualFacade() {
  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden bg-ivoire-maison">
      {/* Sol / reflet */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gris-marbre/20 to-transparent" />
      {/* Façade */}
      <div className="relative mb-6 flex flex-col items-center">
        {/* Enseigne */}
        <div className="w-40 h-12 bg-blanc-marbre border border-gris-marbre flex flex-col items-center justify-center gap-0.5 shadow-sm">
          <div className="font-script text-noir-marquise text-lg leading-none">Maison Marquise</div>
          <div className="w-20 h-px bg-or-champagne/50" />
          <div className="font-sans text-[0.38rem] tracking-[0.2em] uppercase text-gris-texte/50">Bien plus qu&apos;une boulangerie</div>
        </div>
        {/* Vitrine */}
        <div className="w-40 h-10 border border-t-0 border-gris-marbre/60 bg-gradient-to-b from-gris-marbre/10 to-gris-marbre/5 flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-caramel/30" />
          <div className="w-3 h-3 rounded-full bg-framboise/20" />
          <div className="w-3 h-3 rounded-full bg-pistache/25" />
        </div>
        {/* Trottoir */}
        <div className="w-52 h-2 bg-gris-marbre/30 rounded-sm" />
      </div>
    </div>
  );
}

function VisualPackaging() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-blanc-marbre gap-3 overflow-hidden">
      {/* Cup */}
      <div className="flex flex-col items-center gap-0.5 mt-2">
        <div className="w-6 h-2 bg-noir-marquise rounded-t-full" />
        <div className="w-7 h-10 bg-ivoire-maison border border-gris-marbre relative overflow-hidden">
          <div className="absolute top-3 left-1 right-1 text-center font-script text-noir-marquise text-[0.45rem] leading-none">MM</div>
          <div className="absolute bottom-1.5 left-1 right-1 h-px bg-or-champagne/50" />
        </div>
        <div className="w-6 h-px bg-gris-marbre/30" />
      </div>
      {/* Boîte */}
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-3 bg-gris-marbre/30 border-b border-gris-marbre/50" style={{ transform: "perspective(80px) rotateX(-20deg)" }} />
        <div className="w-16 h-10 bg-ivoire-maison border border-gris-marbre relative overflow-hidden">
          <div className="absolute inset-1 border border-or-champagne/25" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-script text-noir-marquise text-base leading-none">M</div>
        </div>
      </div>
    </div>
  );
}

function VisualReseaux() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-noir-marquise overflow-hidden">
      {/* Fond grain */}
      <div className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(199,132,62,0.6) 0%, transparent 70%)" }} />
      {/* Cadre post Instagram-like */}
      <div className="relative w-24 h-24 bg-ivoire-maison/95 rounded-[2px] overflow-hidden flex flex-col">
        {/* Zone image — produit simulé */}
        <div className="flex-1 bg-gradient-to-br from-caramel/20 to-ivoire-maison flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-caramel/40 border border-caramel/20" />
        </div>
        {/* Zone texte bas */}
        <div className="px-1.5 py-1 border-t border-gris-marbre/30 space-y-0.5">
          <div className="font-script text-noir-marquise text-[0.5rem] leading-none">Maison Marquise</div>
          <div className="font-sans text-[0.38rem] text-gris-texte leading-none">Création du jour ✦</div>
        </div>
      </div>
    </div>
  );
}

function VisualCarte() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gris-marbre/20 overflow-hidden">
      {/* Carte recto */}
      <div className="relative w-32 h-20 bg-ivoire-maison border border-gris-marbre shadow-md flex flex-col items-center justify-center gap-1"
        style={{ transform: "rotate(-2deg)" }}>
        <div className="font-script text-noir-marquise text-base leading-none">Maison Marquise</div>
        <div className="w-16 h-px bg-or-champagne/60" />
        <div className="font-sans text-[0.38rem] tracking-[0.18em] uppercase text-gris-texte/50">Haute Pâtisserie</div>
      </div>
      {/* Carte verso derrière */}
      <div className="absolute w-32 h-20 bg-noir-marquise border border-or-champagne/20 shadow-md"
        style={{ transform: "rotate(2deg) translate(4px, 4px)" }}>
        <div className="absolute inset-0 flex flex-col items-start justify-center p-2.5 gap-0.5">
          <div className="font-sans text-[0.35rem] text-ivoire-maison/40 tracking-wide">contact@maisonmarquise.fr</div>
          <div className="font-sans text-[0.35rem] text-ivoire-maison/30 tracking-wide">maisonmarquise.fr</div>
        </div>
      </div>
    </div>
  );
}

function VisualEtiquettes() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-ivoire-maison/60 gap-2 overflow-hidden">
      {/* Étiquette rectangulaire */}
      <div className="w-20 h-28 bg-ivoire-maison border border-gris-marbre shadow-sm flex flex-col items-center py-2 px-1.5 gap-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-or-champagne/50" />
        <div className="font-sans text-[0.38rem] tracking-[0.15em] uppercase text-gris-texte/40 text-center">Maison Marquise</div>
        <div className="h-px w-10 bg-or-champagne/40" />
        <div className="font-serif text-noir-marquise text-[0.7rem] font-medium text-center leading-tight mt-0.5">
          Tarte<br/>Framboise
        </div>
        <div className="font-serif italic text-[0.5rem] text-gris-texte/60 text-center leading-tight">
          Crème légère,<br/>fruits rouges
        </div>
        <div className="mt-auto font-serif text-noir-marquise text-sm font-medium">4,50 €</div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-or-champagne/50" />
      </div>
    </div>
  );
}

function VisualStickers() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-blanc-marbre gap-3 overflow-hidden">
      {/* Rond or */}
      <div className="w-12 h-12 rounded-full bg-or-champagne flex items-center justify-center shadow-sm">
        <div className="w-6 h-6 text-blanc-marbre"><LogoMonogram aria-hidden={true} /></div>
      </div>
      {/* Rond noir */}
      <div className="w-10 h-10 rounded-full bg-noir-marquise flex items-center justify-center shadow-sm">
        <div className="w-5 h-5 text-ivoire-maison"><LogoMonogram aria-hidden={true} /></div>
      </div>
      {/* Carré ivoire */}
      <div className="w-10 h-10 bg-ivoire-maison border border-gris-marbre flex items-center justify-center shadow-sm rounded-[2px]">
        <div className="w-5 h-5 text-noir-marquise"><LogoMonogram aria-hidden={true} /></div>
      </div>
    </div>
  );
}

function VisualFavicon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gris-marbre/15 gap-3 overflow-hidden">
      {/* Favicon 32px simulé */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 bg-noir-marquise flex items-center justify-center rounded-[2px]">
          <div className="w-5 h-5 text-ivoire-maison"><LogoMonogram aria-hidden={true} /></div>
        </div>
        <span className="font-sans text-[0.38rem] text-gris-texte/50">32px</span>
      </div>
      {/* 192px */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-14 h-14 bg-noir-marquise flex items-center justify-center rounded-[3px] shadow-md">
          <div className="w-10 h-10 text-ivoire-maison"><LogoMonogram aria-hidden={true} /></div>
        </div>
        <span className="font-sans text-[0.38rem] text-gris-texte/50">192px</span>
      </div>
      {/* Fond ivoire */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 bg-ivoire-maison border border-gris-marbre flex items-center justify-center rounded-[2px]">
          <span className="font-script text-noir-marquise text-base leading-none">M</span>
        </div>
        <span className="font-sans text-[0.38rem] text-gris-texte/50">Alt</span>
      </div>
    </div>
  );
}

function VisualMenu() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-ivoire-maison/80 overflow-hidden">
      {/* Menu papier A5 */}
      <div className="w-24 h-32 bg-ivoire-maison border border-gris-marbre shadow-md flex flex-col overflow-hidden">
        {/* En-tête */}
        <div className="flex flex-col items-center py-1.5 border-b border-gris-marbre/50">
          <div className="font-script text-noir-marquise text-[0.65rem] leading-none">Maison Marquise</div>
          <div className="w-12 h-px bg-or-champagne/50 mt-0.5" />
        </div>
        {/* Corps */}
        <div className="flex-1 px-2 py-1.5 space-y-1">
          <div className="font-sans text-[0.38rem] tracking-[0.12em] uppercase text-gris-texte/40">Formule Signature</div>
          <div className="font-serif text-[0.65rem] text-noir-marquise font-medium">9,90 €</div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1">
              <div className="w-0.5 h-0.5 rounded-full bg-or-champagne" />
              <div className="font-sans text-[0.35rem] text-gris-texte">Wrap · Panini · Crudités</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-0.5 h-0.5 rounded-full bg-or-champagne" />
              <div className="font-sans text-[0.35rem] text-gris-texte">Boisson incluse</div>
            </div>
          </div>
          <div className="w-full h-px bg-or-champagne/25 mt-1" />
          <div className="font-sans text-[0.35rem] italic text-gris-texte/40">+ Dessert vitrine</div>
        </div>
      </div>
    </div>
  );
}

// Map id → composant visuel
const VISUAL_MAP: Record<string, () => React.JSX.Element> = {
  facade:     VisualFacade,
  packaging:  VisualPackaging,
  reseaux:    VisualReseaux,
  carte:      VisualCarte,
  etiquettes: VisualEtiquettes,
  stickers:   VisualStickers,
  favicon:    VisualFavicon,
  menu:       VisualMenu,
};

// ─────────────────────────────────────────────────────────────────────────────
// ApplicationCard
// ─────────────────────────────────────────────────────────────────────────────

function ApplicationCard({
  app,
  animDelay = 0,
}: {
  app:       typeof APPLICATIONS[number];
  animDelay?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const Visual = VISUAL_MAP[app.id];

  return (
    <motion.article
      ref={ref}
      className={cn(
        "flex flex-col rounded-[3px] overflow-hidden",
        "border border-gris-marbre bg-blanc-marbre",
        "transition-shadow duration-400 hover:shadow-md hover:border-or-champagne/30",
        "group",
      )}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: animDelay / 1000, ease: EASE_SPRING }}
    >
      {/* ── Zone visuelle ────────────────────────────────────────────── */}
      <div className="relative h-36 overflow-hidden">
        <Visual />
        {/* Filet or haut au hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: "linear-gradient(90deg, transparent, #B99A5F, transparent)" }}
          aria-hidden="true"
        />
        {/* Index corner */}
        <span
          className="absolute top-2.5 left-3 font-serif font-light text-xs leading-none text-gris-marbre/50 select-none"
          aria-hidden="true"
        >
          {app.index}
        </span>
      </div>

      {/* ── Informations ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-4 md:p-5 flex-1 border-t border-gris-marbre/60">

        {/* Nom */}
        <h3 className="font-serif text-d-sm font-light text-noir-marquise leading-tight">
          {app.name}
        </h3>

        {/* Usage */}
        <p className="font-sans text-[0.72rem] text-gris-texte/70 leading-snug">
          {app.usage}
        </p>

        {/* Séparateur */}
        <div className="h-px bg-gris-marbre/50" aria-hidden="true" />

        {/* Règle principale */}
        <div className="space-y-1.5 mt-auto">
          <p className="label-mm text-gris-texte/45">Règle principale</p>
          <p className="font-sans text-ui text-gris-texte leading-relaxed">
            {app.rule}
          </p>
        </div>

        {/* Détails */}
        <ul className="space-y-1" role="list" aria-label={`Détails ${app.name}`}>
          {app.details.map((d) => (
            <li key={d} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-or-champagne/60 shrink-0" aria-hidden="true" />
              <span className="font-sans text-[0.68rem] text-gris-texte/60 leading-snug">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Principe directeur — résumé final
// ─────────────────────────────────────────────────────────────────────────────

function ClosingPrinciple() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-[3px] overflow-hidden bg-noir-marquise border border-or-champagne/15"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE_SPRING }}
    >
      {/* Filet or haut */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, #B99A5F 30%, #B99A5F 70%, transparent)" }}
        aria-hidden="true"
      />

      <div className="px-6 md:px-10 py-10 md:py-12 relative overflow-hidden">
        {/* M fantôme */}
        <div
          className="absolute -right-4 -top-4 font-serif font-light leading-none select-none pointer-events-none text-or-champagne/5"
          style={{ fontSize: "clamp(10rem, 22vw, 16rem)" }}
          aria-hidden="true"
        >
          M
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Citation */}
          <blockquote className="space-y-4">
            <p
              className="font-serif font-light italic text-ivoire-maison/90 text-balance leading-snug"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)" }}
            >
              La marque vit dans chaque détail.
              Un cup, une étiquette, un favicon —
              chaque support compte.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-or-champagne/50" aria-hidden="true" />
              <span className="label-mm text-or-champagne/60 text-[0.55rem]">
                Maison Marquise · Charte officielle
              </span>
            </div>
          </blockquote>

          {/* Principes rapides */}
          <div className="space-y-3">
            {[
              { n: "01", rule: "Un logo clair par support, jamais déformé." },
              { n: "02", rule: "La palette réduite : 3 couleurs maximum par application." },
              { n: "03", rule: "Le prix toujours lisible, jamais stylisé à l'excès." },
              { n: "04", rule: "Le M seul quand l'espace est contraint." },
            ].map(({ n, rule }, i) => (
              <motion.div
                key={n}
                className="flex items-baseline gap-3"
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: EASE }}
              >
                <span className="font-serif font-light text-or-champagne/30 text-sm w-6 shrink-0">
                  {n}
                </span>
                <p className="font-sans text-ui text-gris-marbre/60 leading-snug">
                  {rule}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Filet or bas */}
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

      {/* M fantôme fond */}
      <div
        className="absolute -bottom-16 -left-8 font-serif font-light leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(16rem, 36vw, 44rem)", color: "rgba(216,214,209,0.10)", lineHeight: 1 }}
        aria-hidden="true"
      />

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
            De la façade au favicon, chaque support applique les mêmes principes.
            La cohérence construit la reconnaissance.
          </motion.p>
        </div>

        {/* ══ GRILLE 4×2 ═══════════════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 md:mb-14"
          role="list"
          aria-label="Applications de marque Maison Marquise"
        >
          {APPLICATIONS.map((app, i) => (
            <div key={app.id} role="listitem">
              <ApplicationCard app={app} animDelay={i * 65} />
            </div>
          ))}
        </div>

        {/* ══ CLÔTURE ══════════════════════════════════════════════════ */}
        <ClosingPrinciple />

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

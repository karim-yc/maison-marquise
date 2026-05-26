"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// UniversSection — Les 3 univers visuels de Maison Marquise
//
// Chaque univers = grande carte immersive avec :
//   · Scène atmosphérique CSS (compositions géométriques + typographie)
//   · Mini-palette interactive
//   · Exemples d'usage
//   · Ambiance / mots-clés
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Données enrichies des univers ─────────────────────────────────────────────
const UNIVERS = [
  {
    id:      "maison",
    index:   "01",
    name:    "Univers Maison",
    tagline: "L'élégance du quotidien",
    desc:    "Le socle permanent de la marque. Sobre, architecturé, premium. Toutes les communications officielles s'inscrivent dans cet univers.",
    mood:    ["Élégant", "Maîtrisé", "Intemporel", "Premium"],
    palette: [
      { hex: "#FAFAF8", label: "Blanc Marbre",  role: "Fond" },
      { hex: "#F7F3EC", label: "Ivoire Maison", role: "Surface" },
      { hex: "#111111", label: "Noir Marquise", role: "Texte" },
      { hex: "#B99A5F", label: "Or Champagne",  role: "Accent" },
      { hex: "#D8D6D1", label: "Gris Marbre",   role: "Neutre" },
    ],
    usages: [
      "Façade & enseigne",
      "Menus & cartes officielles",
      "Packaging principal",
      "Documents de marque",
      "Site web & brandbook",
    ],
    // Composition CSS de la scène
    bg:     "#F7F3EC",
    dark:   false,
  },
  {
    id:      "gourmand",
    index:   "02",
    name:    "Univers Gourmand",
    tagline: "La chaleur de la création",
    desc:    "L'univers des produits, des saisons et des émotions. Chaud, généreux, accessible. Il fait envie et invite à la dégustation.",
    mood:    ["Chaleureux", "Généreux", "Appétissant", "Accessible"],
    palette: [
      { hex: "#F7F3EC", label: "Ivoire Maison",       role: "Fond" },
      { hex: "#C7843E", label: "Caramel Pâtissier",   role: "Principal" },
      { hex: "#A6192E", label: "Framboise Signature", role: "Accent fort" },
      { hex: "#9A9B55", label: "Pistache Fine",        role: "Accent doux" },
      { hex: "#6F5A2E", label: "Brun Marquis",         role: "Profondeur" },
    ],
    usages: [
      "Fiches produits & vitrines",
      "Posts réseaux sociaux",
      "Affiches saisonnières",
      "Créations spéciales",
      "Menus ardoise & animations",
    ],
    bg:     "#2A1505",
    dark:   true,
  },
  {
    id:      "signature",
    index:   "03",
    name:    "Univers Signature",
    tagline: "L'édition qui marque",
    desc:    "Réservé aux moments forts. Contrasté, éditorial, collectible. Un univers à utiliser avec parcimonie pour lui conserver son impact.",
    mood:    ["Fort", "Contrasté", "Éditorial", "Événementiel"],
    palette: [
      { hex: "#111111", label: "Noir Marquise", role: "Fond dominant" },
      { hex: "#B99A5F", label: "Or Champagne",  role: "Accent signature" },
      { hex: "#A6192E", label: "Framboise",      role: "Accent émotionnel" },
      { hex: "#F7F3EC", label: "Ivoire Maison",  role: "Texte clair" },
    ],
    usages: [
      "Collaborations & partenariats",
      "Éditions limitées",
      "Lancements & événements",
      "Coffrets cadeaux premium",
      "Campagnes éditoriales",
    ],
    bg:     "#111111",
    dark:   true,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Scènes atmosphériques CSS — une par univers
// Compositions purement graphiques, sans image externe
// ─────────────────────────────────────────────────────────────────────────────

// ── Scène Maison — marbre, grille, or discret ─────────────────────────────────
function SceneMaison() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Photo officielle — façade intérieure Maison Marquise */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/univers-maison.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Overlay sombre en bas pour lisibilité des chips */}
      <div
        className="absolute inset-x-0 bottom-0 h-28"
        style={{ background: "linear-gradient(to top, rgba(17,17,17,0.60) 0%, transparent 100%)" }}
      />
    </div>
  );
}

// ── Scène Gourmand — photo officielle ────────────────────────────────────────
function SceneGourmand() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src="/assets/univers-gourmand.avif"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover object-center"
        quality={85}
      />
      {/* Overlay sombre en bas */}
      <div
        className="absolute inset-x-0 bottom-0 h-28"
        style={{ background: "linear-gradient(to top, rgba(28,14,4,0.70) 0%, transparent 100%)" }}
      />
    </div>
  );
}

// ── Scène Signature — photo collab officielle ────────────────────────────────
function SceneSignature() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src="/assets/univers-signature.jpg"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover object-[center_65%]"
        quality={80}
      />
      {/* Overlay sombre — renforce le côté éditorial noir */}
      <div className="absolute inset-0" style={{ background: "rgba(17,17,17,0.30)" }} />
      {/* Gradient bas */}
      <div
        className="absolute inset-x-0 bottom-0 h-28"
        style={{ background: "linear-gradient(to top, rgba(17,17,17,0.70) 0%, transparent 100%)" }}
      />
    </div>
  );
}

const SCENE_MAP = {
  maison:    SceneMaison,
  gourmand:  SceneGourmand,
  signature: SceneSignature,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// UniversCard — grande carte immersive
// ─────────────────────────────────────────────────────────────────────────────

function UniversCard({
  univers,
  index,
}: {
  univers: typeof UNIVERS[number];
  index:   number;
}) {
  const ref        = useRef<HTMLDivElement>(null);
  const inView     = useInView(ref, { once: true, margin: "-80px 0px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const Scene      = SCENE_MAP[univers.id as keyof typeof SCENE_MAP];
  const isDark     = univers.dark;

  return (
    <motion.article
      ref={ref}
      className={cn(
        "relative rounded-[3px] overflow-hidden",
        "border",
        isDark ? "border-or-champagne/15" : "border-gris-marbre",
      )}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: EASE_SPRING }}
      aria-label={`${univers.name} — ${univers.tagline}`}
    >
      {/* ── Zone atmosphérique ──────────────────────────────────────── */}
      <div className="relative h-52 md:h-64 lg:h-72 overflow-hidden">
        <Scene />

        {/* Overlay dégradé vers le bas pour lisibilité */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{
            background: isDark
              ? `linear-gradient(to top, ${univers.id === "gourmand" ? "rgba(28,14,4,0.95)" : "rgba(17,17,17,0.92)"} 0%, transparent 100%)`
              : univers.id === "maison"
              ? "linear-gradient(to top, rgba(17,17,17,0.55) 0%, transparent 100%)"
              : "linear-gradient(to top, rgba(247,243,236,0.90) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Index positionné en absolu sur la scène */}
        <div
          className={cn(
            "absolute top-5 left-6",
            "font-sans text-[0.6rem] font-medium tracking-[0.2em] uppercase",
            isDark ? "text-or-champagne/50" : "text-gris-texte/50",
          )}
          aria-hidden="true"
        >
          {univers.index}
        </div>

        {/* Mots-clés d'ambiance en bas de la scène */}
        <div className="absolute bottom-4 left-6 flex flex-wrap gap-1.5">
          {univers.mood.map((m) => (
            <span
              key={m}
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-[2px]",
                "font-sans text-[0.55rem] font-medium tracking-[0.15em] uppercase",
                isDark || univers.id === "maison"
                  ? "bg-ivoire-maison/8 text-ivoire-maison/55 border border-ivoire-maison/10"
                  : "bg-noir-marquise/6 text-noir-marquise/45 border border-noir-marquise/8",
              )}
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* ── Corps de la carte ────────────────────────────────────────── */}
      <div className={cn(
        "p-6 md:p-8 space-y-6",
        isDark
          ? univers.id === "gourmand" ? "bg-[#1C0E04]" : "bg-noir-marquise"
          : "bg-blanc-marbre",
      )}>

        {/* Titre + tagline */}
        <div className="space-y-1.5">
          <h3 className={cn(
            "font-serif font-light leading-tight",
            "text-d-md",
            isDark ? "text-ivoire-maison" : "text-noir-marquise",
          )}>
            {univers.name}
          </h3>
          <p className={cn(
            "font-serif italic",
            "text-body-lg",
            isDark ? "text-or-champagne/70" : "text-or-champagne",
          )}>
            {univers.tagline}
          </p>
        </div>

        {/* Description */}
        <p className={cn(
          "font-sans text-ui-lg leading-relaxed",
          isDark ? "text-gris-marbre/70" : "text-gris-texte",
        )}>
          {univers.desc}
        </p>

        {/* Séparateur */}
        <div
          className="h-px"
          style={{
            background: isDark
              ? "linear-gradient(90deg, rgba(185,154,95,0.25), transparent)"
              : "linear-gradient(90deg, rgba(17,17,17,0.08), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Palette interactive */}
        <div className="space-y-3">
          <p className={cn("label-mm", isDark ? "text-gris-marbre/40" : "text-gris-texte/50")}>
            Palette
          </p>
          <div className="flex flex-wrap items-start gap-3">
            {univers.palette.map((color) => (
              <button
                key={color.hex}
                className="flex flex-col items-center gap-1.5 group"
                onMouseEnter={() => setHovered(color.hex)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`${color.label} — ${color.hex}`}
                title={`${color.label} (${color.hex})`}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full border transition-transform duration-200",
                    "group-hover:scale-110",
                  )}
                  style={{
                    backgroundColor: color.hex,
                    borderColor: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(17,17,17,0.10)",
                    boxShadow: hovered === color.hex
                      ? `0 0 0 2px ${color.hex}50, 0 4px 12px ${color.hex}30`
                      : undefined,
                  }}
                />
                <AnimatePresence>
                  {hovered === color.hex && (
                    <motion.span
                      className={cn(
                        "font-mono text-[0.55rem] leading-none whitespace-nowrap",
                        isDark ? "text-ivoire-maison/50" : "text-gris-texte/60",
                      )}
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {color.hex}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>

        {/* Usages */}
        <div className="space-y-2.5">
          <p className={cn("label-mm", isDark ? "text-gris-marbre/40" : "text-gris-texte/50")}>
            Usages
          </p>
          <ul className="space-y-1.5" role="list">
            {univers.usages.map((usage) => (
              <li
                key={usage}
                className={cn(
                  "flex items-center gap-2.5 font-sans text-ui",
                  isDark ? "text-gris-marbre/65" : "text-gris-texte",
                )}
              >
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: isDark ? "#B99A5F" : "#111111", opacity: 0.4 }}
                  aria-hidden="true"
                />
                {usage}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Bande de synthèse — les 3 univers côte à côte
// ─────────────────────────────────────────────────────────────────────────────

function SyntheseBande() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-[3px] overflow-hidden border border-gris-marbre"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* En-tête */}
      <div className="px-6 py-4 border-b border-gris-marbre bg-ivoire-maison flex items-center justify-between">
        <span className="label-mm text-gris-texte">Usage par contexte</span>

      </div>

      {/* Grille 3 colonnes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gris-marbre">
        {[
          {
            name:   "Maison",
            when:   "Pour toute communication de fond — la base permanente.",
            always: true,
            color:  "#111111",
            bgDot:  "#B99A5F",
          },
          {
            name:   "Gourmand",
            when:   "Pour les produits, les saisons, les réseaux. La chaleur accessible.",
            always: false,
            color:  "#C7843E",
            bgDot:  "#C7843E",
          },
          {
            name:   "Signature",
            when:   "Pour les moments forts uniquement. À employer avec parcimonie.",
            always: false,
            color:  "#B99A5F",
            bgDot:  "#111111",
          },
        ].map((col, i) => (
          <motion.div
            key={col.name}
            className="p-5 md:p-6 bg-blanc-marbre space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: col.bgDot }}
                aria-hidden="true"
              />
              <span
                className="font-sans text-ui-lg font-medium"
                style={{ color: col.color }}
              >
                Univers {col.name}
              </span>
              {col.always && (
                <span className="chip-mm text-[0.5rem] ml-auto">Base</span>
              )}
            </div>
            <p className="font-sans text-ui text-gris-texte leading-relaxed">
              {col.when}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────

export function UniversSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="univers"
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-blanc-marbre overflow-hidden"
      aria-labelledby="univers-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

      {/* M fantôme fond */}
      <div
        className="absolute -top-16 -right-8 font-serif font-light leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(14rem, 32vw, 40rem)", color: "rgba(216,214,209,0.10)", lineHeight: 1 }}
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
            Univers visuels
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
              07
            </motion.span>
            <div className="pt-1 md:pt-2">
              <motion.h2
                id="univers-title"
                className="font-serif font-light text-noir-marquise text-balance leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={headerIn ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.85, delay: 0.15, ease: EASE_SPRING }}
              >
                Les trois univers de marque
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
            Chaque univers a sa palette, son énergie et ses contextes d'usage.
            Ils définissent comment appliquer la marque selon le support et le moment.
          </motion.p>
        </div>

        {/* ══ GRILLE DES UNIVERS ═══════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10 md:mb-14"
          role="list"
          aria-label="Les trois univers visuels de Maison Marquise"
        >
          {UNIVERS.map((u, i) => (
            <div key={u.id} role="listitem">
              <UniversCard univers={u} index={i} />
            </div>
          ))}
        </div>

        {/* ══ SYNTHÈSE ════════════════════════════════════════════════ */}

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

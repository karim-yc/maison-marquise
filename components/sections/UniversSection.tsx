"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ─────────────────────────────────────────────────────────────────────────────
// Thème par univers — tout centralisé, aucune logique isDark éparpillée
// ─────────────────────────────────────────────────────────────────────────────
const THEME = {
  maison: {
    cardBg:        "#F8F3EA",
    textPrimary:   "#111111",
    textSecondary: "rgba(31,26,23,0.65)",
    tagline:       "#B8784A",
    separator:     "rgba(184,120,74,0.18)",
    labelMuted:    "rgba(74,74,74,0.45)",
    bullet:        "#B8784A",
    chip:          { bg: "rgba(17,17,17,0.05)", text: "rgba(17,17,17,0.45)", border: "rgba(17,17,17,0.09)" },
    indexColor:    "rgba(17,17,17,0.25)",
    overlayGrad:   "rgba(248,243,234,0.95)",
    cardBorder:    "rgba(216,195,165,0.50)",
  },
  gourmand: {
    cardBg:        "#A84F2A",
    textPrimary:   "#F4E8D6",
    textSecondary: "rgba(244,232,214,0.80)",
    tagline:       "#F8F3EA",
    separator:     "rgba(244,232,214,0.22)",
    labelMuted:    "rgba(244,232,214,0.45)",
    bullet:        "rgba(244,232,214,0.70)",
    chip:          { bg: "rgba(244,232,214,0.12)", text: "rgba(244,232,214,0.70)", border: "rgba(244,232,214,0.18)" },
    indexColor:    "rgba(244,232,214,0.45)",
    overlayGrad:   "rgba(100,28,8,0.90)",
    cardBorder:    "rgba(244,232,214,0.15)",
  },
  signature: {
    cardBg:        "#1F1A17",
    textPrimary:   "#F4E8D6",
    textSecondary: "rgba(244,232,214,0.65)",
    tagline:       "#B8784A",
    separator:     "rgba(184,120,74,0.22)",
    labelMuted:    "rgba(244,232,214,0.38)",
    bullet:        "rgba(184,120,74,0.70)",
    chip:          { bg: "rgba(244,232,214,0.07)", text: "rgba(244,232,214,0.48)", border: "rgba(244,232,214,0.10)" },
    indexColor:    "rgba(244,232,214,0.32)",
    overlayGrad:   "rgba(17,17,17,0.93)",
    cardBorder:    "rgba(184,120,74,0.18)",
  },
} as const;

type UniversId = keyof typeof THEME;

// ─────────────────────────────────────────────────────────────────────────────
// Données — palette officielle 2025
// ─────────────────────────────────────────────────────────────────────────────
const UNIVERS = [
  {
    id:      "maison" as UniversId,
    index:   "01",
    name:    "Univers Maison",
    tagline: "L'élégance du quotidien",
    desc:    "Le socle permanent de la marque. Sobre, architecturé, premium. Toutes les communications officielles s'inscrivent dans cet univers.",
    mood:    ["Élégant", "Maîtrisé", "Intemporel", "Premium"],
    palette: [
      { hex: "#F8F3EA", label: "Blanc Marbre",  role: "Fond" },
      { hex: "#F4E8D6", label: "Crème Maison",  role: "Surface" },
      { hex: "#111111", label: "Noir Marquise",  role: "Texte" },
      { hex: "#B8784A", label: "Cuivre-Or",      role: "Accent" },
      { hex: "#D8C3A5", label: "Beige Doux",     role: "Neutre" },
    ],
    usages: [
      "Façade & enseigne boutique",
      "Menus & cartes officielles",
      "Packaging principal",
      "Documents de marque",
      "Site web & brandbook",
    ],
    photo: "/assets/univers-maison.jpg",
    photoStyle: { objectPosition: "center" },
  },
  {
    id:      "gourmand" as UniversId,
    index:   "02",
    name:    "Univers Gourmand",
    tagline: "La chaleur de la création",
    desc:    "L'univers des produits, des saisons et des émotions. Chaud, généreux, accessible. Il fait envie et invite à la dégustation.",
    mood:    ["Chaleureux", "Généreux", "Appétissant", "Accessible"],
    palette: [
      { hex: "#A84F2A", label: "Terracotta",   role: "Principal",  dominant: true },
      { hex: "#F4E8D6", label: "Crème Maison", role: "Fond chaud", dominant: false },
      { hex: "#B8784A", label: "Cuivre-Or",    role: "Accent",     dominant: false },
      { hex: "#4A2E20", label: "Noyer Foncé",  role: "Profondeur", dominant: false },
      { hex: "#F8F3EA", label: "Blanc Marbre", role: "Lumière",    dominant: false },
    ],
    usages: [
      "Fiches produits & vitrines",
      "Posts réseaux sociaux",
      "Affiches saisonnières",
      "Créations spéciales",
      "Menus ardoise & animations",
    ],
    photo: "/assets/univers-gourmand.avif",
    photoStyle: { objectPosition: "center" },
  },
  {
    id:      "signature" as UniversId,
    index:   "03",
    name:    "Univers Signature",
    tagline: "L'édition qui marque",
    desc:    "Réservé aux moments forts. Contrasté, éditorial, collectible. Un univers à utiliser avec parcimonie pour lui conserver son impact.",
    mood:    ["Fort", "Contrasté", "Éditorial", "Événementiel"],
    palette: [
      { hex: "#1F1A17", label: "Noir Subtil",   role: "Fond dominant",  dominant: true  },
      { hex: "#B8784A", label: "Cuivre-Or",     role: "Accent signature", dominant: false },
      { hex: "#A84F2A", label: "Terracotta",    role: "Accent chaud",   dominant: false },
      { hex: "#F4E8D6", label: "Crème Maison",  role: "Texte clair",    dominant: false },
    ],
    usages: [
      "Collaborations & partenariats",
      "Éditions limitées",
      "Lancements & événements",
      "Coffrets cadeaux premium",
      "Campagnes éditoriales",
    ],
    photo: "/assets/univers-signature.jpg",
    photoStyle: { objectPosition: "center 65%" },
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// SwatchDot — pastille couleur
// Quand la couleur = fond de la carte (dominant:true) :
//   → Affichée avec un anneau contrasté + hachures légères pour la distinguer
// ─────────────────────────────────────────────────────────────────────────────
type PaletteColor = { hex: string; label: string; role: string; dominant?: boolean };

function SwatchDot({
  color, T, hovered, onEnter, onLeave,
}: {
  color: PaletteColor;
  T: typeof THEME[UniversId];
  hovered: string | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const isLight = (() => {
    const r = parseInt(color.hex.slice(1, 3), 16);
    const g = parseInt(color.hex.slice(3, 5), 16);
    const b = parseInt(color.hex.slice(5, 7), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b > 160;
  })();

  // Couleur du ring de hover adaptée au fond de la carte
  const ringColor = T.cardBg === "#A84F2A" || T.cardBg === "#1F1A17"
    ? "rgba(244,232,214,0.60)"
    : "rgba(17,17,17,0.25)";

  return (
    <button
      className="flex flex-col items-center gap-1.5 group/sw"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={`${color.label} — ${color.hex}`}
      title={`${color.label} · ${color.role}`}
    >
      <div className="relative w-8 h-8 rounded-full transition-transform duration-200 group-hover/sw:scale-110">
        {/* Swatch principal */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: color.hex,
            // Si couleur dominante (= fond de la carte) : ring blanc épais très visible
            boxShadow: color.dominant
              ? `0 0 0 2px ${T.cardBg}, 0 0 0 3.5px rgba(255,255,255,0.70), 0 0 0 5px rgba(255,255,255,0.20)`
              : hovered === color.hex
              ? `0 0 0 2.5px ${ringColor}, 0 3px 10px rgba(0,0,0,0.20)`
              : `0 0 0 1px rgba(0,0,0,${isLight ? "0.10" : "0.04"})`,
          }}
        />
        {/* Badge "●" sur la couleur dominante pour indiquer que c'est le fond */}
        {color.dominant && (
          <span
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full flex items-center justify-center"
            style={{ backgroundColor: T.textPrimary, opacity: 0.7 }}
            aria-hidden="true"
          >
            <span className="block w-1 h-1 rounded-full" style={{ backgroundColor: T.cardBg }} />
          </span>
        )}
      </div>

      {/* Label au hover */}
      <AnimatePresence>
        {hovered === color.hex && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <span
              className="font-sans text-[0.56rem] font-medium leading-none whitespace-nowrap"
              style={{ color: T.textSecondary }}
            >
              {color.label}
            </span>
            <span
              className="font-mono text-[0.50rem] leading-none mt-0.5 whitespace-nowrap"
              style={{ color: T.labelMuted }}
            >
              {color.hex.toUpperCase()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UniversCard
// ─────────────────────────────────────────────────────────────────────────────
function UniversCard({
  univers, animIndex,
}: {
  univers: typeof UNIVERS[number];
  animIndex: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const T = THEME[univers.id];

  return (
    <motion.article
      ref={ref}
      className="relative rounded-[3px] overflow-hidden flex flex-col"
      style={{ border: `1px solid ${T.cardBorder}` }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: animIndex * 0.15, ease: EASE_SPRING }}
      aria-label={`${univers.name} — ${univers.tagline}`}
    >
      {/* ── Photo atmosphérique ─────────────────────────────────────── */}
      <div className="relative h-52 md:h-60 lg:h-64 overflow-hidden shrink-0">
        <Image
          src={univers.photo}
          alt={`Ambiance ${univers.name}`}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.02]"
          style={univers.photoStyle}
          quality={85}
        />

        {/* Fondu bas vers la couleur de la carte */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${T.overlayGrad} 0%, transparent 100%)` }}
          aria-hidden="true"
        />

        {/* Index */}
        <span
          className="absolute top-4 left-5 font-sans text-[0.58rem] font-medium tracking-[0.22em] uppercase"
          style={{ color: T.indexColor }}
          aria-hidden="true"
        >
          {univers.index}
        </span>

        {/* Mood chips */}
        <div className="absolute bottom-3 left-5 flex flex-wrap gap-1.5">
          {univers.mood.map((m) => (
            <span
              key={m}
              className="inline-flex items-center px-2 py-0.5 rounded-[2px] font-sans text-[0.52rem] font-medium tracking-[0.14em] uppercase"
              style={{
                backgroundColor: T.chip.bg,
                color:           T.chip.text,
                border:          `1px solid ${T.chip.border}`,
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* ── Corps ───────────────────────────────────────────────────── */}
      <div
        className="flex-1 flex flex-col p-6 md:p-7 space-y-5"
        style={{ backgroundColor: T.cardBg }}
      >
        {/* Titre + tagline */}
        <div className="space-y-1">
          <h3
            className="font-serif font-light leading-tight"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: T.textPrimary }}
          >
            {univers.name}
          </h3>
          <p className="font-serif italic text-base" style={{ color: T.tagline }}>
            {univers.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="font-sans text-[0.78rem] leading-relaxed" style={{ color: T.textSecondary }}>
          {univers.desc}
        </p>

        {/* Séparateur */}
        <div
          className="h-px"
          style={{ background: `linear-gradient(90deg, ${T.separator}, transparent)` }}
          aria-hidden="true"
        />

        {/* Palette */}
        <div className="space-y-3">
          <p
            className="font-sans text-[0.55rem] font-medium tracking-[0.18em] uppercase"
            style={{ color: T.labelMuted }}
          >
            Palette
          </p>
          <div className="flex flex-wrap items-start gap-3">
            {([...univers.palette] as PaletteColor[]).map((color) => (
              <SwatchDot
                key={color.hex}
                color={color}
                T={T}
                hovered={hovered}
                onEnter={() => setHovered(color.hex)}
                onLeave={() => setHovered(null)}
              />
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div
          className="h-px"
          style={{ background: `linear-gradient(90deg, ${T.separator}, transparent)` }}
          aria-hidden="true"
        />

        {/* Usages */}
        <div className="space-y-2">
          <p
            className="font-sans text-[0.55rem] font-medium tracking-[0.18em] uppercase"
            style={{ color: T.labelMuted }}
          >
            Usages
          </p>
          <ul className="space-y-1.5" role="list">
            {univers.usages.map((usage) => (
              <li key={usage} className="flex items-center gap-2.5">
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: T.bullet }}
                  aria-hidden="true"
                />
                <span
                  className="font-sans text-[0.72rem]"
                  style={{ color: T.textSecondary }}
                >
                  {usage}
                </span>
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
export function UniversSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="univers"
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-ivoire-maison overflow-hidden"
      aria-labelledby="univers-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

      <div className="container-mm py-section">

        {/* ══ EN-TÊTE ══════════════════════════════════════════════════ */}
        <div ref={headerRef} className="mb-14 md:mb-20 max-w-2xl">
          <motion.span
            className="label-mm text-gris-texte block mb-4"
            initial={{ opacity: 0, y: -8 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Univers visuels
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
              07
            </motion.span>
            <div className="flex-1 pt-1 md:pt-3">
              <motion.span
                className="font-serif font-light text-gris-marbre/30 leading-none select-none block sm:hidden mb-2"
                style={{ fontSize: "clamp(3rem, 10vw, 4rem)" }}
                initial={{ opacity: 0 }}
                animate={headerIn ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE }}
                aria-hidden="true"
              >
                07
              </motion.span>
              <motion.h2
                id="univers-title"
                className="font-serif font-light text-noir-marquise text-balance leading-none"
                style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={headerIn ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.85, delay: 0.15, ease: EASE_SPRING }}
              >
                Les trois univers de marque
              </motion.h2>
              <motion.div
                className="h-px mt-5"
                style={{ background: "linear-gradient(90deg, #B8784A, transparent)", transformOrigin: "left" }}
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
                Chaque univers a sa palette, son énergie et ses contextes d&apos;usage.
                Ils définissent comment appliquer la marque selon le support et le moment.
              </motion.p>
            </div>
          </div>
        </div>

        {/* ══ GRILLE ═══════════════════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Les trois univers visuels de Maison Marquise"
        >
          {UNIVERS.map((u, i) => (
            <div key={u.id} role="listitem">
              <UniversCard univers={u} animIndex={i} />
            </div>
          ))}
        </div>

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Copy, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// CouleursSection — Palette officielle Maison Marquise
// 7 couleurs documentées avec textures, usages et interdits.
// ─────────────────────────────────────────────────────────────────────────────

const EASE        = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.16, 1, 0.3, 1]        as const;

// ── Palette complète ──────────────────────────────────────────────────────────
const COULEURS = [
  {
    name:      "Terracotta Marquise",
    hex:       "#A84F2A",
    role:      "Couleur principale de marque",
    groupe:    "signature",
    rgb:       "R168 G79 B42",
    cmyk:      "C0 M53 Y75 K34",
    texture:   "Papier mat terracotta légèrement grainé, carton rigide premium",
    sensation: "Chaleureuse, artisanale, élégante, signature",
    usage:     "Cups terracotta, porte-gobelets, boîte pâtisserie, accents forts, fonds premium",
    interdit:  "Ne pas rendre orange vif, rouge brique trop saturé ou trop foncée",
  },
  {
    name:      "Crème Maison",
    hex:       "#F4E8D6",
    role:      "Couleur douce et lumineuse",
    groupe:    "clair",
    rgb:       "R244 G232 B214",
    cmyk:      "C0 M5 Y12 K4",
    texture:   "Papier crème mat, surface douce, finition veloutée",
    sensation: "Calme, hospitalité, douceur, raffinement",
    usage:     "Cup chaude crème, fonds clairs, zones de respiration, cartes, supports élégants",
    interdit:  "Ne pas rendre blanc froid, jaune, beige sale ou trop gris",
  },
  {
    name:      "Blanc Marbre",
    hex:       "#F8F3EA",
    role:      "Couleur matière premium",
    groupe:    "clair",
    rgb:       "R248 G243 B234",
    cmyk:      "C0 M2 Y6 K3",
    texture:   "Marbre clair avec veines beige/gris très subtiles",
    sensation: "Luxe discret, propreté, architecture, fraîcheur",
    usage:     "Bande marbre packaging, comptoirs, fonds lumineux, univers boutique",
    interdit:  "Ne pas utiliser marbre trop chargé, trop gris, trop noir ou trop contrasté",
  },
  {
    name:      "Beige Doux",
    hex:       "#D8C3A5",
    role:      "Couleur secondaire éditoriale",
    groupe:    "clair",
    rgb:       "R216 G195 B165",
    cmyk:      "C0 M10 Y24 K15",
    texture:   "Enduit mural doux, pierre claire, papier texturé naturel",
    sensation: "Chaleur, calme, naturel, sophistication",
    usage:     "Fonds de sections, cartes, supports print, arrière-plans lifestyle",
    interdit:  "Ne pas rendre trop jaune, trop sable, trop terne ou trop foncé",
  },
  {
    name:      "Cuivre-Or",
    hex:       "#B8784A",
    role:      "Accent premium",
    groupe:    "accent",
    rgb:       "R184 G120 B74",
    cmyk:      "C0 M35 Y60 K28",
    texture:   "Foil cuivre-or légèrement réfléchissant, métal brossé subtil",
    sensation: "Raffinement, lumière, détail précieux",
    usage:     "Logo, monogramme M, filets fins, dorure, embossage, détails packaging",
    interdit:  "Ne pas utiliser or jaune brillant ou bling-bling. À utiliser avec beaucoup de retenue",
  },
  {
    name:      "Noyer Foncé",
    hex:       "#4A2E20",
    role:      "Profondeur et architecture",
    groupe:    "chaud",
    rgb:       "R74 G46 B32",
    cmyk:      "C0 M38 Y57 K71",
    texture:   "Bois noyer foncé avec veinage visible",
    sensation: "Chaleur, solidité, luxe architectural",
    usage:     "Bois, mobilier, panneaux muraux, plateaux, fonds profonds, ambiance café",
    interdit:  "Ne pas rendre noir, chocolat trop lourd ou brun rouge trop saturé",
  },
  {
    name:      "Noir Subtil",
    hex:       "#1F1A17",
    role:      "Contraste élégant",
    groupe:    "accent",
    rgb:       "R31 G26 B23",
    cmyk:      "C0 M16 Y26 K88",
    texture:   "Noir mat doux",
    sensation: "Lisibilité, précision, élégance",
    usage:     "Textes, prix, menus, détails fins, signalétique",
    interdit:  "Ne pas utiliser un noir trop dur, trop brillant ou trop dominant",
  },
] as const;

// ── Règle 70/20/10 ────────────────────────────────────────────────────────────
const EQUILIBRE = [
  { pct: "70 %", label: "Tons clairs", hex: ["#F4E8D6", "#F8F3EA", "#D8C3A5"], desc: "Crème Maison, Blanc Marbre, Beige Doux" },
  { pct: "20 %", label: "Tons chauds de marque", hex: ["#A84F2A", "#4A2E20"], desc: "Terracotta Marquise, Noyer Foncé" },
  { pct: "10 %", label: "Accents premium", hex: ["#B8784A", "#1F1A17"], desc: "Cuivre-Or, Noir Subtil" },
] as const;

// ── Règles ────────────────────────────────────────────────────────────────────
const REGLES = [
  "Toujours associer les couleurs à des matières visibles.",
  "Éviter les aplats trop plats ou numériques.",
  "Garder une palette chaude, douce et premium.",
  "Ne jamais utiliser de couleurs criardes.",
  "Le cuivre-or doit rester un accent, jamais une couleur dominante.",
  "La terracotta est la couleur signature — elle doit respirer avec crème et marbre.",
  "Ne jamais introduire de nouvelles couleurs sans justification produit.",
] as const;

const JAMAIS = [
  "Terracotta orange vif.",
  "Or jaune brillant ou bling-bling.",
  "Blanc froid clinique.",
  "Noir trop dominant.",
  "Palette multicolore.",
  "Couleurs pastel aléatoires.",
  "Présenter les couleurs sans textures.",
  "Créer une ambiance froide, industrielle ou impersonnelle.",
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// CopyChip — copie un code au clic
// ─────────────────────────────────────────────────────────────────────────────
function CopyChip({ value, muted = false }: { value: string; muted?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* silencieux */ }
  }, [value]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group/chip inline-flex items-center gap-1.5 rounded-[2px] px-2 py-1",
        "border transition-all duration-200 font-mono text-[0.62rem] tracking-wide",
        muted
          ? "border-gris-marbre/50 text-gris-texte/50 hover:border-noir-marquise/30 hover:text-noir-marquise/80"
          : "border-gris-marbre text-gris-texte hover:border-or-champagne/60 hover:text-noir-marquise hover:bg-ivoire-maison",
      )}
      aria-label={`Copier ${value}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span key="ok" className="flex items-center gap-1 text-[#6B7A3D]"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <Check size={9} strokeWidth={2.5} />Copié
          </motion.span>
        ) : (
          <motion.span key="val" className="flex items-center gap-1.5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
            <Copy size={9} strokeWidth={1.5} className="opacity-0 group-hover/chip:opacity-60 transition-opacity" />
            {value}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ColorCard — carte couleur complète avec texture et infos
// ─────────────────────────────────────────────────────────────────────────────
function ColorCard({ color, animDelay = 0 }: {
  color: typeof COULEURS[number]; animDelay?: number
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  const [open, setOpen] = useState(false);

  // Luminosité pour le texte sur la pastille
  const r = parseInt(color.hex.slice(1,3), 16);
  const g = parseInt(color.hex.slice(3,5), 16);
  const b = parseInt(color.hex.slice(5,7), 16);
  const light = (0.299*r + 0.587*g + 0.114*b) < 145;

  return (
    <motion.article
      ref={ref}
      className="flex flex-col rounded-[3px] overflow-hidden border border-gris-marbre bg-blanc-marbre hover:shadow-md transition-shadow duration-400"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: animDelay / 1000, ease: EASE }}
    >
      {/* Swatch — clic pour copier HEX */}
      <button
        className="relative w-full h-28 md:h-32 cursor-pointer group/sw overflow-hidden"
        style={{ backgroundColor: color.hex }}
        onClick={async () => { try { await navigator.clipboard.writeText(color.hex); } catch {} }}
        aria-label={`Copier HEX ${color.hex}`}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 group-hover/sw:opacity-100 transition-opacity bg-black/10">
          <Copy size={11} strokeWidth={1.5} className={light ? "text-white/80" : "text-black/50"} />
          <span className={cn("font-sans text-[0.58rem] font-medium tracking-[0.15em] uppercase", light ? "text-white/80" : "text-black/50")}>
            Copier HEX
          </span>
        </div>
        <span className={cn("absolute bottom-2 right-3 font-mono text-[0.58rem] tracking-wide opacity-50 group-hover/sw:opacity-0 transition-opacity", light ? "text-white" : "text-black")}>
          {color.hex.toUpperCase()}
        </span>
      </button>

      {/* Infos principales */}
      <div className="flex-1 flex flex-col">
        <div className="px-4 pt-3.5 pb-3 space-y-2">
          {/* Rôle */}
          <p className="font-sans text-[0.55rem] font-medium tracking-[0.16em] uppercase text-gris-texte/45">
            {color.role}
          </p>
          {/* Nom */}
          <p className="font-sans text-[0.82rem] font-semibold text-noir-marquise leading-tight">
            {color.name}
          </p>
          {/* HEX copiable */}
          <div className="flex items-center gap-1.5">
            <span className="label-mm text-gris-texte/40 w-8">HEX</span>
            <CopyChip value={color.hex.toUpperCase()} />
          </div>
          {/* Texture */}
          <p className="font-sans text-[0.65rem] text-gris-texte/60 leading-snug italic">
            {color.texture}
          </p>
          {/* Usage court */}
          <p className="font-sans text-[0.67rem] text-gris-texte leading-snug">
            {color.usage}
          </p>
        </div>

        {/* Zone déroulante — codes techniques */}
        <div className="border-t border-gris-marbre/50 mt-auto">
          <button
            className="w-full flex items-center justify-between px-4 py-2.5 text-left group/tog hover:bg-gris-marbre/20 transition-colors"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
          >
            <span className="label-mm text-gris-texte/40 group-hover/tog:text-gris-texte/70 transition-colors">
              RGB · CMYK
            </span>
            <ChevronDown size={12} strokeWidth={1.5} className={cn("text-gris-texte/30 transition-all duration-200", open && "rotate-180")} />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-3 pt-1 space-y-1.5 bg-ivoire-maison/50">
                  <div className="flex items-center gap-1.5">
                    <span className="label-mm text-gris-texte/40 w-8">RGB</span>
                    <CopyChip value={color.rgb} muted />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="label-mm text-gris-texte/40 w-8">CMYK</span>
                    <CopyChip value={color.cmyk} muted />
                  </div>
                  {/* Interdit */}
                  <div className="flex items-start gap-1.5 pt-1.5 border-t border-gris-marbre/30 mt-2">
                    <X size={9} strokeWidth={2} className="text-framboise shrink-0 mt-0.5" />
                    <p className="font-sans text-[0.6rem] text-gris-texte/55 leading-snug">{color.interdit}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Répartition 70/20/10
// ─────────────────────────────────────────────────────────────────────────────
function EquilibrePanel() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  // Barre proportionnelle
  const widths = ["70%", "20%", "10%"] as const;
  const bgs    = ["#F4E8D6", "#A84F2A", "#B8784A"] as const;

  return (
    <motion.div
      ref={ref}
      className="rounded-[3px] border border-gris-marbre bg-blanc-marbre overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label-mm text-gris-texte">Règle d&apos;équilibre couleur</span>
            <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">La règle 70 / 20 / 10</h3>
          </div>
          <p className="font-sans text-ui text-gris-texte max-w-xs leading-relaxed">
            Toute composition Maison Marquise respecte cette hiérarchie entre tons clairs, tons de marque et accents premium.
          </p>
        </div>

        {/* Barre */}
        <div className="h-12 md:h-14 flex rounded-[2px] overflow-hidden">
          {EQUILIBRE.map((e, i) => (
            <motion.div
              key={e.pct}
              className="flex items-center justify-center"
              style={{ backgroundColor: bgs[i], width: widths[i] }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            >
              <span className={cn("font-serif text-lg font-light leading-none whitespace-nowrap",
                i === 0 ? "text-noir-marquise/50" : "text-ivoire-maison/80")}>
                {e.pct}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Légende */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EQUILIBRE.map((e, i) => (
            <div key={e.pct} className="space-y-1.5">
              <div className="flex items-center gap-2">
                {e.hex.map((h) => (
                  <span key={h} className="w-4 h-4 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: h }} />
                ))}
              </div>
              <p className="font-sans text-[0.65rem] font-semibold text-noir-marquise">{e.pct} — {e.label}</p>
              <p className="font-sans text-[0.6rem] text-gris-texte/65">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export function CouleursSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const reglesRef = useRef<HTMLDivElement>(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px 0px" });
  const reglesIn  = useInView(reglesRef, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="couleurs"
      className="relative w-full scroll-mt-16 md:scroll-mt-[72px] bg-ivoire-maison overflow-hidden"
      aria-labelledby="couleurs-title"
    >
      <div className="line-gold w-full" aria-hidden="true" />

      <div className="container-mm py-section space-y-14 md:space-y-20">

        {/* ══ EN-TÊTE ══════════════════════════════════════════════════ */}
        <div ref={headerRef}>
          <motion.span
            className="label-mm text-gris-texte block mb-4"
            initial={{ opacity: 0, y: -8 }}
            animate={headerIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Palette officielle
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
              03
            </motion.span>
            <div className="flex-1 pt-1 md:pt-3">
              <motion.span
                className="font-serif font-light text-gris-marbre/30 leading-none select-none block sm:hidden mb-2"
                style={{ fontSize: "clamp(3rem, 10vw, 4rem)" }}
                initial={{ opacity: 0 }} animate={headerIn ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE }}
                aria-hidden="true"
              >
                03
              </motion.span>
              <motion.h2
                id="couleurs-title"
                className="font-serif font-light text-noir-marquise leading-none text-balance"
                style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
                initial={{ opacity: 0, y: 18 }}
                animate={headerIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE_SPRING }}
              >
                Les couleurs officielles
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
                Cliquez sur chaque pastille pour copier le code HEX. Les codes RGB et CMYK sont disponibles en dépliant chaque carte.
              </motion.p>
            </div>
          </div>
        </div>

        {/* ══ RÈGLE 70/20/10 ═══════════════════════════════════════════ */}
        <EquilibrePanel />

        {/* ══ 7 COULEURS ═══════════════════════════════════════════════ */}
        <div className="space-y-10">
          {/* Signature + Clairs */}
          <div>
            <motion.div
              className="mb-6 flex items-end gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div>
                <span className="label-mm text-gris-texte">70 % + 20 %</span>
                <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">
                  Tons clairs &amp; tons de marque
                </h3>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {COULEURS.filter(c => c.groupe !== "accent").map((color, i) => (
                <ColorCard key={color.hex} color={color} animDelay={i * 70} />
              ))}
            </div>
          </div>

          {/* Séparateur */}
          <div className="flex items-center gap-5" aria-hidden="true">
            <div className="flex-1 h-px bg-gris-marbre/50" />
            <div className="w-1 h-1 rotate-45 bg-or-champagne/40" />
            <div className="flex-1 h-px bg-gris-marbre/50" />
          </div>

          {/* Accents */}
          <div>
            <motion.div
              className="mb-6 flex items-end gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div>
                <span className="label-mm text-gris-texte">10 %</span>
                <h3 className="font-serif text-d-md font-light text-noir-marquise mt-1">
                  Accents premium
                </h3>
              </div>
              <span className="chip-mm mb-1 text-or-champagne border-or-champagne/40">À utiliser avec retenue</span>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 max-w-sm gap-3 md:gap-4">
              {COULEURS.filter(c => c.groupe === "accent").map((color, i) => (
                <ColorCard key={color.hex} color={color} animDelay={i * 80} />
              ))}
            </div>
          </div>
        </div>

        {/* ══ RÈGLE ESSENTIELLE — synthèse en une ligne ════════════════ */}
        <motion.div
          ref={reglesRef}
          className="rounded-[3px] border border-gris-marbre bg-blanc-marbre px-6 md:px-8 py-5 flex flex-wrap items-baseline gap-x-6 gap-y-2"
          initial={{ opacity: 0, y: 16 }}
          animate={reglesIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="label-mm text-gris-texte/50 shrink-0">Règle absolue</span>
          <p className="font-sans text-ui text-gris-texte leading-relaxed">
            Toujours associer couleur et matière — jamais un aplat seul.
            {" "}<span className="text-gris-texte/50">L&apos;interdit spécifique de chaque couleur est visible en dépliant sa carte.</span>
          </p>
        </motion.div>

        {/* ══ CONCLUSION ════════════════════════════════════════════════ */}
        <motion.blockquote
          className="relative"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="border-l-2 border-or-champagne/40 pl-6">
            <p
              className="font-serif italic font-light text-noir-marquise text-balance"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
            >
              La palette Maison Marquise est une palette de matières avant d&apos;être une palette de couleurs :
              terracotta mate, crème douce, marbre clair, cuivre-or subtil et bois chaleureux.
            </p>
            <p className="mt-3 label-mm text-or-champagne tracking-[0.25em]">
              Règle d&apos;or · Maison Marquise
            </p>
          </div>
        </motion.blockquote>

      </div>

      <div className="line-gold w-full" aria-hidden="true" />
    </section>
  );
}

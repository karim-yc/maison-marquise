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
// ── Rendus texture en CSS pur — chaque matière a sa signature visuelle ────────
function getTextureStyle(type: string, hex: string): React.CSSProperties {
  switch (type) {

    case "cuivre-or":
      // Foil cuivre-or : reflets métalliques multidirectionnels + shimmer
      return {
        background: `
          linear-gradient(
            125deg,
            #3D1F0A 0%,
            #7A4520 8%,
            #C87840 16%,
            #F0B060 22%,
            #E8A050 28%,
            #B87040 36%,
            #7A4520 44%,
            #9A5830 50%,
            #D48840 57%,
            #F5C060 63%,
            #D09050 70%,
            #A06830 78%,
            #C07838 86%,
            #F0B050 92%,
            #B87840 100%
          )
        `,
        position: "relative" as const,
      };

    case "noyer":
      // Bois noyer : veinage horizontal chaleureux
      return {
        background: `
          repeating-linear-gradient(
            92deg,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.06) 3px,
            rgba(0,0,0,0.06) 4px,
            transparent 4px,
            transparent 9px,
            rgba(0,0,0,0.04) 9px,
            rgba(0,0,0,0.04) 10px
          ),
          repeating-linear-gradient(
            88deg,
            transparent 0px,
            transparent 20px,
            rgba(255,255,255,0.04) 20px,
            rgba(255,255,255,0.04) 22px
          ),
          linear-gradient(
            180deg,
            #5A3828 0%,
            #4A2E20 30%,
            #3E2418 60%,
            #4A2E20 80%,
            #5A3828 100%
          )
        `,
      };

    case "marbre":
      // Marbre clair : veines SVG inline
      return {
        background: `
          radial-gradient(ellipse 80% 60% at 30% 40%, rgba(200,185,165,0.25) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 70% 70%, rgba(180,165,145,0.15) 0%, transparent 50%),
          linear-gradient(135deg,
            #F8F3EA 0%,
            #F0EBE0 20%,
            #F5F0E8 40%,
            #EDE8DE 55%,
            #F8F3EA 70%,
            #F0EBE0 85%,
            #F8F3EA 100%
          )
        `,
        position: "relative" as const,
      };

    case "terracotta":
      // Papier mat terracotta : grain fin et chaleur mate
      return {
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='multiply' result='blend'/%3E%3CfeComposite in='blend' in2='SourceGraphic' operator='in'/%3E%3C/filter%3E%3Crect width='180' height='180' fill='%23A84F2A' filter='url(%23g)' opacity='0.18'/%3E%3C/svg%3E"),
          linear-gradient(145deg, #B85830 0%, #A84F2A 35%, #983A18 65%, #A84F2A 100%)
        `,
      };

    case "creme":
      // Papier crème : velours doux légèrement texturé
      return {
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='multiply'/%3E%3C/filter%3E%3Crect width='200' height='200' fill='%23F4E8D6' filter='url(%23g)' opacity='0.12'/%3E%3C/svg%3E"),
          linear-gradient(150deg, #FBF2E8 0%, #F4E8D6 40%, #EDE0CC 70%, #F4E8D6 100%)
        `,
      };

    case "beige":
      // Enduit mural : pierre / tadelakt
      return {
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='multiply'/%3E%3C/filter%3E%3Crect width='160' height='160' fill='%23D8C3A5' filter='url(%23g)' opacity='0.15'/%3E%3C/svg%3E"),
          linear-gradient(120deg, #E0CDB0 0%, #D8C3A5 45%, #C8B395 70%, #D8C3A5 100%)
        `,
      };

    case "noir-mat":
      // Noir mat : velours profond
      return {
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='multiply'/%3E%3C/filter%3E%3Crect width='150' height='150' fill='%231F1A17' filter='url(%23g)' opacity='0.1'/%3E%3C/svg%3E"),
          linear-gradient(135deg, #2A2420 0%, #1F1A17 40%, #151210 70%, #1F1A17 100%)
        `,
      };

    default:
      return { backgroundColor: hex };
  }
}

const COULEURS = [
  {
    name:      "Terracotta Marquise",
    hex:       "#A84F2A",
    textureType: "terracotta",
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
    textureType: "creme",
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
    textureType: "marbre",
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
    textureType: "beige",
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
    textureType: "cuivre-or",
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
    textureType: "noyer",
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
    textureType: "noir-mat",
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
        style={getTextureStyle(color.textureType, color.hex)}
        onClick={async () => { try { await navigator.clipboard.writeText(color.hex); } catch {} }}
        aria-label={`Copier HEX ${color.hex}`}
      >
        {/* Reflet shimmer cuivre-or */}
        {color.textureType === "cuivre-or" && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 30%, rgba(255,220,140,0.35) 50%, transparent 70%)",
              animation: "shimmer-cuivre 3s ease-in-out infinite",
            }}
          />
        )}
        {/* Veines marbre SVG */}
        {color.textureType === "marbre" && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,35 Q20,30 35,42 Q50,55 70,38 Q85,28 100,40" stroke="rgba(180,160,130,0.3)" strokeWidth="0.8" fill="none"/>
            <path d="M0,60 Q15,55 30,65 Q45,75 65,60 Q80,50 100,62" stroke="rgba(190,170,145,0.2)" strokeWidth="0.5" fill="none"/>
            <path d="M10,15 Q25,20 40,12 Q55,5 75,18 Q90,25 100,15" stroke="rgba(170,150,120,0.15)" strokeWidth="0.6" fill="none"/>
          </svg>
        )}
        {/* Veinage bois noyer */}
        {color.textureType === "noyer" && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,25 Q30,22 50,28 Q70,34 100,26" stroke="rgba(255,200,130,0.12)" strokeWidth="1.5" fill="none"/>
            <path d="M0,45 Q25,42 50,48 Q75,54 100,44" stroke="rgba(255,190,110,0.08)" strokeWidth="1" fill="none"/>
            <path d="M0,65 Q35,62 55,68 Q75,74 100,64" stroke="rgba(255,200,130,0.10)" strokeWidth="1.2" fill="none"/>
            <path d="M0,80 Q20,78 50,84 Q80,90 100,80" stroke="rgba(255,180,100,0.06)" strokeWidth="0.8" fill="none"/>
          </svg>
        )}
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

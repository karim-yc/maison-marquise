"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PackagingItem } from "@/lib/tokens";

// ─────────────────────────────────────────────────────────────────────────────
// PackagingMockupCard — Présente la direction DA d'un packaging.
// Contient : aperçu SVG stylisé, palette réduite, tagline, notes.
// ─────────────────────────────────────────────────────────────────────────────

interface PackagingMockupCardProps {
  item: PackagingItem;
  animDelay?: number;
  className?: string;
}

export function PackagingMockupCard({ item, animDelay = 0, className }: PackagingMockupCardProps) {
  const isTransparent = item.colors.bg === "transparent";

  return (
    <motion.div
      className={cn("card-mm group overflow-hidden flex flex-col", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: animDelay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Aperçu du packaging */}
      <div
        className={cn(
          "relative flex items-center justify-center min-h-52 md:min-h-64 overflow-hidden",
          isTransparent && "bg-gris-marbre/20",
        )}
        style={!isTransparent ? { backgroundColor: item.colors.bg } : {}}
        aria-label={`Maquette ${item.name}`}
        role="img"
      >
        {/* Rendu SVG selon le type de packaging */}
        <PackagingVisual item={item} />

        {/* Reflet subtil */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Informations */}
      <div className="p-5 md:p-6 space-y-4 flex-1">
        {/* Titre + desc */}
        <div>
          <span className="label-mm text-gris-texte">{item.desc}</span>
          <h3 className="font-serif text-d-sm font-light text-noir-marquise mt-1">
            {item.name}
          </h3>
        </div>

        {/* Palette réduite */}
        <div className="flex items-center gap-2">
          {Object.values(item.colors).map((hex, i) => (
            hex !== "transparent" && (
              <div
                key={i}
                className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: hex }}
                title={hex}
                aria-label={hex}
              />
            )
          ))}
        </div>

        {/* Tagline */}
        <p className="font-serif text-body-sm italic text-gris-texte">
          « {item.tagline} »
        </p>

        {/* Notes DA */}
        <div className="pt-3 border-t border-gris-marbre">
          <p className="label-mm text-gris-texte/60 mb-1.5">Notes DA</p>
          <p className="font-sans text-ui text-gris-texte leading-relaxed">
            {item.notes}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Visuel SVG selon le type ──────────────────────────────────────────────────
function PackagingVisual({ item }: { item: PackagingItem }) {
  const textColor = item.colors.text;
  const accentColor = item.colors.accent;
  const isTransparent = item.colors.bg === "transparent";

  if (item.id === "box-patisserie") {
    return (
      <svg viewBox="0 0 200 180" className="w-44 md:w-52 drop-shadow-lg" aria-hidden="true">
        {/* Boîte — vue légèrement inclinée */}
        {/* Face avant */}
        <rect x="30" y="55" width="140" height="100" rx="1.5"
          fill={item.colors.bg} stroke={accentColor} strokeWidth="0.8" />
        {/* Couvercle */}
        <rect x="25" y="30" width="150" height="30" rx="1.5"
          fill={item.colors.bg} stroke={accentColor} strokeWidth="0.8" />
        {/* Ombre portée */}
        <rect x="32" y="153" width="136" height="4" rx="2" fill="black" fillOpacity="0.06" />
        {/* Filet or sur le couvercle */}
        <line x1="40" y1="50" x2="160" y2="50" stroke={accentColor} strokeWidth="0.6" opacity="0.7" />
        {/* Monogramme M */}
        <text x="100" y="115" textAnchor="middle" fontFamily="serif"
          fontSize="36" fontWeight="300" fill={textColor} opacity="0.85" letterSpacing="-1">
          M
        </text>
        {/* Fine ligne or */}
        <line x1="60" y1="128" x2="140" y2="128" stroke={accentColor} strokeWidth="0.5" opacity="0.6" />
        {/* Tagline minuscule */}
        <text x="100" y="140" textAnchor="middle" fontFamily="sans-serif"
          fontSize="5" fill={textColor} opacity="0.45" letterSpacing="2">
          PRÉPARÉ AVEC SOIN
        </text>
        {/* Tab du couvercle */}
        <rect x="85" y="24" width="30" height="8" rx="1"
          fill={item.colors.bg} stroke={accentColor} strokeWidth="0.6" />
      </svg>
    );
  }

  if (item.id === "cup-iced") {
    return (
      <svg viewBox="0 0 120 180" className="w-28 md:w-36 drop-shadow-md" aria-hidden="true">
        {/* Cup transparent - corps */}
        <path d="M20 35 L30 160 Q35 168 60 168 Q85 168 90 160 L100 35 Z"
          fill="rgba(247,243,236,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        {/* Contenu visible (la boisson) */}
        <path d="M25 80 L32 160 Q37 168 60 168 Q83 168 88 160 L95 80 Z"
          fill={`${accentColor}35`} />
        {/* Bande centrale semi-opaque */}
        <path d="M22 90 L26 130 Q31 136 60 136 Q89 136 94 130 L98 90 Z"
          fill={`${accentColor}55`} />
        {/* Logo sur la bande */}
        <text x="60" y="118" textAnchor="middle" fontFamily="serif"
          fontSize="11" fontWeight="300" fill={textColor} letterSpacing="0.5">
          Maison Marquise
        </text>
        {/* Glaçons stylisés */}
        <rect x="40" y="95" width="12" height="12" rx="1" fill="rgba(255,255,255,0.5)" transform="rotate(-8 46 101)" />
        <rect x="62" y="88" width="14" height="14" rx="1" fill="rgba(255,255,255,0.45)" transform="rotate(5 69 95)" />
        {/* Couvercle */}
        <ellipse cx="60" cy="35" rx="40" ry="7"
          fill="rgba(247,243,236,0.4)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
        {/* Paille */}
        <rect x="72" y="10" width="4" height="50" rx="2"
          fill={accentColor} opacity="0.7" />
      </svg>
    );
  }

  // Cup coffee & cup latte — forme similaire, couleurs différentes
  const isCoffee = item.id === "cup-coffee";
  return (
    <svg viewBox="0 0 120 180" className="w-28 md:w-36 drop-shadow-lg" aria-hidden="true">
      {/* Corps du cup */}
      <path d="M18 42 L28 158 Q33 166 60 166 Q87 166 92 158 L102 42 Z"
        fill={item.colors.bg} stroke={accentColor} strokeWidth="0.7" />
      {/* Ombre légère en bas */}
      <ellipse cx="60" cy="166" rx="32" ry="4" fill="black" fillOpacity="0.07" />
      {/* Bande couleur si latte */}
      {!isCoffee && (
        <path d="M20 95 L26 145 Q31 153 60 153 Q89 153 94 145 L100 95 Z"
          fill={`${accentColor}20`} />
      )}
      {/* Logo / monogramme */}
      <text x="60" y="100" textAnchor="middle" fontFamily="serif"
        fontSize="18" fontWeight="300" fill={textColor} opacity="0.82" letterSpacing="0">
        MM
      </text>
      {/* Courbe décorative (latte) */}
      {!isCoffee && (
        <path d="M30 118 Q60 108 90 118" stroke={accentColor} strokeWidth="0.7" fill="none" opacity="0.5" />
      )}
      {/* Tagline */}
      <text x="60" y="130" textAnchor="middle" fontFamily="sans-serif"
        fontSize="4.5" fill={textColor} opacity="0.4" letterSpacing="1.8">
        {isCoffee ? "PRÉPARÉ AVEC SOIN" : "UNE PAUSE DOUCE"}
      </text>
      {/* Couvercle */}
      <ellipse cx="60" cy="42" rx="42" ry="9"
        fill={item.colors.bg} stroke={accentColor} strokeWidth="0.7" />
      {/* Rabat couvercle */}
      <path d="M45 35 Q60 28 75 35" stroke={accentColor} strokeWidth="0.6" fill="none" opacity="0.6" />
    </svg>
  );
}

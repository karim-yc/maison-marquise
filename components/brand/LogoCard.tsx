"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// LogoCard — Présente une déclinaison du logo sur un fond donné.
// Inclut la zone de respiration visualisée et le label de la variante.
// Note : remplacer le contenu par les assets SVG officiels dès réception.
// ─────────────────────────────────────────────────────────────────────────────

export interface LogoCardProps {
  /** Intitulé de la déclinaison */
  variant: string;
  /** Description courte */
  desc?: string;
  /** Fond de la carte */
  bg: "white" | "ivory" | "dark" | "gold";
  /** Afficher la grille de zone de respiration au hover */
  showClearSpace?: boolean;
  animDelay?: number;
  className?: string;
  children: React.ReactNode; // Le logo lui-même (SVG, texte, image)
}

const bgStyles: Record<LogoCardProps["bg"], string> = {
  white: "bg-blanc-marbre border border-gris-marbre",
  ivory: "bg-ivoire-maison border border-gris-marbre",
  dark:  "bg-noir-marquise border border-or-champagne/20",
  gold:  "bg-or-champagne border border-or-champagne",
};

const labelStyles: Record<LogoCardProps["bg"], string> = {
  white: "text-gris-texte border-gris-marbre",
  ivory: "text-gris-texte border-gris-marbre",
  dark:  "text-gris-marbre border-or-champagne/20",
  gold:  "text-blanc-marbre border-blanc-marbre/30",
};

export function LogoCard({
  variant,
  desc,
  bg,
  showClearSpace = true,
  animDelay = 0,
  className,
  children,
}: LogoCardProps) {
  return (
    <motion.div
      className={cn("rounded-[3px] overflow-hidden flex flex-col", bgStyles[bg], className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: animDelay / 1000, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Zone logo — hauteur fixe pour alignement des cartes */}
      <div className={cn(
        "relative group flex items-center justify-center",
        "min-h-40 md:min-h-48 p-8 flex-1",
      )}>
        {/* Grille de zone de respiration (hover) */}
        {showClearSpace && (
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400",
              "pointer-events-none",
            )}
            aria-hidden="true"
          >
            {/* Bordures de clearance */}
            <div className={cn(
              "absolute border border-dashed",
              "inset-[clamp(1rem,3vw,2rem)]",
              bg === "dark" ? "border-or-champagne/25" : "border-or-champagne/30",
            )} />
            {/* Label clearance */}
            <span className={cn(
              "absolute top-2 right-3 font-sans text-[0.55rem] tracking-widest uppercase",
              bg === "dark" ? "text-or-champagne/50" : "text-or-champagne/60",
            )}>
              Zone de respiration
            </span>
          </div>
        )}

        {/* Contenu logo */}
        <div className="relative z-raised">
          {children}
        </div>
      </div>

      {/* Label de variante */}
      <div className={cn(
        "px-5 py-3 border-t flex items-center justify-between gap-2",
        labelStyles[bg],
      )}>
        <span className="label-mm text-inherit">{variant}</span>
        {desc && (
          <span className={cn("font-sans text-[0.65rem] opacity-70", bg === "dark" ? "text-gris-marbre" : "text-gris-texte")}>
            {desc}
          </span>
        )}
      </div>
    </motion.div>
  );
}

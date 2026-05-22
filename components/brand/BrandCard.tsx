"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// BrandCard — Carte générique du design system Marquise
// Variantes : default (gris), gold (or), dark (noir), ghost (transparent)
// Prend en charge label, titre, contenu et animation d'entrée au scroll.
// ─────────────────────────────────────────────────────────────────────────────

export interface BrandCardProps {
  /** Variante visuelle */
  variant?: "default" | "gold" | "dark" | "ghost";
  /** Label Montserrat espacé au-dessus du titre */
  label?: string;
  /** Titre Cormorant */
  title?: string;
  /** Sous-titre Montserrat */
  subtitle?: string;
  /** Délai d'animation pour stagger (ms) */
  animDelay?: number;
  /** Désactiver l'animation d'entrée */
  noAnim?: boolean;
  /** Désactiver le hover lift */
  noHover?: boolean;
  className?: string;
  children?: React.ReactNode;
  /** Props HTML passthrough */
  onClick?: () => void;
}

const variantStyles = {
  default: "card-mm shadow-sm hover:shadow-md",
  gold:    "card-mm-gold hover:shadow-gold",
  dark:    "card-mm-dark",
  ghost:   "bg-transparent border border-gris-marbre/50 rounded-[3px]",
};

export function BrandCard({
  variant = "default",
  label,
  title,
  subtitle,
  animDelay = 0,
  noAnim = false,
  noHover = false,
  className,
  children,
  onClick,
}: BrandCardProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const isDark = variant === "dark";

  const inner = (
    <div
      ref={noAnim ? ref : undefined}
      className={cn(
        "relative overflow-hidden transition-all duration-400",
        variantStyles[variant],
        !noHover && "group cursor-default",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      {children && (
        <div className="p-6 md:p-8">
          {(label || title || subtitle) && (
            <div className="mb-5 space-y-2">
              {label && (
                <span className={cn("label-mm", isDark && "text-gris-marbre")}>
                  {label}
                </span>
              )}
              {title && (
                <h3 className={cn(
                  "font-serif text-d-sm font-light",
                  isDark ? "text-ivoire-maison" : "text-noir-marquise",
                )}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={cn(
                  "font-sans text-ui-lg",
                  isDark ? "text-gris-marbre" : "text-gris-texte",
                )}>
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      )}

      {/* Trait or sur le bord gauche au hover (variante default/ghost) */}
      {!isDark && !noHover && (
        <div
          className="absolute left-0 top-6 bottom-6 w-px bg-or-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          aria-hidden="true"
        />
      )}
    </div>
  );

  if (noAnim) return inner;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: animDelay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {inner}
    </motion.div>
  );
}

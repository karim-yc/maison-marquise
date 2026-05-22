"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/tokens";

// ─────────────────────────────────────────────────────────────────────────────
// TypographySample — Spécimen typographique complet
// Affiche le nom, la catégorie, l'usage, le spécimen en grand,
// et toutes les déclinaisons de graisse.
// ─────────────────────────────────────────────────────────────────────────────

type FontKey = keyof typeof typography.fonts;

interface TypographySampleProps {
  family: FontKey;
  /** Texte d'exemple personnalisé */
  sample?: string;
  /** Fond de la carte */
  bg?: "white" | "ivory" | "dark";
  animDelay?: number;
  className?: string;
}

const bgStyles = {
  white: "bg-blanc-marbre border border-gris-marbre",
  ivory: "bg-ivoire-maison border border-gris-marbre",
  dark:  "bg-noir-marquise border border-or-champagne/20",
};

const fontClasses: Record<FontKey, string> = {
  serif:  "font-serif",
  sans:   "font-sans",
  script: "font-script",
};

export function TypographySample({
  family,
  sample,
  bg = "ivory",
  animDelay = 0,
  className,
}: TypographySampleProps) {
  const config   = typography.fonts[family];
  const fontClass = fontClasses[family];
  const text     = sample ?? typography.specimen[family];
  const isDark   = bg === "dark";

  return (
    <motion.article
      className={cn("rounded-[3px] overflow-hidden", bgStyles[bg], className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: animDelay / 1000, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`Spécimen typographique : ${config.name}`}
    >
      {/* En-tête */}
      <div className={cn(
        "px-6 md:px-8 pt-6 pb-5 border-b",
        isDark ? "border-or-champagne/15" : "border-gris-marbre",
      )}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className={cn(
              "font-sans text-ui-lg font-medium tracking-wide",
              isDark ? "text-ivoire-maison" : "text-noir-marquise",
            )}>
              {config.name}
            </h3>
            <p className={cn("label-mm mt-0.5", isDark && "text-gris-marbre/70")}>
              {family === "serif" ? "Serif" : family === "sans" ? "Sans-serif" : "Script"}
            </p>
          </div>
          <p className={cn(
            "font-sans text-ui max-w-[28ch] text-right leading-snug",
            isDark ? "text-gris-marbre" : "text-gris-texte",
          )}>
            {config.role}
          </p>
        </div>
      </div>

      {/* Spécimen principal */}
      <div className="px-6 md:px-8 py-8 md:py-10">
        <p
          className={cn(
            "font-light leading-none text-balance",
            fontClass,
            family === "script" ? "text-d-xl" : "text-d-lg",
            isDark ? "text-ivoire-maison" : "text-noir-marquise",
          )}
          lang="fr"
        >
          {text}
        </p>

        {/* Alphabet + chiffres (sauf script) */}
        {family !== "script" && (
          <p className={cn(
            "mt-6 font-sans text-ui tracking-wider",
            isDark ? "text-gris-marbre/50" : "text-gris-marbre",
            fontClass,
          )}>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
          </p>
        )}
      </div>

      {/* Déclinaisons de graisse */}
      <div className={cn(
        "px-6 md:px-8 pb-6 md:pb-8 border-t",
        isDark ? "border-or-champagne/15" : "border-gris-marbre",
      )}>
        <p className={cn("label-mm pt-5 pb-4", isDark && "text-gris-marbre/70")}>
          Déclinaisons
        </p>
        <div className="space-y-3">
          {config.weights.map((w) => (
            <div
              key={w.value}
              className={cn("flex items-baseline gap-4 md:gap-6", isDark ? "text-ivoire-maison" : "text-noir-marquise")}
            >
              {/* Label de graisse */}
              <span className={cn(
                "label-mm shrink-0 w-24",
                isDark ? "text-gris-marbre/60" : "text-gris-texte/60",
              )}>
                {w.label}
              </span>

              {/* Spécimen à cette graisse */}
              <span
                className={cn("text-d-sm leading-snug", fontClass)}
                style={{ fontWeight: w.value, fontStyle: "italic" in w && w.italic ? "italic" : "normal" }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Règle d'usage spécifique */}
        {family === "script" && (
          <div className={cn(
            "mt-5 pt-5 border-t flex items-start gap-2",
            isDark ? "border-or-champagne/15" : "border-gris-marbre",
          )}>
            <span className="text-or-champagne mt-0.5" aria-hidden="true">⚠</span>
            <p className={cn("font-sans text-ui leading-snug", isDark ? "text-gris-marbre" : "text-gris-texte")}>
              Usage exclusif — signature, packaging et accroche poétique uniquement.
              Ne jamais utiliser en bloc de texte courant.
            </p>
          </div>
        )}
      </div>
    </motion.article>
  );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FormulaItem } from "@/lib/tokens";

// ─────────────────────────────────────────────────────────────────────────────
// FormulaCard — Carte menu Maison Marquise
// Respecte exactement la structure officielle du brief :
// 1. Nom · 2. Prix · 3. Contenu · 4. Inclus · 5. Supplément
// ─────────────────────────────────────────────────────────────────────────────

interface FormulaCardProps {
  formula: FormulaItem;
  /** Variante sombre pour contraste */
  dark?: boolean;
  animDelay?: number;
  className?: string;
}

export function FormulaCard({ formula, dark = false, animDelay = 0, className }: FormulaCardProps) {
  return (
    <motion.article
      className={cn(
        "relative overflow-hidden rounded-[3px] flex flex-col",
        dark
          ? "bg-noir-marquise border border-or-champagne/25"
          : "bg-ivoire-maison border border-gris-marbre",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: animDelay / 1000, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`${formula.name} — ${formula.price}`}
    >
      {/* Filet or en haut */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, #B99A5F, transparent)" }}
        aria-hidden="true"
      />

      <div className="p-6 md:p-8 flex flex-col gap-6 flex-1">

        {/* 1. Nom de la formule */}
        <header className="space-y-1">
          <span className={cn("label-mm", dark ? "text-or-champagne" : "text-gris-texte")}>
            Formule
          </span>
          <h3 className={cn(
            "font-serif text-d-md font-light tracking-tight",
            dark ? "text-ivoire-maison" : "text-noir-marquise",
          )}>
            {/* Enlève "Formule " du nom pour éviter la répétition */}
            {formula.name.replace(/^Formule\s+/i, "")}
          </h3>
        </header>

        {/* 2. Prix */}
        <div className="flex items-end gap-2">
          <span className={cn("price-mm", dark ? "text-or-champagne" : "text-noir-marquise")}>
            {formula.price}
          </span>
        </div>

        {/* Séparateur */}
        <div
          className={cn("h-px w-full", dark ? "bg-or-champagne/15" : "bg-gris-marbre")}
          aria-hidden="true"
        />

        {/* 3. Contenu principal — choix */}
        <div className="space-y-2">
          <p className={cn("label-mm", dark ? "text-gris-marbre/60" : "text-gris-texte/60")}>
            Au choix
          </p>
          <ul className={cn("space-y-1")} role="list">
            {formula.choices.map((choice) => (
              <li
                key={choice}
                className={cn(
                  "flex items-center gap-2 font-sans text-body-sm",
                  dark ? "text-ivoire-maison" : "text-noir-marquise",
                )}
              >
                <span
                  className="w-1 h-1 rounded-full bg-or-champagne shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                {choice}
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Inclus dans la formule */}
        <div className="space-y-2">
          <p className={cn("label-mm", dark ? "text-gris-marbre/60" : "text-gris-texte/60")}>
            Inclus
          </p>
          <ul className="space-y-1" role="list">
            {formula.included.map((item) => (
              <li
                key={item}
                className={cn(
                  "flex items-center gap-2 font-sans text-ui-lg",
                  dark ? "text-gris-marbre" : "text-gris-texte",
                )}
              >
                <span
                  className={cn(
                    "text-[0.5rem] leading-none shrink-0",
                    dark ? "text-or-champagne" : "text-or-champagne",
                  )}
                  aria-hidden="true"
                >
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 5. Supplément éventuel */}
        {formula.supplement && (
          <div
            className={cn(
              "mt-auto pt-4 border-t flex items-start gap-2",
              dark ? "border-or-champagne/15" : "border-gris-marbre",
            )}
          >
            <span className="chip-mm chip-mm-gold text-or-champagne border-or-champagne/40 text-[0.6rem] shrink-0">
              Option
            </span>
            <p className={cn(
              "font-sans text-ui leading-snug",
              dark ? "text-gris-marbre" : "text-gris-texte",
            )}>
              {formula.supplement}
            </p>
          </div>
        )}
      </div>

      {/* Motif M discret en fond */}
      <div
        className={cn(
          "absolute -bottom-4 -right-4 font-serif text-[8rem] font-light leading-none select-none pointer-events-none",
          dark ? "text-or-champagne/4" : "text-noir-marquise/4",
        )}
        aria-hidden="true"
      >
        M
      </div>
    </motion.article>
  );
}

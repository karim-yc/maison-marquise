"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PaletteEntry } from "@/lib/tokens";

// ─────────────────────────────────────────────────────────────────────────────
// ColorSwatch — Échantillon couleur interactif
// Affiche hex, token, CMJN, usage. Copie le hex au clic.
// ─────────────────────────────────────────────────────────────────────────────

interface ColorSwatchProps {
  color: PaletteEntry;
  size?: "sm" | "md" | "lg";
  /** Forcer un fond sombre sous la pastille */
  darkBg?: boolean;
  animDelay?: number;
  className?: string;
}

const sizeMap = {
  sm: { swatch: "h-16",      gap: "gap-2.5", title: "text-ui-lg", meta: "text-[0.6rem]" },
  md: { swatch: "h-24",      gap: "gap-3",   title: "text-ui-lg", meta: "text-[0.65rem]" },
  lg: { swatch: "h-32 md:h-40", gap: "gap-3", title: "text-body-sm", meta: "text-ui" },
};

export function ColorSwatch({
  color,
  size = "md",
  darkBg = false,
  animDelay = 0,
  className,
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);
  const s = sizeMap[size];

  // Détermine si le texte sur le swatch doit être clair ou sombre
  const isLight = isLightColor(color.hex);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silencieux
    }
  }, [color.hex]);

  return (
    <motion.div
      className={cn("group flex flex-col", s.gap, className)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: animDelay / 1000, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Pastille couleur */}
      <button
        className={cn(
          "relative w-full rounded-[3px] overflow-hidden",
          "border border-black/8",
          "transition-transform duration-300 group-hover:scale-[1.02]",
          "focus-visible:outline-2 focus-visible:outline-or-champagne focus-visible:outline-offset-2",
          s.swatch,
          darkBg && "outline outline-1 outline-white/10",
        )}
        style={{ backgroundColor: color.hex }}
        onClick={handleCopy}
        aria-label={`Copier ${color.hex} — ${color.name}`}
        title={`Cliquer pour copier ${color.hex}`}
      >
        {/* Overlay copie */}
        <AnimatePresence>
          {copied ? (
            <motion.div
              key="check"
              className={cn(
                "absolute inset-0 flex items-center justify-center gap-1.5",
                "bg-black/20 backdrop-blur-[1px]",
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Check
                size={14}
                className={isLight ? "text-noir-marquise" : "text-ivoire-maison"}
                strokeWidth={2.5}
              />
              <span className={cn(
                "font-sans text-[0.625rem] font-medium tracking-wider",
                isLight ? "text-noir-marquise" : "text-ivoire-maison",
              )}>
                Copié
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10"
              initial={false}
            >
              <Copy
                size={13}
                className={isLight ? "text-noir-marquise/70" : "text-ivoire-maison/80"}
                strokeWidth={1.5}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Informations */}
      <div className="space-y-1">
        <p className={cn("font-sans font-medium text-noir-marquise leading-tight", s.title)}>
          {color.name}
        </p>
        <p className="font-mono text-[0.65rem] tracking-wide text-gris-texte">
          {color.hex}
        </p>
        {"cmyk" in color && (
          <p className={cn("font-sans text-gris-texte/70 leading-snug", s.meta)}>
            {color.cmyk}
          </p>
        )}
        {"usage" in color && size === "lg" && (
          <p className="font-sans text-[0.7rem] text-gris-texte leading-snug mt-1.5">
            {color.usage}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Retourne true si la couleur est suffisamment claire pour du texte sombre */
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Luminance relative approximée
  return (0.299 * r + 0.587 * g + 0.114 * b) > 160;
}

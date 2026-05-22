"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// BrandSection — Conteneur de section pour le brandbook
// Gère : numérotation magazine, titre, intro, animation d'entrée, fond.
// ─────────────────────────────────────────────────────────────────────────────

export interface BrandSectionProps {
  /** Index affiché en grand chiffre Cormorant (ex: "01") */
  index?: string;
  /** Label Montserrat espacé au-dessus du titre */
  label?: string;
  /** Titre principal — Cormorant */
  title: string;
  /** Sous-titre / intro en Montserrat */
  intro?: string;
  /** Fond de section */
  bg?: "white" | "ivory" | "dark" | "transparent";
  /** Ajouter un séparateur or en haut */
  topLine?: boolean;
  /** Ajouter un séparateur or en bas */
  bottomLine?: boolean;
  /** Classes additionnelles sur le wrapper */
  className?: string;
  children?: React.ReactNode;
  /** ID pour l'ancre de navigation */
  id?: string;
}

const bgMap = {
  white:       "bg-blanc-marbre",
  ivory:       "bg-ivoire-maison",
  dark:        "bg-noir-marquise text-ivoire-maison",
  transparent: "bg-transparent",
};

export function BrandSection({
  index,
  label,
  title,
  intro,
  bg = "white",
  topLine = false,
  bottomLine = false,
  className,
  children,
  id,
}: BrandSectionProps) {
  const ref   = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const isDark = bg === "dark";

  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative w-full", bgMap[bg], className)}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      {/* Ligne or supérieure */}
      {topLine && <div className="line-gold w-full" aria-hidden="true" />}

      <div className="container-mm py-section">

        {/* En-tête de section */}
        <header className="mb-12 md:mb-16 lg:mb-20 max-w-3xl">

          {/* Numérotation magazine + label */}
          <div className="flex items-start gap-4 mb-4">
            {index && (
              <motion.span
                className={cn("section-number select-none", isDark && "text-gris-marbre/30")}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                aria-hidden="true"
              >
                {index}
              </motion.span>
            )}
            {label && (
              <motion.div
                className="pt-3"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className={cn("label-mm", isDark && "text-gris-marbre")}>
                  {label}
                </span>
              </motion.div>
            )}
          </div>

          {/* Titre */}
          <motion.h2
            id={id ? `${id}-title` : undefined}
            className={cn(
              "font-serif text-d-lg font-light text-balance",
              isDark ? "text-ivoire-maison" : "text-noir-marquise",
            )}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
          </motion.h2>

          {/* Filet or sous le titre */}
          {!index && (
            <motion.div
              className="line-gold-l mt-5 mb-0 w-20"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
              aria-hidden="true"
            />
          )}

          {/* Intro */}
          {intro && (
            <motion.p
              className={cn(
                "mt-6 font-sans text-body-lg leading-relaxed max-w-reading",
                isDark ? "text-gris-marbre" : "text-gris-texte",
              )}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              {intro}
            </motion.p>
          )}
        </header>

        {/* Contenu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      </div>

      {/* Ligne or inférieure */}
      {bottomLine && <div className="line-gold w-full" aria-hidden="true" />}
    </section>
  );
}

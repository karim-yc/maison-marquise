"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// GuidelineCard — Règle d'usage avec indicateur ✓ / ✗
// Utilisé dans les sections Dos & Don'ts, règles logo, ton de voix.
// ─────────────────────────────────────────────────────────────────────────────

export interface GuidelineCardProps {
  type: "do" | "dont";
  title: string;
  description?: string;
  animDelay?: number;
  className?: string;
  children?: React.ReactNode;
}

export function GuidelineCard({
  type,
  title,
  description,
  animDelay = 0,
  className,
  children,
}: GuidelineCardProps) {
  const isDo   = type === "do";

  return (
    <motion.div
      className={cn(
        "rounded-[3px] overflow-hidden border-l-2",
        isDo
          ? "bg-ivoire-maison border-l-[#9A9B55] border border-gris-marbre"
          : "bg-ivoire-maison border-l-framboise border border-gris-marbre",
        className,
      )}
      initial={{ opacity: 0, x: isDo ? -16 : 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: animDelay / 1000, ease: [0.25, 0.46, 0.45, 0.94] }}
      role="article"
      aria-label={`${isDo ? "À faire" : "À éviter"} : ${title}`}
    >
      <div className="p-5 md:p-6 space-y-3">
        {/* En-tête */}
        <div className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0" aria-hidden="true">
            {isDo
              ? <CheckCircle2 size={17} className="text-pistache" strokeWidth={1.8} />
              : <XCircle     size={17} className="text-framboise" strokeWidth={1.8} />
            }
          </span>
          <div>
            <span className={cn(
              "label-mm",
              isDo ? "text-pistache" : "text-framboise",
            )}>
              {isDo ? "À faire" : "À éviter"}
            </span>
            <p className="font-serif text-d-sm font-light text-noir-marquise mt-1 leading-snug">
              {title}
            </p>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="font-sans text-ui text-gris-texte leading-relaxed pl-8">
            {description}
          </p>
        )}

        {/* Contenu libre (exemples visuels, citations…) */}
        {children && (
          <div className="pl-8">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}

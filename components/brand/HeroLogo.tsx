// ─────────────────────────────────────────────────────────────────────────────
// HeroLogo — Affiche le logo officiel Maison Marquise.
// Utilise les SVGs vectoriels officiels récupérés depuis le Drive.
//
// Pour changer la variante, modifier la prop `variant` :
//   "full"    → LOGO_1 (mark + baseline)
//   "variant" → LOGO_2 (variante mark)
//   "monogram"→ FAVICON (M seul)
// ─────────────────────────────────────────────────────────────────────────────

import { cn } from "@/lib/utils";
import { LogoFull, LogoVariant, LogoMonogram } from "./LogoSvg";

interface HeroLogoProps {
  variant?: "full" | "variant" | "monogram";
  /** Couleur via Tailwind text-* (ex: "text-noir-marquise") */
  colorClass?: string;
  className?: string;
}

export function HeroLogo({
  variant = "full",
  colorClass = "text-noir-marquise",
  className,
}: HeroLogoProps) {
  const shared = {
    className: cn(colorClass, "w-full h-auto"),
  };

  return (
    <div className={cn("w-full", className)}>
      {variant === "full"     && <LogoFull     {...shared} aria-label="Maison Marquise — logo officiel" />}
      {variant === "variant"  && <LogoVariant  {...shared} aria-label="Maison Marquise" />}
      {variant === "monogram" && <LogoMonogram {...shared} aria-label="M — Maison Marquise" />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroLogo — Affiche le logo officiel ou un placeholder propre et documenté.
//
// Pour remplacer le placeholder par le logo officiel :
//   1. Déposer le fichier SVG dans /public/assets/logo-full.svg
//   2. Changer LOGO_SRC ci-dessous de "placeholder" → "official"
//   3. Supprimer la bannière <PlaceholderBanner /> si souhaité
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { cn } from "@/lib/utils";

// ← Passer à "official" dès que les assets sont déposés dans /public/assets/
const LOGO_MODE: "placeholder" | "official" = "placeholder";

const LOGO_PATHS = {
  full:        "/assets/logo-full.svg",          // logo complet + baseline
  noBaseline:  "/assets/logo-no-baseline.svg",   // sans baseline
  monogram:    "/assets/logo-monogram.svg",       // M seul
  // Placeholders de développement
  _full:       "/assets/logo-placeholder-full.svg",
  _noBaseline: "/assets/logo-placeholder-no-baseline.svg",
  _monogram:   "/assets/logo-placeholder-monogram.svg",
} as const;

interface HeroLogoProps {
  variant?: "full" | "noBaseline" | "monogram";
  className?: string;
  /** Largeur intrinsèque pour next/image (en px) */
  width?: number;
}

export function HeroLogo({ variant = "full", className, width = 400 }: HeroLogoProps) {
  const isOfficial = LOGO_MODE === "official";

  const src = isOfficial
    ? LOGO_PATHS[variant]
    : LOGO_PATHS[`_${variant}` as keyof typeof LOGO_PATHS];

  const heightMap = { full: 133, noBaseline: 100, monogram: 100 };
  const height = Math.round((width / { full: 3, noBaseline: 4, monogram: 1 }[variant]));

  return (
    <div className={cn("relative flex flex-col items-center gap-3", className)}>
      {/* Bannière placeholder — se retire quand le logo officiel est fourni */}
      {!isOfficial && <PlaceholderBanner variant={variant} />}

      {/* Image logo */}
      <Image
        src={src}
        alt={
          variant === "monogram"
            ? "M — Monogramme Maison Marquise"
            : "Maison Marquise" + (variant === "full" ? " — Bien plus qu'une boulangerie" : "")
        }
        width={width}
        height={heightMap[variant]}
        priority
        className="w-full h-auto"
        style={{ maxWidth: width }}
      />
    </div>
  );
}

// Bannière signalant le placeholder
function PlaceholderBanner({ variant }: { variant: string }) {
  const fileMap: Record<string, string> = {
    full:       "/public/assets/logo-full.svg",
    noBaseline: "/public/assets/logo-no-baseline.svg",
    monogram:   "/public/assets/logo-monogram.svg",
  };

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 border border-caramel/40 bg-caramel/5 rounded-[2px]"
      role="note"
      aria-label="Logo placeholder — à remplacer"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-caramel shrink-0" aria-hidden="true" />
      <p className="font-sans text-[0.6rem] font-medium tracking-[0.15em] uppercase text-caramel">
        Placeholder · Déposer le logo ici : <code className="font-mono normal-case tracking-normal">{fileMap[variant]}</code>
      </p>
    </div>
  );
}

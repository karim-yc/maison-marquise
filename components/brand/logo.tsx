import { cn } from "@/lib/utils";

interface LogoProps {
  /**
   * Déclinaison du logo :
   * - "full"       : signature script + ligne or + baseline
   * - "no-baseline": signature script + ligne or (sans baseline)
   * - "monogram"   : lettre M seule
   * - "horizontal" : signature script + baseline sur une ligne
   */
  variant?: "full" | "no-baseline" | "monogram" | "horizontal";
  size?: "sm" | "md" | "lg" | "xl";
  /** Couleur du texte – adapte logo sur fond sombre */
  tone?: "dark" | "light" | "gold";
  className?: string;
}

const sizeMap = {
  sm: { script: "text-2xl",  label: "text-[0.5rem]",  mono: "text-3xl"  },
  md: { script: "text-4xl",  label: "text-[0.6rem]",  mono: "text-5xl"  },
  lg: { script: "text-6xl",  label: "text-[0.7rem]",  mono: "text-7xl"  },
  xl: { script: "text-8xl",  label: "text-[0.8rem]",  mono: "text-9xl"  },
};

const toneMap = {
  dark:  { script: "text-noir-marquise", label: "text-gris-texte", line: "via-or-champagne" },
  light: { script: "text-blanc-marbre",  label: "text-gris-marbre", line: "via-blanc-marbre" },
  gold:  { script: "text-or-champagne",  label: "text-or-champagne/70", line: "via-or-champagne" },
};

/**
 * Composant logo Maison Marquise.
 * ⚠️  Ce composant est une représentation textuelle provisoire.
 * Remplacer par les assets SVG officiels dès réception.
 */
export function Logo({ variant = "full", size = "md", tone = "dark", className }: LogoProps) {
  const s = sizeMap[size];
  const t = toneMap[tone];

  if (variant === "monogram") {
    return (
      <span
        className={cn("font-script leading-none", s.mono, t.script, className)}
        aria-label="Maison Marquise – monogramme M"
        role="img"
      >
        M
      </span>
    );
  }

  if (variant === "horizontal") {
    return (
      <div
        className={cn("inline-flex items-center gap-3", className)}
        aria-label="Maison Marquise – Bien plus qu'une boulangerie"
        role="img"
      >
        <span className={cn("font-script leading-none", s.script, t.script)}>
          Maison Marquise
        </span>
        <span className={cn("w-px h-4 bg-current opacity-30", t.script)} aria-hidden="true" />
        <span className={cn("label-brand", t.label)}>
          Bien plus qu'une boulangerie
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-col items-center gap-1", className)}
      aria-label="Maison Marquise – Bien plus qu'une boulangerie"
      role="img"
    >
      {/* Signature script */}
      <span className={cn("font-script leading-none", s.script, t.script)}>
        Maison Marquise
      </span>

      {/* Filet or */}
      <span
        className={cn("block w-full h-px bg-gradient-to-r from-transparent to-transparent opacity-50", t.line)}
        aria-hidden="true"
      />

      {/* Baseline officielle */}
      {variant === "full" && (
        <span className={cn("label-brand tracking-[0.25em] mt-0.5", s.label, t.label)}>
          Bien plus qu'une boulangerie
        </span>
      )}
    </div>
  );
}

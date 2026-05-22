import { cn } from "@/lib/utils";

interface TypeSpecimenProps {
  /** Famille de police */
  family: "serif" | "sans" | "script";
  /** Texte d'exemple (pangram ou extrait de marque) */
  sample?: string;
  className?: string;
}

const familyConfig = {
  serif: {
    className: "font-serif",
    label: "Cormorant Garamond",
    category: "Serif — Élégance & Prestige",
    weights: ["font-light", "font-normal", "font-medium", "font-semibold"] as const,
    weightLabels: ["Light 300", "Regular 400", "Medium 500", "SemiBold 600"],
    defaultSample: "L'art de sublimer l'instant",
  },
  sans: {
    className: "font-sans",
    label: "Montserrat",
    category: "Sans-serif — Clarté & Modernité",
    weights: ["font-light", "font-normal", "font-medium", "font-semibold"] as const,
    weightLabels: ["Light 300", "Regular 400", "Medium 500", "SemiBold 600"],
    defaultSample: "Une signature d'exception",
  },
  script: {
    className: "font-script",
    label: "Parisienne",
    category: "Script — Signature & Poésie",
    weights: ["font-normal"] as const,
    weightLabels: ["Regular 400"],
    defaultSample: "Maison Marquise",
  },
};

/**
 * Présente un spécimen typographique avec variantes de graisse.
 * Utilisé dans la section typographie de la charte.
 */
export function TypeSpecimen({ family, sample, className }: TypeSpecimenProps) {
  const config = familyConfig[family];
  const text = sample ?? config.defaultSample;

  return (
    <article className={cn("space-y-4 p-6 border border-stone-200 bg-ivory", className)}>
      {/* En-tête */}
      <header className="space-y-1">
        <h3 className="font-sans text-sm font-medium text-charcoal">
          {config.label}
        </h3>
        <p className="label-brand text-brand-muted">{config.category}</p>
      </header>

      {/* Spécimen en taille display */}
      <p
        className={cn("text-4xl text-charcoal leading-tight", config.className)}
        lang="fr"
      >
        {text}
      </p>

      {/* Grille des graisses */}
      <div className="border-t border-stone-200 pt-4 space-y-2">
        {config.weights.map((weight, i) => (
          <div key={weight} className="flex items-baseline gap-4">
            <span className="label-brand w-24 shrink-0 text-brand-muted">
              {config.weightLabels[i]}
            </span>
            <span className={cn("text-lg text-charcoal", config.className, weight)}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

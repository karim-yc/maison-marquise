import { cn } from "@/lib/utils";
import { typography } from "@/lib/brand-tokens";

type FontKey = keyof typeof typography.fonts;

interface TypeSpecimenProps {
  family: FontKey;
  sample?: string;
  className?: string;
}

const familyClassName: Record<FontKey, string> = {
  serif:  "font-serif",
  sans:   "font-sans",
  script: "font-script",
};

const sampleDefaults: Record<FontKey, string> = {
  serif:  "L'art de sublimer l'instant",
  sans:   "Préparé avec soin, chaque jour",
  script: "Maison Marquise",
};

/** Spécimen typographique avec déclinaisons de graisse. */
export function TypeSpecimen({ family, sample, className }: TypeSpecimenProps) {
  const config = typography.fonts[family];
  const fontClass = familyClassName[family];
  const text = sample ?? sampleDefaults[family];

  return (
    <article className={cn("space-y-5 p-6 border border-gris-marbre bg-ivoire-maison", className)}>
      {/* En-tête */}
      <header className="space-y-1">
        <h3 className="font-sans text-sm font-medium text-noir-marquise">{config.name}</h3>
        <p className="label-brand text-gris-texte">{config.category} · {config.usage}</p>
      </header>

      {/* Spécimen principal */}
      <p className={cn("text-4xl text-noir-marquise leading-tight", fontClass)} lang="fr">
        {text}
      </p>

      {/* Déclinaisons de graisse */}
      <div className="border-t border-gris-marbre pt-4 space-y-2">
        {config.weights.map((w) => (
          <div key={w.value} className="flex items-baseline gap-4">
            <span className="label-brand w-28 shrink-0 text-gris-texte">{w.label}</span>
            <span
              className={cn("text-lg text-noir-marquise", fontClass)}
              style={{ fontWeight: w.value }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

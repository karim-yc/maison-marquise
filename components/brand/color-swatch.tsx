import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  hex: string;
  label: string;
  token: string;
  usage?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { swatch: "h-14 w-14 rounded-brand", text: "text-xs" },
  md: { swatch: "h-20 w-full rounded-brand", text: "text-sm" },
  lg: { swatch: "h-28 w-full rounded-brand", text: "text-sm" },
};

/** Affiche un échantillon couleur avec token, hex et description d'usage. */
export function ColorSwatch({ hex, label, token, usage, size = "md", className }: ColorSwatchProps) {
  const s = sizeMap[size];

  return (
    <div className={cn("group space-y-3", className)}>
      {/* Pastille */}
      <div
        className={cn(
          "border border-black/8 shadow-warm-xs transition-transform duration-300 group-hover:scale-[1.015]",
          s.swatch,
        )}
        style={{ backgroundColor: hex }}
        role="img"
        aria-label={`${label} – ${hex}`}
      />

      {/* Informations */}
      <div className="space-y-0.5">
        <p className={cn("font-sans font-medium text-noir-marquise", s.text)}>{label}</p>
        <p className="label-brand text-gris-texte">{token}</p>
        <p className="font-mono text-[0.65rem] text-gris-texte tracking-wider">{hex}</p>
        {usage && (
          <p className="font-sans text-[0.7rem] text-gris-texte leading-snug mt-1">{usage}</p>
        )}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  /** Valeur hexadécimale */
  hex: string;
  /** Nom de la couleur */
  name: string;
  /** Nom du token Tailwind */
  token?: string;
  /** Taille du swatch */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-12 w-12",
  md: "h-20 w-20",
  lg: "h-28 w-full",
};

/**
 * Affiche un échantillon de couleur avec son nom et sa valeur hex.
 * Utilisé dans la section palette de la charte.
 */
export function ColorSwatch({
  hex,
  name,
  token,
  size = "md",
  className,
}: ColorSwatchProps) {
  return (
    <div className={cn("group flex flex-col gap-2", className)}>
      {/* Pastille couleur */}
      <div
        className={cn(
          "rounded-brand border border-black/5 shadow-warm-sm transition-transform duration-300 group-hover:scale-[1.02]",
          sizeMap[size],
        )}
        style={{ backgroundColor: hex }}
        aria-label={`Couleur : ${name}, ${hex}`}
        role="img"
      />

      {/* Informations */}
      <div className="space-y-0.5">
        <p className="font-sans text-sm font-medium text-charcoal">{name}</p>
        {token && (
          <p className="label-brand text-brand-muted">{token}</p>
        )}
        <p className="font-sans text-xs text-brand-muted font-mono">{hex}</p>
      </div>
    </div>
  );
}

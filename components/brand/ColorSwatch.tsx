import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  name: string;
  hex: string;
  usage?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Palette couleur individuelle pour la charte.
 */
export function ColorSwatch({
  name,
  hex,
  usage,
  size = "md",
  className,
}: ColorSwatchProps) {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24 sm:h-28 sm:w-28",
    lg: "h-32 w-32 sm:h-40 sm:w-40",
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className={cn(
          "rounded-lg shadow-luxury-sm ring-1 ring-black/5",
          sizeClasses[size]
        )}
        style={{ backgroundColor: hex }}
        aria-label={`Couleur ${name} — ${hex}`}
        role="img"
      />
      <div>
        <p className="font-montserrat font-medium text-sm text-charbon">{name}</p>
        <p className="font-mono text-xs text-taupe mt-0.5">{hex.toUpperCase()}</p>
        {usage && (
          <p className="text-caps text-taupe/70 mt-1 text-[0.6rem]">{usage}</p>
        )}
      </div>
    </div>
  );
}

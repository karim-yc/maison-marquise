import { cn } from "@/lib/utils";

interface LogoProps {
  /** Taille du logo */
  size?: "sm" | "md" | "lg";
  /** Afficher uniquement le monogramme (sans le mot "Maison") */
  monogram?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { script: "text-2xl", label: "text-[0.55rem]" },
  md: { script: "text-4xl", label: "text-[0.65rem]" },
  lg: { script: "text-6xl", label: "text-[0.75rem]" },
};

/**
 * Composant logo textuel de Maison Marquise.
 * Utilise la police script Parisienne pour la signature et
 * Montserrat pour le sous-titre.
 */
export function Logo({ size = "md", monogram = false, className }: LogoProps) {
  const { script, label } = sizeMap[size];

  return (
    <div
      className={cn("flex flex-col items-center gap-0.5", className)}
      aria-label="Maison Marquise"
    >
      {/* Signature script */}
      <span className={cn("font-script text-charcoal leading-none", script)}>
        {monogram ? "MM" : "Maison Marquise"}
      </span>

      {/* Ligne décorative or */}
      {!monogram && (
        <span
          className="block w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60"
          aria-hidden="true"
        />
      )}

      {/* Sous-titre */}
      {!monogram && (
        <span
          className={cn("label-brand tracking-[0.3em] mt-0.5", label)}
          aria-hidden="true"
        >
          Haute Pâtisserie
        </span>
      )}
    </div>
  );
}

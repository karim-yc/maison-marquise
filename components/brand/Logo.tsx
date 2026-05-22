import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "light" | "dark";
  className?: string;
}

const sizeMap = {
  sm: { sans: "text-xs",    script: "text-2xl" },
  md: { sans: "text-sm",    script: "text-4xl" },
  lg: { sans: "text-base",  script: "text-5xl" },
  xl: { sans: "text-lg",    script: "text-7xl" },
};

const variantMap = {
  default: { sans: "text-charbon",  script: "text-champagne" },
  light:   { sans: "text-ivory/80", script: "text-champagne-light" },
  dark:    { sans: "text-charbon",  script: "text-champagne-dark" },
};

/**
 * Logo Maison Marquise.
 * MAISON en Montserrat petites capitales + Marquise en Parisienne.
 */
export function Logo({ size = "md", variant = "default", className }: LogoProps) {
  const s = sizeMap[size];
  const v = variantMap[variant];

  return (
    <div
      className={cn("flex flex-col items-center leading-none select-none", className)}
      aria-label="Maison Marquise"
    >
      <span
        className={cn(
          "font-montserrat font-medium tracking-[0.35em] uppercase",
          s.sans,
          v.sans
        )}
      >
        Maison
      </span>
      <span
        className={cn("font-parisienne leading-[0.85]", s.script, v.script)}
        aria-hidden="true"
      >
        Marquise
      </span>
    </div>
  );
}

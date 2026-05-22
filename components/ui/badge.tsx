import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 label-brand transition-colors",
  {
    variants: {
      variant: {
        default:    "px-3 py-1 border border-gris-marbre text-gris-texte bg-blanc-marbre",
        gold:       "px-3 py-1 border border-or-champagne/50 text-or-champagne bg-or-champagne/5",
        caramel:    "px-3 py-1 border border-caramel/40 text-caramel bg-caramel/5",
        framboise:  "px-3 py-1 border border-framboise/40 text-framboise bg-framboise/5",
        pistache:   "px-3 py-1 border border-pistache/40 text-pistache bg-pistache/5",
        dark:       "px-3 py-1 border border-noir-marquise text-ivoire-maison bg-noir-marquise",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1 label-brand transition-colors",
  {
    variants: {
      variant: {
        default:    "border border-stone-200 text-brand-muted bg-ivory",
        gold:       "border border-gold/40 text-gold bg-gold/5",
        terracotta: "border border-terracotta/40 text-terracotta bg-terracotta/5",
        charcoal:   "border border-charcoal text-ivory bg-charcoal",
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

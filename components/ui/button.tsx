import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-[0.6875rem] font-medium tracking-[0.18em] uppercase transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or-champagne focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        // Noir/ivoire – action principale
        primary: "bg-noir-marquise text-ivoire-maison border border-noir-marquise hover:bg-transparent hover:text-noir-marquise",
        // Or champagne – contour accent
        gold:    "bg-transparent text-or-champagne border border-or-champagne hover:bg-or-champagne hover:text-blanc-marbre",
        // Ivoire/noir – action secondaire douce
        soft:    "bg-ivoire-maison text-noir-marquise border border-gris-marbre hover:border-noir-marquise",
        // Fantôme – liens discrets
        ghost:   "bg-transparent text-gris-texte hover:text-noir-marquise hover:bg-ivoire-maison border border-transparent",
        // Lien inline
        link:    "underline-offset-4 hover:underline text-gris-texte p-0 h-auto normal-case tracking-normal text-sm",
      },
      size: {
        sm:   "px-4 py-2 text-[0.6rem]",
        md:   "px-6 py-3",
        lg:   "px-8 py-4 text-xs",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

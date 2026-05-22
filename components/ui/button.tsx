import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base – commun à toutes les variantes
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-xs font-medium tracking-[0.15em] uppercase transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:   "bg-charcoal text-ivory border border-charcoal hover:bg-transparent hover:text-charcoal",
        gold:      "bg-transparent text-gold border border-gold hover:bg-gold hover:text-ivory",
        ghost:     "bg-transparent text-brand-muted hover:text-charcoal hover:bg-stone-100",
        link:      "underline-offset-4 hover:underline text-brand-muted p-0 h-auto",
      },
      size: {
        sm:  "px-4 py-2 text-[0.625rem]",
        md:  "px-6 py-3",
        lg:  "px-8 py-4",
        icon:"h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

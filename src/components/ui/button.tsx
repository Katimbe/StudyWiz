import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-electric text-white shadow-[0_0_0_1px_rgba(79,141,255,0.3),0_8px_24px_-8px_rgba(79,141,255,0.5)] hover:brightness-110",
        violet: "bg-violet text-white shadow-[0_0_0_1px_rgba(155,107,255,0.3),0_8px_24px_-8px_rgba(155,107,255,0.5)] hover:brightness-110",
        gold: "bg-gold text-[#1a1406] shadow-[0_0_0_1px_rgba(232,191,94,0.3),0_8px_24px_-8px_rgba(232,191,94,0.5)] hover:brightness-105 font-semibold",
        outline: "border border-border-strong bg-transparent text-foreground hover:bg-surface-hover",
        ghost: "text-foreground hover:bg-surface-hover",
        subtle: "bg-surface text-foreground border border-border hover:bg-surface-hover",
        danger: "bg-danger text-white hover:brightness-110",
        link: "text-electric underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
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

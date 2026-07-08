import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-border bg-surface text-muted-foreground",
        electric: "border-electric/30 bg-electric-soft text-electric",
        violet: "border-violet/30 bg-violet-soft text-violet",
        mint: "border-mint/30 bg-mint-soft text-mint",
        gold: "border-gold/30 bg-gold-soft text-gold",
        danger: "border-danger/30 bg-danger-soft text-danger",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring flex h-10 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted-foreground",
        "transition-colors focus-visible:border-electric disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };

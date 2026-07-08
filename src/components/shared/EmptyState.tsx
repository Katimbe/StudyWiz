import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  secondaryLabel,
  secondaryHref,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="glass flex flex-col items-center rounded-[var(--radius-lg)] px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-electric-soft">
        <Icon className="h-7 w-7 text-electric" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {actionLabel && actionHref && (
          <Button asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        )}
        {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
        {secondaryLabel && secondaryHref && (
          <Button asChild variant="outline">
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

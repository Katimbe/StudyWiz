import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NextBestAction({
  label = "Next best action",
  title,
  reason,
  actionLabel,
  href,
}: {
  label?: string;
  title: string;
  reason: string;
  actionLabel: string;
  href: string;
}) {
  return (
    <div className="glass flex flex-col gap-4 rounded-[var(--radius-lg)] border-electric/25 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-electric-soft">
          <Compass className="h-[18px] w-[18px] text-electric" />
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-electric">{label}</div>
          <div className="mt-1 text-base font-semibold text-foreground">{title}</div>
          <p className="mt-1 text-sm text-muted-foreground">{reason}</p>
        </div>
      </div>
      <Button asChild className="shrink-0">
        <Link href={href}>
          {actionLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

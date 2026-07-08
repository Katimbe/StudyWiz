"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";

export function Sidebar() {
  const pathname = usePathname();
  const plan = useStudyGenieStore(useShallow((s) => s.profile.plan));

  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-background-elevated/60 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-br from-electric to-violet shadow-[0_4px_20px_-4px_rgba(79,141,255,0.6)]">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-[15px] font-semibold leading-none tracking-tight">StudyGenie</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Academic OS</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring group flex items-center gap-3 rounded-[var(--radius-sm)] px-3.5 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-electric-soft text-electric" : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
              )}
            >
              <item.icon className={cn("h-[18px] w-[18px]", active ? "text-electric" : "text-muted-foreground group-hover:text-foreground")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-[var(--radius-md)] border border-border bg-surface p-4">
        <div className="text-xs font-semibold text-foreground">{plan} plan</div>
        <p className="mt-1 text-xs text-muted-foreground">
          {plan === "Free" ? "Upgrade for AI Professor, video & unlimited scans." : "You have full access to premium tools."}
        </p>
        {plan === "Free" && (
          <Link
            href="/settings?tab=subscription"
            className="mt-3 inline-flex w-full items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-r from-electric to-violet px-3 py-2 text-xs font-semibold text-white hover:brightness-110"
          >
            Upgrade plan
          </Link>
        )}
      </div>
    </aside>
  );
}

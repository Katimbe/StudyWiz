"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, ScanLine, Dumbbell, Timer, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";
import { Sheet } from "./Sheet";

const PRIMARY = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Capture", href: "/capture", icon: ScanLine },
  { label: "Practice", href: "/practice", icon: Dumbbell },
  { label: "Focus", href: "/focus", icon: Timer },
];

export function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const moreActive = !PRIMARY.some((p) => (p.href === "/" ? pathname === "/" : pathname.startsWith(p.href)));

  return (
    <>
      <nav className="glass-strong fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t px-1 pb-[env(safe-area-inset-bottom)] lg:hidden">
        {PRIMARY.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                active ? "text-electric" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "focus-ring flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
            moreActive ? "text-electric" : "text-muted-foreground",
          )}
        >
          <Menu className="h-5 w-5" />
          More
        </button>
      </nav>
      <Sheet open={open} onOpenChange={setOpen} title="More">
        <div className="grid grid-cols-3 gap-3 p-1">
          {NAV_ITEMS.filter((i) => !PRIMARY.some((p) => p.href === i.href)).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-4 text-center text-xs font-medium text-foreground hover:bg-surface-hover"
            >
              <item.icon className="h-5 w-5 text-electric" />
              {item.label}
            </Link>
          ))}
        </div>
      </Sheet>
    </>
  );
}

"use client";
import Link from "next/link";
import { Plus, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useStudyGenieStore } from "@/lib/store";
import { initials } from "@/lib/utils";

export function TopBar() {
  const profile = useStudyGenieStore((s) => s.profile);
  const updateProfile = useStudyGenieStore((s) => s.updateProfile);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", profile.theme === "light");
  }, [profile.theme]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-xl lg:px-8 lg:py-4">
      <div className="lg:hidden flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-br from-electric to-violet">
          <span className="text-sm font-bold text-white">S</span>
        </div>
        <span className="text-sm font-semibold">StudyGenie</span>
      </div>
      <div className="hidden lg:block" />

      <div className="flex items-center gap-2">
        <Button asChild variant="primary" size="sm" className="hidden sm:inline-flex">
          <Link href="/capture">
            <Plus className="h-4 w-4" /> Quick Capture
          </Link>
        </Button>
        <Button asChild variant="primary" size="icon" className="sm:hidden">
          <Link href="/capture">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
        {mounted && (
          <Button
            variant="subtle"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => updateProfile({ theme: profile.theme === "dark" ? "light" : "dark" })}
          >
            {profile.theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        )}
        <Link
          href="/settings"
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-foreground hover:bg-surface-hover"
        >
          {profile.name ? initials(profile.name) : "?"}
        </Link>
      </div>
    </header>
  );
}

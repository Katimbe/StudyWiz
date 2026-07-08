"use client";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex min-h-dvh flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-4 pb-24 pt-6 lg:px-8 lg:pb-10 lg:pt-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

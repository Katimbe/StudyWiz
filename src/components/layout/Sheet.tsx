"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function Sheet({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <DialogPrimitive.Content className="glass-strong fixed inset-x-0 bottom-0 z-50 max-h-[75vh] overflow-y-auto rounded-t-[var(--radius-xl)] p-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border-strong" />
          <div className="mb-3 flex items-center justify-between">
            <DialogPrimitive.Title className="text-base font-semibold">{title}</DialogPrimitive.Title>
            <DialogPrimitive.Close className="focus-ring rounded-full p-1.5 text-muted-foreground hover:bg-surface-hover">
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

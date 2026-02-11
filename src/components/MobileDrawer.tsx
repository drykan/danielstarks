import React from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function MobileDrawer({ open, title = "Menu", children, onClose }: Props) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the panel for keyboard users
    panelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 sm:hidden" role="dialog" aria-modal="true" aria-label={title}>
      {/* Overlay */}
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-black/40"
        onClick={onClose}
        aria-label="Close navigation menu"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute left-0 top-0 h-full w-[85vw] max-w-xs outline-none bg-cream border-r border-border"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="text-sm font-semibold">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md border border-border p-2 hover:bg-muted"
            aria-label="Close navigation menu"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="p-0">{children}</div>
      </div>
    </div>
  );
}

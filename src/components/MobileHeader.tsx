import { Menu } from "lucide-react";

type Props = {
  onOpen: () => void;
};

export default function MobileHeader({ onOpen }: Props) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-cream px-4 py-3 sm:hidden">
      <div className="leading-tight">
        <div className="text-sm font-semibold">Daniel Starks</div>
        <div className="text-xs opacity-70">Portfolio</div>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="inline-flex items-center justify-center rounded-md border border-border p-2 hover:bg-muted"
        aria-label="Open navigation menu"
      >
        <Menu size={18} aria-hidden="true" />
      </button>
    </header>
  );
}

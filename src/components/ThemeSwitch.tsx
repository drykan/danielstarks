import * as Switch from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";
import type { Theme } from "../lib/theme";

type Props = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

export default function ThemeSwitch({ theme, setTheme }: Props) {
  const checked = theme === "dark";

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-sm opacity-90">
        {checked ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
        <span className="font-medium">{checked ? "Dark" : "Light"}</span>
      </div>

      <Switch.Root
        checked={checked}
        onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
        className={[
          "relative h-6 w-11 rounded-full border border-border",
          "bg-muted data-[state=checked]:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
        ].join(" ")}
        aria-label="Toggle color theme"
      >
        <Switch.Thumb
          className={[
            "block h-5 w-5 translate-x-0.5 rounded-full bg-cream-fg",
            "transition-transform will-change-transform",
            "data-[state=checked]:translate-x-[1.35rem]",
          ].join(" ")}
        />
      </Switch.Root>
    </div>
  );
}

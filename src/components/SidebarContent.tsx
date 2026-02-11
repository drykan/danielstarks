import { Briefcase, Home, Mail, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { NavItem, PageKey } from "../types/nav";
import ThemeSwitch from "./ThemeSwitch";
import type { Theme } from "../lib/theme";

const NAV: NavItem[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "work", label: "Work", icon: Briefcase },
  { key: "contact", label: "Contact", icon: Mail },
];

type Props = {
  active: PageKey;
  setActive: (k: PageKey) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  onNavigate?: () => void;

  // new
  collapsed?: boolean;
  onToggleCollapsed?: () => void;

  // If this content is rendered inside the mobile drawer
  inDrawer?: boolean;
};

export default function SidebarContent({
  active,
  setActive,
  theme,
  setTheme,
  onNavigate,
  collapsed = false,
  onToggleCollapsed,
  inDrawer = false,
}: Props) {
  const showCollapseButton = !inDrawer && typeof onToggleCollapsed === "function";

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <header className="flex items-start justify-between gap-3">
        <div className="leading-tight">
          <div className="text-sm font-semibold">{collapsed ? "DS" : "Daniel Starks"}</div>
          {!collapsed && <div className="text-xs opacity-70">Portfolio</div>}
        </div>

        {showCollapseButton && (
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="inline-flex items-center justify-center rounded-md border border-border p-2 hover:bg-muted"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <PanelLeftOpen size={18} aria-hidden="true" /> : <PanelLeftClose size={18} aria-hidden="true" />}
          </button>
        )}
      </header>

      <nav aria-label="Primary" className="flex-1">
        <ul className="flex flex-col gap-1">
          {NAV.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;

            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(key);
                    onNavigate?.();
                  }}
                  className={[
                    "group relative w-full rounded-md px-3 py-2 text-sm",
                    "flex items-center gap-2 transition-colors",
                    "hover:bg-muted focus-visible:bg-muted",
                    isActive ? "font-semibold" : "opacity-90",
                    collapsed ? "justify-center px-2" : "",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={collapsed ? label : undefined}
                  title={collapsed ? label : undefined}
                >
                  {/* Active rail */}
                  <span
                    className={[
                      "absolute left-1 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full",
                      isActive ? "bg-cream-fg" : "bg-transparent",
                      collapsed ? "left-0.5" : "left-1",
                    ].join(" ")}
                    aria-hidden="true"
                  />

                  <Icon size={16} aria-hidden="true" />
                  {!collapsed && <span>{label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Theme toggle stays at bottom; when collapsed we still show switch */}
      <div className="mt-auto pt-2">
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}
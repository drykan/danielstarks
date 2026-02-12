import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, Home, Mail, ScrollText } from "lucide-react";
import type { NavItem, PageKey } from "../types/nav";
import ThemeSwitch from "./ThemeSwitch";
import type { Theme } from "../lib/theme";

const NAV: NavItem[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "work", label: "Work", icon: Briefcase },
  { key: "experience", label: "Experience", icon: ScrollText },
  { key: "contact", label: "Contact", icon: Mail },
];

type Props = {
  active: PageKey;
  setActive: (k: PageKey) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  onNavigate?: () => void;
  collapsed?: boolean;
  inDrawer?: boolean;
};

function CollapsedTooltip({ label }: { label: string }) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, x: -6, scale: 0.98 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0, x: -6, scale: 0.98 }}
        transition={{ duration: 0.14, ease: "easeOut" }}
        className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-cream px-2 py-1 text-xs font-semibold shadow-sm"
        role="tooltip"
      >
        {label}
      </motion.div>
    </AnimatePresence>
  );
}

export default function SidebarContent({
  active,
  setActive,
  theme,
  setTheme,
  onNavigate,
  collapsed = false,
  inDrawer = false,
}: Props) {
  const reduce = useReducedMotion();
  const [hoveredKey, setHoveredKey] = React.useState<PageKey | null>(null);

  // Match your sidebar width spring: label should appear after width mostly opens
  const LABEL_DELAY = 0.14;

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center justify-center">
          {collapsed ? (
            <motion.img
              src="/favicon.svg"
              alt="Daniel Starks logo"
              className="h-7 w-7 shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          ) : (
            <div className="leading-tight">
              <div className="text-sm font-semibold">Daniel Starks</div>
              <div className="text-xs opacity-70">Portfolio</div>
            </div>
          )}
        </div>
      </header>

      <nav aria-label="Primary" className="flex-1">
        <ul className="flex flex-col gap-1">
          {NAV.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;
            const showTooltip = collapsed && hoveredKey === key;

            return (
              <li key={key} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setActive(key);
                    onNavigate?.();
                  }}
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  onFocus={() => setHoveredKey(key)}
                  onBlur={() => setHoveredKey(null)}
                  className={[
                    "group relative w-full min-h-10 rounded-md px-3 py-2 text-sm",
                    "flex items-center gap-2 overflow-hidden transition-colors",
                    "hover:bg-muted focus-visible:bg-muted",
                    collapsed ? "justify-center px-2" : "",
                    !collapsed && isActive ? "font-semibold" : "opacity-90",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={collapsed ? label : undefined}
                >
                  {/* Active rail (expanded only) */}
                  {!collapsed && (
                    <>
                      <span
                        className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-transparent group-hover:bg-border"
                        aria-hidden="true"
                      />

                      {isActive && (
                        <motion.span
                          layoutId="sidebar-active-rail"
                          className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 520, damping: 34 }}
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}

                  {/* Icon (collapsed: active icon is accent + subtle spring pop) */}
                  <motion.span
                    className="inline-flex items-center justify-center"
                    animate={reduce ? undefined : collapsed && isActive ? { scale: 1.08 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 520, damping: 26 }}
                  >
                    <Icon
                      size={16}
                      aria-hidden="true"
                      className={[
                        "transition-colors duration-200",
                        collapsed
                          ? isActive
                            ? "text-accent"
                            : "opacity-80 group-hover:opacity-100"
                          : "opacity-90",
                      ].join(" ")}
                    />
                  </motion.span>

                  {/* Label (Option A): delayed fade + horizontal reveal (clipPath) */}
                  {!collapsed && (
                    <motion.span
                      className="whitespace-nowrap overflow-hidden"
                      initial={false}
                      animate={
                        reduce
                          ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", x: 0 }
                          : inDrawer
                          ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", x: 0 }
                          : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", x: 0 }
                      }
                      transition={
                        reduce
                          ? { duration: 0 }
                          : inDrawer
                          ? { duration: 0.12, ease: "easeOut" }
                          : { delay: LABEL_DELAY, duration: 0.18, ease: "easeOut" }
                      }
                    >
                      {label}
                    </motion.span>
                  )}

                  {/* Tooltip (collapsed only) */}
                  {showTooltip && <CollapsedTooltip label={label} />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto pt-2">
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}
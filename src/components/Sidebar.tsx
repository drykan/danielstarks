import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import SidebarContent from "./SidebarContent";
import type { PageKey } from "../types/nav";
import type { Theme } from "../lib/theme";

type Props = {
  active: PageKey;
  setActive: (k: PageKey) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;

  collapsed: boolean;
  onToggleCollapsed: () => void;
};

export default function Sidebar({
  active,
  setActive,
  theme,
  setTheme,
  collapsed,
  onToggleCollapsed,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-full">
      {/* Sidebar */}
      <motion.aside
        className="h-full border-r border-border bg-cream overflow-hidden"
        animate={{ width: collapsed ? "4.25rem" : "12.5rem" }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 40 }}
        aria-label="Sidebar"
      >
        <SidebarContent
          active={active}
          setActive={setActive}
          theme={theme}
          setTheme={setTheme}
          collapsed={collapsed}
          inDrawer={false}
        />
      </motion.aside>

      <div className="absolute top-4 right-0 z-40 h-10 w-2 bg-cream" aria-hidden="true" />

      {/* Collapse “handle” button */}
      <button
        type="button"
        onClick={onToggleCollapsed}
        className={[
          "absolute top-4 -right-10 z-50", // how far it “pokes out”
          "h-10 w-11",
          "inline-flex items-center justify-center",
          "bg-cream",
          "border border-border border-l-0",
          "rounded-r-full rounded-l-md",
          "shadow-sm",
          "hover:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
          // extra “flow around” curve (molded feel)
          "before:absolute before:-left-3 before:top-0 before:h-10 before:w-3 before:bg-cream before:rounded-l-full before:content-['']",
        ].join(" ")}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <PanelLeftOpen size={18} aria-hidden="true" />
        ) : (
          <PanelLeftClose size={18} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
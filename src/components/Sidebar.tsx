import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
    <motion.aside
      // Let motion control width; keep the rest in Tailwind
      className="h-full border-r border-border bg-cream overflow-hidden"
      animate={{
        width: collapsed ? "4.25rem" : "12.5rem",
      }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 520, damping: 40 }
      }
      aria-label="Sidebar"
    >
      <SidebarContent
        active={active}
        setActive={setActive}
        theme={theme}
        setTheme={setTheme}
        collapsed={collapsed}
        onToggleCollapsed={onToggleCollapsed}
      />
    </motion.aside>
  );
}
import * as React from "react";

const STORAGE_KEY = "ds-portfolio-sidebar-collapsed";
const BREAKPOINT_PX = 1024; // auto-collapse below this width

export function useSidebarCollapse() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [hasUserPreference, setHasUserPreference] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "true" || saved === "false") {
      setCollapsed(saved === "true");
      setHasUserPreference(true);
      return;
    }

    // No saved preference => auto behavior
    const applyAuto = () => setCollapsed(window.innerWidth < BREAKPOINT_PX);

    applyAuto();
    window.addEventListener("resize", applyAuto);
    return () => window.removeEventListener("resize", applyAuto);
  }, []);

  const toggle = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
    setHasUserPreference(true);
  }, []);

  const clearPreference = React.useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasUserPreference(false);
    setCollapsed(window.innerWidth < BREAKPOINT_PX);
  }, []);

  return { collapsed, toggle, hasUserPreference, clearPreference };
}
import React from "react";
import type { PageProps } from "./types/pages";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PageLoader from "./components/PageLoader";
import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";
import MobileDrawer from "./components/MobileDrawer";
import SidebarContent from "./components/SidebarContent";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import { applyTheme, getInitialTheme, type Theme } from "./lib/theme";
import { useSidebarCollapse } from "./lib/useSidebarCollapse";
import type { PageKey } from "./types/nav";

const PAGES: Record<PageKey, React.ComponentType<PageProps>> = {
  home: Home,
  work: Work,
  experience: Experience,
  contact: Contact,
};

export default function App() {
  const [active, setActive] = React.useState<PageKey>("home");
  const [theme, setTheme] = React.useState<Theme>("light");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { collapsed, toggle } = useSidebarCollapse();
  const [isPageLoading, setIsPageLoading] = React.useState(false);

  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    setIsPageLoading(true);

    // Short delay = feels intentional, not annoying
    const t = window.setTimeout(() => setIsPageLoading(false), 350);
    return () => window.clearTimeout(t);
  }, [active]);


  React.useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const Page = PAGES[active] ?? Home;

  const goHome = React.useCallback(() => setActive("home"), []);
  const goWork = React.useCallback(() => setActive("work"), []);
  const goExperience = React.useCallback(() => setActive("experience"), []);
  const goContact = React.useCallback(() => setActive("contact"), []);

  return (
    <div className="h-dvh bg-cream text-cream-fg">
      {/* Mobile top bar */}
      <MobileHeader onOpen={() => setDrawerOpen(true)} />

      <div className="flex h-dvh">
        {/* Desktop sidebar (does not scroll) */}
        <div className="hidden sm:block">
          <div className="sticky top-0 h-dvh">
            <Sidebar
              active={active}
              setActive={setActive}
              theme={theme}
              setTheme={setTheme}
              collapsed={collapsed}
              onToggleCollapsed={toggle}
            />
          </div>
        </div>

        {/* Mobile drawer nav */}
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Navigation">
          <SidebarContent
            inDrawer
            active={active}
            setActive={setActive}
            theme={theme}
            setTheme={setTheme}
            collapsed={false}
            onNavigate={() => setDrawerOpen(false)}
          />
        </MobileDrawer>

        {/* Right panel scroll container */}
        <main id="main-content" className="flex-1 overflow-y-auto overscroll-contain">
          {isPageLoading && <PageLoader />}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="h-full"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.995 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -6, scale: 0.995 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Page />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );

}

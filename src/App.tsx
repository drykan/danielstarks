import React from "react";
import type { PageProps } from "./types/pages";
import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";
import MobileDrawer from "./components/MobileDrawer";
import SidebarContent from "./components/SidebarContent";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import { applyTheme, getInitialTheme, type Theme } from "./lib/theme";
import { useSidebarCollapse } from "./lib/useSidebarCollapse";
import type { PageKey } from "./types/nav";

const PAGES: Record<PageKey, React.ComponentType<PageProps>> = {
  home: Home,
  work: Work,
  contact: Contact,
};

export default function App() {
  const [active, setActive] = React.useState<PageKey>("home");
  const [theme, setTheme] = React.useState<Theme>("light");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { collapsed, toggle } = useSidebarCollapse();

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
  const goContact = React.useCallback(() => setActive("contact"), []);

  return (
    <div className="min-h-screen bg-cream text-cream-fg">
      {/* Mobile top bar */}
      <MobileHeader onOpen={() => setDrawerOpen(true)} />

      {/* Layout */}
      <div className="flex min-h-screen items-stretch">
        {/* Desktop sidebar */}
        <div className="hidden sm:block">
          <Sidebar
            active={active}
            setActive={setActive}
            theme={theme}
            setTheme={setTheme}
            collapsed={collapsed}
            onToggleCollapsed={toggle}
          />
        </div>

        {/* Mobile drawer nav */}
        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Navigation"
        >
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

        {/* Main panel swaps DOM without URL changes */}
        <main id="main-content" className="flex-1">
          <Page onGoHome={goHome} onGoWork={goWork} onGoContact={goContact} />
        </main>
      </div>
    </div>
  );
}

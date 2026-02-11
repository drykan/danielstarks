import SidebarContent from "./SidebarContent";
import type { PageKey } from "../types/nav";
import type { Theme } from "../lib/theme";

type Props = {
  active: PageKey;
  setActive: (k: PageKey) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;

  // new
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
  return (
    <aside
      className={[
        "min-h-screen h-dvh self-stretch border-r border-border bg-cream",
        collapsed ? "w-[4.25rem]" : "w-fit min-w-[12rem]",
      ].join(" ")}
    >
      <SidebarContent
        active={active}
        setActive={setActive}
        theme={theme}
        setTheme={setTheme}
        collapsed={collapsed}
        onToggleCollapsed={onToggleCollapsed}
      />
    </aside>
  );
}
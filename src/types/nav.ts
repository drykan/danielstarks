import type { LucideIcon } from "lucide-react";

export type PageKey = "home" | "work" | "contact";

export type NavItem = {
  key: PageKey;
  label: string;
  icon: LucideIcon;
};

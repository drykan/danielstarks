import type { LucideIcon } from "lucide-react";

export type PageKey = "home" | "work" | "experience" | "contact";

export type NavItem = {
  key: PageKey;
  label: string;
  icon: LucideIcon;
};
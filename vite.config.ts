import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Custom domain (danielstarks.com) on GitHub Pages => base should be "/"
export default defineConfig({
  plugins: [react()],
  base: "/",
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative base so the built assets resolve when hosted under a
  // subpath (e.g. GitHub Pages at /Compete3/).
  base: "./",
  plugins: [react()],
});

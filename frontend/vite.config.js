import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Tests transform JSX without the React plugin's help, so ask for the automatic runtime explicitly.
  oxc: { jsx: { runtime: "automatic" } },
  esbuild: { jsx: "automatic" }, // used by the Vite copy bundled with Vitest
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    css: false,
  },
});

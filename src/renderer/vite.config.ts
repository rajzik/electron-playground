import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { devtools } from "@tanstack/devtools-vite";

export default defineConfig({
  plugins: [
    devtools(),
    tailwindcss(),
    nodePolyfills(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    // tsconfigPaths(), // no need to use this plugin. I don't like path aliases so much.
  ],
  build: {
    minify: false,
    emptyOutDir: false,
  },
});

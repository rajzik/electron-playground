import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [TanStackRouterVite({ quoteStyle: "double" }), tailwindcss()],
  build: {
    outDir: "../../out/renderer",
    emptyOutDir: true,
    minify: false,
  },
});

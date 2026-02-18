import { resolve } from "path";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [nodePolyfills()],
  build: {
    lib: {
      entry: resolve("src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "electron",
        "electron-log",
        "electron-store",
        "electron-updater",
        ...["fs", "util"],
        "node:fs",
        "node:stream",
        "node:url",
        "node:path",
        "vite",
      ],
      output: {
        dir: "../../out",
        entryFileNames: "main/[name].mjs",
        format: "esm",
      },
    },
    minify: false,
    emptyOutDir: false,
  },
});

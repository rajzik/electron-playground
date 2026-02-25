import { resolve } from "path";
import { defineConfig } from "vite";
import { nodeExternals } from 'rollup-plugin-node-externals';


export default defineConfig({
  plugins: [nodeExternals()],
  build: {
    lib: {
      entry: resolve("src/main/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "electron",
        "electron-log",
        "electron-serve",
        "electron-store",
        "electron-updater",
        "vite", // NOTE: viteDevServer is used in the src/main/index.ts. Not ideal, but needed for now.
      ],
      output: {
        dir: "out",
        entryFileNames: "main/[name].mjs",
        format: "esm",
      },
    },
    minify: false,
    emptyOutDir: false,
  },
});

import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
  },
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    target: "modules",
    minify: "esbuild",
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      formats: ["es"],
      fileName: "mused-ui",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:9090/",
        changeOrigin: true,
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const dirname = typeof import.meta.dirname !== "undefined"
  ? import.meta.dirname
  : path.dirname(fileURLToPath(import.meta.url));
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const base = process.env.NODE_ENV === "production" ? "/how-things-work/" : "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "client", "src"),
      "@shared": path.resolve(dirname, "shared"),
      "@assets": path.resolve(dirname, "attached_assets"),
    },
  },
  root: path.resolve(dirname, "client"),
  build: {
    outDir: path.resolve(dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

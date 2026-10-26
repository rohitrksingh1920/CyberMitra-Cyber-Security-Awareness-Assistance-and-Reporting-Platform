import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In development, requests to /api are proxied straight to the FastAPI
// backend so the browser never has to deal with CORS. In production, nginx
// (see /nginx/nginx.conf) performs the equivalent proxying.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target:
          process.env.VITE_DEV_API_PROXY_TARGET || "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});

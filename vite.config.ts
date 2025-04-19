import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // กำหนด proxy สำหรับ kubscan API
      "/api/tokens": {
        target: "https://www.kubscan.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tokens/, "/api/v2/tokens"),
      },
      // กำหนด proxy สำหรับ item-mmv.netlify.app
      "/api/item-mmv": {
        target: "https://item-mmv.netlify.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/item-mmv/, ""),
      },
      // กำหนด proxy สำหรับ item-mmv.netlify.app/api/tokens
      "^/api/item-mmv/api/tokens/.*": {
        target: "https://www.kubscan.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/item-mmv\/api\/tokens/, "/api/v2/tokens"),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

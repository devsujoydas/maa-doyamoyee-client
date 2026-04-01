import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  base: "/",

  build: {
    outDir: "dist", 
    chunkSizeWarningLimit: 1500,
 
    minify: "esbuild",

    rollupOptions: {
      output: {
        manualChunks(id) {
          // Node modules সবকে chunk বানানো
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) return "vendor";
            if (id.includes("react-router-dom")) return "router";
            if (id.includes("@tanstack/react-query") || id.includes("axios")) return "query";
            if (id.includes("framer-motion") || id.includes("react-icons") || id.includes("lucide-react")) return "ui";
            if (id.includes("recharts")) return "charts";
            if (id.includes("swiper")) return "slider";
            if (id.includes("@fancyapps/ui")) return "gallery";
            if (id.includes("i18next") || id.includes("react-i18next")) return "i18n";
            return "vendor"; // baki sob node_modules একত্রে
          }
        },
      },
    },
  },

  // Dev server optimization
  server: {
    open: true,
  },

  // Preview server
  preview: {
    port: 4173,
  },
});
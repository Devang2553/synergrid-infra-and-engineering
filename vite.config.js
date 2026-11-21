import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // big libraries in their own files so browsers cache them across deploys
        manualChunks: { three: ["three"], gsap: ["gsap"], react: ["react", "react-dom", "react-router-dom"] },
      },
    },
  },
});

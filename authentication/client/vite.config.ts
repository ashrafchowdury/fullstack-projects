import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/auth/v1/register": "http://localhost:5000",
      "/api/auth/v1/upload-file": "http://localhost:5000",
    },
  },
});

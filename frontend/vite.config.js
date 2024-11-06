import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/login/findUser": "http://localhost:3000",
      "/registeruser": "http://localhost:3000",
      "/profilepage": "http://localhost:3000",
    },
  },
});

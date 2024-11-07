import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/login/findUser": "https://backend-assignment-task-pyby.vercel.app/",
      "/registeruser": "https://backend-assignment-task-pyby.vercel.app/",
      "/profilepage": "https://backend-assignment-task-pyby.vercel.app/",
      "/logout": "https://backend-assignment-task-pyby.vercel.app/",
    },
  },
});

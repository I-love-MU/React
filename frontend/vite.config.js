import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/kopis-api": {
        target: "http://www.kopis.or.kr/openApi/restful",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/kopis-api/, ""),
      },
    },
  },
});

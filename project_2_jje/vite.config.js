import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: ".", // ✅ 프로젝트 루트에서 실행하도록 설정
  server: {
    port: 5173,
    open: true,
  }
});

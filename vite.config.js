import { defineConfig } from 'vite';

export default defineConfig({
  // 開發伺服器配置
  server: {
    port: 3000,
    open: true,
  },
  // 建置配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // // 빌드 시 백엔드 static 폴더로 출력
  // build: {
  //   outDir: '../backend/src/main/resources/static',
  //   emptyOutDir: true,
  // },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})

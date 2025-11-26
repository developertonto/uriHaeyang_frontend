// @ts-ignore Node.js 내장 모듈 타입 선언
import { fileURLToPath } from 'node:url'
// @ts-ignore Node.js 내장 모듈 타입 선언
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      // 백엔드 API 프록시 설정
      '/api/chat': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/api/health': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      // 기상청 API 프록시 설정
      '/api/kma': {
        target: 'https://apihub.kma.go.kr',
        changeOrigin: true, // 요청 헤더의 Origin을 대상 서버로 변경
        rewrite: (path) => path.replace(/^\/api\/kma/, '/api/typ01/url'),
        secure: false, // https 인증서 검증 안함 (개발환경용)
      },
    },
  },
})
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {// 代理标识
        target: 'http://localhost:8080/',// 后端代理地址
        changeOrigin: true,// 跨域
        rewrite: (path) => path.replace(/^\/api/, '')// 路径重写
      }
    }
  }
  
})

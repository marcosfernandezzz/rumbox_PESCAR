import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'server/public',
  build: {
    outDir: '../../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: '/html/login.html'
  },
  publicDir: false,
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'server/public')
    }
  }
}) 
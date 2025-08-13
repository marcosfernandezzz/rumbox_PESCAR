import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://rumbox-pescar.onrender.com',
        changeOrigin: true,
        secure: false,
        // ✅ SIN rewrite - mantiene /api en la URL
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('❌ Proxy error:', err.message);
            console.log('Make sure your backend server is running on https://rumbox-pescar.onrender.com');
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('🚀 Request:', req.method, req.url, '-> https://rumbox-pescar.onrender.com' + req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('📥 Response:', proxyRes.statusCode, req.url);
            if (proxyRes.statusCode >= 400) {
              console.log('❌ Backend error - check your server');
            }
          });
        },
      },
      '/img': {
        target: 'https://rumbox-pescar.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

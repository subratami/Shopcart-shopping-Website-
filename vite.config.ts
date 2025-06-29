import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/Shopcart-shopping-Website-",
  server: {
  proxy: {
    '/search': {
      target: 'https://shopping-site-api-z8gg.onrender.com',
      changeOrigin: true,
      secure: false,
    },
    '/signup': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
      secure: false,
    },
  },
},
})

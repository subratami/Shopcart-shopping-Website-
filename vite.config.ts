import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/Shopcart-shopping-Website-",
  server: {
    host: true, // This makes it listen on 0.0.0.0
    proxy: {
      '/search': {
        target: 'https://shopping-site-api-z8gg.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

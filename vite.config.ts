import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const allowedHosts = [
  'localhost',
  '127.0.0.1',
  'shopcart-shopping-website.onrender.com',
];

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
    },
  },
})

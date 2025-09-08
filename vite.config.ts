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
  host: true, // This makes it listen on 0.0.0.0
  port: Number(process.env.PORT) || 3000,
  allowedHosts,
  /*proxy: {
    '/search': {
      target: 'https://new-shopping-api.onrender.com',
      changeOrigin: true,
      secure: false,
    },
  },*/
},

preview: {
  host: true,
  port: Number(process.env.PORT) || 3000,
  allowedHosts,
},
})

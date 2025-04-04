import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/

export default defineConfig({
  // define api to be localhost:8000 to fetch from backend
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  build: {
    // required for deployment (like Netlify, Vercel, etc.)
    outDir: 'dist',
  },
  base: '/',
  plugins: [react()],
})

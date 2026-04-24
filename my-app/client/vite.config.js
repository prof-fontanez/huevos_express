import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.huevosexpresspr.com',
      routes: [
        '/',
        '/product',
        '/history',
        '/heroes',
        '/activities',
      ],
    }),
  ],
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
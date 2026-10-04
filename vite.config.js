import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Forward /api requests to Express so the client can use relative URLs
    proxy: { '/api': 'http://localhost:3001' },
    // Vite serves from the project root, so keep it away from the Express code and DB
    fs: {
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/server/**'],
    },
    watch: { ignored: ['**/server/**'] },
    open: true,
  },
})

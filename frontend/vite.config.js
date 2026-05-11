import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Forward all /auth, /user, /workspace, etc. to the Express backend
      '/auth':         'http://localhost:6767',
      '/user':         'http://localhost:6767',
      '/workspace':    'http://localhost:6767',
      '/board':        'http://localhost:6767',
      '/card':         'http://localhost:6767',
      '/list':         'http://localhost:6767',
      '/page':         'http://localhost:6767',
      '/activity':     'http://localhost:6767',
      '/notification': 'http://localhost:6767',
      '/search':       'http://localhost:6767',
      '/attachment':   'http://localhost:6767',
      '/invite':       'http://localhost:6767',
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    open: true // This will automatically open the browser
  },
  optimizeDeps: {
    include: ['bs58'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  build: {
    commonjsOptions: {
      include: [/bs58/, /node_modules/]
    }
  },
  resolve: {
    alias: {
      // Ensure bs58 resolves correctly
      'bs58': 'bs58'
    }
  }
}) 
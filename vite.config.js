import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ⚠️ You need to import path

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {             // ✅ must be here
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})

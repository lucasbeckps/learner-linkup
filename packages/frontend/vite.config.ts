import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@frontend': fileURLToPath(new URL('../frontend/src', import.meta.url)),
      '@backend': fileURLToPath(new URL('../backend/src', import.meta.url))
    }
  }
})

import { fileURLToPath, URL } from 'node:url'

import tw from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { copyFileSync } from 'node:fs'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/vlowchart/" : "/",
  plugins: [
    vue(),
    tw(),
    // vueDevTools(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'copy-404',
          closeBundle() {
            copyFileSync('dist/index.html', 'dist/404.html')
          }
        }
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  theme: {
    extend: {
        colors: {
          ' ': '#0874e4',
          'ospar1-secondary-blue': '#3b82f6'
        }
      }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})

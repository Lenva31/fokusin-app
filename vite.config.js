// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ← penting untuk Netlify atau GitHub Pages
  plugins: [react()],
})

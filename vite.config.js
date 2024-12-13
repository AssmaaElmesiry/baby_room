import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './assets'),
			'@components': resolve(__dirname, './components'),
			'@ui': resolve(__dirname, './components/ui'),
      '@src': resolve(__dirname, './src'),
      '@layouts': resolve(__dirname, './layouts'),
			'@pages': resolve(__dirname, './pages'),
			'@partials': resolve(__dirname, './partials'),
			'@router': resolve(__dirname, './router'),
      '@lang': resolve(__dirname, './lang'),
			'@stores': resolve(__dirname, './stores'),
      '@content': resolve(__dirname, './content'),
      '@': resolve(__dirname)
    }
  }
})

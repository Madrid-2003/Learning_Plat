import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': 'https://learning-plat-36hz.vercel.app/',
      '/payu-payment': {
        target: 'https://test.payu.in/_payment',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/payu-payment/, ''),
      },
    }
  },
  plugins: [react()],
})

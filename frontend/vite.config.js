import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Définir la base URL en fonction de l'environnement
// const base = `${import.meta.env.NODE_ENV}` === 'production' ? '/frontend/' : '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /*
  base: base, 
  server: {
    proxy: {
      '/api': `${process.env.VITE_BACKEND_URL}`
    }
  } */
})





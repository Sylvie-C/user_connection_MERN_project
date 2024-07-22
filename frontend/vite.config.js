import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"

dotenv.config() ; 

// Définir la base URL en fonction de l'environnement
const base = process.env.NODE_ENV === 'production' ? '/frontend/' : '/'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base, 
/*   server: {
    proxy: {
      '/api': `${process.env.VITE_BACKEND_URL}`
    }
  } */
})





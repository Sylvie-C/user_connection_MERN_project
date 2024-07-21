import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Définir la base URL en fonction de l'environnement
const base = process.env.NODE_ENV === 'production' ? '/frontend/' : '/'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base, 
})

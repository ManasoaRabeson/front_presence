import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // build: {
  //   outDir: '../lucid_api_badges/public/dist',
  //   emptyOutDir: true,
  // },

  // server: {
  //   port: 5174, // change pour chaque app
  // },
  // base: '/react/',
})

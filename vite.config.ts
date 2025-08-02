import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), flowbiteReact()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  },
  preview: {
    allowedHosts: ['pinnsexp.onrender.com']
  }
})

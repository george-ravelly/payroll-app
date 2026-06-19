import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    // Include conditional exports that modern packages advertise
    conditions: ['import', 'module', 'browser', 'development']
  },
  optimizeDeps: {
    include: ['@tanstack/react-query']
  },
})

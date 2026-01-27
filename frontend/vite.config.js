import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic'  // Utiliser le runtime classique pour Electron
    }),
    tailwindcss()
  ],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Désactiver les modules ES pour Electron
    target: 'es2015',
    rollupOptions: {
      output: {
        format: 'iife',  // Format IIFE compatible Electron
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      },
      external: ['react', 'react-dom']  // Charger React depuis CDN
    }
  },
  // Inclure React directement dans le build
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})





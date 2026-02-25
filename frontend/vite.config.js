import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: './',
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true
  }
})


















// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss()
//   ],
//   base: './',  // Important pour les chemins relatifs
//   build: {
//     outDir: 'dist',
//     emptyOutDir: true,
//     rollupOptions: {
//       output: {
//         entryFileNames: 'assets/[name].[hash].js',
//         chunkFileNames: 'assets/[name].[hash].js',
//         assetFileNames: 'assets/[name].[hash].[ext]'
//       }
//     }
//   },
//   server: {
//     port: 5173,
//     strictPort: true
//   }
// })
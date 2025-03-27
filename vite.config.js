import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'DocTeq',
        short_name: 'DocTeq',
        theme_color: '#4938e4',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  
  // Configuration du serveur
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    https: false, // Mettez à true si besoin de HTTPS
    open: true, // Ouvre le navigateur automatiquement
    proxy: {
      // Exemple de proxy pour les API
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  // Configuration de la prévisualisation (npm run preview)
  preview: {
    port: 4173,
    strictPort: true
  }
});
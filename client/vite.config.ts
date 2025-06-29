import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,           // Runs on localhost:3000
    open: true,           // Auto-open in default browser
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend API server
        changeOrigin: true,
        secure: false,                   // Allow self-signed certs if needed
      },
    },
  },
});

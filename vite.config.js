import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(process.cwd(), './src') }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        /* Keep the vendor libraries in their own long-lived cache entries. */
        manualChunks(id) {
          if (id.includes('src/data/')) return 'exam-data';
          if (id.includes('src/content.js')) return 'content';
          if (id.includes('@supabase')) return 'supabase';
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('react-router')) return 'react';
          return undefined;
        }
      }
    }
  },
  server: { open: true }
});

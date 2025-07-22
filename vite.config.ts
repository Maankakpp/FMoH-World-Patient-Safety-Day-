import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // @ts-expect-error: process.env is available in Vite config context
    process.env.ANALYZE && visualizer({ open: true, filename: 'dist/bundle-analysis.html' })
  ].filter(Boolean),
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

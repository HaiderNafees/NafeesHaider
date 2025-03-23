import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material', 'framer-motion']
  }
});
import process from 'node:process';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const API_PORT = Number(process.env.PORT ?? 3001);

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    proxy: {
      '/api': `http://localhost:${API_PORT}`,
    },
  },
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    passWithNoTests: true,
  },
});

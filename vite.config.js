import { defineConfig } from 'vite';

export default defineConfig({
  base: '/peter-parker-journey/',
  root: '.',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});

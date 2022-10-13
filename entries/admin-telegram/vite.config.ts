import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 4_000 },
  plugins: [vue()],
  resolve: {
    alias: {
      'admin-telegram': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});

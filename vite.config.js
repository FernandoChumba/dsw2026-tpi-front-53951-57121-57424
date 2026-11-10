import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // VITE_BACKEND_URL solo define a dónde reenvía el proxy; el código del
  // frontend nunca lo usa directamente. Por defecto, el backend local.
  const target = env.VITE_BACKEND_URL || 'http://localhost:5278';

  return defineConfig({
    server: {
      // Toda petición a /api se reenvía al backend. Para el navegador es el
      // mismo origen que el frontend, así que no hay problemas de CORS.
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react(), tailwindcss()],
  });
};

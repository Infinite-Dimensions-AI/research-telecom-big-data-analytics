import { defineConfig } from 'vite';
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/research-telecom-big-data-analytics/demo/',
  server: { host: '127.0.0.1' },
}));

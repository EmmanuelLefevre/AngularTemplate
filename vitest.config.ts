import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const DIRNAME = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    angular(),
    tsconfigPaths({
      projects: [resolve(DIRNAME, 'tsconfig.json')]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/styles/abstracts/_index.scss" as *;'
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      resolve(DIRNAME, 'src/test-setup.ts'),
    ],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        '**/index.ts',
        '.angular/**',
        'coverage/**',
        'dist/**',
        'eslint.config.js',
        'src/_environments/environment.prod.sample.ts',
        'src/_environments/environment.ts',
        'src/app/app.config.ts',
        'src/main.ts',
      ],
      clean: true
    },
  }
});

import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
// import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // resolve: {
  //   alias: [
  //     {
  //       find: '@core',
  //       replacement: path.resolve(__dirname, 'src/app/core')
  //     },
  //     {
  //       find: '@app',
  //       replacement: path.resolve(__dirname, 'src/app')
  //     }
  //   ],
  // },
  plugins: [
    angular(),
    tsconfigPaths({
      projects: [resolve(__dirname, 'tsconfig.json')]
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
      resolve(__dirname, 'src/app/core/_config/navlinks.constant.ts'),
      resolve(__dirname, 'src/test-setup.ts'),
    ],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'src/main.ts',
        '**/*.module.ts',
        '**/index.ts',
        '.angular/**',
        'eslint.config.js',
        'dist/**',
      ],
      clean: true
    },
  }
});

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text', 'lcov', 'clover', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'src/test-setup.ts',
        'src/main.ts',
        '**/*.spec.ts',
        '**/*.module.ts',
        '.angular/**'
      ]
    }
  }
});

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'src/test-setup.ts',
        'src/main.ts',
        '**/*.spec.ts',
        '**/*.module.ts'
      ]
    }
  }
});

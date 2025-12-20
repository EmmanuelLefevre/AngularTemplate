import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      skipFull: true,
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

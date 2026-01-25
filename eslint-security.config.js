import securityPlugin from 'eslint-plugin-security';
import tseslint from 'typescript-eslint';

export default [
  {
    // Ignore warnings about unnecessary comments
    linterOptions: {
      reportUnusedDisableDirectives: 'off'
    }
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'src/**/*.spec.ts',
      'src/test-setup.ts'
    ]
  },
  {
    files: [
      'src/**/*.ts',
      'src/**/*.js'
    ],
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    plugins: {
      security: securityPlugin,
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      ...securityPlugin.configs.recommended.rules,
    },
  },
];

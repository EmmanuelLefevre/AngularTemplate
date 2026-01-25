// @ts-expect-error
import securityPlugin from 'eslint-plugin-security';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: [
      'src/**/*.ts',
      'src/**/*.js'
    ],
    plugins: {
      security: securityPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      ...securityPlugin.configs.recommended.rules,
    },
  },
];

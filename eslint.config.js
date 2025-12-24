const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = defineConfig([
  // TS ----------
  {
    files: ['**/*.ts'],
    plugins: {
      '@stylistic': stylistic
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Angular selectors configuration
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: '',
          type: 'element',
          style: 'kebab-case'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: '',
          type: 'attribute',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/no-pipe-impure': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/pipe-prefix': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/sort-keys-in-type-decorator': 'error',
      '@angular-eslint/sort-lifecycle-methods': 'error',
      // Stylistics selectors configuration
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'class'
        }
      ],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      // Typescript selectors configuration
      // Commons
      // Disabling old rules to avoid duplicates
      indent: 'off',
      semi: 'off',
      quotes: 'off'
    }
  },
  // HTML ----------
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/component-selector': 'off',
      '@angular-eslint/template/directive-selector': 'off'
    }
  }
]);

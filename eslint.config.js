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
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['vitest.config.ts', 'eslint.config.js']
        },
        tsconfigRootDir: __dirname
      }
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
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/pipe-prefix': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/sort-keys-in-type-decorator': 'error',
      '@angular-eslint/sort-lifecycle-methods': 'error',

      // RXJS
      // 'rxjs/no-async-subscribe': 'error',
      // 'rxjs/no-ignored-observable': 'error',
      // 'rxjs/no-ignored-subscription': 'error',
      // 'rxjs/no-nested-subscribe': 'error',
      // 'rxjs/no-unbound-methods': 'error',
      // 'rxjs/throw-error': 'error',

      // Stylistics selectors configuration
      '@stylistic/arrow-spacing': [
        'error',
        {
          before: true,
          after: true
        }
      ],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/comma-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],
      '@stylistic/curly-newline': [
        'error',
        {
          multiline: true,
          minElements: 1,
          consistent: true
        }
      ],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true
        }
      ],
      '@stylistic/line-comment-position': ['error', 'above'],
      '@stylistic/max-len': [
        'error',
        {
          code: 120,
          comments: 500,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true
        }
      ],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false
          }
        }
      ],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 2
        }
      ],
      '@stylistic/no-trailing-spaces': [
        'error',
        {
          ignoreComments: false,
          skipBlankLines: false
        }
      ],
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'class'
        }
      ],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/space-before-blocks': [
        'error',
        {
          classes: 'always',
          functions: 'always',
          keywords: 'always',
          modules: 'always'
        }
      ],
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/spaced-comment': ['error', 'always'],
      '@stylistic/switch-colon-spacing': [
        'error',
        {
          after: true,
          before: false
        }
      ],
      '@stylistic/quotes': ['error', 'single'],

      // Typescript selectors configuration
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase']
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['UPPER_CASE']
        },
        {
          selector: 'method',
          format: ['camelCase']
        },
        {
          selector: 'class',
          format: ['PascalCase']
        }
      ],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-magic-numbers': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-readonly': 'error',

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
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/attributes-order': [
        'off',
        {
          alphabetical: false,
          order: [
            'STRUCTURAL_DIRECTIVE',
            'OUTPUT_BINDING',
            'TEMPLATE_REFERENCE',
            'TWO_WAY_BINDING',
            'ATTRIBUTE_BINDING',
            'INPUT_BINDING'
          ]
        }
      ],
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/button-has-type': 'error',
      '@angular-eslint/template/click-events-have-key-events': 'error',
      '@angular-eslint/template/component-selector': 'off',
      '@angular-eslint/template/conditional-complexity': [
        'error',
        {
          maxComplexity: 5
        }
      ],
      '@angular-eslint/template/cyclomatic-complexity': [
        'error',
        {
          maxComplexity: 15
        }
      ],
      '@angular-eslint/template/directive-selector': 'off',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/i18n': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'error',
      '@angular-eslint/template/label-has-associated-control': 'error',
      '@angular-eslint/template/mouse-events-have-key-events': 'error',
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/no-distracting-elements': 'error',
      '@angular-eslint/template/no-inline-styles': 'error',
      '@angular-eslint/template/prefer-at-else': 'error',
      '@angular-eslint/template/prefer-at-empty': 'error',
      '@angular-eslint/template/prefer-built-in-pipes': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/role-has-required-aria': 'error',
      '@angular-eslint/template/table-scope': 'error',
      '@angular-eslint/template/valid-aria': 'error'
    }
  }
]);

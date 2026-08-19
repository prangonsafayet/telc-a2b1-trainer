import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import prettier from 'eslint-config-prettier';

/* Architecture rules, enforced rather than documented.
 *
 *   src/app       the shell: providers, router, layout. May import anything.
 *   src/features  vertical slices. May import shared + content, never another
 *                 feature's internals — cross-feature use goes through its index.ts.
 *   src/shared    reusable building blocks. May not import features or app.
 *   src/content   plain data. May not import anything from the app at all.
 */
const NO_CROSS_FEATURE_INTERNALS = {
  name: 'no-cross-feature-internals',
  files: ['src/features/*/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/features/*/*/**'],
            message:
              "Import another feature only through its public surface: '@/features/<name>'. Reaching into its folders couples you to its internals."
          },
          {
            group: ['@/app/**'],
            message: 'Features must not import the app shell — that inverts the dependency direction.'
          }
        ]
      }
    ]
  }
};

const SHARED_STAYS_GENERIC = {
  name: 'shared-stays-generic',
  files: ['src/shared/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/features/**', '@/app/**'],
            message:
              'src/shared must stay feature-agnostic. If it needs feature knowledge it belongs in that feature.'
          }
        ]
      }
    ]
  }
};

const CONTENT_IS_DATA_ONLY = {
  name: 'content-is-data-only',
  files: ['src/content/**/*.ts'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/features/**', '@/app/**', '@/shared/components/**'],
            message: 'src/content is inert data. It must not depend on application code.'
          }
        ]
      }
    ]
  }
};

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'playwright-report', 'test-results', 'node_modules'] },

  js.configs.recommended,

  {
    name: 'app-source',
    files: ['src/**/*.{ts,tsx}'],
    /* Type-aware linting is scoped to the app source: it needs a tsconfig, and the
       tooling/tests are plain JS outside any project. */
    extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      ecmaVersion: 2023,
      globals: { ...globals.browser },
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true }
      }
    },
    settings: {
      react: { version: 'detect' },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({ project: './tsconfig.app.json', alwaysTryTypes: true })
      ]
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      'import-x': importX
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      /* --- naming convention --- */
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
        /* PascalCase is allowed wherever the value is a component or a namespace:
           `const Icon = ...`, `function StatTile()`, `import * as SelectPrimitive`. */
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow'
        },
        { selector: 'parameter', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow' },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'import', format: ['camelCase', 'PascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['PascalCase'] },
        /* Answer keys ("l1.0"), CSS custom properties and provider ids are data. */
        { selector: 'objectLiteralProperty', format: null },
        /* Type properties also model external contracts: Supabase returns snake_case,
           Vite env vars are SCREAMING_SNAKE, and `_updatedAt` is a persisted field name. */
        {
          selector: 'typeProperty',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
          leadingUnderscore: 'allow'
        }
      ],

      /* --- types --- */
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: false }
      ],
      /* The DOM APIs this app uses (speechSynthesis, MediaRecorder) are riddled with
         legitimately-unawaited promises and void returns. */
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],

      /* --- imports --- */
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: '@/content/**', group: 'internal', position: 'after' },
            { pattern: '@/shared/**', group: 'internal', position: 'after' },
            { pattern: '@/features/**', group: 'internal', position: 'after' },
            { pattern: '@/app/**', group: 'internal', position: 'after' }
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'import-x/no-duplicates': 'error',
      'import-x/no-cycle': ['error', { maxDepth: 4 }],
      'import-x/no-self-import': 'error',

      /* --- general hygiene --- */
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      curly: ['error', 'multi-line'],
      'prefer-const': 'error',
      'object-shorthand': 'error'
    }
  },

  NO_CROSS_FEATURE_INTERNALS,
  SHARED_STAYS_GENERIC,
  CONTENT_IS_DATA_ONLY,

  {
    /* Exam data files are enormous literals; naming rules there are pure noise. */
    name: 'content-data',
    files: ['src/content/exams/**/*.ts'],
    rules: { '@typescript-eslint/naming-convention': 'off' }
  },
  {
    /* Barrels and provider modules intentionally export types, hooks and constants
       alongside components; the fast-refresh heuristic cannot know that. */
    name: 'module-surfaces',
    files: [
      'src/**/index.ts',
      'src/**/providers/*.tsx',
      'src/shared/components/ui/*.tsx',
      'src/shared/components/exam-ui/*.tsx'
    ],
    rules: { 'react-refresh/only-export-components': 'off' }
  },

  /* Tooling, tests and E2E specs run in Node and are not part of the app tsconfig. */
  {
    name: 'node-tooling',
    files: ['*.{js,cjs,mjs,ts}', 'scripts/**/*', 'tests/**/*', 'e2e/**/*'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parser: tseslint.parser,
      /* The jsdom-based suites define browser globals themselves, so both sets apply. */
      globals: { ...globals.node, ...globals.browser }
    },
    rules: {
      'no-console': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-undef': 'off'
    }
  },
  {
    name: 'commonjs-tooling',
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs', globals: { ...globals.node } }
  },

  prettier
);

import fs from 'node:fs';

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import checkFile from 'eslint-plugin-check-file';
import importX from 'eslint-plugin-import-x';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import prettier from 'eslint-config-prettier';

/* Architecture rules, enforced rather than documented.
 *
 *   src/app       the shell: providers, router, layout. May import anything.
 *   src/features  vertical slices. May import shared + content, never another
 *                 feature's internals — cross-feature use goes through its index.ts.
 *   src/shared    reusable building blocks. May not import features or app.
 *   src/content   plain data. May not import anything from the app at all.
 *
 * `no-restricted-imports` is configured, not accumulated: when two flat-config entries
 * both set it for the same file, the later entry replaces the earlier one's options
 * outright instead of merging the pattern lists. So every entry below restates each
 * pattern that applies to its files. Leaving that out is silent: the repo-wide barrel
 * rule matched `src/**` and switched the layer rules off for every file it also matched.
 */
const UI_BY_FILE = {
  group: ['@shared/ui/*', '**/shared/ui/*'],
  message:
    "Import primitives from '@shared/ui', not from the file directly. Those files are written by the shadcn CLI and treated as vendored; the barrel is the stable surface."
};

const CROSS_FEATURE_INTERNALS = {
  group: ['@features/*/*/**'],
  message:
    "Import another feature only through its public surface: '@features/<name>'. Reaching into its folders couples you to its internals."
};

const APP_SHELL = {
  group: ['@app/**'],
  message: 'Features must not import the app shell — that inverts the dependency direction.'
};

const FEATURES_AND_APP = {
  group: ['@features/**', '@app/**'],
  message: 'src/shared must stay feature-agnostic. If it needs feature knowledge it belongs in that feature.'
};

/* `@shared/components` is listed as well as `@shared/components/**`: the `/**` form does
   not match the bare barrel, so `import { Teil } from '@shared/components'` slipped through
   this rule while every path under it was refused. Proven with a planted import. */
const APPLICATION_CODE = {
  group: ['@features/**', '@app/**', '@shared/components', '@shared/components/**'],
  message: 'src/content is inert data. It must not depend on application code.'
};

/* Relative imports may step up one level at most. Anything deeper is unreadable and
   breaks when files move; the aliases exist precisely for those paths. Because
   `no-restricted-imports` options replace rather than merge, this pattern is restated in
   EVERY restrict(...) entry below. */
const DEEP_RELATIVE = {
  group: ['../../**'],
  message:
    'Relative imports may climb at most one level; use a path alias (@features/<name>/…, @shared/…) instead.'
};

const restrict = (...patterns) => ({ 'no-restricted-imports': ['error', { patterns }] });

/* The design system is consumed through its barrel, never file by file. This is the
   repo-wide baseline; the layer entries below re-include UI_BY_FILE. */
const UI_THROUGH_BARREL = {
  name: 'ui-through-barrel',
  files: ['src/**/*.{ts,tsx}'],
  ignores: ['src/shared/ui/**'],
  rules: restrict(UI_BY_FILE, DEEP_RELATIVE)
};

const NO_CROSS_FEATURE_INTERNALS = {
  name: 'no-cross-feature-internals',
  files: ['src/features/*/**/*.{ts,tsx}'],
  rules: restrict(CROSS_FEATURE_INTERNALS, APP_SHELL, UI_BY_FILE, DEEP_RELATIVE)
};

/* A feature may deep-import ITSELF through its own alias — that is how its files avoid
   `../../` paths — while every other feature's internals stay off limits. One entry per
   feature directory; each must follow (and therefore restate) the generic entry above,
   because the later entry's options replace the earlier one's for the files it matches. */
const FEATURE_SELF_ALIAS = fs.readdirSync('src/features').map(name => ({
  name: `feature-self-alias-${name}`,
  files: [`src/features/${name}/**/*.{ts,tsx}`],
  rules: restrict(
    {
      group: ['@features/*/*/**', `!@features/${name}/**`],
      message:
        "Import another feature only through its public surface: '@features/<name>'. Reaching into its folders couples you to its internals."
    },
    APP_SHELL,
    UI_BY_FILE,
    DEEP_RELATIVE
  )
}));

/* The ten module renderers come in twin pairs with identical basenames
   (`modules/dual-level/LesenModule.tsx` and `modules/single-level/LesenModule.tsx`), told
   apart only by their format folder. Only a format's own descriptor may import them —
   everything else (a screen, another format, another feature) goes through the format
   object instead, which is exactly what stops the twins being mixed up. */
const MODULE_RENDERERS = {
  group: ['@features/exam/components/modules/**', '**/exam/components/modules/**'],
  message:
    "Import a module renderer only from its own format's lib/formats/<format>/index.ts. Reaching into components/modules/ anywhere else bypasses the format descriptor and risks mixing up the dual-level and single-level twins."
};

/* Restated because this entry's files overlap feature-self-alias-exam above; the later
   entry replaces rather than merges, so every pattern that still applies here — the
   cross-feature guard, the app-shell guard, the UI barrel and the one-level relative cap —
   is repeated alongside the new module-renderer restriction. */
const EXAM_MODULES_THROUGH_FORMAT = {
  name: 'exam-modules-through-format',
  files: ['src/features/exam/**/*.{ts,tsx}'],
  ignores: ['src/features/exam/lib/formats/*/index.ts'],
  rules: restrict(
    {
      group: ['@features/*/*/**', '!@features/exam/**'],
      message:
        "Import another feature only through its public surface: '@features/<name>'. Reaching into its folders couples you to its internals."
    },
    APP_SHELL,
    UI_BY_FILE,
    DEEP_RELATIVE,
    MODULE_RENDERERS
  )
};

const SHARED_STAYS_GENERIC = {
  name: 'shared-stays-generic',
  files: ['src/shared/**/*.{ts,tsx}'],
  ignores: ['src/shared/ui/**'],
  rules: restrict(FEATURES_AND_APP, UI_BY_FILE, DEEP_RELATIVE)
};

/* The vendored shadcn files are exempt from the barrel rule — they import their siblings
   directly — but they are still part of src/shared and must stay feature-agnostic. */
const SHARED_UI_STAYS_GENERIC = {
  name: 'shared-ui-stays-generic',
  files: ['src/shared/ui/**/*.{ts,tsx}'],
  rules: restrict(FEATURES_AND_APP, DEEP_RELATIVE)
};

/* A trainer's facts live in its registry descriptor, never in a comparison against its id.
   Naming 'b1' anywhere else is how the three trainers grew special cases in the first
   place, so it is refused: read the fact from `TRAINERS[trainer]`, or add it there.

   Four exempt places. The registry itself and the content folders are keyed by trainer by
   definition. The other two are the persisted document's own plumbing —
   `progress/lib/progressDb.ts` and `auth/lib/mergeProgress.ts` — which architecture.md
   measured as irreducible: `exactOptionalPropertyTypes` means a trainer nobody has opened
   must be an ABSENT key rather than an explicit undefined, so the merge is spelled out per
   trainer instead of looped. Widening this rule is what surfaced them; they are exempted by
   name rather than silenced line by line, so the count stays visible here.

   The selector deliberately excludes `TSLiteralType`, so the union declarations that DEFINE
   the ids (`type TrainerId = 'a2b1' | 'b1' | 'b2'`) still typecheck — it is trainer ids used
   as VALUES that are banned. Unlike no-restricted-imports this is a different rule key, so
   it neither replaces nor is replaced by the layer entries above. */
const TRAINER_IDS = ['a2b1', 'b1', 'b2'];

const NO_TRAINER_ID_LITERALS = {
  name: 'no-trainer-id-literals',
  files: ['src/**/*.{ts,tsx}'],
  ignores: [
    'src/shared/config/trainers.ts',
    'src/content/**',
    'src/features/progress/lib/progressDb.ts',
    'src/features/auth/lib/mergeProgress.ts'
  ],
  rules: {
    'no-restricted-syntax': [
      'error',
      ...TRAINER_IDS.flatMap(id =>
        [
          /* `'b1'` as a value, including a computed key: `mode === 'b1'`, `db['b1']`. */
          `:not(TSLiteralType) > Literal[value='${id}']`,
          /* An object key that names one: `{ b1: … }`. A TYPE member is a different node
             (`TSPropertySignature`), so the unions and `ProgressDatabase` still declare theirs. */
          `Property > Identifier.key[name='${id}']`,
          /* Reaching one out by name: `db.b1`, `TRAINERS.a2b1`. */
          `MemberExpression > Identifier.property[name='${id}']`
        ].map(selector => ({
          selector,
          message: `'${id}' is a trainer id: read the fact you need from TRAINERS[trainer] in @shared/config/trainers.ts instead of naming the trainer. If the fact does not exist yet, add it to the descriptor — that is what makes a fourth trainer one registry entry.`
        }))
      )
    ]
  }
};

const CONTENT_IS_DATA_ONLY = {
  name: 'content-is-data-only',
  files: ['src/content/**/*.ts'],
  rules: restrict(APPLICATION_CODE, UI_BY_FILE, DEEP_RELATIVE)
};

/* Component files default-export their component, so imports and lazy() routes are
   uniform. Defined inline: the rule is three lines and not worth a package. */
const componentDefaultExport = {
  rules: {
    'component-default-export': {
      meta: {
        type: 'problem',
        messages: { missing: 'Component files must default-export their component.' }
      },
      create: context => ({
        'Program:exit': node => {
          const hasDefault = node.body.some(s => s.type === 'ExportDefaultDeclaration');
          if (!hasDefault) context.report({ node, messageId: 'missing' });
        }
      })
    }
  }
};

export default tseslint.config(
  /* `.claude/worktrees/` holds agent worktrees — whole checkouts of this repo. Linting one
     lints every file twice, against whatever revision it sits on. */
  {
    ignores: ['dist', 'coverage', 'playwright-report', 'test-results', 'node_modules', '.claude/worktrees']
  },

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
      'import-x': importX,
      'check-file': checkFile
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      /* --- file and folder naming ---
       *
       * The filename says what a module is, so the convention is enforced rather than
       * hoped for:
       *   components and route screens   PascalCase.tsx   (they export components)
       *   hooks                          useThing.ts      (camelCase, `use` prefix)
       *   utils, config, types, providers camelCase.ts
       *   folders                        kebab-case
       *
       * `src/shared/components/ui` is exempt: the shadcn CLI writes kebab-case there,
       * and fighting it would break `npx shadcn add`.
       */
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/**/components/**/*.tsx': 'PASCAL_CASE',
          'src/**/components/*.tsx': 'PASCAL_CASE',
          'src/**/routes/**/*.tsx': 'PASCAL_CASE',
          'src/**/hooks/**/*.ts': 'use+([A-Z])*([a-zA-Z0-9])',
          'src/**/layout/use*.ts': 'use+([A-Z])*([a-zA-Z0-9])',
          'src/**/lib/**/*.ts': 'CAMEL_CASE',
          'src/**/config/**/*.ts': 'CAMEL_CASE',
          'src/**/types/**/*.ts': 'CAMEL_CASE',
          'src/**/providers/*.ts': 'CAMEL_CASE',
          'src/**/providers/*.tsx': 'PASCAL_CASE',
          'src/content/*.ts': 'CAMEL_CASE'
        },
        { ignoreMiddleExtensions: true }
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/features/*/': 'KEBAB_CASE',
          'src/**/!(__)*/': 'KEBAB_CASE'
        }
      ],

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
            { pattern: '@content/**', group: 'internal', position: 'after' },
            { pattern: '@shared/**', group: 'internal', position: 'after' },
            { pattern: '@features/**', group: 'internal', position: 'after' },
            { pattern: '@app/**', group: 'internal', position: 'after' }
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

  /* Order matters: the repo-wide barrel rule first, then the layer entries that
     restate it, so the more specific configuration is the one that survives. */
  UI_THROUGH_BARREL,
  NO_CROSS_FEATURE_INTERNALS,
  ...FEATURE_SELF_ALIAS,
  EXAM_MODULES_THROUGH_FORMAT,
  SHARED_STAYS_GENERIC,
  SHARED_UI_STAYS_GENERIC,
  CONTENT_IS_DATA_ONLY,
  NO_TRAINER_ID_LITERALS,

  {
    /* One component per file. The vendored shadcn files ship several per file and are
       exempt below. */
    name: 'one-component-per-file',
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/shared/ui/*.tsx'],
    plugins: { react },
    rules: { 'react/no-multi-comp': 'error' }
  },
  {
    name: 'component-files-default-export',
    files: [
      'src/app/layout/*.tsx',
      'src/app/routes/*.tsx',
      'src/**/components/**/*.tsx',
      'src/**/routes/*.tsx'
    ],
    ignores: ['src/shared/ui/**', '**/moduleProps.ts'],
    plugins: { local: componentDefaultExport },
    rules: { 'local/component-default-export': 'error' }
  },

  {
    /* Ambient declarations for Vite's build-time defines use the conventional
       __NAME__ form, which the naming rule would otherwise reject. */
    name: 'ambient-declarations',
    files: ['src/**/*.d.ts'],
    rules: { '@typescript-eslint/naming-convention': 'off' }
  },
  {
    /* Exam data files are enormous literals; naming rules there are pure noise. */
    name: 'content-data',
    files: ['src/content/exams/**/*.ts'],
    rules: { '@typescript-eslint/naming-convention': 'off' }
  },
  {
    /* The shadcn CLI writes named function expressions inside `forwardRef`; the arrow
       rule strips the inline name, so the display-name heuristic can no longer infer
       one. Display names only matter in devtools, and these files are vendored. */
    name: 'vendored-ui-display-names',
    files: ['src/shared/ui/*.tsx'],
    rules: { 'react/display-name': 'off' }
  },
  {
    /* Barrels and provider modules intentionally export types, hooks and constants
       alongside components; the fast-refresh heuristic cannot know that. */
    name: 'module-surfaces',
    files: [
      'src/**/index.ts',
      'src/**/providers/*.tsx',
      'src/shared/ui/*.tsx',
      'src/shared/ui/index.ts',
      'src/shared/components/exam-ui/*.tsx'
    ],
    rules: { 'react-refresh/only-export-components': 'off' }
  },

  /* Tooling, tests and E2E specs run in Node and are not part of the app tsconfig.
     Extensions are listed explicitly: a directory pattern that names no extension counts
     as universal and opts none in, so the .ts suites under tests/unit went unlinted. */
  {
    name: 'node-tooling',
    files: [
      '*.{js,cjs,mjs,ts}',
      'scripts/**/*.{js,cjs,mjs,ts}',
      'tests/**/*.{js,cjs,mjs,ts}',
      'e2e/**/*.{js,cjs,mjs,ts}'
    ],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parser: tseslint.parser,
      /* The render suites run in happy-dom, the rest in Node, so both sets apply. */
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

  {
    /* Every function is an arrow: declarations and `function` expressions are rejected
       and autofixed to `const fn = () => …`. Class methods are exempt — React lifecycle
       methods cannot be converted in place, and a method is not a free function. Ambient
       `.d.ts` declarations are excluded because `declare function` has no arrow form. */
    name: 'arrow-functions-only',
    files: [
      'src/**/*.{ts,tsx}',
      'tests/**/*.{ts,tsx}',
      'e2e/**/*.ts',
      'scripts/**/*.{js,mjs,ts}',
      '*.{js,mjs,cjs,ts}'
    ],
    ignores: ['**/*.d.ts'],
    plugins: { 'prefer-arrow-functions': preferArrowFunctions },
    rules: {
      'prefer-arrow-callback': 'error',
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          allowNamedFunctions: false,
          classPropertiesAllowed: false,
          disallowPrototype: true,
          returnStyle: 'unchanged'
        }
      ]
    }
  },

  prettier
);

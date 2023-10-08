/** @type { import('eslint').Linter.Config } */
module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: ['plugin:@typescript-eslint/recommended'],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.json', '.mjs'],
          },
        },
      },
      rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
            'ts-check': 'allow-with-description',
            'minimumDescriptionLength': 3,
          },
        ],
        '@typescript-eslint/ban-tslint-comment': 'off',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/class-literal-property-style': ['error', 'getters'],
        '@typescript-eslint/consistent-generic-constructors': ['warn', 'constructor'],
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          { prefer: 'type-imports', disallowTypeAnnotations: false, fixStyle: 'separate-type-imports' },
        ],
        '@typescript-eslint/default-param-last': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/generic-type-naming': 'off',
        '@typescript-eslint/init-declarations': ['off'],
        '@typescript-eslint/lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
        '@typescript-eslint/member-naming': 'off',
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/method-signature-style': ['warn', 'property'],
        // FIXME: Needs typechecking !!!
        // '@typescript-eslint/naming-convention': ['warn', ...require('./naming-convention')],
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-base-to-string': 'off', // false negative
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'off', // Annoying with auto-fix on save.
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-extraneous-class': ['warn', { allowWithDecorator: true }],
        '@typescript-eslint/no-import-type-side-effects': 'warn',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-invalid-this': ['error', { capIsConstructor: false }],
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-loop-func': 'error',
        '@typescript-eslint/no-loss-of-precision': 'error',
        '@typescript-eslint/no-magic-numbers': ['off', { ignoreEnums: true }], // Not good enough yet
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redeclare': ['off', { ignoreDeclarationMerge: true }], // useful in FP.
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-restricted-imports': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-type-alias': 'off',
        '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-declaration-merging': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-untyped-public-signature': 'off',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars-experimental': 'off', // Why two rules?
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^([iI]gnore(d)?)|(_+)', args: 'after-used', ignoreRestSiblings: true },
        ],
        '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: true }],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-useless-empty-export': 'warn',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/object-curly-spacing': 'warn',
        '@typescript-eslint/parameter-properties': 'off',
        '@typescript-eslint/padding-line-between-statements': [
          'warn',
          {
            blankLine: 'always',
            prev: '*',
            next: ['class', 'for', 'while', 'switch', 'do', 'directive', 'function', 'iife', 'block-like'],
          },
          { blankLine: 'always', prev: ['block-like', 'block'], next: ['return'] },
          { blankLine: 'always', prev: ['block-like'], next: ['const', 'let', 'var'] },
          { blankLine: 'always', prev: ['const', 'let', 'var'], next: ['type', 'interface'] },
          { blankLine: 'always', prev: ['multiline-const', 'multiline-let', 'multiline-var'], next: ['if'] },
        ],
        '@typescript-eslint/prefer-as-const': 'warn',
        '@typescript-eslint/prefer-enum-initializers': 'off',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-function-type': 'warn',
        '@typescript-eslint/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: true }],
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-readonly-parameter-types': [
          'off',
          { checkParameterProperties: true, ignoreInferredTypes: false, treatMethodsAsReadonly: true },
        ], // I'm not sure...
        '@typescript-eslint/prefer-readonly': 'off',
        '@typescript-eslint/prefer-readonlysemi': 'off', // Annoying with auto-fix on save.
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/sort-type-constituents': [
          'warn',
          {
            checkIntersections: true,
            checkUnions: true,
            groupOrder: [
              'named',
              'keyword',
              'operator',
              'literal',
              'function',
              'import',
              'conditional',
              'object',
              'tuple',
              'intersection',
              'union',
              'nullish',
            ],
          },
        ],
        '@typescript-eslint/strict-boolean-expressions': 'off', // Annoying
        '@typescript-eslint/space-before-blocks': 'off',

        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/typedef': ['error', { parameter: false, arrowParameter: false, variableDeclaration: false }],
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/key-spacing': 'off',

        // open issues
        'react/jsx-no-useless-fragment': 'off', // Need useless-fragment for JSX return type
      },
    },
  ],
};

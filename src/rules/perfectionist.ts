import type { SortImportsOptions, SortUnionTypesOptions, SortArrayIncludesOptions } from 'eslint-plugin-perfectionist';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { PluginRules, RuleOptions } from '#types/eslintRules.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

const literalCustomGroups = [
  { groupName: 'template-literal', selector: 'literal', elementNamePattern: '^`.*`$' },
  { groupName: 'bigint-literal', selector: 'literal', elementNamePattern: '^-?\\d[\\d_]*n$' },
  { groupName: 'string-literal', selector: 'literal', elementNamePattern: '^(?:\'.*\'|".*")$' },
  { groupName: 'boolean-literal', selector: 'literal', elementNamePattern: '^(?:true|false)$' },
  {
    groupName: 'number-literal',
    selector: 'literal',
    elementNamePattern: '^-?(?:\\d[\\d_]*(?:\\.\\d[\\d_]*)?|\\.\\d[\\d_]*)(?:[eE][+-]?\\d[\\d_]*)?$',
  },
] satisfies SortArrayIncludesOptions[number]['customGroups'];

const booleanKeywordCustomGroup = {
  groupName: 'boolean-keyword',
  selector: 'keyword',
  elementNamePattern: '^boolean$',
} satisfies NonNullable<SortUnionTypesOptions[number]['customGroups']>[number];

const sharedTypeLikeGroups = [
  'boolean-literal',
  'number-literal',
  'bigint-literal',
  'string-literal',
  'template-literal',
  'literal',
  'keyword',
  'named',
  'operator',
  'tuple',
  'object',
  'union',
  'intersection',
  'conditional',
  'function',
  'import',
  'unknown',
  'nullish',
] satisfies SortArrayIncludesOptions[number]['groups'];

const typeConstituentSortOptions = {
  customGroups: [
    booleanKeywordCustomGroup,
    ...literalCustomGroups,
  ],
  groups: [
    'boolean-keyword',
    ...sharedTypeLikeGroups,
  ],
} satisfies SortUnionTypesOptions[number];

const sortArrayIncludesOptions = {
  customGroups: literalCustomGroups,
  groups: sharedTypeLikeGroups,
} satisfies SortArrayIncludesOptions[number];

const sortImportsCustomGroups = [
  {
    groupName: 'component',
    elementNamePattern: ['\\.(vue|[jt]sx)$'],
    modifiers: ['value'],
  },
  {
    groupName: 'image',
    elementNamePattern: ['\\.(ico|svg|gif|png|jpe?g|webp|avif|heic)$'],
  },
] satisfies SortImportsOptions[number]['customGroups'];

const sortImportsGroups = [
  ['style', 'side-effect-style'],
  { newlinesBetween: 0 },
  'side-effect',

  'image',

  'component',

  'type-external',
  { newlinesBetween: 0 },
  'type-builtin',
  { newlinesBetween: 0 },
  ['type-tsconfig-path', 'type-subpath'],
  { newlinesBetween: 0 },
  ['type-internal', 'type-index', 'type-parent', 'type-sibling'],

  'external',
  { newlinesBetween: 0 },
  'builtin',

  ['tsconfig-path', 'subpath'],
  { newlinesBetween: 0 },
  ['internal', 'index', 'parent', 'sibling'],

  ['import', 'unknown'],
] satisfies RuleOptions<'perfectionist/sort-imports'>['groups'];

function getPerfectionistRules(options: DeepNonNullable<Options>) {
  const {
    env,
    tsConfig,
    configs: {
      stylistic,
      perfectionist,
    },
  } = options;
  const { maxLineLength } = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;
  const { sortType } = isEnabled(perfectionist) ? perfectionist : defaultOptions.configs.perfectionist;

  const perfectionistRules = {
    'perfectionist/sort-maps': 'warn',
    'perfectionist/sort-exports': 'warn',
    'perfectionist/sort-union-types': ['warn', typeConstituentSortOptions],
    'perfectionist/sort-array-includes': ['warn', sortArrayIncludesOptions],
    'perfectionist/sort-intersection-types': ['warn', typeConstituentSortOptions],
    'perfectionist/sort-named-imports': 'warn',
    'perfectionist/sort-named-exports': 'warn',
    'perfectionist/sort-imports': ['warn', {
      environment: env === 'bun' ? 'bun' : 'node',
      tsconfig: tsConfig || undefined,
      sortSideEffects: true,
      fallbackSort: {
        order: 'asc',
        type: 'natural',
      },
      partitionByComment: true,
      specialCharacters: 'trim',
      type: sortType,
      maxLineLength,
      customGroups: sortImportsCustomGroups,
      groups: sortImportsGroups,
    }],
  } satisfies PluginRules<'perfectionist'>;

  return perfectionistRules;
}

export { getPerfectionistRules };

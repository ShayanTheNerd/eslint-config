import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

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
		'perfectionist/sort-union-types': 'warn',
		'perfectionist/sort-array-includes': 'warn',
		'perfectionist/sort-intersection-types': 'warn',
		'perfectionist/sort-named-imports': ['warn', { groupKind: 'types-first' }],
		'perfectionist/sort-named-exports': ['warn', { groupKind: 'types-first' }],
		'perfectionist/sort-imports': ['warn', {
			environment: env,
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
			customGroups: [
				{
					groupName: 'vue-sfc',
					elementNamePattern: ['\\.(vue|[jt]sx)$'],
					modifiers: ['value'], // Prevent type-imports from '.vue' files from being grouped with component-imports.
				},
				{
					groupName: 'image',
					elementNamePattern: ['\\.(ico|svg|gif|png|jpe?g|webp|avif|heic)$'],
				},
			],
			groups: [
				['style', 'side-effect-style'],
				{ newlinesBetween: 0 },
				'side-effect',

				'image',

				'vue-sfc',

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
			],
		}],
	} satisfies PluginRules<'perfectionist'>;

	return perfectionistRules;
}

export { getPerfectionistRules };

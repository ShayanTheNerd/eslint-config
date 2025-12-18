import type { RuleOptions } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

type SortTypeOptions = RuleOptions<'perfectionist/sort-imports'>['type'];

interface PerfectionistOptions extends ConfigWithOverrides {
	/**
	 * The type of sorting.
	 *
	 * @default 'line-length'
	 *
	 * @see [Perfectionist Settings: `type` option](https://perfectionist.dev/guide/getting-started#settings)
	 */
	sortType?: Exclude<SortTypeOptions, 'type-import-first'>,
}

export type { PerfectionistOptions };

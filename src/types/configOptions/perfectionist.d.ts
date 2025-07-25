import type { RuleOptions } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

interface PerfectionistOptions extends ConfigWithOverrides {
	/**
	 * The type of sorting.
	 *
	 * @default 'line-length'
	 *
	 * @see [Perfectionist Settings: `type` option](https://perfectionist.dev/guide/getting-started#settings)
	 */
	sortType?: RuleOptions<'perfectionist/sort-imports'>['type'],
}

export type { PerfectionistOptions };

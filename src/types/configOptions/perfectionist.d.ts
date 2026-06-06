import type { ConfigWithOverrides } from '#types/index.d.ts';
import type { PluginRules, RuleOptions } from '#types/eslintRules.d.ts';

type SortTypeOptions = RuleOptions<'perfectionist/sort-imports'>['type'];

type ConfigRules = PluginRules<'perfectionist'>;

interface PerfectionistOptions extends ConfigWithOverrides<ConfigRules> {
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

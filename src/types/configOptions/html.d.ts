import type { RuleOptions } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

interface HTMLOptions extends ConfigWithOverrides {
  /**
   * Enforce the use of baseline features.
   *
   * Aside from `'widely'` and `'newly'`, it can also be set to a numeric baseline year, such as `2025` (minimum is `2000`), to allow features that became baseline newly available that year or earlier.
   *
   * @default false
   *
   * @see [@html-eslint/use-baseline](https://html-eslint.org/docs/rules/use-baseline)
   */
  useBaseline?: false | RuleOptions<'@html-eslint/use-baseline'>['available'],

  /**
   * Enforce consistent naming convention for `id` attribute values.
   *
   * @default 'snake_case'
   *
   * @see [@html-eslint/id-naming-convention](https://html-eslint.org/docs/rules/id-naming-convention)
   */
  idNamingConvention?: Exclude<RuleOptions<'@html-eslint/id-naming-convention'>, 'regex'>,
}

export type { HTMLOptions };

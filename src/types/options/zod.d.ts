import type { PluginRules } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

interface BaseZodOptions {
  /**
   * Whether to opt into [eslint-plugin-zod-mini](https://github.com/marcalexiei/eslint-zod/tree/main/plugins/eslint-plugin-zod-mini) when using Zod Mini (`zod/mini`).
   *
   * _eslint-plugin-zod-mini_ enforces a subset of _eslint-plugin-zod_ rules, which are available under the `zod-mini` namespace.
   *
   * @default false
   *
   * @see [ESLint Zod Plugins](https://github.com/marcalexiei/eslint-zod#plugins)
   */
  mini?: boolean,
}

type ConfigRulesZod = PluginRules<'zod'>;
type ConfigRulesZodMini = PluginRules<'zod-mini'>;

type ZodOptions =
  | (BaseZodOptions & ConfigWithOverrides<ConfigRulesZodMini> & { mini?: true })
  | (BaseZodOptions & ConfigWithOverrides<ConfigRulesZod> & ({ mini?: false } | { mini?: undefined }));

export type { ZodOptions };

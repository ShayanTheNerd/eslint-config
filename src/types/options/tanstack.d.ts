import type { PluginRules } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

type ConfigRules = PluginRules<'@tanstack'>;

interface TanstackOptions extends ConfigWithOverrides<ConfigRules> {
  /**
   * Whether [@tanstack/query](https://tanstack.com/query) is used in the project.
   *
   * @default false // `true` if "@tanstack/react-query" is detected in the dependencies when `autoDetectDeps` is enabled
   *
   * @see [@tanstack/eslint-plugin-query](https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query)
   */
  query?: boolean,

  /**
   * Whether [@tanstack/router](https://tanstack.com/router) is used in the project.
   *
   * @default false // `true` if "@tanstack/react-router" is detected in the dependencies when `autoDetectDeps` is enabled
   *
   * @see [@tanstack/eslint-plugin-router](https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router)
   */
  router?: boolean,

  /**
   * Whether [@tanstack/start](https://tanstack.com/start) is used in the project.
   *
   * @default false // `true` if "@tanstack/react-start" is detected in the dependencies when `autoDetectDeps` is enabled
   *
   * @see [@tanstack/eslint-plugin-start](https://tanstack.com/start/latest/docs/eslint/eslint-plugin-start)
   */
  start?: boolean,
}

export type { TanstackOptions };

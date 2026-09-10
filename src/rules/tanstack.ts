import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';

type TypescriptRules = PluginRules<'@typescript-eslint'>;
type TanstackRules = PluginRules<'@tanstack'>;
type TanstackStartRules = Pick<TanstackRules, Extract<keyof TanstackRules, `@tanstack/start/${string}`>>;
type TanstackQueryRules = Pick<TanstackRules, Extract<keyof TanstackRules, `@tanstack/query/${string}`>>;
type TanstackRouterRules =
  & Pick<TypescriptRules, '@typescript-eslint/only-throw-error'>
  & Pick<TanstackRules, Extract<keyof TanstackRules, `@tanstack/router/${string}`>>;

const tanstackStartRules = {
  '@tanstack/start/no-async-client-component': 'error',
  '@tanstack/start/no-client-code-in-server-component': 'error',
} satisfies TanstackStartRules;

const tanstackQueryRules = {
  '@tanstack/query/exhaustive-deps': 'warn',
  '@tanstack/query/no-rest-destructuring': 'warn',
  '@tanstack/query/stable-query-client': 'error',
  '@tanstack/query/no-unstable-deps': 'error',
  '@tanstack/query/infinite-query-property-order': 'warn',
  '@tanstack/query/no-void-query-fn': 'error',
  '@tanstack/query/mutation-property-order': 'warn',
} satisfies TanstackQueryRules;

const tanstackRouterRules = {
  '@tanstack/router/create-route-property-order': 'warn',
  '@tanstack/router/route-param-names': 'error',
} satisfies TanstackRouterRules;

function getTanstackRules(options: DeepNonNullable<Options>) {
  const { tanstack, typescript } = options.configs;

  const rules = {} satisfies TanstackRules;

  if (!isEnabled(tanstack)) {
    return rules;
  }

  if (isEnabled(typescript)) {
    (tanstackRouterRules as TanstackRouterRules)['@typescript-eslint/only-throw-error'] = ['error', {
      allow: [
        { from: 'package', package: '@tanstack/router-core', name: 'Redirect' },
        { from: 'package', package: '@tanstack/router-core', name: 'NotFoundError' },
      ],
    }];
  }

  if (isEnabled(tanstack.start)) {
    Object.assign(rules, tanstackStartRules);
  }

  if (isEnabled(tanstack.query)) {
    Object.assign(rules, tanstackQueryRules);
  }

  if (isEnabled(tanstack.router)) {
    Object.assign(rules, tanstackRouterRules);
  }

  return rules;
}

export { getTanstackRules };

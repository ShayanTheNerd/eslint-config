import type { RuleOptions } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

type MaxDepthOptions = RuleOptions<'max-depth'>;
type MaxNestedCallbacksOptions = RuleOptions<'max-nested-callbacks'>;

interface BaseOptions extends ConfigWithOverrides {
	/**
	 * Enforce the consistent use of either function declarations or function expressions.
	 *
	 * Even when set to `'declaration'`, function expressions are still allowed, with or without a type annotation.
	 *
	 * @default 'declaration'
	 *
	 * @see [func-style](https://eslint.org/docs/latest/rules/func-style)
	 */
	functionStyle?: RuleOptions<'func-style'>,

	/**
	 * Enforce named exports in the following directories:
	 * - 'shared'
	 * - 'dto', 'dtos'
	 * - 'model', 'models'
	 * - 'helper', 'helpers'
	 * - 'module', 'modules'
	 * - 'util', 'utils', 'utilities'
	 * - 'composable', 'composables'
	 * - 'repo', 'repos', 'repository', 'repositories'
	 *
	 * @default true
	 *
	 * @see [no-restricted-exports: `restrictDefaultExports` option](https://eslint.org/docs/latest/rules/no-restricted-exports#options)
	 */
	preferNamedExports?: boolean,

	/**
	 * Enforce a maximum depth that blocks can be nested to reduce code complexity.
	 *
	 * @default 3
	 *
	 * @see [max-depth](https://eslint.org/docs/latest/rules/max-depth)
	 */
	maxDepth?: Exclude<MaxDepthOptions, Record<string, unknown>>,

	/**
	 * Enforce a maximum depth that callbacks can be nested to increase code clarity.
	 *
	 * @default 3
	 *
	 * @see [max-nested-callbacks](https://eslint.org/docs/latest/rules/max-nested-callbacks)
	 */
	maxNestedCallbacks?: Exclude<MaxNestedCallbacksOptions, Record<string, unknown>>,
}

export type { BaseOptions };

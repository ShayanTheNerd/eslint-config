import type { RuleOptions } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

interface BaseTailwindOptions extends ConfigWithOverrides {
	/** Path to the _tailwind.config.js_ file, relative to the current working directory (**v3**).
	 *
	 * @see [better-tailwindcss: `tailwindConfig` option](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#tailwindconfig)
	*/
	config?: string,

	/** Path to the CSS-based Tailwind config file, relative to the current working directory (**only v4**).
	 *
	 * @see [better-tailwindcss: `entryPoint` option](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#entrypoint)
	*/
	entryPoint?: string,

	/**
	 * Enforce breaking Tailwind classes into multiple lines if they exceed the line length defined by `stylistic.maxLineLength`.
	 *
	 * @default true
	 *
	 * @see [better-tailwindcss/enforce-consistent-line-wrapping](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md)
	 */
	multilineSort?: boolean,

	/**
	 * Regex patterns of unregistered class names that should be ignored.
	 *
	 * [Component classes](https://tailwindcss.com/docs/adding-custom-styles#adding-component-classes) are detected automatically and don't need to be ignored.
	 *
	 * @default []
	 *
	 * @see [better-tailwindcss/no-unregistered-classes: `ignore` option](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unregistered-classes.md#ignore)
	 */
	ignoredUnregisteredClasses?: RuleOptions<'better-tailwindcss/no-unregistered-classes'>['ignore'],
}

interface EntryPointRequired {
	entryPoint: string,
}

interface ConfigRequired {
	config: string,
}

type TailwindOptions = BaseTailwindOptions & (ConfigRequired | EntryPointRequired);

export type { TailwindOptions };

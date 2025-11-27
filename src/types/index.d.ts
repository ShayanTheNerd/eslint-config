import type { Linter } from 'eslint';
import type { ConfigWithExtends } from 'typescript-eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { CSSOptions } from '#types/configOptions/css.d.ts';
import type { VueOptions } from '#types/configOptions/vue.d.ts';
import type { BaseOptions } from '#types/configOptions/base.d.ts';
import type { HTMLOptions } from '#types/configOptions/html.d.ts';
import type { NuxtOptions } from '#types/configOptions/nuxt.d.ts';
import type { TestOptions } from '#types/configOptions/test.d.ts';
import type { ImportXOptions } from '#types/configOptions/importX.d.ts';
import type { TailwindOptions } from '#types/configOptions/tailwind.d.ts';
import type { StylisticOptions } from '#types/configOptions/stylistic.d.ts';
import type { TypeScriptOptions } from '#types/configOptions/typescript.d.ts';
import type { PerfectionistOptions } from '#types/configOptions/perfectionist.d.ts';

type ConfigObject = ConfigWithExtends & { rules?: Linter.RulesRecord };

type ConfigOverrides = Pick<ConfigObject, 'name' | 'files' | 'rules' | 'ignores' | 'plugins' | 'settings'>;

interface ConfigWithOverrides {
	/**
	 * Override the configuration.
	 *
	 * The properties of this object are merged with and take precedence over the default configuration.
	 *
	 * There is no guarantee that the resulting configuration works correctly — it depends on the options you provide.
	 *
	 * @see [eslint-flat-config-utils: `mergeConfigs`](https://jsr.io/@antfu/eslint-flat-config-utils/doc/~/mergeConfigs)
	 */
	overrides?: ConfigOverrides & {
		rules?: Linter.RulesRecord,
		languageOptions?: {
			parser?: DeepNonNullable<ConfigObject>['languageOptions']['parser'],
			globals?: DeepNonNullable<ConfigObject>['languageOptions']['globals'],
		},
	},
}

/** The options passed to the `defineConfig` function. */
interface Options {
	/**
	 * Automatically enable configurations based on the detected dependencies, dev-dependencies, etc. in the _package.json_ file.
	 *
	 * Set to `'verbose'` to log the detected dependencies.
	 *
	 * Use the `packageDir` option to specify the path to the _package.json_ file.
	 *
	 * @default true
	 */
	autoDetectDeps?: boolean | 'verbose',

	/**
	 * Path to the _.gitignore_ file (relative to the current working directory).
	 *
	 * ESLint will ignore files and directories found in your _.gitignore_ file. Set to `false` to disable this behavior.
	 *
	 * It will fall back to the default value if set to an empty string (`''`).
	 *
	 * @default '.gitignore'
	 *
	 * @see [ESLint Ignore: Including GitIgnore Files](https://eslint.org/docs/latest/use/configure/ignore#including-gitignore-files)
	 */
	gitignore?: false | string,

	/**
	 * Path to directory of the _package.json_ file (relative to the current working directory).
	 *
	 * This is used by
	 * - `autoDetectDeps` option
	 * - [import-x/no-extraneous-dependencies: `packageDir` option](https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md#packagedir)
	 * - [storybook/no-uninstalled-addons: `packageJsonLocation` option](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/no-uninstalled-addons.md#packagejsonlocation)
	 *
	 * It will fall back to the default value if set to an empty string (`''`).
	 *
	 * @default '.'
	 */
	packageDir?: string,

	/**
	 * Specify the runtime environment to correctly resolve its built-in modules
	*
	* This is used by
	* [perfectionist/sort-imports: `env` option](https://perfectionist.dev/rules/sort-imports#environment)
	* to recognize the environment’s built-in modules when sorting the imports.
	*
	* @default 'node'
	*/
	env?: 'bun' | 'node',

	/**
	 * The path and the name of the root TypeScript config file.
	 *
	 * If you don't use TypeScript, provide the path and the name of the root JavaScript config file.
	 *
	 * This is used by
	 * - [better-tailwindcss: `tsconfig` option](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#tsconfig)
	 * - [perfectionist/sort-imports: `tsconfig` option](https://perfectionist.dev/rules/sort-imports#tsconfig)
	 *
	 * @default undefined // `{ rootDir: '.', filename: 'tsconfig.json' }` if "typescript" is detected in the package.json file when `autoDetectDeps` is enabled
	 */
	tsConfig?: false | {
		/**
		 * The directory of the root TypeScript config file.
		 *
	 	 * If you don't use TypeScript, provide the directory of the root JavaScript config file.
		 *
		 * It will fall back to the default value if set to an empty string (`''`).
	   *
		 * @default '.'
		 */
		rootDir: string,

		/**
		 * The name of the root TypeScript config file.
		 *
		 * If you don't use TypeScript, provide the name of the root JavaScript config file.
		 *
		 * It will fall back to the default value if set to an empty string (`''`).
		 *
		 * @default 'tsconfig.json'
		 */
		filename?: string,
	},

	/*** Global ***/
	/**
	 * Global configuration options applied to all files. Individual configurations will override these.
	 *
	 * @default
	 * {
	 *   name: 'shayanthenerd/eslint-config',
	 *   basePath: '.',
	 *   linterOptions: {
	 *     noInlineConfig: true,
	 *     reportUnusedInlineConfigs: 'warn',
	 *     reportUnusedDisableDirectives: 'warn'
	 *   }
	 *   languageOptions: {
	 *     parserOptions: {},
	 *     sourceType: 'module',
	 *     ecmaVersion: 'latest',
	 *   },
	 * }
	 */
	global?: {
		/**
		 * A name for the configuration object. This is used in error messages and [config inspector](https://github.com/eslint/config-inspector) to help identify which configuration object is being used.
		 *
		 * It will fall back to the default value if set to an empty string (`''`).
		 *
		 * @default 'shayanthenerd/eslint-config'
		 *
		 * @see [ESLint Configuration: Naming Conventions](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-naming-conventions)
		 */
		name?: string,

		/**
		 * The base path for resolving `files` and `ignores` patterns.
		 *
		 * Glob patterns in the configuration objects will be resolved relative to this path.
		 *
		 * It will fall back to the default value if set to an empty string (`''`).
		 *
		 * @default '.'
		 *
		 * @see [ESLint Configuration: Specifying Base Path](https://eslint.org/docs/latest/use/configure/configuration-files#specifying-base-path)
		 */
		basePath?: string,

		/**
		 * Patterns that ESLint should ignore globally. These patterns are resolved relative to the current working directory.
		 *
		 * @see [ESLint Configuration: Globally Ignoring Files](https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores)
		 */
		ignores?: string[],

		/**
		 * Specify global variables.
		 *
		 * @default
		 * {
		 *   node: true,
		 *   commonjs: false,
		 *   browser: true,
		 *   worker: true,
		 *   serviceworker: false,
		 *   webextension: false,
		 *   custom: {},
		 * }
		 *
		 * @see [Language Options: Specifying Globals: Using Configuration Files](https://eslint.org/docs/latest/use/configure/language-options#using-configuration-files)
		 */
		globals?: {
			node?: boolean,
			commonjs?: boolean,
			browser?: boolean,
			worker?: boolean,
			serviceworker?: boolean,
			webextension?: boolean,
			custom?: Linter.LanguageOptions['globals'],
		},

		/**
		 * Specify the linting process.
		 *
		 * @see [ESLint Configuration: Linter Options](https://eslint.org/docs/latest/use/configure/configuration-files#configuring-linter-options)
		 */
		linterOptions?: {
			/**
			 * Disallow inline (comment) configurations and disable-directives.
			 *
			 * @default false
			 *
			 * @see [ESLint Configuration: Disabling Inline Configuration](https://eslint.org/docs/latest/use/configure/configuration-files#disabling-inline-configuration)
			 */
			noInlineConfig?: Linter.LintOptions['allowInlineConfig'],

			/**
			 * A severity string indicating if and how unused inline configs should be tracked and reported.
			 *
			 * @default 'warn'
			 *
			 * @see [ESLint Configuration: Reporting Unused Inline Configs](https://eslint.org/docs/latest/use/configure/configuration-files#reporting-unused-inline-configs)
			 */
			reportUnusedInlineConfigs?: Linter.StringSeverity,

			/**
			 * A severity string indicating if and how unused disable and enable directives should be tracked and reported.
			 *
			 * @default 'warn'
			 *
			 * @see [ESLint Configuration: Reporting Unused Disable Directives](https://eslint.org/docs/latest/use/configure/configuration-files#reporting-unused-disable-directives)
			 */
			reportUnusedDisableDirectives?: Linter.StringSeverity,
		},

		/**
		 * Settings shared across all rules. Use this to specify information that should be available to every rule.
		 *
		 * @see [ESLint Configuration: Shared Settings](https://eslint.org/docs/latest/use/configure/configuration-files#configuring-shared-settings)
		*/
		settings?: ConfigObject['settings'],

		/**
		 * The available rules.
		 *
		 * @see [ESLint Configuration: Rules](https://eslint.org/docs/latest/use/configure/configuration-files#configuring-rules)
		*/
		rules?: Linter.RulesRecord,
	},

	/*** Configs ***/
	/**
	 * Enable, disable, or customize the configurations.
	 *
	 * `autoDetectDeps` can enable configurations that are disabled by default. However, explicitly enabling or disabling a configuration takes precedence over `autoDetectDeps`.
	 */
	configs?: {
		/**
		 * Use [eslint-plugin-oxlint](https://github.com/oxc-project/eslint-plugin-oxlint) to disable rules that are already handled by OXLint.
		 *
		 * Provide the path to your OXLint configuration file (relative to the current working directory) or set to `false` to disable it.
		 *
		 * Enabling this improves performance and feedback loops when using OXLint.
		 *
		 * It will fall back to the default value if set to an empty string (`''`).
		 *
		 * @default false // `'.oxlintrc.json'` if "oxlint" is detected in the package.json file when `autoDetectDeps` is enabled
		 */
		oxlint?: false | string,

		/**
		 * Customize some of the JavaScript (core) rules.
		 *
		 * JavaScript rules cannot be turned off.
		 */
		base?: BaseOptions,

		/**
		 * Use [@stylistic/eslint-plugin](https://eslint.style) to enforce stylistic rules such as indentation, line length, spacing, quotes, semicolons, etc.
		 *
		 * @default true
		 */
		stylistic?: boolean | StylisticOptions,

		/**
		 * Use [@html-eslint/eslint-plugin](https://html-eslint.org) to enforce SEO and accessibility best practices, as well as some stylistic rules.
		 *
		 * @default false
		 */
		html?: boolean | HTMLOptions,

		/**
		 * Use [@eslint/css](https://github.com/eslint/css) to enforce CSS best practices and identify mistakes.
		 *
		 * @default false
		 */
		css?: boolean | CSSOptions,

		/**
		 * Use [eslint-plugin-better-tailwindcss](https://github.com/schoero/eslint-plugin-better-tailwindcss) to sort Tailwind classes, check for unused or conflicting ones, and enforce best practices.
		 *
		 * @default false
		 */
		tailwind?: false | TailwindOptions,

		/**
		 * Use [typescript-eslint](https://typescript-eslint.io) to enforce TypeScript-specific rules.
		 *
		 * Setting this to `false` doesn't prevent ESLint from linting TypeScript files.
		 *
		 * This enables
		 * - [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x) to better understand imports from TypeScript files such as ".ts", ".tsx", etc.
		 * - [eslint-plugin-vue](https://eslint.vuejs.org) to enforce TypeScript-specific rules in the `<script setup lang="ts">` of Vue SFCs.
		 *
		 * @default false // `true` if "typescript" is detected in the package.json file when `autoDetectDeps` is enabled
		 */
		typescript?: boolean | TypeScriptOptions,

		/**
		 * Use [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x) to organize imports and exports, and detect related issues.
		 *
		 * @default true
		 */
		importX?: boolean | ImportXOptions,

		/**
		 * Use [eslint-plugin-perfectionist](https://perfectionist.dev) to sort imports, exports, maps, union types, etc.
		 *
		 * @default true
		 */
		perfectionist?: boolean | PerfectionistOptions,

		/**
		 * Use [eslint-plugin-vue](https://eslint.vuejs.org) to enforce Vue best practices, accessibility guidelines, stylistic rules, and identify mistakes.
		 *
		 * @default false // `true` if "vue" is detected in the package.json file when `autoDetectDeps` is enabled
		 */
		vue?: boolean | VueOptions,

		/**
		 * Whether [Nuxt](https://nuxt.com) is used in the project.
		 *
		 * Enforce best practices and the use of Nuxt-specific components over their standard counterparts. For example, `<NuxtLink>` must be used instead of `<a>`, and `<NuxtTime>` instead of `<time>`.
		 *
		 * **This configuration requires `configs.vue` to be enabled.**
		 *
		 * @default false // `true` if "nuxt" is detected in the package.json file when `autoDetectDeps` is enabled
		 */
		nuxt?: boolean | NuxtOptions,

		/**
		 * Configuration options for the testing tools.
		 */
		test?: TestOptions,
	},
}

export type { Options, ConfigObject, ConfigWithOverrides };

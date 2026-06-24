import type { Linter } from 'eslint';
import type { VueOptions } from '#types/options/vue.d.ts';
import type { ZodOptions } from '#types/options/zod.d.ts';
import type { BaseOptions } from '#types/options/base.d.ts';
import type { NuxtOptions } from '#types/options/nuxt.d.ts';
import type { TestOptions } from '#types/options/test.d.ts';
import type { ReactOptions } from '#types/options/react.d.ts';
import type { BaselineOptions } from '#types/options/baseline.d.ts';
import type { MarkdownOptions } from '#types/options/markdown.d.ts';
import type { TailwindOptions } from '#types/options/tailwind.d.ts';
import type { StylisticOptions } from '#types/options/stylistic.d.ts';
import type { PluginRules, RuleOptions } from '#types/eslintRules.d.ts';
import type { TypeScriptOptions } from '#types/options/typescript.d.ts';

type ConfigOverrides = Pick<Linter.Config, 'name' | 'files' | 'ignores' | 'plugins' | 'settings' | 'languageOptions'>;

interface ConfigWithOverrides<ConfigRules extends Linter.RulesRecord> {
  /**
   * Override the current configuration object.
   *
   * The properties of this object are merged with and take precedence over the properties of the default configuration object.
   *
   * @see [eslint-flat-config-utils: `mergeConfigs`](https://jsr.io/@antfu/eslint-flat-config-utils/doc/~/mergeConfigs)
   */
  overrides?: ConfigOverrides & {
    /** The rules to override in the current configuration object. */
    rules?: ConfigRules,
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
   * Specify the runtime environment.
   *
   * This is used by
   * - `configs.useBaseline` option (disabled when `env` is set to a value other than `'browser'`)
   * - [ESLint: Specifying Globals](https://eslint.org/docs/latest/use/configure/language-options#using-configuration-files)
   * - [perfectionist/sort-imports: `env` option](https://perfectionist.dev/rules/sort-imports#environment)
   *
   * @default 'browser'
   */
  env?: 'bun' | 'deno' | 'node' | 'browser',

  /**
   * Path to the _.gitignore_ file (relative to the current working directory).
   *
   * ESLint will ignore files and directories found in your _.gitignore_ file. Set to `false` to disable this behavior.
   *
   * It will fall back to the default value if set to an empty string (`''`).
   *
   * @default '.gitignore'
   *
   * @see [ESLint Ignore: Including GitIgnore Files](https://eslint.org/docs/latest/use/configure/ignore#include-gitignore-files)
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
   * The path and the name of the root TypeScript config file.
   *
   * This is used by
   * - [better-tailwindcss: `tsconfig` option](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md#tsconfig)
   * - [perfectionist/sort-imports: `tsconfig` option](https://perfectionist.dev/rules/sort-imports#tsconfig)
   *
   * @default undefined // `{ rootDir: '.', filename: 'tsconfig.json' }` if TypeScript integration is enabled
   */
  tsConfig?: false | {
    /**
     * The name of the root TypeScript config file.
     *
     * It will fall back to the default value if set to an empty string (`''`).
     *
     * @default 'tsconfig.json'
     */
    filename?: string,

    /**
     * The directory of the root TypeScript config file.
     *
     * It will fall back to the default value if set to an empty string (`''`).
     *
     * @default '.'
     */
    rootDir: string,
  },

  /*** Project ***/
  /**
   * Configuration options applied to all files. Individual configurations will override these.
   *
   * @default
   * {
   *   basePath: '.',
   *   languageOptions: {
   *     parserOptions: {},
   *     sourceType: 'module',
   *     ecmaVersion: 'latest',
   *   },
   *   linterOptions: {
   *     noInlineConfig: false,
   *     reportUnusedInlineConfigs: 'warn',
   *     reportUnusedDisableDirectives: 'warn'
   *   }
   *   name: 'shayanthenerd/project',
   * }
   */
  project?: {
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
     * Specify global variables.
     *
     * @default
     * {
     *   astro: false, // `true` if `configs.astro` is enabled
     *   audioWorklet: false, // `true` if `env` is set to `browser`
     *   browser: true, // `true` if `env` is set to `browser`
     *   bun: false, // `true` if `env` is set to `bun`
     *   commonjs: false,
     *   deno: false, // `true` if `env` is set to `deno`
     *   node: true,
     *   nodeBuiltin: false, // `true` if `env` is set to `node`
     *   serviceworker: false, // `true` if `env` is set to `browser`
     *   sharedWorker: false, // `true` if `env` is set to `browser`
     *   vitest: false,
     *   vue: false, // `true` if `configs.vue` is enabled
     *   webextension: false, // `true` if `env` is set to `browser`
     *   worker: true,
     *   custom: {},
     * }
     *
     * @see [Language Options: Specifying Globals](https://eslint.org/docs/latest/use/configure/language-options#using-configuration-files)
     */
    globals?: {
      astro?: boolean,
      audioWorklet?: boolean,
      browser?: boolean,
      bun?: boolean,
      commonjs?: boolean,
      deno?: boolean,
      node?: boolean,
      nodeBuiltin?: boolean,
      serviceworker?: boolean,
      sharedWorker?: boolean,
      vitest?: boolean,
      vue?: boolean,
      webextension?: boolean,
      worker?: boolean,
      custom?: Linter.LanguageOptions['globals'],
    },

    /**
     * Patterns that ESLint should ignore globally. These patterns are resolved relative to the current working directory.
     *
     * @see [ESLint Configuration: Globally Ignoring Files](https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores)
     */
    ignores?: string[],

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
     * The available rules.
     *
     * @see [ESLint Configuration: Rules](https://eslint.org/docs/latest/use/configure/configuration-files#configuring-rules)
    */
    rules?: Linter.RulesRecord,

    /**
     * Settings shared across all rules. Use this to specify information that should be available to every rule.
     *
     * @see [ESLint Configuration: Shared Settings](https://eslint.org/docs/latest/use/configure/configuration-files#configuring-shared-settings)
    */
    settings?: Linter.Config['settings'],
  },

  /*** Configs ***/
  /**
   * Enable, disable, or customize the configurations.
   *
   * `autoDetectDeps` can enable configurations that are disabled by default. However, explicitly enabling or disabling a configuration takes precedence over `autoDetectDeps`.
   */
  configs?: {
    /**
     * Use [eslint-plugin-astro](https://ota-meshi.github.io/eslint-plugin-astro) and [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) to enforce Astro best practices and accessibility guidelines.
     *
     * @default false // `true` if "astro" is detected in the dependencies when `autoDetectDeps` is enabled
     */
    astro?: boolean | ConfigWithOverrides<PluginRules<'astro'>>,

    /**
     * Customize some of the JavaScript (core) rules.
     *
     * JavaScript rules cannot be turned off.
     */
    base?: BaseOptions,

    /**
     * Use [@eslint/css](https://github.com/eslint/css) to enforce CSS best practices and identify mistakes.
     *
     * @default false
     */
    css?: boolean | ConfigWithOverrides<PluginRules<'css'>>,

    /**
     * Use [@html-eslint/eslint-plugin](https://html-eslint.org) to enforce SEO and accessibility best practices, as well as some stylistic rules.
     *
     * @default false
     */
    html?: boolean | (ConfigWithOverrides<PluginRules<'@html-eslint'>> & {
      /**
       * Enforce consistent naming convention for `id` attribute values.
       *
       * @default 'snake_case'
       *
       * @see [@html-eslint/id-naming-convention](https://html-eslint.org/docs/rules/id-naming-convention)
       */
      idNamingConvention?: Exclude<RuleOptions<'@html-eslint/id-naming-convention'>, 'regex'>,
    }),

    /**
     * Use [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x) to organize imports and exports, and detect related issues.
     *
     * @default true
     */
    importX?: boolean | ConfigWithOverrides<PluginRules<'import-x'>>,

    /**
     * Use [@eslint/markdown](https://github.com/eslint/markdown) to enforce best practices for Markdown files.
     *
     * @default true
     */
    markdown?: boolean | MarkdownOptions,

    /**
     * Use [@next/eslint-plugin-next](https://github.com/vercel/next.js/tree/HEAD/packages/eslint-plugin-next) to enforce Next.js best practices and catch common mistakes.
     *
     * @default false // `true` if "next" is detected in the dependencies when `autoDetectDeps` is enabled
     */
    next?: boolean | ConfigWithOverrides<PluginRules<'next'>>,

    /**
     * Use [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n) to enforce Node.js best practices and catch common mistakes.
     *
     * Some rules depend on the specified Node.js version. Visit the documentation for [version-resolution options and project-specific configurations](https://github.com/eslint-community/eslint-plugin-n#configured-nodejs-version-range).
     *
     * @default true
     */
    node?: boolean | ConfigWithOverrides<PluginRules<'n'>>,

    /**
     * Whether [Nuxt](https://nuxt.com) is used in the project.
     *
     * Enforce best practices and the use of Nuxt-specific components over their standard counterparts. For example, `<NuxtLink>` must be used instead of `<a>`, and `<NuxtTime>` instead of `<time>`.
     *
     * **This configuration requires `configs.vue` to be enabled.**
     *
     * @default false // `true` if "nuxt" is detected in the dependencies when `autoDetectDeps` is enabled
     */
    nuxt?: boolean | NuxtOptions,

    /**
     * Use [eslint-plugin-package-json](https://github.com/JoshuaKGoldberg/eslint-plugin-package-json) to ensure _package.json_ files are consistent, readable, and valid.
     *
     * @default true
     */
    packageJson?: boolean | ConfigWithOverrides<PluginRules<'package-json'>>,

    /**
     * Use [eslint-plugin-perfectionist](https://perfectionist.dev) to sort imports, exports, maps, union types, etc.
     *
     * @default true
     */
    perfectionist?: boolean | (ConfigWithOverrides<PluginRules<'perfectionist'>> & {
      /**
       * The type of sorting.
       *
       * @default 'line-length'
       *
       * @see [Perfectionist Settings: `type` option](https://perfectionist.dev/guide/getting-started#settings)
       */
      sortType?: Exclude<RuleOptions<'perfectionist/sort-imports'>['type'], 'type-import-first'>,
    }),

    /**
     * Use [eslint-plugin-promise](https://github.com/eslint-community/eslint-plugin-promise) to enforce best practices for JavaScript promises.
     *
     * @default true
     */
    promise?: boolean | ConfigWithOverrides<PluginRules<'promise'>>,

    /**
     * Use [@eslint-react/eslint-plugin](https://eslint-react.xyz), [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y), and [@html-eslint/eslint-plugin-react](https://html-eslint.org/docs/react/getting-started) to enforce React best practices and accessibility guidelines.
     *
     * @default false // `true` if "react" is detected in the dependencies when `autoDetectDeps` is enabled
     */
    react?: boolean | ReactOptions,

    /**
     * Use [@stylistic/eslint-plugin](https://eslint.style) to enforce stylistic rules such as indentation, line length, spacing, quotes, semicolons, etc.
     *
     * @default true
     */
    stylistic?: boolean | StylisticOptions,

    /**
     * Use [eslint-plugin-better-tailwindcss](https://github.com/schoero/eslint-plugin-better-tailwindcss) to sort Tailwind classes, check for unused or conflicting ones, and enforce best practices.
     *
     * @default false
     */
    tailwind?: false | TailwindOptions,

    /**
     * Configuration options for the testing tools.
     */
    test?: TestOptions,

    /**
     * Use [@typescript-eslint](https://typescript-eslint.io) to enforce TypeScript-specific rules.
     *
     * Setting this to `false` doesn't prevent ESLint from linting TypeScript files.
     *
     * This allows
     * - [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x) to better understand imports from TypeScript files such as ".ts", ".tsx", etc.
     * - [eslint-plugin-vue](https://eslint.vuejs.org) to enforce TypeScript-specific rules in the `<script setup lang="ts">` of Vue SFCs.
     *
     * @default false // `true` if "typescript" is detected in the dependencies when `autoDetectDeps` is enabled
     */
    typescript?: boolean | TypeScriptOptions,

    /**
     * Use [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) to enforce general best practices and catch common mistakes.
     *
     * @default true
     */
    unicorn?: boolean | ConfigWithOverrides<PluginRules<'unicorn'>>,

    /**
     * Use [eslint-plugin-baseline-js](https://github.com/3ru/eslint-plugin-baseline-js), [css/use-baseline](https://github.com/eslint/css/blob/main/docs/rules/use-baseline.md#options), [@html-eslint/use-baseline](https://html-eslint.org/docs/rules/use-baseline#options), and [@html-eslint/react/use-baseline](https://github.com/eslint/css/blob/main/docs/rules/use-baseline.md#options) to enforce the use of baseline features.
     *
     * @default true // `false` if `env` is set to a value other than `'browser'`
     */
    useBaseline?: boolean | BaselineOptions,

    /**
     * Use [eslint-plugin-vue](https://eslint.vuejs.org) to enforce Vue best practices, accessibility guidelines, stylistic rules, and identify mistakes.
     *
     * @default false // `true` if "vue" is detected in the dependencies when `autoDetectDeps` is enabled
     */
    vue?: boolean | VueOptions,

    /**
     * Use [eslint-plugin-zod](https://github.com/marcalexiei/eslint-zod/tree/main/plugins/eslint-plugin-zod) or [eslint-plugin-zod-mini](https://github.com/marcalexiei/eslint-zod/tree/main/plugins/eslint-plugin-zod-mini) to enforce best practices for defining Zod schemas.
     *
     * @default false // `true` if "zod" is detected in the dependencies when `autoDetectDeps` is enabled
     */
    zod?: boolean | ZodOptions,
  },
}

export type { Options, ConfigWithOverrides };

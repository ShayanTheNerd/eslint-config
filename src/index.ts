import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';

import eslintPluginOXLint from 'eslint-plugin-oxlint';
import { globalIgnores, defineConfig as defineESLintConfig } from 'eslint/config';
import path from 'node:path';

import { getCSSConfig } from '#configs/css.ts';
import { getVueConfig } from '#configs/vue.ts';
import { getZodConfig } from '#configs/zod.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getBaseConfig } from '#configs/base.ts';
import { getHTMLConfig } from '#configs/html.ts';
import { getAstroConfig } from '#configs/astro.ts';
import { getVitestConfig } from '#configs/vitest.ts';
import { getCypressConfig } from '#configs/cypress.ts';
import { getImportXConfig } from '#configs/importX.ts';
import { getPromiseConfig } from '#configs/promise.ts';
import { getMarkdownConfig } from '#configs/markdown.ts';
import { getTailwindConfig } from '#configs/tailwind.ts';
import { getStorybookConfig } from '#configs/storybook.ts';
import { getStylisticConfig } from '#configs/stylistic.ts';
import { getPlaywrightConfig } from '#configs/playwright.ts';
import { getTypeScriptConfig } from '#configs/typescript.ts';
import { getPackageJsonConfig } from '#configs/packageJson.ts';
import { getPerfectionistConfig } from '#configs/perfectionist.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { getRestrictedExports } from '#configs/restrictedExports.ts';
import { getOXLintOverridesConfig } from '#configs/oxlintOverrides.ts';
import { getIgnorePatterns } from '#helpers/ignores/getIgnorePatterns.ts';
import { mergeWithDefaults } from '#helpers/options/mergeWithDefaults.ts';
import { getVueComponentNamesConfig } from '#configs/vueComponentNames.ts';
import { getVueServerComponentsConfig } from '#configs/vueServerComponents.ts';

/** Valid argument combinations for the `defineConfig` function. */
type DefineConfigArguments =
  | []
  | [options: Options]
  | [configs: Linter.Config[]]
  | [options: Options, configs: Linter.Config[]];

/**
 * Define your ESLint configuration based on the provided options and/or custom Flat Config Objects.
 *
 * @param {...DefineConfigArguments} args The configuration options and/or custom Flat Config objects.
 * @returns {Linter.Config[]} The merged ESLint configuration array
 *
 * @example
 * defineConfig();
 * // or
 * defineConfig({ autoDetectDeps: 'verbose' });
 * // or
 * defineConfig([
 *   {
 *     name: 'custom',
 *     rules: {
 *       'no-console': 'error',
 *     },
 *   },
 *   { ... },
 * ]);
 * // or
 * defineConfig(
 *   { autoDetectDeps: 'verbose' },
 *   [
 *     {
 *       name: 'custom',
 *       rules: {
 *         'no-console': 'error',
 *       },
 *     },
 *     { ... },
 *   ],
 * );
 */
function defineConfig(...args: DefineConfigArguments): Linter.Config[] {
  let options: Options = {};
  let configs: Linter.Config[] = [];

  /* Destructuing here instead of within the function signature allows for better alignment with `args` in JSDoc. */
  const [firstArgument, secondArgument] = args;

  if (Array.isArray(firstArgument)) {
    configs = firstArgument;
  } else if (firstArgument) {
    options = firstArgument;
    configs = secondArgument ?? [];
  }

  const mergedOptions = mergeWithDefaults(options);
  const {
    gitignore,
    global: {
      rules,
      ignores,
      settings,
      linterOptions,
    },
    configs: {
      css,
      vue,
      zod,
      html,
      nuxt,
      astro,
      oxlint,
      importX,
      promise,
      markdown,
      tailwind,
      stylistic,
      typescript,
      packageJson,
      perfectionist,
      base: {
        preferNamedExports,
      },
      test: {
        vitest,
        cypress,
        storybook,
        playwright,
      },
    },
  } = mergedOptions;

  const ignorePatterns = getIgnorePatterns({ gitignore, patterns: ignores });
  const oxlintConfigPath = oxlint ? path.resolve(oxlint || defaultOptions.configs.oxlint) : '';
  const oxlintOverrides = oxlint
    ? eslintPluginOXLint
      .buildFromOxlintConfigFile(oxlintConfigPath)
      .filter((config) => config.name !== 'oxlint/vue-svelte-exceptions') // [TODO] Required?
    : [];

  const configObjects = [
    {
      name: 'shayanthenerd/global',
      rules,
      linterOptions,
      ...((Object.keys(settings).length > 0) && { settings }),
    },
    globalIgnores(ignorePatterns, 'shayanthenerd/ignores'),
    getBaseConfig(mergedOptions),

    isEnabled(typescript) && getTypeScriptConfig(mergedOptions),
    isEnabled(promise) && getPromiseConfig(mergedOptions),
    isEnabled(importX) && getImportXConfig(mergedOptions),
    preferNamedExports && getRestrictedExports(),
    isEnabled(stylistic) && getStylisticConfig(mergedOptions),
    isEnabled(perfectionist) && getPerfectionistConfig(mergedOptions),

    isEnabled(packageJson) && getPackageJsonConfig(mergedOptions),
    isEnabled(markdown) && getMarkdownConfig(mergedOptions),
    isEnabled(html) && getHTMLConfig(mergedOptions),
    isEnabled(css) && getCSSConfig(mergedOptions),
    isEnabled(tailwind) && getTailwindConfig(mergedOptions),
    isEnabled(zod) && getZodConfig(mergedOptions),
    isEnabled(astro) && getAstroConfig(mergedOptions),
    isEnabled(vue) && getVueConfig(mergedOptions),
    isEnabled(vue) && getVueComponentNamesConfig(),
    (isEnabled(vue) && isEnabled(nuxt)) && getVueServerComponentsConfig(),

    isEnabled(storybook) && getStorybookConfig(mergedOptions),
    isEnabled(vitest) && getVitestConfig(mergedOptions),
    isEnabled(cypress) && getCypressConfig(mergedOptions),
    isEnabled(playwright) && getPlaywrightConfig(mergedOptions),

    ...oxlintOverrides,
    oxlint && getOXLintOverridesConfig(mergedOptions),

    ...configs,
  ].filter(Boolean) as Linter.Config[];

  const eslintConfig = defineESLintConfig(configObjects);

  return eslintConfig;
}

export { defineConfig };

import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';

import { globalIgnores, defineConfig as defineESLintConfig } from 'eslint/config';

import { isTruthy } from '#utils/isTruthy.ts';
import { getCSSConfig } from '#configs/css.ts';
import { getVueConfig } from '#configs/vue.ts';
import { getZodConfig } from '#configs/zod.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getBaseConfig } from '#configs/base.ts';
import { getHTMLConfig } from '#configs/html.ts';
import { getNodeConfig } from '#configs/node.ts';
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
import { getIgnorePatterns } from '#helpers/ignores/getIgnorePatterns.ts';
import { mergeWithDefaults } from '#helpers/options/mergeWithDefaults.ts';
import { getVueComponentNamesConfig } from '#configs/vueComponentNames.ts';
import { getVueServerComponentsConfig } from '#configs/vueServerComponents.ts';
import { getRestrictedDefaultExports } from '#configs/restrictedDefaultExports.ts';

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

  /* Destructuring here instead of within the function signature allows for better alignment with `args` in JSDoc. */
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
    project: {
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
      node,
      nuxt,
      astro,
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

  const configObjects = [
    {
      name: 'shayanthenerd/project',
      rules,
      linterOptions,
      ...((Object.keys(settings).length > 0) && { settings }),
    },
    globalIgnores(ignorePatterns, 'shayanthenerd/ignores'),

    getBaseConfig(mergedOptions),
    isEnabled(typescript) && getTypeScriptConfig(mergedOptions),
    isEnabled(promise) && getPromiseConfig(mergedOptions),
    isEnabled(importX) && getImportXConfig(mergedOptions),
    preferNamedExports && getRestrictedDefaultExports(),
    isEnabled(stylistic) && getStylisticConfig(mergedOptions),
    isEnabled(perfectionist) && getPerfectionistConfig(mergedOptions),

    isEnabled(node) && getNodeConfig(mergedOptions),
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

    ...configs,
  ].filter(isTruthy);

  const eslintConfig = defineESLintConfig(configObjects);

  return eslintConfig;
}

export { defineConfig };

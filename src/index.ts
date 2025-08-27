import type { Linter } from 'eslint';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { globalIgnores } from 'eslint/config';
import eslintPluginOXLint from 'eslint-plugin-oxlint';
import { config as defineESLintConfig } from 'typescript-eslint';
import path from 'node:path';

import { getCSSConfig } from '#configs/css.ts';
import { getVueConfig } from '#configs/vue.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getBaseConfig } from '#configs/base.ts';
import { getHTMLConfig } from '#configs/html.ts';
import { getVitestConfig } from '#configs/vitest.ts';
import { getCypressConfig } from '#configs/cypress.ts';
import { getImportXConfig } from '#configs/importX.ts';
import { getTailwindConfig } from '#configs/tailwind.ts';
import { getStorybookConfig } from '#configs/storybook.ts';
import { getStylisticConfig } from '#configs/stylistic.ts';
import { getPlaywrightConfig } from '#configs/playwright.ts';
import { getTypeScriptConfig } from '#configs/typescript.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';
import { getPerfectionistConfig } from '#configs/perfectionist.ts';
import { getRestrictedExports } from '#configs/restrictedExports.ts';
import { getOXLintOverridesConfig } from '#configs/oxlintOverrides.ts';
import { getIgnorePatterns } from '#utils/ignores/getIgnorePatterns.ts';
import { mergeWithDefaults } from '#utils/options/mergeWithDefaults.ts';
import { getVueComponentNamesConfig } from '#configs/vueComponentNames.ts';
import { getVueServerComponentsConfig } from '#configs/vueServerComponents.ts';

/**
 * Define the ESLint configuration based on the provided options and any number of Flat Config objects.
 *
 * @param {Options} options - Options to configure and customize the config
 * @param {...ConfigObject} configs - Additional Flat Config objects to extend the config
 *
 * @returns {Linter.Config[]} The merged ESLint configuration array
 */
function defineConfig(options: Options = {}, ...configs: ConfigObject[]): Linter.Config[] {
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
			vue,
			css,
			nuxt,
			html,
			oxlint,
			importX,
			tailwind,
			stylistic,
			typescript,
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
	const oxlintConfigPath = path.resolve(oxlint || defaultOptions.configs.oxlint);

	const eslintConfig = defineESLintConfig(
		{
			name: 'shayanthenerd/global',
			linterOptions,
			settings,
			rules,
		},
		globalIgnores(ignorePatterns, 'shayanthenerd/ignores'),

		getBaseConfig(mergedOptions),
		preferNamedExports ? getRestrictedExports() : {},

		isEnabled(importX) ? getImportXConfig(mergedOptions) : {},
		isEnabled(stylistic) ? getStylisticConfig(mergedOptions) : {},
		isEnabled(perfectionist) ? getPerfectionistConfig(mergedOptions) : {},

		isEnabled(typescript) ? getTypeScriptConfig(mergedOptions) : {},
		isEnabled(html) ? getHTMLConfig(mergedOptions) : {},
		isEnabled(css) ? getCSSConfig(mergedOptions) : {},
		isEnabled(tailwind) ? getTailwindConfig(mergedOptions) : {},

		isEnabled(vue) ? getVueConfig(mergedOptions) : {},
		isEnabled(vue) ? getVueComponentNamesConfig() : {},
		isEnabled(vue) && isEnabled(nuxt) ? getVueServerComponentsConfig() : {},

		isEnabled(storybook) ? getStorybookConfig(mergedOptions) : {},
		isEnabled(vitest) ? getVitestConfig(mergedOptions) : {},
		isEnabled(playwright) ? getPlaywrightConfig(mergedOptions) : {},
		isEnabled(cypress) ? getCypressConfig(mergedOptions) : {},

		...(oxlint ? eslintPluginOXLint.buildFromOxlintConfigFile(oxlintConfigPath) : []),
		oxlint ? getOXLintOverridesConfig(mergedOptions) : {},

		...configs,
	);

	return eslintConfig as Linter.Config[];
}

export { defineConfig };

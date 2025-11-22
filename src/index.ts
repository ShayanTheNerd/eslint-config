import type { Linter } from 'eslint';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginOXLint from 'eslint-plugin-oxlint';
import { globalIgnores, defineConfig as defineESLintConfig } from 'eslint/config';
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
 * Define ESLint configuration based on the provided options and any number of Flat Config Objects.
 *
 * @param {Options} options - Options to configure and customize the config
 * @param {...ConfigObject} configs - Additional Flat Config Objects to extend the default config
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
	const oxlintConfigPath = oxlint ? path.resolve(oxlint || defaultOptions.configs.oxlint) : '';
	const oxlintOverrides = oxlint
		? eslintPluginOXLint
			.buildFromOxlintConfigFile(oxlintConfigPath)
			.filter((config) => config.name !== 'oxlint/vue-svelte-exceptions')
		: [];

	const configObjects = [
		globalIgnores(ignorePatterns, 'shayanthenerd/ignores'),

		{
			name: 'shayanthenerd/global',
			linterOptions,
			settings,
			rules,
		},
		getBaseConfig(mergedOptions),

		isEnabled(typescript) && getTypeScriptConfig(mergedOptions),
		isEnabled(html) && getHTMLConfig(mergedOptions),
		isEnabled(css) && getCSSConfig(mergedOptions),

		isEnabled(importX) && getImportXConfig(mergedOptions),
		preferNamedExports && getRestrictedExports(),
		isEnabled(stylistic) && getStylisticConfig(mergedOptions),
		isEnabled(perfectionist) && getPerfectionistConfig(mergedOptions),

		isEnabled(tailwind) && getTailwindConfig(mergedOptions),
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

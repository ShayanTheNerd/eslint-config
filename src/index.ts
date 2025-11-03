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

	const configObjects = [
		{
			name: 'shayanthenerd/global',
			linterOptions,
			settings,
			rules,
		},
		globalIgnores(ignorePatterns, 'shayanthenerd/ignores'),

		getBaseConfig(mergedOptions),
		preferNamedExports ? getRestrictedExports() : undefined,

		isEnabled(importX) ? getImportXConfig(mergedOptions) : undefined,
		isEnabled(stylistic) ? getStylisticConfig(mergedOptions) : undefined,
		isEnabled(perfectionist) ? getPerfectionistConfig(mergedOptions) : undefined,

		isEnabled(typescript) ? getTypeScriptConfig(mergedOptions) : undefined,
		isEnabled(html) ? getHTMLConfig(mergedOptions) : undefined,
		isEnabled(css) ? getCSSConfig(mergedOptions) : undefined,
		isEnabled(tailwind) ? getTailwindConfig(mergedOptions) : undefined,

		isEnabled(vue) ? getVueConfig(mergedOptions) : undefined,
		isEnabled(vue) ? getVueComponentNamesConfig() : undefined,
		isEnabled(vue) && isEnabled(nuxt) ? getVueServerComponentsConfig() : undefined,

		isEnabled(storybook) ? getStorybookConfig(mergedOptions) : undefined,
		isEnabled(vitest) ? getVitestConfig(mergedOptions) : undefined,
		isEnabled(playwright) ? getPlaywrightConfig(mergedOptions) : undefined,
		isEnabled(cypress) ? getCypressConfig(mergedOptions) : undefined,

		...(oxlint ? eslintPluginOXLint.buildFromOxlintConfigFile(oxlintConfigPath) : []),
		oxlint ? getOXLintOverridesConfig(mergedOptions) : undefined,

		...configs,
	].filter(Boolean);

	/* @ts-expect-error -- There's a type mismatch in the `extends` field. */
	const eslintConfig = defineESLintConfig(...configObjects);

	return eslintConfig as Linter.Config[];
}

export { defineConfig };

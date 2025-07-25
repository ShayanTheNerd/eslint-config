import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginVitest from '@vitest/eslint-plugin';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginPlaywright from 'eslint-plugin-playwright';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getVitestRules } from '#rules/vitest.ts';
import { getImportXRules } from '#rules/importX.ts';
import { getJavaScriptRules } from '#rules/javascript.ts';
import { getPlaywrightRules } from '#rules/playwright.ts';
import { getTypeScriptRules } from '#rules/typescript.ts';

function getOXLintOverridesConfig(options: DeepNonNullable<Options>): Linter.Config {
	const {
		vue,
		importX,
		typescript,
		test: {
			vitest,
			playwright,
		},
	} = options.configs;

	const vitestRules = getVitestRules(options);
	const importXRules = getImportXRules(options);
	const javascriptRules = getJavaScriptRules(options);
	const typescriptRules = getTypeScriptRules(options);
	const playwrightRules = getPlaywrightRules(options);

	const oxlintOverridesConfig = {
		name: 'shayanthenerd/oxlint/overrides',
		files: [globs.src, globs.commons, vue ? globs.vue : '', vitest || playwright ? globs.test : ''],
		plugins: {
			'vitest': eslintPluginVitest,
			'import-x': eslintPluginImportX,
			'playwright': eslintPluginPlaywright,
		},
		rules: {
			'max-depth': javascriptRules['max-depth'],
			'func-style': javascriptRules['func-style'],
			'max-nested-callbacks': javascriptRules['max-nested-callbacks'],

			'@typescript-eslint/consistent-type-definitions': isEnabled(typescript)
				? typescriptRules['@typescript-eslint/consistent-type-definitions']
				: 'off',

			'import-x/extensions': isEnabled(importX) ? importXRules['import-x/extensions'] : 'off',

			'playwright/max-nested-describe': isEnabled(playwright)
				? playwrightRules['playwright/max-nested-describe']
				: 'off',

			'vitest/consistent-test-it': isEnabled(vitest) ? vitestRules['vitest/consistent-test-it'] : 'off',
			'vitest/max-nested-describe': isEnabled(vitest) ? vitestRules['vitest/max-nested-describe'] : 'off',
		},
	} satisfies ConfigObject;

	/* @ts-expect-error - Incompatible `parser` types */
	return oxlintOverridesConfig;
}

export { getOXLintOverridesConfig };

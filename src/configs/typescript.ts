import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import typescriptESLint from 'typescript-eslint';
import { mergeConfigs } from 'eslint-flat-config-utils';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getTypeScriptRules } from '#rules/typescript.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getTypeScriptConfig(options: DeepNonNullable<Options>): Linter.Config {
	const { tsConfig, configs: { vue, typescript } } = options;
	const { allowedDefaultProjects } = isEnabled(typescript) ? typescript : defaultOptions.configs.typescript;
	const { overrides } = isEnabled(typescript) ? typescript : defaultOptions.configs.typescript;

	const typescriptConfig = {
		name: 'shayanthenerd/typescript',
		files: [globs.ts, vue ? globs.vue : ''],
		extends: [
			typescriptESLint.configs.strictTypeChecked,
			typescriptESLint.configs.stylisticTypeChecked,
		],
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: tsConfig ? tsConfig.rootDir : undefined,
				projectService: {
					allowDefaultProject: allowedDefaultProjects,
					defaultProject: tsConfig ? tsConfig.filename : undefined,
				},
			},
		},
		rules: getTypeScriptRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error - Incompatible `parser` types */
	return mergeConfigs(typescriptConfig, overrides);
}

export { getTypeScriptConfig };

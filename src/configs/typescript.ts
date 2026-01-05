import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import { parser as eslintParserTypeScript, plugin as eslintPluginTypeScript } from 'typescript-eslint';
import path from 'node:path';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getTypeScriptRules } from '#rules/typescript.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

type TypeScriptRules = ReturnType<typeof getTypeScriptRules>;
type TypeScriptConfig = Linter.Config & { rules: TypeScriptRules };

function getTypeScriptConfig(options: DeepNonNullable<Options>): TypeScriptConfig {
	const { tsConfig, configs: { vue, typescript } } = options;
	const { allowedDefaultProjects } = isEnabled(typescript) ? typescript : defaultOptions.configs.typescript;
	const { overrides } = isEnabled(typescript) ? typescript : defaultOptions.configs.typescript;

	const typescriptConfig = {
		name: 'shayanthenerd/typescript',
		files: isEnabled(vue) ? [globs.ts, globs.vue] : [globs.ts],
		plugins: {
			'@typescript-eslint': eslintPluginTypeScript,
		},
		languageOptions: {
			parser: eslintParserTypeScript,
			parserOptions: {
				warnOnUnsupportedTypeScriptVersion: false,
				tsconfigRootDir: tsConfig ? path.resolve(tsConfig.rootDir) : undefined,
				projectService: {
					defaultProject: tsConfig ? tsConfig.filename : undefined,
					allowDefaultProject: ['{prettier,eslint}.config.?([mc])ts', ...allowedDefaultProjects],
				},
			},
		},
		rules: getTypeScriptRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error — Incompatible `parser` types */
	return mergeConfigs(typescriptConfig, overrides);
}

export { getTypeScriptConfig };

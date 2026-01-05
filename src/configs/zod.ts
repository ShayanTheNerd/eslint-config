import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginZodX from 'eslint-plugin-zod-x';
import { mergeConfigs } from 'eslint-flat-config-utils';

import { globs } from '#utils/globs.ts';
import { getZodRules } from '#rules/zod.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

type ZodRules = ReturnType<typeof getZodRules>;
type ZodConfig = Linter.Config & { rules: ZodRules };

function getZodConfig(options: DeepNonNullable<Options>): ZodConfig {
	const { zod, vue } = options.configs;
	const { overrides } = isEnabled(zod) ? zod : defaultOptions.configs.zod;

	const zodConfig = {
		name: 'shayanthenerd/zod',
		files: isEnabled(vue) ? [globs.src, globs.vue] : [globs.src],
		plugins: {
			'zod-x': eslintPluginZodX,
		},
		rules: getZodRules(),
	} satisfies ConfigObject;

	/* @ts-expect-error — Incorrect type inference */
	return mergeConfigs(zodConfig, overrides);
}

export { getZodConfig };

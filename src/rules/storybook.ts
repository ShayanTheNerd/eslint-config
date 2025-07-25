import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import path from 'node:path';

function getStorybookRules(options: DeepNonNullable<Options>) {
	const storybookRules = {
		'storybook/csf-component': 'error',
		'storybook/no-stories-of': 'error',
		'storybook/meta-satisfies-type': 'warn',
		'storybook/no-uninstalled-addons': ['error', {
			packageJsonLocation: path.resolve(options.packageDir, 'package.json'),
		}],
	} satisfies PluginRules<'storybook'>;

	return storybookRules;
}

export { getStorybookRules };

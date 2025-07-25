import type { Linter } from 'eslint';
import type { ConfigObject } from '#types/index.d.ts';

import { globs } from '#utils/globs.ts';

function getVueComponentNamesConfig(): Linter.Config {
	const vueComponentNamesConfig = {
		name: 'shayanthenerd/vue/multi-word-component-names',
		files: [globs.vueComponentNames],
		ignores: [globs.vueComponentNamesIgnore],
		rules: {
			'vue/match-component-file-name': 'off',
			'vue/multi-word-component-names': 'off',
			'vue/component-definition-name-casing': 'off',
		},
	} satisfies ConfigObject;

	return vueComponentNamesConfig;
}

export { getVueComponentNamesConfig };

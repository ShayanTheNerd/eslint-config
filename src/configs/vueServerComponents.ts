import type { Linter } from 'eslint';
import type { ConfigObject } from '#types/index.d.ts';

import { globs } from '#utils/globs.ts';

function getVueServerComponentsConfig(): Linter.Config {
	const vueServerComponentsConfig = {
		name: 'shayanthenerd/vue/server-components',
		files: [globs.vueServerComponents],
		rules: {
			'vue/no-multiple-template-root': 'error',
		},
	} satisfies ConfigObject;

	return vueServerComponentsConfig;
}

export { getVueServerComponentsConfig };

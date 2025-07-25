import type { Linter } from 'eslint';
import type { ConfigObject } from '#types/index.d.ts';

import { globs } from '#utils/globs.ts';

function getNuxtMultiRootTemplateConfig(): Linter.Config {
	const nuxtMultiRootTemplateConfig = {
		name: 'shayanthenerd/nuxt/allow-multiple-template-root',
		files: [globs.vueMultiRootTemplate],
		rules: {
			'vue/no-multiple-template-root': 'off',
		},
	} satisfies ConfigObject;

	return nuxtMultiRootTemplateConfig;
}

export { getNuxtMultiRootTemplateConfig };

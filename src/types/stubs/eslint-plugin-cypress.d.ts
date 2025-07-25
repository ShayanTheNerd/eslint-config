declare module 'eslint-plugin-cypress' {
	import type { Linter } from 'eslint';

	const plugin: {
		configs: {
			recommended: Linter.Config,
		},
	};

	/* eslint-disable-next-line no-restricted-exports */
	export default plugin;
}

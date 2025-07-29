declare module 'eslint-plugin-cypress' {
	import type { Linter } from 'eslint';

	const plugin: {
		configs: {
			recommended: Linter.Config,
		},
	};

	export default plugin;
}

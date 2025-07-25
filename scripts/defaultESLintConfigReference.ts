import { defineConfig } from '../src/index.ts';

export default defineConfig({
	autoDetectDeps: false,
	configs: {
		oxlint: './src/oxlint.config.jsonc',
		html: true,
		css: true,
		stylistic: true,
		typescript: true,
		importX: true,
		perfectionist: true,
		tailwind: {
			entryPoint: '',
		},
		vue: true,
		nuxt: true,
		test: {
			storybook: true,
			vitest: true,
			playwright: true,
			cypress: true,
		},
	},
});

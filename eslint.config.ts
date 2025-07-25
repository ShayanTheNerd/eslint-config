import { defineConfig } from './src/index.ts';

export default defineConfig(
	{
		autoDetectDeps: 'verbose',
		configs: {
			test: {
				storybook: false,
			},
		},
	},
	{
		name: 'src/disables',
		files: ['./src/**/*.ts'],
		rules: {
			'complexity': 'off',
			'@typescript-eslint/no-unsafe-type-assertion': 'off',
		},
	},
);

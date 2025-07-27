import { defineConfig } from 'tsdown/config';

export default defineConfig({
	format: ['esm', 'cjs'],
	copy: ['./src/oxlint.config.jsonc'],
	entry: ['./src/index.ts', './src/prettier.config.ts'],
	exports: {
		customExports(packageExports) {
			packageExports['./types/*'] = './dist/types/*';
			packageExports['./oxlint'] = './dist/oxlint.config.jsonc';
			packageExports['./prettier'] = {
				import: './dist/prettier.config.js',
				require: './dist/prettier.config.cjs',
			};
			delete packageExports['./prettier.config'];

			return packageExports;
		},
	},
	dts: {
		isolatedDeclarations: true,
	},
	unused: {
		ignore: ['eslint-import-resolver-typescript'],
	},
	publint: true,
	unbundle: true,
});

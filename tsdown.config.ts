import { defineConfig } from 'tsdown/config';

export default defineConfig({
	unused: true,
	publint: true,
	unbundle: true,
	format: ['esm', 'cjs'],
	copy: ['./src/oxlint.config.jsonc', './prettier.config.js'],
	dts: {
		isolatedDeclarations: true,
	},
	exports: {
		customExports(packageExports) {
			packageExports['./types/*'] = './dist/types/*';
			packageExports['./oxlint'] = './dist/oxlint.config.jsonc';
			packageExports['./prettier'] = './dist/prettier.config.js';

			return packageExports;
		},
	},
});

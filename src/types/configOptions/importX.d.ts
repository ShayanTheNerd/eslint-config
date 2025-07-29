import type { ConfigWithOverrides } from '#types/index.d.ts';

interface ImportXOptions extends ConfigWithOverrides {
	/**
	 * Automatically remove unused imports.
	 *
	 * @default true
	 *
	 * @see [unused-imports/no-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
	 */
	removeUnusedImports?: boolean,
}

export type { ImportXOptions };

import type { RuleOptions } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

type RequireFileExtensionOptions = RuleOptions<'import-x/extensions'>;
type RequireFileExtension = Exclude<
	RequireFileExtensionOptions,
	'ignorePackages' | Record<string, unknown>
>;

interface ImportXOptions extends ConfigWithOverrides {
	/**
	 * Automatically remove unused imports.
	 *
	 * @default true
	 *
	 * @see [unused-imports/no-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md)
	 */
	removeUnusedImports?: boolean,

	/**
	 * Require file extensions within the import path.
	 *
	 * Imports from third-party packages are ignored.
	 *
	 * `import-x/extensions` rule is currently broken, so `import/extensions` is used as a temporary replacement.
	 *
	 * @default true
	 *
	 * @see [import/extensions](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md)
	 */
	requireFileExtension?: boolean,
}

export type { ImportXOptions };

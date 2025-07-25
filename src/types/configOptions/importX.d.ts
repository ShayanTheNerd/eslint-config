import type { RuleOptions } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

type RequireFileExtensionOptions = RuleOptions<'import-x/extensions'>;
type RequireFileExtension = Exclude<
	RequireFileExtensionOptions,
	'ignorePackages' | Record<string, unknown>
>;

interface ImportXOptions extends ConfigWithOverrides {
	/**
	 * Enforce consistent use of file extensions within the import path.
	 *
	 * Imports from third-party packages are ignored.
	 *
	 * @default 'always'
	 *
	 * @see [import-x/extensions](https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md)
	 */
	requireFileExtension?: RequireFileExtension,
}

export type { ImportXOptions };

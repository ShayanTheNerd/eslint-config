import type { RuleOptions } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

interface TypeScriptOptions extends ConfigWithOverrides {
	/**
	 * Globs of files to allow running with the default project compiler options despite not being matched by the project service (_tsconfig.json_).
	 *
	 * The matched files may not also be included in their nearest _tsconfig.json_ file.
	 *
	 * @default []
	 *
	 * @see [@typescript-eslint: `allowDefaultProject` option](https://typescript-eslint.io/packages/parser#allowdefaultproject)
	 */
	allowedDefaultProjects?: string[],

	/**
	 * Enforce the consistent use of either `method` or `property` syntax for method signatures.
	 *
	 * @default 'method'
	 *
	 * @see [@typescript-eslint/method-signature-style](https://typescript-eslint.io/rules/method-signature-style)
	 */
	methodSignatureStyle?: RuleOptions<'@typescript-eslint/method-signature-style'>,

	/**
	 * Enforce the consistent use of either `interface` or `type` for type definitions.
	 *
	 * @default 'interface'
	 *
	 * @see [@typescript-eslint/consistent-type-definitions](https://typescript-eslint.io/rules/consistent-type-definitions)
	 */
	typeDefinitionStyle?: RuleOptions<'@typescript-eslint/consistent-type-definitions'>,
}

export type { TypeScriptOptions };

import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

type CSSRules = PluginRules<'css'>;
type StylisticRules = PluginRules<'@stylistic'>;
type TailwindRules =
	& PluginRules<'better-tailwindcss'>
	& Pick<CSSRules, 'css/no-duplicate-imports'>
	& Pick<StylisticRules, '@stylistic/max-len'>;

function getTailwindRules(options: DeepNonNullable<Options>) {
	const { tailwind, stylistic } = options.configs;
	const {
		multilineSort,
		ignoredUnregisteredClasses: userIgnoredUnregisteredClasses,
	} = isEnabled(tailwind) ? tailwind : defaultOptions.configs.tailwind;
	const {
		indent,
		useTabs,
		maxLineLength,
	} = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;
	const isTailwindV4 = isEnabled(tailwind) && tailwind.entryPoint;

	const tailwindRules = {
		'@stylistic/max-len': 'off',
		'css/no-duplicate-imports': 'off',

		'better-tailwindcss/no-duplicate-classes': 'error',
		'better-tailwindcss/no-deprecated-classes': 'error',
		'better-tailwindcss/no-conflicting-classes': 'error',
		'better-tailwindcss/enforce-shorthand-classes': 'warn',
		'better-tailwindcss/no-unnecessary-whitespace': 'warn',
		'better-tailwindcss/enforce-consistent-class-order': 'warn',
		'better-tailwindcss/enforce-consistent-variable-syntax': 'warn',
		'better-tailwindcss/enforce-consistent-important-position': 'warn',
		'better-tailwindcss/no-unregistered-classes': [
			isTailwindV4 ? 'warn' : 'off',
			{
				detectComponentClasses: true,
				ignore: userIgnoredUnregisteredClasses,
			},
		],
		'better-tailwindcss/enforce-consistent-line-wrapping': [
			multilineSort ? 'warn' : 'off',
			{
				preferSingleLine: true,
				printWidth: maxLineLength,
				indent: useTabs ? 'tab' : indent,
			},
		],
	} satisfies TailwindRules;

	return tailwindRules;
}

export { getTailwindRules };

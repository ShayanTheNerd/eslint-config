import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getTailwindRules(options: DeepNonNullable<Options>) {
  const { tailwind, stylistic } = options.configs;
  const {
    multilineSort,
    ignoredUnknownClasses: userIgnoredUnknownClasses,
  } = isEnabled(tailwind) ? tailwind : defaultOptions.configs.tailwind;
  const { indent, maxLineLength } = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;
  const isTailwindV4 = isEnabled(tailwind) && tailwind.entryPoint;

  const tailwindRules = {
    'better-tailwindcss/enforce-canonical-classes': 'warn',
    'better-tailwindcss/enforce-consistent-class-order': ['warn', { order: 'strict' }],
    'better-tailwindcss/enforce-consistent-line-wrapping': [
      multilineSort ? 'warn' : 'off',
      {
        indent,
        tabWidth: indent,
        strictness: 'loose',
        preferSingleLine: true,
        printWidth: maxLineLength,
      },
    ],
    'better-tailwindcss/enforce-consistent-variant-order': 'warn',
    // 'better-tailwindcss/enforce-logical-properties': 'warn', // https://github.com/schoero/eslint-plugin-better-tailwindcss/issues/380
    'better-tailwindcss/no-duplicate-classes': 'error',
    'better-tailwindcss/no-deprecated-classes': 'error',
    'better-tailwindcss/no-unnecessary-whitespace': 'warn',
    'better-tailwindcss/no-unknown-classes': [isTailwindV4 ? 'warn' : 'off', { ignore: userIgnoredUnknownClasses }],
    'better-tailwindcss/no-conflicting-classes': 'error',
  } satisfies PluginRules<'better-tailwindcss'>;

  return tailwindRules;
}

export { getTailwindRules };

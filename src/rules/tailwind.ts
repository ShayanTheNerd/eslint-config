import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

type StylisticRules = PluginRules<'@stylistic'>;
type TailwindRules = PluginRules<'better-tailwindcss'> & Pick<StylisticRules, '@stylistic/max-len'>;

function getTailwindRules(options: DeepNonNullable<Options>) {
  const { tailwind, stylistic } = options.configs;
  const {
    multilineSort,
    ignoredUnregisteredClasses: userIgnoredUnregisteredClasses,
  } = isEnabled(tailwind) ? tailwind : defaultOptions.configs.tailwind;
  const { indent, maxLineLength } = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;
  const isTailwindV4 = isEnabled(tailwind) && tailwind.entryPoint;

  const tailwindRules = {
    'better-tailwindcss/enforce-consistent-line-wrapping': [
      multilineSort ? 'warn' : 'off',
      {
        indent,
        preferSingleLine: true,
        printWidth: maxLineLength,
      },
    ],
    'better-tailwindcss/enforce-consistent-class-order': 'warn',
    'better-tailwindcss/enforce-consistent-variable-syntax': 'warn',
    'better-tailwindcss/enforce-consistent-important-position': 'warn',
    'better-tailwindcss/enforce-shorthand-classes': 'warn',
    'better-tailwindcss/no-duplicate-classes': 'error',
    'better-tailwindcss/no-deprecated-classes': 'error',
    'better-tailwindcss/no-unnecessary-whitespace': 'warn',
    'better-tailwindcss/no-unregistered-classes': [
      isTailwindV4 ? 'warn' : 'off',
      {
        detectComponentClasses: true,
        ignore: userIgnoredUnregisteredClasses,
      },
    ],
    'better-tailwindcss/no-conflicting-classes': 'error',
  } satisfies TailwindRules;

  if (isEnabled(stylistic)) {
    (tailwindRules as TailwindRules)['@stylistic/max-len'] = 'off';
  }

  return tailwindRules;
}

export { getTailwindRules };

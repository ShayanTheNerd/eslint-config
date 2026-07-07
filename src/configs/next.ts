import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginNext from '@next/eslint-plugin-next';

import { globs } from '#helpers/globs.ts';
import { getNextRules } from '#rules/next.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getNextConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { packageDir, configs: { next } } = options;
  const { overrides } = isEnabled(next) ? next : defaultOptions.configs.next;

  const nextConfig = {
    name: 'shayanthenerd/next',
    files: [globs.src, globs.jsxLike],
    plugins: {
      next: eslintPluginNext,
    },
    settings: {
      next: {
        rootDir: packageDir,
      },
    },
    rules: getNextRules(),
  } satisfies Linter.Config;

  return mergeConfigs(nextConfig, overrides);
}

export { getNextConfig };

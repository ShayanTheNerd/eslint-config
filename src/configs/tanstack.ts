import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginTanstackQuery from '@tanstack/eslint-plugin-query';
import eslintPluginTanstackRouter from '@tanstack/eslint-plugin-router';
import eslintPluginTanstackStart from '@tanstack/eslint-plugin-start';

import { globs } from '#helpers/globs.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { getTanstackRules } from '#rules/tanstack.ts';
import { isEnabled } from '#utils/isEnabled.ts';

function getTanstackConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { tanstack } = options.configs;
  const { overrides } = isEnabled(tanstack) ? tanstack : defaultOptions.configs.tanstack;

  const tanstackConfig = {
    name: 'shayanthenerd/tanstack',
    files: [globs.src, globs.jsxTsx],
    /* @ts-expect-error -- Built-in type mismatch. */
    plugins: isEnabled(tanstack) ? {
      ...(isEnabled(tanstack.start) && { '@tanstack/start': eslintPluginTanstackStart }),
      ...(isEnabled(tanstack.query) && { '@tanstack/query': eslintPluginTanstackQuery }),
      ...(isEnabled(tanstack.router) && { '@tanstack/router': eslintPluginTanstackRouter }),
    } : {},
    rules: getTanstackRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(tanstackConfig, overrides);
}

export { getTanstackConfig };

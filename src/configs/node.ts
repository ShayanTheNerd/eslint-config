import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import eslintPluginNode from 'eslint-plugin-n';
import { mergeConfigs } from 'eslint-flat-config-utils';
import path from 'node:path';

import { globs } from '#helpers/globs.ts';
import { getNodeRules } from '#rules/node.ts';
import { isTruthy } from '#utils/isTruthy.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getNodeConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { tsConfig, configs: { vue, node, astro } } = options;
  const { overrides } = isEnabled(node) ? node : defaultOptions.configs.node;
  const tsconfigPath = tsConfig ? path.resolve(tsConfig.rootDir, tsConfig.filename) : undefined;

  const nodeConfig = {
    name: 'shayanthenerd/node',
    files: [
      globs.src,
      globs.jsxLike,
      isEnabled(vue) ? globs.vue : '',
      isEnabled(astro) ? globs.astro : '',
    ].filter(isTruthy),
    plugins: {
      n: eslintPluginNode,
    },
    settings: {
      n: tsconfigPath ? { tsconfigPath } : undefined,
    },
    rules: getNodeRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(nodeConfig, overrides);
}

export { getNodeConfig };

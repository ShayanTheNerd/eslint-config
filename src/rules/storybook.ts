import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import path from 'node:path';

function getStorybookRules(options: DeepNonNullable<Options>) {
  const storybookRules = {
    'storybook/await-interactions': 'error',
    'storybook/context-in-play-function': 'error',
    'storybook/csf-component': 'error',
    'storybook/default-exports': 'error',
    'storybook/hierarchy-separator': 'error',
    'storybook/meta-inline-properties': 'warn',
    'storybook/meta-satisfies-type': 'warn',
    'storybook/no-redundant-story-name': 'warn',
    'storybook/no-renderer-packages': 'error',
    'storybook/no-stories-of': 'error',
    'storybook/no-uninstalled-addons': ['error', {
      packageJsonLocation: path.resolve(options.packageDir, 'package.json'),
    }],
    'storybook/prefer-pascal-case': 'warn',
    'storybook/story-exports': 'error',
    'storybook/use-storybook-expect': 'error',
    'storybook/use-storybook-testing-library': 'error',
  } satisfies PluginRules<'storybook'>;

  return storybookRules;
}

export { getStorybookRules };

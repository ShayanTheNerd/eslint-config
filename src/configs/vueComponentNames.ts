import type { ConfigObject } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';

import { globs } from '#helpers/globs.ts';

function getVueComponentNamesConfig() {
  const vueComponentNamesConfig = {
    name: 'shayanthenerd/vue/multi-word-component-names',
    files: [globs.vueAppErrorLayoutsPages],
    rules: {
      'vue/match-component-file-name': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/component-definition-name-casing': 'off',
    } satisfies PluginRules<'vue'>,
  } satisfies ConfigObject;

  return vueComponentNamesConfig;
}

export { getVueComponentNamesConfig };

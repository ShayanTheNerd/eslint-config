import type { ConfigObject } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';

import { globs } from '#utils/globs.ts';

function getVueServerComponentsConfig() {
  const vueServerComponentsConfig = {
    name: 'shayanthenerd/vue/server-components',
    files: [globs.vueServerComponents],
    rules: {
      'vue/no-multiple-template-root': 'error',
    } satisfies Pick<PluginRules<'vue'>, 'vue/no-multiple-template-root'>,
  } satisfies ConfigObject;

  return vueServerComponentsConfig;
}

export { getVueServerComponentsConfig };

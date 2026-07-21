import type { PluginRules } from '#types/eslintRules.d.ts';

const nuxtRules = {
  'link-checker/valid-route': 'error',
  'link-checker/valid-sitemap-link': 'warn',
  'nuxt/no-page-meta-runtime-values': 'error',
  'nuxt/prefer-import-meta': 'warn',
} satisfies PluginRules<'nuxt'> & PluginRules<'link-checker'>;

function getNuxtRules() {
  return nuxtRules;
}

export { getNuxtRules };

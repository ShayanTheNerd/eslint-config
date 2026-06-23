import type { PluginRules } from '#types/eslintRules.d.ts';

const nextRules = {
  'next/google-font-display': 'warn',
  'next/google-font-preconnect': 'warn',
  'next/inline-script-id': 'error',
  'next/next-script-for-ga': 'warn',
  'next/no-async-client-component': 'error',
  'next/no-before-interactive-script-outside-document': 'error',
  'next/no-css-tags': 'warn',
  'next/no-document-import-in-page': 'error',
  'next/no-duplicate-head': 'error',
  'next/no-head-element': 'warn',
  'next/no-head-import-in-document': 'error',
  'next/no-html-link-for-pages': 'warn',
  'next/no-img-element': 'warn',
  'next/no-page-custom-font': 'warn',
  'next/no-script-component-in-head': 'error',
  'next/no-styled-jsx-in-document': 'error',
  'next/no-sync-scripts': 'warn',
  'next/no-title-in-document-head': 'error',
  'next/no-typos': 'warn',
  'next/no-unwanted-polyfillio': 'warn',
} satisfies PluginRules<'next'>;

function getNextRules() {
  return nextRules;
}

export { getNextRules };

import type { PluginRules } from '#types/eslintRules.d.ts';

const promiseRules = {
  'promise/always-return': ['error', { ignoreLastCallback: true }],
  'promise/avoid-new': 'warn',
  'promise/catch-or-return': ['error', { allowThenStrict: true, allowFinally: true }],
  'promise/no-callback-in-promise': 'error',
  'promise/no-multiple-resolved': 'error',
  'promise/no-nesting': 'error',
  'promise/no-new-statics': 'warn',
  'promise/no-promise-in-callback': ['error', { exemptDeclarations: true }],
  'promise/no-return-in-finally': 'error',
  'promise/no-return-wrap': ['error', { allowReject: true }],
  'promise/param-names': 'warn',
  'promise/prefer-await-to-callbacks': 'warn',
  'promise/prefer-await-to-then': ['warn', { strict: true }],
  'promise/prefer-catch': 'warn',
  'promise/valid-params': 'error',
} satisfies PluginRules<'promise'>;

function getPromiseRules() {
  return promiseRules;
}

export { getPromiseRules };

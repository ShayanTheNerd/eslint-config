const plugin = require('eslint-plugin-functional/flat');

/** @return { import('eslint').Linter.FlatConfig } */
function fp() {
  return {
    plugins: { functional: plugin },
    rules: {
      'functional/functional-parameters': 'off',
      'functional/no-let': ['error', { allowInForLoopInit: true }],
      'functional/no-loop-statements': 'error',
      'functional/immutable-data': ['error', { ignoreClasses: true, ignoreImmediateMutation: true, ignoreNonConstDeclarations: true }],
    },
  };
}

module.exports = fp;
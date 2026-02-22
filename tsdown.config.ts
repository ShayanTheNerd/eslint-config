import { defineConfig } from 'tsdown';

import { syncJsrExports } from './scripts/syncJsrExports.ts';

export default defineConfig({
  format: 'esm',
  unbundle: true,
  entry: ['./src/index.ts', './src/prettier.config.ts'],
  copy: ['./src/oxlint.config.jsonc'],
  external: ['prettier'],
  exports: {
    customExports(packageExports) {
      packageExports['./types/*'] = './dist/types/*';
      packageExports['./oxlint'] = './dist/oxlint.config.jsonc';
      packageExports['./prettier'] = './dist/prettier.config.mjs';
      delete packageExports['./prettier.config'];

      const sortedPackageExports = Object.fromEntries(Object.entries(packageExports).sort());
      syncJsrExports(sortedPackageExports);

      return sortedPackageExports;
    },
  },
  dts: {
    compilerOptions: {
      isolatedDeclarations: true,
    },
  },
  report: false,
  publint: true,
  unused: {
    ignore: ['eslint-plugin-jsx-a11y', 'eslint-import-resolver-typescript'],
  },
});

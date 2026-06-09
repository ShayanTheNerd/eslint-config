import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts', './src/prettier.config.ts'],
  unbundle: true,
  deps: {
    neverBundle: ['prettier'],
    skipNodeModulesBundle: true,
  },
  exports: {
    customExports(packageExports) {
      packageExports['./prettier'] = './dist/prettier.config.mjs';
      delete packageExports['./prettier.config'];
      return packageExports;
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

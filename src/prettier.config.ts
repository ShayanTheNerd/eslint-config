import type { Config } from 'prettier';

const prettierConfig: Config = {
  semi: true,
  useTabs: false,
  tabWidth: 2,
  vueIndentScriptAndStyle: false,
  printWidth: 120,
  singleQuote: true,
  jsxSingleQuote: false,
  quoteProps: 'consistent',
  insertPragma: false,
  requirePragma: false,
  bracketSpacing: true,
  bracketSameLine: false,
  endOfLine: 'lf',
  trailingComma: 'all',
  arrowParens: 'always',
  proseWrap: 'preserve',
  objectWrap: 'preserve',
  singleAttributePerLine: false,
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',
  rangeStart: 0,
  rangeEnd: Number.POSITIVE_INFINITY,
  experimentalTernaries: false,
  experimentalOperatorPosition: 'end',

  overrides: [
    {
      files: ['*.jsonc'],
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
  ],
};

export default prettierConfig;

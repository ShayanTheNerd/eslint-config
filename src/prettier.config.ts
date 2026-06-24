import type { Config } from 'prettier';

const prettierConfig: Config = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  experimentalOperatorPosition: 'end',
  experimentalTernaries: false,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: false,
  objectWrap: 'preserve',
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'consistent',
  rangeEnd: Infinity,
  rangeStart: 0,
  requirePragma: false,
  semi: true,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: false,

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

import generateESLintTypes from 'eslint-typegen';
import eslintPluginZodMini from 'eslint-plugin-zod-mini';
import { styleText } from 'node:util';

import referenceConfig from './configs/eslint.config.reference.ts';

/* `configs.zod.mini` is `false` in `referenceConfig`, so this ensures Zod Mini's types are correctly generated. */
referenceConfig.push({
  plugins: {
    'zod-mini': eslintPluginZodMini,
  },
});

const eslintSchemaPath = 'src/types/eslint-schema.d.ts' as const;

await generateESLintTypes(referenceConfig, {
  dtsPath: eslintSchemaPath,
  exportTypeName: 'ESLintSchema',
});

console.info(styleText('green', '✔'), `ESLint types generated at "${styleText('blue', eslintSchemaPath)}"`);

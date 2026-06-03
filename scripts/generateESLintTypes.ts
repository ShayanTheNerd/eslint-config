import generateESLintTypes from 'eslint-typegen';
import eslintPluginZodMini from 'eslint-plugin-zod-mini';
import path from 'node:path';
import fs from 'node:fs/promises';
import { styleText } from 'node:util';

import referenceConfig from './configs/eslint.config.reference.ts';

/* `configs.zod.mini` is `false` in `referenceConfig`, so this ensures Zod Mini's types are correctly generated. */
referenceConfig.push({
  plugins: {
    'zod-mini': eslintPluginZodMini,
  },
});

const eslintSchemaPath = path.resolve('src/types/eslint-schema.d.ts');

await fs.rm(eslintSchemaPath, { force: true });
await generateESLintTypes(referenceConfig, {
  dtsPath: eslintSchemaPath,
  exportTypeName: 'ESLintSchema',
});

const successIcon = styleText('green', '✔');
const styledESLintSchemaPath = styleText('blue', eslintSchemaPath);
console.info(successIcon, `ESLint types generated at "${styledESLintSchemaPath}"`);

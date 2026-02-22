import fs from 'node:fs';

const JSR_CONFIG_PATH = './jsr.json' as const;

type JsrExports = string | Record<string, string>;

interface JsrConfig {
  $schema?: string,
  name: string,
  version?: string,
  license?: string,
  exports: JsrExports,
  publish?: {
    include?: string[],
    exclude?: string[],
  },
}

function isJsrConfig(value: unknown): value is JsrConfig {
  return typeof value === 'object' && value !== null;
}

function syncJsrExports(packageExports: JsrExports): void {
  const jsrConfig: unknown = JSON.parse(fs.readFileSync(JSR_CONFIG_PATH, 'utf8'));

  if (!isJsrConfig(jsrConfig)) {
    throw new Error('Invalid jsr.json format');
  }

  jsrConfig.exports = packageExports;
  fs.writeFileSync(JSR_CONFIG_PATH, `${JSON.stringify(jsrConfig, null, 2)}\n`);
}

export { syncJsrExports };

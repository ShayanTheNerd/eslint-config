import type { Options } from '#types/index.d.ts';

import { isPackageExists as packageExists } from 'local-pkg';
import path from 'node:path';
import { styleText } from 'node:util';

import { defaultOptions } from '#helpers/options/defaultOptions.ts';

const detectedPackages: string[] = [];

function logDetectedPackages(disabledConfigs: Record<string, boolean>): void {
  const nonDisabledDetectedPackages = detectedPackages.filter((packageName) => !disabledConfigs[packageName]);

  if (nonDisabledDetectedPackages.length > 0) {
    nonDisabledDetectedPackages.sort();
    console.info(
      `${styleText('green', '✔')} ESLint integrations enabled via dependency detection:`,
      nonDisabledDetectedPackages.map((packageName) => styleText('blue', packageName)).join(', '),
    );
  }
}

function isPackageDetected(packageName: string, options: Options): boolean {
  const {
    packageDir = defaultOptions.packageDir,
    autoDetectDeps = defaultOptions.autoDetectDeps,
  } = options;

  if (autoDetectDeps === false) {
    return false;
  }

  const isPackageInstalled = packageExists(packageName, { paths: [path.resolve(packageDir)] });

  if (autoDetectDeps === 'verbose' && isPackageInstalled) {
    detectedPackages.push(packageName);
  }

  return isPackageInstalled;
}

export { isPackageDetected, logDetectedPackages };

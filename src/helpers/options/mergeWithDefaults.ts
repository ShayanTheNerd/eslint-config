import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { createDefu } from 'defu';

import { isEmptyString } from '#utils/isEmptyString.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { enableDetectedConfigs } from '#helpers/options/enableDetectedConfigs.ts';

const mergeOptions = createDefu((object, key, value): boolean => {
  const uniqueArrayOptions = ['allowedRelativeFontUnits', 'blocksOrder', 'macrosOrder', 'attributesOrder'];
  if (uniqueArrayOptions.includes(key.toString())) {
    object[key] = value;
    return true;
  }

  const isValueTrue = value === true;
  const isDefaultValueFalse = object[key] === false;
  const shouldUseDefaultValue = isEmptyString(value) || (isValueTrue && !isDefaultValueFalse);

  return shouldUseDefaultValue;
});

function mergeWithDefaults(options: Options): DeepNonNullable<Options> {
  const optionsWithDetectedConfigs = enableDetectedConfigs(options);
  const mergedOptions = mergeOptions(optionsWithDetectedConfigs, defaultOptions);
  return mergedOptions as DeepNonNullable<Options>;
}

export { mergeWithDefaults };

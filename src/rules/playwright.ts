import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

function getPlaywrightRules(options: DeepNonNullable<Options>) {
  const { maxNestedDescribe } = options.configs.test;

  const playwrightRules = {
    'playwright/expect-expect': 'error',
    'playwright/max-nested-describe': ['warn', { max: maxNestedDescribe }],
    'playwright/missing-playwright-await': 'error',
    'playwright/no-commented-out-tests': 'error',
    'playwright/no-conditional-expect': 'error',
    'playwright/no-conditional-in-test': 'error',
    'playwright/no-duplicate-hooks': 'error',
    'playwright/no-element-handle': 'warn',
    'playwright/no-eval': 'error',
    'playwright/no-focused-test': 'error',
    'playwright/no-force-option': 'warn',
    'playwright/no-get-by-title': 'warn',
    'playwright/no-nested-step': 'warn',
    'playwright/no-networkidle': 'error',
    'playwright/no-page-pause': 'error',
    'playwright/no-raw-locators': 'warn',
    'playwright/no-skipped-test': 'error',
    'playwright/no-slowed-test': 'warn',
    'playwright/no-standalone-expect': 'error',
    'playwright/no-unsafe-references': 'error',
    'playwright/no-unused-locators': 'warn',
    'playwright/no-useless-await': 'warn',
    'playwright/no-useless-not': 'warn',
    'playwright/no-wait-for-selector': 'warn',
    'playwright/no-wait-for-timeout': 'error',
    'playwright/prefer-comparison-matcher': 'warn',
    'playwright/prefer-equality-matcher': 'warn',
    'playwright/prefer-hooks-in-order': 'warn',
    'playwright/prefer-hooks-on-top': 'warn',
    'playwright/prefer-lowercase-title': ['warn', { ignoreTopLevelDescribe: true }],
    'playwright/prefer-native-locators': 'warn',
    'playwright/prefer-locator': 'error',
    'playwright/prefer-strict-equal': 'warn',
    'playwright/prefer-to-be': 'warn',
    'playwright/prefer-to-contain': 'warn',
    'playwright/prefer-to-have-count': 'warn',
    'playwright/prefer-to-have-length': 'warn',
    'playwright/prefer-web-first-assertions': 'warn',
    'playwright/require-hook': 'error',
    'playwright/require-to-throw-message': 'error',
    'playwright/valid-describe-callback': 'error',
    'playwright/valid-expect-in-promise': 'error',
    'playwright/valid-expect': 'error',
    'playwright/valid-title': 'error',
    'playwright/valid-test-tags': 'error',
  } satisfies PluginRules<'playwright'>;

  return playwrightRules;
}

export { getPlaywrightRules };

import type { ConfigWithOverrides } from '#types/index.d.ts';
import type { PluginRules, RuleOptions } from '#types/eslintRules.d.ts';

type StorybookConfigRules = PluginRules<'storybook'>;
type VitestConfigRules = PluginRules<'vitest'>;
type PlaywrightConfigRules = PluginRules<'playwright'>;
type CypressConfigRules = PluginRules<'cypress'>;

interface TestOptions {
  /**
   * Enforce a maximum depth for nested `describe` calls to increase code clarity.
   *
   * This is used by
   * - [vitest/max-nested-describe](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/max-nested-describe.md)
   * - [playwright/max-nested-describe](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/max-nested-describe.md)
   *
   * @default 1
   */
  maxNestedDescribe?: RuleOptions<'vitest/max-nested-describe'>['max'],

  /**
   * Enforce the consistent use of either `test` or `it` as the test function.
   *
   * @default 'test'
   *
   * @see [vitest/consistent-test-it](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-test-it.md)
   */
  testFunction?: RuleOptions<'vitest/consistent-test-it'>['fn'],

  /**
   * Use [eslint-plugin-storybook](https://github.com/storybookjs/eslint-plugin-storybook) to enforce best practices and code styles for Storybook stories and tests.
   *
   * @default false // `true` if "storybook" is detected in the dependencies when `autoDetectDeps` is enabled
   */
  storybook?: boolean | ConfigWithOverrides<StorybookConfigRules>,

  /**
   * Use [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest) to enforce best practices and code styles for Vitest tests.
   *
   * @default false // `true` if "vitest" is detected in the dependencies when `autoDetectDeps` is enabled
  */
  vitest?: boolean | ConfigWithOverrides<VitestConfigRules>,

  /**
   * Use [eslint-plugin-playwright](https://github.com/playwright-community/eslint-plugin-playwright) to enforce best practices and code styles for Playwright tests.
   *
   * @default false // `true` if "@playwright/test" is detected in the dependencies when `autoDetectDeps` is enabled
  */
  playwright?: boolean | ConfigWithOverrides<PlaywrightConfigRules>,

  /**
   * Use [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress) to enforce best practices and code styles for Cypress tests.
   *
   * @default false // `true` if "cypress" is detected in the dependencies when `autoDetectDeps` is enabled
   */
  cypress?: boolean | ConfigWithOverrides<CypressConfigRules>,
}

export type { TestOptions };

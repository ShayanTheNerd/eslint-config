import type { ESLintSchema } from '#types/eslint-schema.d.ts';
import type { Tail, DeepNonNullable } from '#types/helpers.d.ts';

type RuleNames = keyof ESLintSchema;
type PluginRuleNames = Extract<RuleNames, `${string}/${string}`>;
type PluginNames = PluginRuleNames extends `${infer PluginName}/${string}` ? PluginName : never;
type PluginRuleset<PluginName extends PluginNames> = Extract<PluginRuleNames, `${PluginName}/${string}`>;
type JavascriptRuleNames = Exclude<RuleNames, PluginRuleNames>;
type JavascriptRules = Pick<ESLintSchema, JavascriptRuleNames>;
type PluginRules<PluginName extends PluginNames> = Pick<ESLintSchema, PluginRuleset<PluginName>>;

type Rule<RuleName extends RuleNames> = DeepNonNullable<ESLintSchema>[RuleName];
type RuleConfigs<RuleName extends RuleNames> = Tail<Rule<RuleName>>;
type RuleOptions<RuleName extends RuleNames, Index extends (0 | 1 | 2) = 0> = NonNullable<
  RuleConfigs<RuleName>[Index]
>;

export type { PluginRules, RuleOptions, JavascriptRules };

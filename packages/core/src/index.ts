import type { Scenario } from '@infinite-dimensions-ai/research-telecom-big-data-analytics-types';
import { scenarioSchema } from '@infinite-dimensions-ai/research-telecom-big-data-analytics-types';

/** Synthetic illustration; not an assertion about the historical implementation. */
export const sampleScenario: Scenario = {
  id: 'research-telecom-big-data-analytics-sample',
  title: 'Telecommunications Big Data Analytics Research — synthetic baseline',
  variables: {
    "complaints": 3,
    "outages": 2,
    "tenureMonths": 24,
    "usageDropFraction": 0.35
  },
  assumptions: ['Illustrative coefficients and measurements. No original commercial data used.'],
};

export function evaluateBaseline(raw: Scenario): { label: string; value: number; unit: string } {
  const scenario = scenarioSchema.parse(raw);
  const { complaints=0, outages=0, tenureMonths=0, usageDropFraction=0 } = scenario.variables;
    const logOdds = -2.4 + 0.45*complaints + 0.35*outages - 0.015*tenureMonths + 1.3*usageDropFraction;
    const value = 1/(1 + Math.exp(-logOdds));
    return { label: 'Illustrative churn propensity', value, unit: 'probability' };
}

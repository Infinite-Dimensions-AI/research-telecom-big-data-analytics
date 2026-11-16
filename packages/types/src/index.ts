import { z } from 'zod';

/** Reproducible research contracts. Synthetic scenarios are never historical evidence. */
export const metricSchema = z.object({ name: z.string().min(1), value: z.number().finite(), unit: z.string() });
export const scenarioSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  variables: z.record(z.number().finite()),
  assumptions: z.array(z.string()).default([]),
});
export const experimentSchema = z.object({
  id: z.string().min(1),
  scenario: scenarioSchema,
  metrics: z.array(metricSchema),
  recordedAt: z.string(),
  provenance: z.enum(['synthetic', 'measured', 'historical-source']),
});
export type Metric = z.infer<typeof metricSchema>;
export type Scenario = z.infer<typeof scenarioSchema>;
export type Experiment = z.infer<typeof experimentSchema>;

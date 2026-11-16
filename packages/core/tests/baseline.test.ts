import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateBaseline, sampleScenario } from '../src/index.ts';

test('synthetic research baseline returns a finite numeric result', () => {
  const result = evaluateBaseline(sampleScenario);
  assert.ok(Number.isFinite(result.value));
  assert.ok(result.label.length > 0);
});

import { describe, it, expect } from 'vitest';
import { validateJobPayload } from '../lib/validators/jobs';

describe('Job Validation', () => {
  it('should validate a correct payload', () => {
    const payload = {
      title: 'Software Engineer',
      description: 'Develop amazing software',
      type: 'paid',
      status: 'open',
      compensation_amount: 100000,
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
    };
    const result = validateJobPayload(payload);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail if title is missing', () => {
    const payload = {
      description: 'Develop amazing software',
      type: 'paid',
    };
    const result = validateJobPayload(payload);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Title is required and must be a string');
  });

  it('should fail if type is invalid', () => {
    const payload = {
      title: 'Software Engineer',
      description: 'Develop amazing software',
      type: 'invalid-type',
    };
    const result = validateJobPayload(payload);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Type must be either "volunteer" or "paid"');
  });

  it('should fail if compensation is negative', () => {
    const payload = {
      title: 'Software Engineer',
      description: 'Develop amazing software',
      type: 'paid',
      compensation_amount: -100,
    };
    const result = validateJobPayload(payload);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Compensation amount must be a non-negative number');
  });
});

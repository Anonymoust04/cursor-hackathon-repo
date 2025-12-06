export interface JobPayload {
  title: string;
  description: string;
  location?: string;
  type: 'volunteer' | 'paid';
  cause_tags?: string[];
  status?: 'open' | 'closed' | 'completed';
  compensation_amount?: number;
  start_time?: string;
  end_time?: string;
}

export function validateJobPayload(payload: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!payload.title || typeof payload.title !== 'string' || payload.title.trim().length === 0) {
    errors.push('Title is required and must be a string');
  }

  if (!payload.description || typeof payload.description !== 'string' || payload.description.trim().length === 0) {
    errors.push('Description is required and must be a string');
  }

  if (payload.type && !['volunteer', 'paid'].includes(payload.type)) {
    errors.push('Type must be either "volunteer" or "paid"');
  }

  if (payload.status && !['open', 'closed', 'completed'].includes(payload.status)) {
    errors.push('Status must be "open", "closed", or "completed"');
  }

  if (payload.compensation_amount !== undefined && (typeof payload.compensation_amount !== 'number' || payload.compensation_amount < 0)) {
    errors.push('Compensation amount must be a non-negative number');
  }

  if (payload.start_time && isNaN(Date.parse(payload.start_time))) {
    errors.push('Start time must be a valid date string');
  }

  if (payload.end_time && isNaN(Date.parse(payload.end_time))) {
    errors.push('End time must be a valid date string');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

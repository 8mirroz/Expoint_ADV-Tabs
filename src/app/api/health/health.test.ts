import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('GET /api/health', () => {
  it('should return status 200 and healthy message', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ status: 'ok' });
  });
});

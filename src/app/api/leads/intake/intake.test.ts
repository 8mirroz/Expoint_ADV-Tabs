import { describe, it, expect } from 'vitest';
import { POST } from './route';

describe('POST /api/leads/intake', () => {
  it('returns 400 for invalid payload', async () => {
    const req = new Request('http://localhost/api/leads/intake', {
      method: 'POST',
      body: JSON.stringify({ name: 'A' }) // name too short, missing required fields
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe('Validation failed');
  });

  it('returns 201 for valid payload', async () => {
    const validPayload = {
      name: 'Иван Иванов',
      phone: '+79991234567',
      email: 'ivan@example.com',
      projectType: 'neon'
    };

    const req = new Request('http://localhost/api/leads/intake', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });
    
    const res = await POST(req);
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.message).toBe('Заявка успешно принята');
  });
});

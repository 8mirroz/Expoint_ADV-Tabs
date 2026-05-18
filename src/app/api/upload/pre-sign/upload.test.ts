import { describe, it, expect } from 'vitest';
import { POST } from './route';

describe('POST /api/upload/pre-sign', () => {
  it('returns 400 for invalid file type', async () => {
    const req = new Request('http://localhost/api/upload/pre-sign', {
      method: 'POST',
      body: JSON.stringify({ filename: 'virus.exe', contentType: 'application/x-msdownload', size: 1024 })
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 200 and a URL for valid payload', async () => {
    const validPayload = {
      filename: 'project.pdf',
      contentType: 'application/pdf',
      size: 1024 * 1024 // 1 MB
    };

    const req = new Request('http://localhost/api/upload/pre-sign', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });
    
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.uploadUrl).toContain('/api/upload/local?');
    expect(json.fileKey).toContain('project.pdf');
    expect(json.method).toBe('PUT');
    expect(json.expiresAt).toBeTypeOf('string');
  });
});

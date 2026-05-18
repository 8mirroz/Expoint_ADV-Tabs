import { readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { PUT } from './route';
import { createUploadContract, UPLOAD_ROOT_DIR } from '@/app/api/upload/shared';

const createdPaths = new Set<string>();

afterEach(async () => {
  await Promise.all(
    Array.from(createdPaths).map(async (filePath) => {
      await rm(filePath, { force: true });
    })
  );
  createdPaths.clear();
});

function toAbsoluteUploadUrl(relativeUrl: string): string {
  return new URL(relativeUrl, 'http://localhost:3000').toString();
}

describe('PUT /api/upload/local', () => {
  it('stores bytes for a valid signed request', async () => {
    const contract = createUploadContract({
      filename: 'facade.png',
      contentType: 'image/png',
      size: 5,
    });

    const response = await PUT(new Request(toAbsoluteUploadUrl(contract.uploadUrl), {
      method: 'PUT',
      headers: { 'Content-Type': 'image/png' },
      body: 'photo',
    }));

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.fileKey).toContain('facade.png');

    const targetPath = path.join(UPLOAD_ROOT_DIR, path.basename(json.fileKey));
    createdPaths.add(targetPath);
    await expect(readFile(targetPath, 'utf8')).resolves.toBe('photo');
  });

  it('rejects invalid signatures', async () => {
    const invalidUrl = 'http://localhost:3000/api/upload/local?fileKey=uploads/leads/test.png&contentType=image/png&size=5&expiresAt=9999999999999&signature=bad';

    const response = await PUT(new Request(invalidUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'image/png' },
      body: 'photo',
    }));

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toContain('Invalid');
  });

  it('rejects mismatched content type and size', async () => {
    const contract = createUploadContract({
      filename: 'layout.pdf',
      contentType: 'application/pdf',
      size: 5,
    });

    const wrongTypeResponse = await PUT(new Request(toAbsoluteUploadUrl(contract.uploadUrl), {
      method: 'PUT',
      headers: { 'Content-Type': 'image/png' },
      body: 'photo',
    }));

    expect(wrongTypeResponse.status).toBe(400);

    const wrongSizeResponse = await PUT(new Request(toAbsoluteUploadUrl(contract.uploadUrl), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/pdf' },
      body: 'toolong',
    }));

    expect(wrongSizeResponse.status).toBe(400);
  });
});

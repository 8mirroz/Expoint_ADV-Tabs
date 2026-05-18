import { createHmac } from 'node:crypto';
import path from 'node:path';

export const UPLOAD_ROOT_DIR = path.join(process.cwd(), 'uploads', 'leads');
export const UPLOAD_URL_SECRET = process.env.UPLOAD_URL_SECRET ?? 'dev-upload-secret';
const UPLOAD_URL_TTL_MS = 15 * 60 * 1000;

export interface UploadTokenPayload {
  fileKey: string;
  contentType: string;
  size: number;
  expiresAt: number;
}

function createUploadSignature(payload: UploadTokenPayload): string {
  return createHmac('sha256', UPLOAD_URL_SECRET)
    .update(`${payload.fileKey}:${payload.contentType}:${payload.size}:${payload.expiresAt}`)
    .digest('hex');
}

export function createUploadContract(input: {
  filename: string;
  contentType: string;
  size: number;
}) {
  const safeFilename = input.filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const timestamp = Date.now();
  const fileKey = `uploads/leads/${timestamp}_${safeFilename}`;
  const expiresAt = timestamp + UPLOAD_URL_TTL_MS;
  const signature = createUploadSignature({
    fileKey,
    contentType: input.contentType,
    size: input.size,
    expiresAt,
  });

  const uploadUrl = new URL('http://upload.local/api/upload/local');
  uploadUrl.searchParams.set('fileKey', fileKey);
  uploadUrl.searchParams.set('contentType', input.contentType);
  uploadUrl.searchParams.set('size', String(input.size));
  uploadUrl.searchParams.set('expiresAt', String(expiresAt));
  uploadUrl.searchParams.set('signature', signature);

  return {
    uploadUrl: `${uploadUrl.pathname}${uploadUrl.search}`,
    fileKey,
    method: 'PUT' as const,
    expiresAt: new Date(expiresAt).toISOString(),
  };
}

export function verifyUploadContract(params: URLSearchParams): {
  valid: boolean;
  payload?: UploadTokenPayload;
  error?: string;
} {
  const fileKey = params.get('fileKey') ?? '';
  const contentType = params.get('contentType') ?? '';
  const size = Number(params.get('size') ?? '0');
  const expiresAt = Number(params.get('expiresAt') ?? '0');
  const signature = params.get('signature') ?? '';

  if (!fileKey.startsWith('uploads/leads/') || fileKey.includes('..')) {
    return { valid: false, error: 'Invalid file key' };
  }

  if (!contentType || !size || !expiresAt || !signature) {
    return { valid: false, error: 'Incomplete upload token' };
  }

  if (Date.now() > expiresAt) {
    return { valid: false, error: 'Upload token expired' };
  }

  const payload: UploadTokenPayload = {
    fileKey,
    contentType,
    size,
    expiresAt,
  };

  if (createUploadSignature(payload) !== signature) {
    return { valid: false, error: 'Invalid upload signature' };
  }

  return {
    valid: true,
    payload,
  };
}

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { MAX_FILE_SIZE_BYTES } from '@/features/scn/model/schemas/upload.schema';
import { verifyUploadContract, UPLOAD_ROOT_DIR } from '@/app/api/upload/shared';

export const runtime = 'nodejs';

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const verification = verifyUploadContract(url.searchParams);

  if (!verification.valid || !verification.payload) {
    return NextResponse.json(
      { success: false, error: verification.error ?? 'Invalid upload token' },
      { status: 400 }
    );
  }

  const contentTypeHeader = req.headers.get('content-type');
  if (contentTypeHeader !== verification.payload.contentType) {
    return NextResponse.json(
      { success: false, error: 'Content type mismatch' },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await req.arrayBuffer());
  if (buffer.byteLength > MAX_FILE_SIZE_BYTES || buffer.byteLength !== verification.payload.size) {
    return NextResponse.json(
      { success: false, error: 'File size mismatch' },
      { status: 400 }
    );
  }

  const targetPath = path.join(UPLOAD_ROOT_DIR, path.basename(verification.payload.fileKey));

  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, buffer);

  return NextResponse.json({
    success: true,
    fileKey: verification.payload.fileKey,
    mimeType: verification.payload.contentType,
    sizeBytes: verification.payload.size,
    storedAt: new Date().toISOString(),
  });
}

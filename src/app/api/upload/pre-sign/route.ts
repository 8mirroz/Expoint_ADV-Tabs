import { NextResponse } from 'next/server';
import { UploadPreSignSchema } from '@/lib/services/leadSchemas';
import { createUploadContract } from '@/app/api/upload/shared';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = UploadPreSignSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const fileData = result.data;
    const uploadContract = createUploadContract({
      filename: fileData.filename,
      contentType: fileData.contentType,
      size: fileData.size,
    });

    return NextResponse.json({
      success: true,
      ...uploadContract,
    }, { status: 200 });
  } catch (error) {
    console.error('Upload pre-sign error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

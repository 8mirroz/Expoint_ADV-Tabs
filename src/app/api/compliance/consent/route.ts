import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/db';
import { consentLogs } from '@/db/schema';

// Schema for input validation
const consentSchema = z.object({
  formId: z.string(),
  purposes: z.array(z.enum(['personal_data', 'marketing', 'analytics'])),
  policyVersion: z.string(),
  sessionId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = consentSchema.parse(body);

    // Extract metadata from headers
    const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Mask IP for privacy (GDPR/152-FZ recommendation)
    const maskedIp = ip.split('.').slice(0, 3).join('.') + '.0';

    // Log each purpose separately for granular audit trail
    const logs = validatedData.purposes.map(purpose => ({
      sessionId: validatedData.sessionId || null,
      purpose,
      status: 'GRANTED',
      formId: validatedData.formId,
      policyVersion: validatedData.policyVersion,
      ipAddress: maskedIp,
      userAgent,
    }));

    // If DB is configured, insert logs
    if (process.env.POSTGRES_URL) {
      await db.insert(consentLogs).values(logs);
      console.log(`[CONSENT_LOG] Saved ${logs.length} entries to database.`);
    } else {
      // Fallback for development/testing
      console.warn('[CONSENT_LOG] POSTGRES_URL missing, logging to console only:');
      console.log(JSON.stringify(logs, null, 2));
    }

    return NextResponse.json(
      { success: true, message: 'Consent logged successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[CONSENT_ERROR]', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

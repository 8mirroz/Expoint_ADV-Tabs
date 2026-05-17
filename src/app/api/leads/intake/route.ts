import { NextResponse } from 'next/server';
import { LeadIntakeSchema } from '@/lib/services/leadSchemas';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const result = LeadIntakeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const leadData = result.data;

    // Simulate saving to DB or sending to CRM/Telegram
    // In production, this would use Drizzle ORM and external APIs
    console.log('Processed lead successfully:', leadData);

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно принята',
      id: `lead_${Date.now()}`
    }, { status: 201 });

  } catch (error) {
    console.error('Lead intake error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

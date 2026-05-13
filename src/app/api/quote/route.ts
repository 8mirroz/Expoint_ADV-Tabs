import { NextResponse } from 'next/server';
import { QuoteRequestSchema } from '@/lib/validators/quote';
import { notifyAll } from '@/lib/services/notifications/orchestrator';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate payload
    const validatedData = QuoteRequestSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { 
          message: 'Ошибка валидации', 
          errors: validatedData.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const data = validatedData.data;

    // 2. Call orchestrator to fan out notifications (Telegram, CRM, Email)
    await notifyAll({
      name: data.contact.name,
      phone: data.contact.phone,
      company: data.contact.company,
      type: 'quote',
      source: 'Expoint ADV Configurator',
      calculatorData: {
        text: data.text,
        size: `${data.heightCm} см`,
        material: data.materialId,
        lighting: data.lightingId,
        priceRange: data.priceRange,
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Заявка успешно принята. Наш инженер свяжется с вами для уточнения деталей.',
      quoteId: `EXP-${Date.now().toString().slice(-6)}`
    });
  } catch (error) {
    console.error('[API/Quote] Submission error:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера', success: false }, 
      { status: 500 }
    );
  }
}

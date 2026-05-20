import { NextResponse } from 'next/server';
import { QuoteRequestSchema } from '@/lib/validators/quote';
import { saveAndNotifyLead } from '@/lib/services/leadService';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Валидация данных калькулятора
    const validatedData = QuoteRequestSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          message: 'Ошибка валидации',
          errors: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validatedData.data;

    // 2. Сохранение расчёта в БД + веерная рассылка уведомлений
    await saveAndNotifyLead({
      name: data.contact.name,
      phone: data.contact.phone,
      source: 'BUKVA SVET Configurator',
      segment: 'configurator',
      type: 'quote',
      calculatorData: {
        text: data.text,
        heightCm: data.heightCm,
        materialId: data.materialId,
        lightingId: data.lightingId,
        priceRange: data.priceRange,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        'Заявка успешно принята. Наш инженер свяжется с вами для уточнения деталей.',
      quoteId: `BS-${Date.now().toString().slice(-6)}`,
    });
  } catch (error) {
    console.error('[API/Quote] Ошибка обработки расчёта:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера', success: false },
      { status: 500 }
    );
  }
}

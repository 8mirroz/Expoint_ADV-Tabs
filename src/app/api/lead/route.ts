import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validators/lead';
import { notifyAll } from '@/lib/services/notifications/orchestrator';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate payload
    const validatedData = leadSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { 
          message: 'Ошибка валидации', 
          errors: validatedData.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { name, phone, source, context } = validatedData.data;

    // Call orchestrator to fan out notifications
    await notifyAll({
      name,
      phone,
      source: source || 'Website',
      type: 'consultation',
      message: context,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API/Lead] Failed to process lead:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера', success: false },
      { status: 500 }
    );
  }
}

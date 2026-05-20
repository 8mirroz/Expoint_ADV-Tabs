import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validators/lead';
import { saveAndNotifyLead } from '@/lib/services/leadService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

    // 1. Валидация полей через Zod
    const validatedData = leadSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          message: 'Ошибка валидации',
          errors: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, phone, email, source, context, turnstileToken } =
      validatedData.data;

    // 2. Проверка Turnstile (публичный шлюз — обязательна)
    if (!TURNSTILE_SECRET_KEY) {
      console.error('[API/Lead] TURNSTILE_SECRET_KEY не задан');
    } else {
      const verifyResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${encodeURIComponent(TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(turnstileToken)}`,
        }
      );

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        return NextResponse.json(
          { success: false, message: 'Ошибка проверки безопасности (Turnstile)' },
          { status: 403 }
        );
      }
    }

    // 3. 152-ФЗ Логирование
    console.log(
      `[LeadService] Лид принят. 152-ФЗ согласие зафиксировано: ${name} (${phone})`
    );

    // 4. Сохранение в БД + рассылка уведомлений через единый сервис
    await saveAndNotifyLead({
      name,
      phone,
      email,
      source: source || 'Website',
      message: context,
      segment: validatedData.data.segment,
      type: 'consultation',
    });

    return NextResponse.json(
      { success: true, message: 'Заявка успешно отправлена' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API/Lead] Ошибка обработки лида:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера', success: false },
      { status: 500 }
    );
  }
}

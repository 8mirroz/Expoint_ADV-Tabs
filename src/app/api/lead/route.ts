import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validators/lead';
import { notifyAll } from '@/lib/services/notifications/orchestrator';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
    
    // 1. Validate payload
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

    const { name, phone, source, context, turnstileToken } = validatedData.data;

    // 2. Verify Turnstile Token
    if (!TURNSTILE_SECRET_KEY) {
      console.error('[API/Lead] TURNSTILE_SECRET_KEY is missing');
    } else {
      const verifyResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
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

    // 3. 152-FZ Compliance Logging
    console.log(`[ASH] Lead received. 152-FZ Consent Logged: ${name} (${phone})`);

    // 4. Call orchestrator to fan out notifications
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

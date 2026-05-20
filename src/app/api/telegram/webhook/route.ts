import { NextResponse } from 'next/server';
import { queryKnowledgeBaseRuntime } from '@/lib/knowledge/engine';
import { formatKnowledgeTelegramReply, sendTelegramMessage } from '@/lib/services/notifications/telegram';

interface TelegramWebhookPayload {
  message?: {
    chat?: {
      id?: number;
      type?: string;
    };
    from?: {
      first_name?: string;
    };
    text?: string;
  };
}

function isAuthorized(req: Request): boolean {
  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!expectedSecret) {
    return true;
  }

  return req.headers.get('x-telegram-bot-api-secret-token') === expectedSecret;
}

function buildWelcomeMessage(firstName?: string): string {
  const namePrefix = firstName ? `${firstName}, ` : '';
  return [
    `Здравствуйте, ${namePrefix}это Telegram-консультант БУКВА СВЕТ.`,
    'Отправьте текстовый вопрос о стоимости, материалах, сроках, 902-ПП или типе вывески, и я отвечу на основе текущей базы знаний.',
  ].join('\n\n');
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized webhook' }, { status: 401 });
  }

  const body = (await req.json()) as TelegramWebhookPayload;
  const chatId = body.message?.chat?.id;
  const text = body.message?.text?.trim();

  if (!chatId) {
    return NextResponse.json({ ok: true, ignored: 'missing_chat' }, { status: 200 });
  }

  if (!text) {
    await sendTelegramMessage(
      chatId,
      'Пока я обрабатываю только текстовые запросы. Напишите вопрос сообщением.',
    );
    return NextResponse.json({ ok: true, handled: 'non_text_message' }, { status: 200 });
  }

  if (text === '/start' || text === '/help') {
    await sendTelegramMessage(chatId, buildWelcomeMessage(body.message?.from?.first_name));
    return NextResponse.json({ ok: true, handled: 'help' }, { status: 200 });
  }

  const result = await queryKnowledgeBaseRuntime({
    query: text,
    context: `telegram chat_type=${body.message?.chat?.type ?? 'unknown'}`,
    session_meta: {
      locale: 'ru',
      path: '/telegram',
      session_id: String(chatId),
    },
  });

  await sendTelegramMessage(
    chatId,
    formatKnowledgeTelegramReply(result.answer, result.confidence),
  );

  return NextResponse.json(
    {
      ok: true,
      handled: 'knowledge_query',
      trace_id: result.trace_id,
      fallback_reason: result.fallback_reason,
    },
    { status: 200 },
  );
}

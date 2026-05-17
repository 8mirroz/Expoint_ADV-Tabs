import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

const queryKnowledgeBaseRuntime = vi.hoisted(() => vi.fn());
const sendTelegramMessage = vi.hoisted(() => vi.fn());

vi.mock('@/lib/knowledge/engine', () => ({
  queryKnowledgeBaseRuntime,
}));

vi.mock('@/lib/services/notifications/telegram', async () => {
  const actual = await vi.importActual<typeof import('@/lib/services/notifications/telegram')>(
    '@/lib/services/notifications/telegram',
  );

  return {
    ...actual,
    sendTelegramMessage,
  };
});

describe('POST /api/telegram/webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.TELEGRAM_WEBHOOK_SECRET;
  });

  it('returns help text for /start', async () => {
    sendTelegramMessage.mockResolvedValue(true);

    const req = new Request('http://localhost/api/telegram/webhook', {
      method: 'POST',
      body: JSON.stringify({
        message: {
          chat: { id: 12345, type: 'private' },
          from: { first_name: 'Иван' },
          text: '/start',
        },
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.handled).toBe('help');
    expect(queryKnowledgeBaseRuntime).not.toHaveBeenCalled();
    expect(sendTelegramMessage).toHaveBeenCalledWith(
      12345,
      expect.stringContaining('Telegram-консультант Expoint ADV'),
    );
  });

  it('queries knowledge runtime for plain text messages', async () => {
    queryKnowledgeBaseRuntime.mockResolvedValue({
      answer: 'Подтвержденные данные из NBLLM-контекста:\n1) Акрил: премиальный материал.',
      citations: [],
      confidence: 0.84,
      fallback_reason: 'none',
      trace_id: 'trace-1',
    });
    sendTelegramMessage.mockResolvedValue(true);

    const req = new Request('http://localhost/api/telegram/webhook', {
      method: 'POST',
      body: JSON.stringify({
        message: {
          chat: { id: 777, type: 'private' },
          text: 'Сколько стоит акриловая вывеска?',
        },
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.handled).toBe('knowledge_query');
    expect(queryKnowledgeBaseRuntime).toHaveBeenCalledWith({
      query: 'Сколько стоит акриловая вывеска?',
      context: 'telegram chat_type=private',
      session_meta: {
        locale: 'ru',
        path: '/telegram',
        session_id: '777',
      },
    });
    expect(sendTelegramMessage).toHaveBeenCalledWith(
      777,
      expect.stringContaining('Expoint ADV Assistant'),
    );
  });

  it('rejects webhook with invalid secret', async () => {
    process.env.TELEGRAM_WEBHOOK_SECRET = 'secret-123';

    const req = new Request('http://localhost/api/telegram/webhook', {
      method: 'POST',
      body: JSON.stringify({
        message: {
          chat: { id: 321, type: 'private' },
          text: 'Привет',
        },
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(sendTelegramMessage).not.toHaveBeenCalled();
    expect(queryKnowledgeBaseRuntime).not.toHaveBeenCalled();
  });
});

import dotenv from 'dotenv';
import path from 'path';
import { sendTelegramMessage } from '../src/lib/services/notifications/telegram';

// Загружаем переменные из .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log('--- ТЕСТИРОВАНИЕ TELEGRAM ИНТЕГРАЦИИ ---');
  console.log('Токен загружен:', token ? 'Да (присутствует)' : 'Нет');
  console.log('Chat ID:', chatId);

  if (!token || !chatId) {
    console.error('Ошибка: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы в .env.local!');
    process.exit(1);
  }

  const message = [
    '🔔 <b>Уведомление Expoint ADV</b>',
    '-------------------------',
    '✅ Интеграция с вашим Telegram-ботом успешно настроена и протестирована!',
    '🤖 Бот готов принимать лиды и консультировать по базе знаний.',
    '-------------------------',
    `📍 <b>ID получателя:</b> <code>${chatId}</code>`,
  ].join('\n');

  const success = await sendTelegramMessage(chatId, message);

  if (success) {
    console.log('УСПЕХ: Тестовое сообщение успешно отправлено в Telegram!');
  } else {
    console.error('ОШИБКА: Не удалось отправить сообщение. Проверьте правильность токена и ID чата.');
  }
}

main().catch(console.error);

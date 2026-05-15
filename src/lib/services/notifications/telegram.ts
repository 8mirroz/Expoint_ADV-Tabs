export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  source?: string;
  type: 'lead' | 'quote' | 'consultation';
  message?: string;
  calculatorData?: {
    text: string;
    productType?: string;
    heightCm: number;
    materialId: string;
    lightingId: string;
    priceRange: { min: number; max: number; currency: string };
    count?: number;
    complexity?: string;
    mounting?: string;
    urgency?: string;
    faceColor?: string;
    sideColor?: string;
  };
}

export const sendToTelegram = async (lead: LeadPayload): Promise<boolean> => {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('[Telegram] Token or Chat ID not configured. Skipping.');
    return false;
  }

  const icon = lead.type === 'quote' ? '📝' : '🔥';
  const title = lead.type === 'quote' ? 'Новый расчет стоимости' : 'Новая заявка на консультацию';

  let message = `
${icon} <b>${title}</b>
-------------------------
👤 <b>Имя:</b> ${lead.name}
📱 <b>Телефон:</b> ${lead.phone}
${lead.company ? `🏢 <b>Компания:</b> ${lead.company}` : ''}
${lead.email ? `📧 <b>Email:</b> ${lead.email}` : ''}
🌐 <b>Источник:</b> ${lead.source || 'Сайт'}
`.trim();

  if (lead.message) {
    message += `\n\n💬 <b>Сообщение:</b>\n${lead.message}`;
  }

  if (lead.calculatorData) {
    const calc = lead.calculatorData;
    message += `\n\n<b>🛠 Данные расчета:</b>
🏷 <b>Текст:</b> ${calc.text}
📐 <b>Тип:</b> ${calc.productType || '-'}
📏 <b>Высота:</b> ${calc.heightCm} см
✨ <b>Подсветка:</b> ${calc.lightingId}
🏗 <b>Материал:</b> ${calc.materialId}
🎨 <b>Цвета:</b> ${calc.faceColor || '-'}/${calc.sideColor || '-'}
🔧 <b>Монтаж:</b> ${calc.mounting || '-'}`;

    if (calc.priceRange) {
      message += `\n\n<b>💰 Бюджет: ${calc.priceRange.min.toLocaleString('ru-RU')} - ${calc.priceRange.max.toLocaleString('ru-RU')} ${calc.priceRange.currency}</b>`;
    }
  }

  message += `\n-------------------------`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Telegram API error: ${JSON.stringify(errorData)}`);
    }
    return true;
  } catch (error) {
    console.error('[Telegram Error]', error);
    return false;
  }
};

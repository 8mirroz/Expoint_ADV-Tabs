/**
 * leadService.ts — Единая точка обработки лидов на бэкенде.
 *
 * Отвечает за:
 * 1. Сохранение заявки в PostgreSQL (таблица `leads`) через Drizzle ORM.
 * 2. Веерную рассылку уведомлений (Telegram + Email + CRM) через notifyAll.
 * 3. Отправку письма-подтверждения клиенту, если указан email.
 *
 * НЕ содержит логику валидации Turnstile — это ответственность вызывающего кода
 * (публичного API-эндпоинта или Server Action). Доверенный серверный код
 * (например, submitOrder) вызывает этот сервис напрямую.
 */

import { db } from '@/db';
import { leads } from '@/db/schema';
import { notifyAll } from '@/lib/services/notifications/orchestrator';
import { sendConfirmationToLead } from '@/lib/services/notifications/email';
import type { LeadPayload } from '@/lib/services/notifications/telegram';

export interface ProcessLeadInput {
  name: string;
  phone: string;
  email?: string;
  source?: string;
  /** Свободное текстовое описание / ТЗ / сообщение от клиента */
  message?: string;
  /** Данные калькулятора для сериализации в поле context */
  calculatorData?: unknown;
  /** CRM-сегмент лида */
  segment?: string;
  /** Тип лида для форматирования уведомлений */
  type?: LeadPayload['type'];
}

export interface ProcessLeadResult {
  success: boolean;
  leadId?: string;
  error?: string;
}

/**
 * Сохраняет лид в БД и отправляет все уведомления.
 * Может вызываться из любого серверного кода без Turnstile.
 */
export async function saveAndNotifyLead(
  input: ProcessLeadInput
): Promise<ProcessLeadResult> {
  const {
    name,
    phone,
    email,
    source,
    message,
    calculatorData,
    segment,
    type = 'consultation',
  } = input;

  let leadId: string | undefined;

  // ── 1. Сохранение в PostgreSQL ────────────────────────────────────────────
  if (process.env.POSTGRES_URL) {
    try {
      // Собираем поле context: email + описание + JSON калькулятора
      const contextParts: string[] = [];

      if (email) {
        contextParts.push(`Email: ${email}`);
      }
      if (message) {
        contextParts.push(message);
      }
      if (calculatorData) {
        contextParts.push(
          `Данные конфигуратора:\n${JSON.stringify(calculatorData, null, 2)}`
        );
      }

      const finalContext = contextParts.join('\n\n') || null;

      const [inserted] = await db
        .insert(leads)
        .values({
          name,
          phone,
          source: source || 'Website',
          context: finalContext,
          segment: segment || null,
        })
        .returning({ id: leads.id });

      leadId = inserted?.id;
    } catch (dbError) {
      // Не критично — логируем и продолжаем отправку уведомлений
      console.error('[LeadService] DB save failed:', dbError);
    }
  }

  // ── 2. Веерная рассылка уведомлений ──────────────────────────────────────
  try {
    await notifyAll({
      name,
      phone,
      email,
      source: source || 'Website',
      type,
      message,
      calculatorData,
    });
  } catch (notifyError) {
    console.error('[LeadService] Notification failed:', notifyError);
  }

  // ── 3. Письмо-подтверждение клиенту ──────────────────────────────────────
  if (email) {
    sendConfirmationToLead(email, name).catch((err) => {
      console.error('[LeadService] Confirmation email failed:', err);
    });
  }

  return { success: true, leadId };
}

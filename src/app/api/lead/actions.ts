"use server";

import { z } from "zod";
import { saveAndNotifyLead } from "@/lib/services/leadService";

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

const LeadSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое"),
  phone: z.string().min(10, "Некорректный номер телефона"),
  email: z.string().email("Некорректный email").optional().or(z.literal("")),
  service: z.string().min(1, "Услуга не выбрана"),
  message: z.string().optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, "Необходимо согласие на обработку данных"),
  turnstileToken: z.string().min(1, "Ошибка проверки безопасности"),
});

export type LeadFormData = z.infer<typeof LeadSchema>;

export async function submitLead(formData: LeadFormData) {
  try {
    // 1. Валидация входных данных
    const validatedData = LeadSchema.parse(formData);

    // 2. Проверка Turnstile (публичное действие — обязательна)
    if (!TURNSTILE_SECRET_KEY) {
      throw new Error("TURNSTILE_SECRET_KEY не задан");
    }

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${encodeURIComponent(TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(
          validatedData.turnstileToken
        )}`,
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return {
        success: false,
        error: "Ошибка безопасности (Turnstile). Пожалуйста, попробуйте ещё раз.",
      };
    }

    // 3. 152-ФЗ Логирование
    console.log(
      `[submitLead] Лид принят. 152-ФЗ: ${validatedData.name} (${validatedData.phone})`
    );

    // 4. Сохранение в БД + веерная рассылка уведомлений
    await saveAndNotifyLead({
      name: validatedData.name,
      phone: validatedData.phone,
      email: validatedData.email || undefined,
      source: validatedData.service,
      message: validatedData.message,
      type: "consultation",
    });

    return {
      success: true,
      message: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
      };
    }

    console.error("[submitLead] Ошибка:", error);
    return {
      success: false,
      error: "Произошла системная ошибка. Пожалуйста, свяжитесь с нами по телефону.",
    };
  }
}

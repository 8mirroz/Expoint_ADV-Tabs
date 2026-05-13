"use server";

import { z } from "zod";

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

const LeadSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое"),
  phone: z.string().min(10, "Некорректный номер телефона"),
  email: z.string().email("Некорректный email").optional().or(z.literal("")),
  service: z.string().min(1, "Услуга не выбрана"),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "Необходимо согласие на обработку данных"),
  turnstileToken: z.string().min(1, "Ошибка проверки безопасности"),
});

export type LeadFormData = z.infer<typeof LeadSchema>;

export async function submitLead(formData: LeadFormData) {
  try {
    // 1. Validate Input
    const validatedData = LeadSchema.parse(formData);

    // 2. Verify Turnstile Token
    if (!TURNSTILE_SECRET_KEY) {
      throw new Error("TURNSTILE_SECRET_KEY is not defined");
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
        error: "Ошибка безопасности (Turnstile). Пожалуйста, попробуйте еще раз.",
      };
    }

    // 3. Log 152-FZ Compliance
    console.log(`[ASH] Lead received. 152-FZ Consent Logged: ${validatedData.name} (${validatedData.phone})`);

    // 4. Send to CRM (Mock)
    // Here we would call a CRM API or a Webhook
    console.log(`[CRM] Dispatching lead for service: ${validatedData.service}`);

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

    console.error("[ASH] Submission Error:", error);
    return {
      success: false,
      error: "Произошла системная ошибка. Пожалуйста, свяжитесь с нами по телефону.",
    };
  }
}

"use server";

import { z } from 'zod';
import { ServiceLeadPayloadSchema, ServiceLeadPayload } from '../model/schemas';
import { notifyAll } from '@/lib/services/notifications/orchestrator';
import { db } from '@/db';
import { leads } from '@/db/schema';

export async function submitSCNLead(payload: ServiceLeadPayload) {
  try {
    // 1. Strict schema validation
    const validatedData = ServiceLeadPayloadSchema.parse(payload);
    const { source, customer, projectData, consent } = validatedData;

    // 2. 152-FZ Consent Logging
    console.log(
      `[152-FZ Consent] SCN Lead received. Personal Data Accepted: ${consent.personalDataAccepted}. ` +
      `Customer Contact: ${customer.contact} (${customer.contactType}). Node ID: ${source.nodeId}`
    );

    // 3. Persist lead into database if URL is available
    if (process.env.POSTGRES_URL) {
      try {
        const details = [
          `--- SCN B2B Lead ---`,
          `Схема: v${validatedData.schemaVersion}`,
          `Страница: ${source.pageSlug}`,
          `Калькулятор: SCN Node (${source.nodeId})`,
          `Тип продукта: ${source.productType}`,
          `Вариант интерфейса: ${source.calculatorVariant}`,
          `Способ связи: ${customer.contactType} - ${customer.contact}`,
          `Имя контакта: ${customer.name || 'Не указано'}`,
          `Компания: ${customer.company || 'Не указано'}`,
          `Базовый расчет стоимости: ${projectData.pricingResult.basePrice} RUB`,
          projectData.selectedPackage 
            ? `Выбранный пакет: ${projectData.selectedPackage.title} (${projectData.selectedPackage.priceFrom} RUB)` 
            : 'Пакет не выбран',
          projectData.complianceRisk 
            ? `Оценка комплаенса: ${projectData.complianceRisk.level.toUpperCase()} - ${projectData.complianceRisk.userMessage}` 
            : '',
          projectData.leadScore 
            ? `Категория лида: ${projectData.leadScore.grade.toUpperCase()} (Приоритет: ${projectData.leadScore.salesPriority})` 
            : ''
        ].filter(Boolean).join('\n');

        await db.insert(leads).values({
          name: customer.name || 'SCN B2B Lead',
          phone: customer.contact,
          source: `SCN: ${source.serviceSlug}`,
          context: details,
          segment: source.productType,
          status: 'new'
        });
      } catch (dbError) {
        console.error('[API/SCN-Lead] Failed to save lead to database:', dbError);
      }
    }

    // 4. Trigger Orchestrator notification (Telegram, Email, external CRM)
    const email = customer.contactType === 'email' ? customer.contact : undefined;
    
    const calculatorDetails = {
      productType: source.productType,
      pricingInput: projectData.pricingInput,
      pricingResult: projectData.pricingResult,
      selectedPackage: projectData.selectedPackage,
      complianceRisk: projectData.complianceRisk,
      leadScore: projectData.leadScore
    };

    await notifyAll({
      name: customer.name || 'B2B Клиент SCN',
      phone: customer.contactType === 'phone' ? customer.contact : 'По запросу в SCN',
      email,
      source: `SCN: ${source.serviceSlug}`,
      type: 'quote',
      message: `B2B Заказ с SCN калькулятора. Продукт: ${source.productType}. Комплект: ${projectData.selectedPackage?.title || 'Оптимальный'}`,
      calculatorData: calculatorDetails
    });

    return {
      success: true,
      message: 'Ваше коммерческое предложение успешно сформировано! Наш инженер свяжется с вами в течение 10 минут.'
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('[API/SCN-Lead] Zod validation error:', error.flatten().fieldErrors);
      return {
        success: false,
        error: 'Ошибка заполнения контактных данных. Проверьте правильность ввода.'
      };
    }
    
    console.error('[API/SCN-Lead] Unknown lead submission error:', error);
    return {
      success: false,
      error: 'Системная ошибка. Пожалуйста, свяжитесь с отделом продаж по телефону.'
    };
  }
}

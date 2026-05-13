import type { LeadPayload } from './telegram';

export const sendToCRM = async (lead: LeadPayload): Promise<boolean> => {
  const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;

  if (!CRM_WEBHOOK_URL) {
    console.warn('[CRM] Webhook URL not configured. Skipping CRM integration.');
    return false;
  }

  // Example placeholder for AmoCRM / Bitrix24
  try {
    const response = await fetch(CRM_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `Лид с сайта: ${lead.name}`,
        name: lead.name,
        phone: lead.phone,
        source: lead.source || 'Website',
        calculator_data: lead.calculatorData
      }),
    });

    if (!response.ok) throw new Error('CRM API responded with an error');
    return true;
  } catch (error) {
    console.error('[CRM Error]', error);
    return false;
  }
};

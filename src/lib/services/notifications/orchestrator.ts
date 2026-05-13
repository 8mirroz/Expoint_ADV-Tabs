import type { LeadPayload } from './telegram';
import { sendToTelegram } from './telegram';
import { sendToEmail } from './email';
import { sendToCRM } from './crm';

export const notifyAll = async (lead: LeadPayload) => {
  // Fire all notification methods in parallel
  // We use Promise.allSettled so one failure doesn't crash the rest
  const results = await Promise.allSettled([
    sendToTelegram(lead),
    sendToEmail(lead),
    sendToCRM(lead)
  ]);

  return {
    telegram: results[0].status === 'fulfilled' ? results[0].value : false,
    email: results[1].status === 'fulfilled' ? results[1].value : false,
    crm: results[2].status === 'fulfilled' ? results[2].value : false,
  };
};

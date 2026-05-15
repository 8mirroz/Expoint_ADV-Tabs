export const trackEvent = (eventName: string, payload?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    // console.log for debug
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Event] ${eventName}`, payload);
    }
    
    // Push to Google Analytics via dataLayer
    (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer?.push({
      event: eventName,
      ...payload,
      timestamp: new Date().toISOString(),
    });
  }
};

export const AnalyticsEvents = {
  LEAD_SUBMITTED: 'lead_submitted',
  CALCULATOR_INTERACTION: 'calculator_interaction',
  CONFIGURATOR_OPENED: 'configurator_opened',
  MODEL_ROTATED: 'model_rotated'
} as const;

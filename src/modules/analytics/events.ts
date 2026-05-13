export const trackEvent = (eventName: string, payload?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    // integration with Yandex Metrika or Google Analytics
    console.log(`[Analytics Event] ${eventName}`, payload);
    
    // Example: (window as any).ym?.(12345678, 'reachGoal', eventName, payload);
    // Example: (window as any).dataLayer?.push({ event: eventName, ...payload });
  }
};

export const AnalyticsEvents = {
  LEAD_SUBMITTED: 'lead_submitted',
  CALCULATOR_INTERACTION: 'calculator_interaction',
  CONFIGURATOR_OPENED: 'configurator_opened',
  MODEL_ROTATED: 'model_rotated'
} as const;

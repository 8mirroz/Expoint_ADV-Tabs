import posthog from 'posthog-js';

// Determine if we are running in the browser and in production
const isBrowser = typeof window !== 'undefined';
const isProd = process.env.NODE_ENV === 'production';

export type SCNEventName =
  | 'scn_viewed'
  | 'scn_input_changed'
  | 'scn_price_calculated'
  | 'scn_package_viewed'
  | 'scn_package_selected'
  | 'scn_brief_started'
  | 'scn_wizard_step_completed'
  | 'scn_file_upload_started'
  | 'scn_file_upload_completed'
  | 'scn_lead_submit_started'
  | 'scn_lead_submit_succeeded'
  | 'scn_lead_submit_failed';

export interface SCNEventPayload {
  productType: 'neon' | 'lightbox' | 'wayfinding' | 'general';
  pageSlug: string;
  [key: string]: string | number | boolean | undefined | null;
}

export const SCNEventBus = {
  /**
   * Tracks an event in the SCN funnel.
   * Prevents PII leakage by strictly controlling payload structure.
   */
  track(eventName: SCNEventName, payload: SCNEventPayload) {
    if (!isBrowser) return;

    // Sanitize payload (ensure no raw email/phone is logged by mistake)
    const safePayload = { ...payload };
    if ('email' in safePayload) delete safePayload.email;
    if ('phone' in safePayload) delete safePayload.phone;
    if ('name' in safePayload) delete safePayload.name;

    if (isProd) {
      try {
        posthog.capture(eventName, safePayload);
      } catch (err) {
        console.warn('PostHog tracking failed:', err);
      }
    } else {
      console.log(`[SCN Analytics] ${eventName}:`, safePayload);
    }
  }
};

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConsentCategories {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface ConsentState {
  hasResponded: boolean;
  consents: ConsentCategories;
  policyVersion: string;
  lastUpdated: string | null;
  setConsents: (consents: Partial<ConsentCategories>) => void;
  acceptAll: () => void;
  declineAll: () => void;
}

const CURRENT_POLICY_VERSION = '1.0.0';

export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      hasResponded: false,
      consents: {
        essential: true, // Always true
        analytics: false,
        marketing: false,
      },
      policyVersion: CURRENT_POLICY_VERSION,
      lastUpdated: null,

      setConsents: (newConsents) =>
        set((state) => {
          const updatedConsents = {
            ...state.consents,
            ...newConsents,
            essential: true, // Safety check
          };
          
          // Sync with API
          syncConsentWithApi(updatedConsents);

          return {
            consents: updatedConsents,
            hasResponded: true,
            lastUpdated: new Date().toISOString(),
          };
        }),

      acceptAll: () =>
        set(() => {
          const allConsents = {
            essential: true,
            analytics: true,
            marketing: true,
          };
          syncConsentWithApi(allConsents);
          return {
            consents: allConsents,
            hasResponded: true,
            lastUpdated: new Date().toISOString(),
          };
        }),

      declineAll: () =>
        set(() => {
          const minimalConsents = {
            essential: true,
            analytics: false,
            marketing: false,
          };
          syncConsentWithApi(minimalConsents);
          return {
            consents: minimalConsents,
            hasResponded: true,
            lastUpdated: new Date().toISOString(),
          };
        }),
    }),
    {
      name: 'expoint-consent-storage',
    }
  )
);

async function syncConsentWithApi(consents: ConsentCategories) {
  try {
    const purposes: string[] = [];
    if (consents.essential) purposes.push('personal_data');
    if (consents.analytics) purposes.push('analytics');
    if (consents.marketing) purposes.push('marketing');
    
    // We only log if there is something beyond essential, 
    // or if the user explicitly responded.
    await fetch('/api/compliance/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formId: 'cookie_banner',
        purposes: purposes,
        policyVersion: CURRENT_POLICY_VERSION,
      }),
    });
  } catch (error) {
    console.error('Failed to sync consent with API:', error);
  }
}

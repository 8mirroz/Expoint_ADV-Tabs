import { submitOrder } from '@/app/api/orders/actions';
import { useSalesEngineStore, defaultSalesEngineAdapters, type SalesLeadInput, type SalesSubmitInput, type SalesEngineAdapters, type SalesEngineDraft } from '@/store/useSalesEngineStore';
import type { CalculatorConfig, QuotePackageId } from '@/lib/pricingEngine';
import { useCartStore } from '@/store/useCartStore';
export { useSalesEngineStore } from '@/store/useSalesEngineStore';

export type {
  CapabilityStage,
  HonestCapability,
  HonestCapabilityStatus,
  CapabilityState,
  SalesQuizInput,
  SalesLeadInput,
  SalesSubmitInput,
  SalesEngineDraft,
  SalesEngineAdapters,
} from '@/store/useSalesEngineStore';

export interface ExpointSalesEngine {
  start: (input: SalesLeadInput) => Promise<{ success: boolean; message: string }>;
  patchConfig: (patch: Partial<CalculatorConfig>) => ReturnType<typeof useSalesEngineStore.getState>['draft'];
  selectPackage: (packageId: QuotePackageId) => ReturnType<typeof useSalesEngineStore.getState>['draft'];
  saveQuoteCart: () => ReturnType<typeof useSalesEngineStore.getState>['draft'];
  resume: (cartItemId: string) => ReturnType<typeof useSalesEngineStore.getState>['draft'] | null;
  submit: (input: SalesSubmitInput) => Promise<{ success: boolean; message: string }>;
  requestVisualization: () => Promise<{ success: boolean; message: string; visualizationId?: string }>;
  generateProposal: () => Promise<{ success: boolean; message: string; proposalId?: string }>;
}

async function requestVisualizationAPI(cartItemId: string, name: string, email: string, phone: string, config: CalculatorConfig): Promise<{ success: boolean; message: string; visualizationId?: string }> {
  try {
    const response = await fetch('/api/visualization', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartItemId,
        name,
        email,
        phone,
        projectType: config.productType,
        text: config.text,
        widthMm: config.widthMm,
        heightMm: config.heightMm,
        depthMm: config.depthMm,
      }),
    });
    const data = await response.json();
    return data;
  } catch {
    return { success: false, message: 'Не удалось поставить визуализацию в очередь' };
  }
}

async function generateProposalAPI(draft: SalesEngineDraft, items: Array<{ id: string; name: string; price: number; description: string; metadata?: Record<string, unknown> }>, total: number, projectBrief: string): Promise<{ success: boolean; message: string; proposalId?: string }> {
  try {
    const response = await fetch('/api/proposal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: draft.lead?.name ?? '',
        email: draft.lead?.email ?? '',
        phone: draft.lead?.phone ?? '',
        items,
        total,
        projectBrief,
      }),
    });
    const data = await response.json();
    return data;
  } catch {
    return { success: false, message: 'Не удалось сгенерировать proposal' };
  }
}

export function createExpointSalesEngine(adapters: SalesEngineAdapters = {
  ...defaultSalesEngineAdapters,
  submitOrder,
}): ExpointSalesEngine {
  return {
    start: (input) => useSalesEngineStore.getState().start(input, adapters),
    patchConfig: (patch) => useSalesEngineStore.getState().patchConfig(patch),
    selectPackage: (packageId) => useSalesEngineStore.getState().selectPackage(packageId),
    saveQuoteCart: () => useSalesEngineStore.getState().saveQuoteCart(),
    resume: (cartItemId) => useSalesEngineStore.getState().resume(cartItemId),
    submit: (input) => useSalesEngineStore.getState().submit(input, adapters),
    requestVisualization: async () => {
      const draft = useSalesEngineStore.getState().draft;
      const contact = draft.lead || { name: '', email: '', phone: '' };
      return requestVisualizationAPI(draft.cartItemId ?? '', contact.name || '', contact.email || '', contact.phone || '', draft.config);
    },
    generateProposal: async () => {
      const draft = useSalesEngineStore.getState().draft;
      const cartStore = useCartStore.getState();
      const items = cartStore.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price || 0,
        description: item.description || '',
        metadata: item.metadata,
      }));
      return generateProposalAPI(draft, items, cartStore.getTotal(), draft.projectBrief);
    },
  };
}

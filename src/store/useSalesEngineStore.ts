import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  calculateConfiguratorEstimate,
  DEFAULT_CALCULATOR_CONFIG,
  type CalculatorConfig,
  type ConfiguratorEstimate,
  type QuotePackage,
  type QuotePackageId,
} from '@/lib/pricingEngine';
import { useCartStore, type CalculatorCartMetadata, type CartItem } from '@/store/useCartStore';

export type CapabilityStage = 'capture' | 'configured' | 'quoted' | 'carted' | 'submitted';
export type HonestCapability = 'pdf_proposal' | 'ai_visualization' | 'lead_scoring' | 'follow_up';
export type HonestCapabilityStatus = 'coming-next' | 'active' | 'operator-reviewed' | 'queued-manual-assist';

export interface CapabilityState {
  id: HonestCapability;
  title: string;
  status: HonestCapabilityStatus;
  description: string;
}

export interface SalesQuizInput {
  type: string;
  timeline: string;
  hasFacade: string;
}

export interface SalesLeadInput {
  name: string;
  phone: string;
  email?: string;
  consent: boolean;
  turnstileToken: string;
  source?: string;
  quiz?: SalesQuizInput;
}

export interface SalesSubmitInput {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  readinessDate?: Date;
  deliveryDate?: Date;
}

export interface SalesEngineDraft {
  lead: Omit<SalesLeadInput, 'turnstileToken'> | null;
  config: CalculatorConfig;
  estimate: ConfiguratorEstimate;
  selectedPackageId: QuotePackageId;
  selectedPackage: QuotePackage;
  cartItemId: string | null;
  stage: CapabilityStage;
  capabilities: CapabilityState[];
  projectBrief: string;
  source: string;
  startedAt: string | null;
  lastUpdatedAt: string | null;
  submitStatus: 'idle' | 'submitting' | 'submitted' | 'error';
  submitMessage: string | null;
}

export interface SalesEngineAdapters {
  submitLead: (input: SalesLeadInput & { context: string }) => Promise<{ success: boolean; message?: string; error?: string }>;
  submitOrder: (input: SalesSubmitInput & {
    items: Array<{
      id: string;
      name: string;
      price: number;
      description: string;
      metadata?: Record<string, unknown>;
    }>;
    total: number;
  }) => Promise<{ success: boolean; message: string }>;
}

const productTypeMap: Record<string, CalculatorConfig['productType']> = {
  'объемные буквы': 'volumetric-letters',
  'лайтбокс': 'lightbox',
  'гибкий неон': 'flex-neon',
};

function inferProductType(type?: string): CalculatorConfig['productType'] {
  if (!type) return DEFAULT_CALCULATOR_CONFIG.productType;
  return productTypeMap[type.trim().toLowerCase()] ?? DEFAULT_CALCULATOR_CONFIG.productType;
}

function inferUrgency(timeline?: string): CalculatorConfig['urgency'] {
  return timeline?.toLowerCase().includes('critical') ? 'express' : 'standard';
}

function inferConfigFromLead(input?: Partial<SalesLeadInput>): CalculatorConfig {
  return {
    ...DEFAULT_CALCULATOR_CONFIG,
    productType: inferProductType(input?.quiz?.type),
    urgency: inferUrgency(input?.quiz?.timeline),
  };
}

function buildProjectBrief(lead: Omit<SalesLeadInput, 'turnstileToken'> | null): string {
  if (!lead) return 'Лид еще не зафиксирован. Продолжайте конфигурацию и отправьте setup в quote cart.';

  const quizLines = lead.quiz
    ? [
        `Тип проекта: ${lead.quiz.type}`,
        `Срок: ${lead.quiz.timeline}`,
        `Фото фасада: ${lead.quiz.hasFacade}`,
      ]
    : ['Квиз не заполнен, используется стандартный B2B сценарий.'];

  return [
    `Контакт: ${lead.name}${lead.email ? ` · ${lead.email}` : ''}`,
    ...quizLines,
  ].join(' · ');
}

function buildCapabilities(stage: CapabilityStage): CapabilityState[] {
  return [
    {
      id: 'lead_scoring',
      title: 'Анализ лида',
      status: stage === 'capture' || stage === 'configured' || stage === 'quoted' || stage === 'carted' || stage === 'submitted' ? 'active' : 'coming-next',
      description: 'Интент и срочность уже зафиксированы в сессии и доступны менеджеру.',
    },
    {
      id: 'pdf_proposal',
      title: 'PDF-смета',
      status: stage === 'carted' || stage === 'submitted' ? 'operator-reviewed' : 'coming-next',
      description: 'Коммерческое предложение формируется после проверки инженером и менеджером.',
    },
    {
      id: 'ai_visualization',
      title: 'AI-визуализация',
      status: stage === 'carted' || stage === 'submitted' ? 'queued-manual-assist' : 'coming-next',
      description: 'Визуализация ставится в ручную очередь после подтверждения фасада и логотипа.',
    },
    {
      id: 'follow_up',
      title: 'Сопровождение',
      status: stage === 'submitted' ? 'active' : 'coming-next',
      description: 'Follow-up запускается после отправки сметы и подтверждения контактов.',
    },
  ];
}

function createDraft(configInput?: Partial<CalculatorConfig>, lead?: Omit<SalesLeadInput, 'turnstileToken'> | null, stage: CapabilityStage = 'configured', cartItemId: string | null = null): SalesEngineDraft {
  const estimate = calculateConfiguratorEstimate(configInput ?? inferConfigFromLead(lead ?? undefined));
  const selectedPackage = estimate.packages.find((pkg) => pkg.id === 'business') ?? estimate.packages[0];
  const now = new Date().toISOString();

  return {
    lead: lead ?? null,
    config: estimate.config,
    estimate,
    selectedPackageId: selectedPackage.id,
    selectedPackage,
    cartItemId,
    stage,
    capabilities: buildCapabilities(stage),
    projectBrief: buildProjectBrief(lead ?? null),
    source: lead?.source ?? 'sales-engine',
    startedAt: now,
    lastUpdatedAt: now,
    submitStatus: 'idle',
    submitMessage: null,
  };
}

function makeDraftItem(draft: SalesEngineDraft, itemId?: string): CartItem {
  const id = itemId || draft.cartItemId || `calc-${Date.now().toString(36)}`;
  const metadata: CalculatorCartMetadata = {
    customDimensions: {
      width: draft.config.widthMm,
      height: draft.config.heightMm,
      depth: draft.config.depthMm,
    },
    calculatorConfig: draft.config,
    selectedPackage: draft.selectedPackage,
    priceBreakdown: draft.estimate.breakdown,
    sourceSnapshotVersion: draft.estimate.breakdown.sourceSnapshot.version,
    editUrl: `/calculator?cartItem=${id}`,
    salesStage: 'carted',
    capabilities: buildCapabilities('carted'),
    projectBrief: draft.projectBrief,
  };

  return {
    id,
    type: 'custom',
    name: draft.estimate.config.text ? `${draft.selectedPackage.title} · ${draft.estimate.config.text}` : draft.selectedPackage.title,
    price: draft.selectedPackage.price,
    description: `${draft.selectedPackage.title}: ${draft.config.text}, ${draft.config.widthMm}x${draft.config.heightMm} мм`,
    metadata,
  };
}

export const defaultSalesEngineAdapters: SalesEngineAdapters = {
  submitLead: async ({ name, phone, email, consent, turnstileToken, source, context }) => {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        email,
        consent,
        source,
        context,
        turnstileToken,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    return {
      success: response.ok && payload.success !== false,
      message: payload.message,
      error: payload.error || payload.message,
    };
  },
  submitOrder: async () => ({ success: false, message: 'submitOrder adapter is not configured' }),
};

interface SalesEngineState {
  draft: SalesEngineDraft;
  start: (input: SalesLeadInput, adapters?: SalesEngineAdapters) => Promise<{ success: boolean; message: string }>;
  patchConfig: (patch: Partial<CalculatorConfig>) => SalesEngineDraft;
  selectPackage: (packageId: QuotePackageId) => SalesEngineDraft;
  saveQuoteCart: () => SalesEngineDraft;
  resume: (cartItemId: string) => SalesEngineDraft | null;
  submit: (input: SalesSubmitInput, adapters?: SalesEngineAdapters) => Promise<{ success: boolean; message: string }>;
  reset: () => void;
}

export const initialSalesDraft = createDraft(DEFAULT_CALCULATOR_CONFIG, null, 'configured', null);

export const useSalesEngineStore = create<SalesEngineState>()(
  persist(
    (set, get) => ({
      draft: initialSalesDraft,
      start: async (input, adapters = defaultSalesEngineAdapters) => {
        const lead = {
          name: input.name,
          phone: input.phone,
          email: input.email,
          consent: input.consent,
          source: input.source ?? 'Hero Premium Form',
          quiz: input.quiz,
        };
        const context = buildProjectBrief(lead);
        const result = await adapters.submitLead({ ...input, source: lead.source, context });

        if (!result.success) {
          set((state) => ({
            draft: {
              ...state.draft,
              lead,
              projectBrief: context,
              submitStatus: 'error',
              submitMessage: result.error || 'Не удалось отправить лид',
              lastUpdatedAt: new Date().toISOString(),
            },
          }));
          return { success: false, message: result.error || 'Не удалось отправить лид' };
        }

        const draft = createDraft(inferConfigFromLead(input), lead, 'capture', get().draft.cartItemId);
        set({
          draft: {
            ...draft,
            submitStatus: 'idle',
            submitMessage: result.message || 'Лид зафиксирован',
          },
        });
        return { success: true, message: result.message || 'Лид зафиксирован' };
      },
      patchConfig: (patch) => {
        const current = get().draft;
        const nextEstimate = calculateConfiguratorEstimate({ ...current.config, ...patch });
        const selectedPackage = nextEstimate.packages.find((pkg) => pkg.id === current.selectedPackageId) ?? nextEstimate.packages[1] ?? nextEstimate.packages[0];
        const nextStage: CapabilityStage = current.stage === 'carted' || current.stage === 'submitted' ? current.stage : 'quoted';
        const nextDraft: SalesEngineDraft = {
          ...current,
          config: nextEstimate.config,
          estimate: nextEstimate,
          selectedPackageId: selectedPackage.id,
          selectedPackage,
          stage: nextStage,
          capabilities: buildCapabilities(nextStage),
          lastUpdatedAt: new Date().toISOString(),
        };
        set({ draft: nextDraft });
        return nextDraft;
      },
      selectPackage: (packageId) => {
        const current = get().draft;
        const selectedPackage = current.estimate.packages.find((pkg) => pkg.id === packageId) ?? current.estimate.packages[1] ?? current.estimate.packages[0];
        const nextStage: CapabilityStage = current.stage === 'carted' || current.stage === 'submitted' ? current.stage : 'quoted';
        const nextDraft: SalesEngineDraft = {
          ...current,
          selectedPackageId: selectedPackage.id,
          selectedPackage,
          stage: nextStage,
          capabilities: buildCapabilities(nextStage),
          lastUpdatedAt: new Date().toISOString(),
        };
        set({ draft: nextDraft });
        return nextDraft;
      },
      saveQuoteCart: () => {
        const current = get().draft;
        const cartStore = useCartStore.getState();
        const item = makeDraftItem(current);

        if (current.cartItemId && cartStore.items.some((candidate) => candidate.id === current.cartItemId)) {
          cartStore.updateItem(current.cartItemId, makeDraftItem(current, current.cartItemId));
        } else {
          cartStore.addItem(item);
        }

        const savedId = current.cartItemId ?? item.id;
        const nextDraft: SalesEngineDraft = {
          ...current,
          cartItemId: savedId,
          stage: 'carted',
          capabilities: buildCapabilities('carted'),
          lastUpdatedAt: new Date().toISOString(),
        };
        set({ draft: nextDraft });
        return nextDraft;
      },
      resume: (cartItemId) => {
        const cartItem = useCartStore.getState().items.find((candidate) => candidate.id === cartItemId);
        const metadata = cartItem?.metadata;
        if (!cartItem || !metadata?.calculatorConfig || !metadata.selectedPackage || !metadata.priceBreakdown) {
          return null;
        }

        const estimate = calculateConfiguratorEstimate(metadata.calculatorConfig);
        const selectedPackage = estimate.packages.find((pkg) => pkg.id === metadata.selectedPackage?.id) ?? estimate.packages[1] ?? estimate.packages[0];
        const nextStage = (metadata.salesStage as CapabilityStage | undefined) ?? 'carted';
        const nextDraft: SalesEngineDraft = {
          ...get().draft,
          config: estimate.config,
          estimate,
          selectedPackageId: selectedPackage.id,
          selectedPackage,
          cartItemId,
          stage: nextStage,
          capabilities: Array.isArray(metadata.capabilities) ? (metadata.capabilities as CapabilityState[]) : buildCapabilities(nextStage),
          projectBrief: typeof metadata.projectBrief === 'string' ? metadata.projectBrief : get().draft.projectBrief,
          lastUpdatedAt: new Date().toISOString(),
          submitStatus: 'idle',
          submitMessage: null,
        };
        set({ draft: nextDraft });
        return nextDraft;
      },
      submit: async (input, adapters = defaultSalesEngineAdapters) => {
        const current = get().draft;
        set({ draft: { ...current, submitStatus: 'submitting', submitMessage: null } });
        const cartStore = useCartStore.getState();
        const items = cartStore.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price || 0,
          description: item.description || '',
          metadata: item.metadata,
        }));

        const result = await adapters.submitOrder({
          ...input,
          items,
          total: cartStore.getTotal(),
        });

        const nextStage: CapabilityStage = result.success ? 'submitted' : current.stage;
        set((state) => ({
          draft: {
            ...state.draft,
            stage: nextStage,
            capabilities: buildCapabilities(nextStage),
            submitStatus: result.success ? 'submitted' : 'error',
            submitMessage: result.message,
            lastUpdatedAt: new Date().toISOString(),
          },
        }));

        return result;
      },
      reset: () => set({ draft: initialSalesDraft }),
    }),
    {
      name: 'expoint_sales_engine_v1',
    }
  )
);

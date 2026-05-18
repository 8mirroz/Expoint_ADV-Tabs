import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCartStore } from '@/store/useCartStore';
import { useSalesEngineStore, initialSalesDraft, type SalesEngineAdapters } from './useSalesEngineStore';
import { createExpointSalesEngine } from '@/lib/salesEngine';
import type { CalculatorHandoffAsset } from '@/components/calculator/calculator.types';

const adapters: SalesEngineAdapters = {
  submitLead: async () => ({ success: true, message: 'lead ok' }),
  submitOrder: async () => ({ success: true, message: 'order ok' }),
};

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useSalesEngineStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [] });
    useSalesEngineStore.setState({ draft: initialSalesDraft });
    mockFetch.mockReset();
  });

  it('start initializes canonical draft from hero form and optional quiz', async () => {
    const result = await useSalesEngineStore.getState().start({
      name: 'Ivan',
      phone: '+79990000000',
      email: 'ivan@example.com',
      consent: true,
      turnstileToken: 'token',
      quiz: {
        type: 'Гибкий неон',
        timeline: 'Critical (7-10 дней)',
        hasFacade: 'Есть макет и фасад',
      },
    }, adapters);

    const draft = useSalesEngineStore.getState().draft;
    expect(result.success).toBe(true);
    expect(draft.lead?.name).toBe('Ivan');
    expect(draft.config.productType).toBe('flex-neon');
    expect(draft.config.urgency).toBe('express');
    expect(draft.stage).toBe('capture');
    expect(draft.capabilities.find((item) => item.id === 'lead_scoring')?.status).toBe('active');
  });

  it('patchConfig recalculates estimate and preserves selected package semantics', () => {
    useSalesEngineStore.getState().selectPackage('premium');
    const next = useSalesEngineStore.getState().patchConfig({
      text: 'ATMO',
      heightMm: 800,
    });

    expect(next.config.text).toBe('ATMO');
    expect(next.estimate.breakdown.total).toBeGreaterThan(0);
    expect(next.selectedPackageId).toBe('premium');
  });

  it('saveQuoteCart creates reversible cart items correctly', () => {
    const draft = useSalesEngineStore.getState().saveQuoteCart();
    const items = useCartStore.getState().items;

    expect(draft.stage).toBe('carted');
    expect(items).toHaveLength(1);
    expect(items[0].metadata?.calculatorConfig?.productType).toBeDefined();
    expect(items[0].metadata?.salesStage).toBe('carted');
  });

  it('resume hydrates from cart metadata into active draft', () => {
    const handoffAsset: CalculatorHandoffAsset = {
      id: 'asset-1',
      kind: 'facade_photo',
      filename: 'facade.png',
      mimeType: 'image/png',
      sizeBytes: 1024,
      status: 'uploaded',
      fileKey: 'uploads/leads/facade.png',
      uploadedAt: '2026-05-18T12:00:00.000Z',
    };
    useSalesEngineStore.getState().addHandoffAssets([handoffAsset]);
    const saved = useSalesEngineStore.getState().saveQuoteCart();
    useSalesEngineStore.setState({ draft: initialSalesDraft });

    const resumed = useSalesEngineStore.getState().resume(saved.cartItemId || '');
    expect(resumed).not.toBeNull();
    expect(resumed?.cartItemId).toBe(saved.cartItemId);
    expect(resumed?.selectedPackageId).toBe(saved.selectedPackageId);
    expect(resumed?.handoffAssets).toHaveLength(1);
    expect(resumed?.handoffAssets[0]?.fileKey).toBe('uploads/leads/facade.png');
    expect(['collecting', 'ready']).toContain(resumed?.handoffStatus);
  });

  it('submit builds checkout-safe payload and advances stage', async () => {
    useSalesEngineStore.getState().saveQuoteCart();

    const result = await useSalesEngineStore.getState().submit({
      name: 'Olga',
      email: 'olga@example.com',
      phone: '+79991112233',
      company: 'Expoint',
      address: 'Moscow',
    }, adapters);

    const draft = useSalesEngineStore.getState().draft;
    expect(result.success).toBe(true);
    expect(draft.stage).toBe('submitted');
    expect(draft.capabilities.find((item) => item.id === 'follow_up')?.status).toBe('active');
  });
});

describe('salesEngine facade - new capabilities', () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [] });
    useSalesEngineStore.setState({ draft: initialSalesDraft });
    mockFetch.mockReset();
  });

  it('requestVisualization calls API with correct payload', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ success: true, visualizationId: 'viz_123', message: 'queued' }),
    } as Response);

    useSalesEngineStore.getState().start({
      name: 'Test',
      phone: '+79990000000',
      consent: true,
      turnstileToken: 'token',
    }, adapters);

    useSalesEngineStore.getState().saveQuoteCart();

    const salesEngine = createExpointSalesEngine(adapters);
    const result = await salesEngine.requestVisualization();

    expect(mockFetch).toHaveBeenCalledWith('/api/visualization', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }));
    expect(result.success).toBe(true);
    expect(result.visualizationId).toBe('viz_123');
  });

  it('generateProposal calls API with cart items and project brief', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ success: true, proposalId: 'prop_456', message: 'generated' }),
    } as Response);

    useSalesEngineStore.getState().start({
      name: 'Test',
      phone: '+79990000000',
      consent: true,
      turnstileToken: 'token',
    }, adapters);

    useSalesEngineStore.getState().saveQuoteCart();

    const salesEngine = createExpointSalesEngine(adapters);
    const result = await salesEngine.generateProposal();

    expect(mockFetch).toHaveBeenCalledWith('/api/proposal', expect.objectContaining({
      method: 'POST',
    }));
    expect(result.success).toBe(true);
    expect(result.proposalId).toBe('prop_456');
  });
});

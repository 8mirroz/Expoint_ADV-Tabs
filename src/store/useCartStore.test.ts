import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore, type CartItem } from './useCartStore';
import { calculateConfiguratorEstimate, DEFAULT_CALCULATOR_CONFIG } from '@/lib/pricingEngine';

function makeCustomItem(id = 'calc-1'): CartItem {
  const estimate = calculateConfiguratorEstimate(DEFAULT_CALCULATOR_CONFIG);
  const selectedPackage = estimate.packages[1];

  return {
    id,
    type: 'custom',
    name: 'Объемные световые буквы',
    price: selectedPackage.price,
    description: 'Business quote setup',
    metadata: {
      calculatorConfig: estimate.config,
      selectedPackage,
      priceBreakdown: estimate.breakdown,
      sourceSnapshotVersion: estimate.breakdown.sourceSnapshot.version,
      editUrl: `/calculator?cartItem=${id}`,
    },
  };
}

describe('useCartStore calculator metadata', () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [] });
  });

  it('adds a custom calculator configuration to cart', () => {
    const item = makeCustomItem();
    useCartStore.getState().addItem(item);

    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].metadata?.calculatorConfig?.productType).toBe('volumetric-letters');
  });

  it('edits an existing custom calculator item without duplicating it', () => {
    const initial = makeCustomItem();
    useCartStore.getState().addItem(initial);

    const updated = makeCustomItem();
    useCartStore.getState().updateItem(initial.id, {
      ...updated,
      price: updated.price + 5000,
      metadata: {
        ...updated.metadata,
        calculatorConfig: {
          ...updated.metadata!.calculatorConfig!,
          text: 'UPDATED',
        },
      },
    });

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(initial.id);
    expect(items[0].price).toBe(updated.price + 5000);
    expect(items[0].metadata?.calculatorConfig?.text).toBe('UPDATED');
  });

  it('keeps reversible calculator metadata in persisted state', () => {
    const item = makeCustomItem('calc-persisted');
    useCartStore.getState().addItem(item);

    const persisted = JSON.parse(localStorage.getItem('expoint_cart_v7') || '{}');
    expect(persisted.state.items[0].metadata.calculatorConfig.productType).toBe('volumetric-letters');
    expect(persisted.state.items[0].metadata.selectedPackage.id).toBe('business');
  });
});

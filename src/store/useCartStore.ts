import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CalculatorConfig, PriceBreakdown, QuotePackage } from '@/lib/pricingEngine';

export type CartItemType = 'pack' | 'custom';

export interface CalculatorCartMetadata extends Record<string, unknown> {
  customDimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  calculatorConfig?: CalculatorConfig;
  selectedPackage?: QuotePackage;
  priceBreakdown?: PriceBreakdown;
  sourceSnapshotVersion?: string;
  editUrl?: string;
}

export interface CartItem {
  id: string; // Unique identifier
  type: CartItemType;
  name: string;
  price: number;
  quantity?: number;
  description?: string;
  customizations?: unknown[];
  metadata?: CalculatorCartMetadata; // Used for custom calculator configurations
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (id: string, item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        // Prevent duplicate packs (can only buy one instance of a specific pack)
        if (item.type === 'pack' && state.items.some(i => i.id === item.id)) {
          return state;
        }
        return { items: [...state.items, item] };
      }),
      updateItem: (id, item) => set((state) => ({
        items: state.items.map((existing) => existing.id === id ? { ...item, id } : existing)
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((sum, item) => sum + item.price, 0),
      getItemCount: () => get().items.length,
    }),
    {
      name: 'expoint_cart_v7',
    }
  )
);

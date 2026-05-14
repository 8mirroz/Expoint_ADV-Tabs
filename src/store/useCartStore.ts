import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItemType = 'pack' | 'custom';

export interface CartItem {
  id: string; // Unique identifier
  type: CartItemType;
  name: string;
  price: number;
  quantity?: number;
  description?: string;
  customizations?: any[];
  metadata?: Record<string, any>; // Used for custom calculator configurations
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
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

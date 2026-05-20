"use client";
import { create } from 'zustand';
import { calculateEstimatedPriceRange, PricingModifiers } from '../data/pricing-matrix';

export type ProductType = 'volumetric-letters' | 'flex-neon' | 'lightbox' | 'panel-bracket';

export interface CalculatorState {
  // Project Config
  productType: ProductType;
  text: string;
  heightCm: number;
  count: number;
  complexity: keyof PricingModifiers['complexity'];
  mounting: keyof PricingModifiers['mounting'];
  urgency: keyof PricingModifiers['urgency'];
  
  // Visual/Material Config
  materialId: string;
  lightingId: string;
  faceColor: string;
  sideColor: string;
  
  // Results
  priceRange: { min: number; max: number; currency: string } | null;
  
  // Actions
  setProductType: (type: ProductType) => void;
  setText: (text: string) => void;
  setHeight: (height: number) => void;
  setCount: (count: number) => void;
  setComplexity: (complexity: keyof PricingModifiers['complexity']) => void;
  setMounting: (mounting: keyof PricingModifiers['mounting']) => void;
  setUrgency: (urgency: keyof PricingModifiers['urgency']) => void;
  setMaterial: (materialId: string) => void;
  setLighting: (lightingId: string) => void;
  setColors: (face: string, side: string) => void;
  
  recalculate: () => void;
  reset: () => void;
}

const DEFAULT_STATE = {
  productType: 'volumetric-letters' as ProductType,
  text: 'БУКВА',
  heightCm: 30,
  count: 7,
  complexity: 'standard' as const,
  mounting: 'wall_simple' as const,
  urgency: 'standard' as const,
  materialId: 'pvc-premium',
  lightingId: 'led-internal',
  faceColor: '#FFFFFF',
  sideColor: '#111111',
  priceRange: null,
};

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  ...DEFAULT_STATE,

  setProductType: (productType) => {
    set({ productType });
    get().recalculate();
  },
  setText: (text) => {
    set({ text, count: text.trim().length });
    get().recalculate();
  },
  setHeight: (heightCm) => {
    set({ heightCm });
    get().recalculate();
  },
  setCount: (count) => {
    set({ count });
    get().recalculate();
  },
  setComplexity: (complexity) => {
    set({ complexity });
    get().recalculate();
  },
  setMounting: (mounting) => {
    set({ mounting });
    get().recalculate();
  },
  setUrgency: (urgency) => {
    set({ urgency });
    get().recalculate();
  },
  setMaterial: (materialId) => {
    set({ materialId });
    get().recalculate();
  },
  setLighting: (lightingId) => {
    set({ lightingId });
    get().recalculate();
  },
  setColors: (faceColor, sideColor) => {
    set({ faceColor, sideColor });
  },

  recalculate: () => {
    const state = get();
    // In a real app, we would look up material modifiers from materials.ts
    // For now, we use placeholders or simple logic
    const materialModifier = state.materialId.includes('premium') ? 1.2 : 1.0;
    const lightingModifier = state.lightingId === 'none' ? 0.7 : 1.0;

    const range = calculateEstimatedPriceRange({
      heightCm: state.heightCm,
      count: state.count || 1,
      complexity: state.complexity,
      mounting: state.mounting,
      urgency: state.urgency,
      materialModifier,
      lightingModifier,
    });

    set({ priceRange: range });
  },

  reset: () => set(DEFAULT_STATE),
}));

// Initialize price
useCalculatorStore.getState().recalculate();

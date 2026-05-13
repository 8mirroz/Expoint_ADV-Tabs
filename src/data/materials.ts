export type LightingType = 'none' | 'internal' | 'halo' | 'combined' | 'open_neon';

export interface SignMaterial {
  id: string;
  name: string;
  description: string;
  premiumValue: string; // Used for "Value-Selling" in UI
  basePriceModifier: number;
  physicalProperties: {
    reflectivity: number;
    roughness: number;
    metalness: number;
    color: string;
  };
}

export const SIGN_MATERIALS: SignMaterial[] = [
  {
    id: 'acrylic_white',
    name: 'Акрил молочный 3мм (Akryma)',
    description: 'Стандарт индустрии для лицевых панелей с мягким рассеиванием.',
    premiumValue: 'Идеально ровное свечение без пятен.',
    basePriceModifier: 1.0,
    physicalProperties: {
      reflectivity: 0.1,
      roughness: 0.2,
      metalness: 0.0,
      color: '#FFFFFF'
    }
  },
  {
    id: 'pvc_5mm',
    name: 'ПВХ 5мм (UNEXT Strong)',
    description: 'Прочный пластик для боковых и задних стенок.',
    premiumValue: 'Повышенная жесткость конструкции.',
    basePriceModifier: 0.8,
    physicalProperties: {
      reflectivity: 0.05,
      roughness: 0.8,
      metalness: 0.0,
      color: '#F0F0F0'
    }
  },
  {
    id: 'stainless_steel',
    name: 'Нержавеющая сталь (AISI 304)',
    description: 'Премиальный металл для бортов и лицевых панелей.',
    premiumValue: 'Вечный блеск и антикоррозийная защита.',
    basePriceModifier: 2.5,
    physicalProperties: {
      reflectivity: 0.9,
      roughness: 0.1,
      metalness: 1.0,
      color: '#C0C0C0'
    }
  }
];

export interface LightingPackage {
  id: LightingType;
  name: string;
  description: string;
  valueProp: string;
  priceModifier: number;
}

export const LIGHTING_PACKAGES: LightingPackage[] = [
  {
    id: 'internal',
    name: 'Внутренняя подсветка (Samsung LEDs)',
    description: 'Классическое свечение лицевой панели.',
    valueProp: 'Максимальная яркость и видимость в ночное время.',
    priceModifier: 1.2
  },
  {
    id: 'halo',
    name: 'Контражур (Halo-lit)',
    description: 'Элегантное свечение на стену (эффект парения).',
    valueProp: 'Создает премиальный, дорогой образ бренда.',
    priceModifier: 1.5
  }
];

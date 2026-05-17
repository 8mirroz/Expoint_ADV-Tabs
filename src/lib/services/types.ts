import { ReactNode } from 'react';

export type ServiceId = 'neon' | 'lightboxes' | 'wayfinding';

export interface ServiceHeroData {
  title: string;
  subtitle: string;
  videoSrc?: string;
  imageSrc?: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
}

export interface B2BSegment {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface PricingPackage {
  id: 'start' | 'business' | 'premium';
  title: string;
  role: 'entry' | 'recommended' | 'anchor';
  priceLabel: string;
  includes: string[];
  bestFor: string[];
  limitations?: string[];
  cta: string;
}

export interface TechnologyComparisonItem {
  feature: string;
  optionA: {
    name: string;
    value: string | boolean;
  };
  optionB: {
    name: string;
    value: string | boolean;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MaterialOption {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
}

export interface ServicePageData {
  id: ServiceId;
  slug: string;
  hero: ServiceHeroData;
  segments: B2BSegment[];
  packages: PricingPackage[];
  comparison?: {
    title: string;
    items: TechnologyComparisonItem[];
  };
  legal?: {
    title: string;
    content: string;
    bullets: string[];
  };
  materials?: {
    title: string;
    options: MaterialOption[];
  };
  faq: FAQItem[];
  finalCTA: {
    title: string;
    description: string;
    buttonText: string;
  };
}

import type { KnowledgeContentMeta } from '@/lib/knowledge/types';

export type ServiceId =
  | 'neon'
  | 'lightboxes'
  | 'wayfinding'
  | 'volumetric-letters'
  | 'setup';

export interface ServiceHeroData {
  title: string;
  subtitle: string;
  videoSrc?: string;
  imageSrc?: string;
  eyebrow?: string;
  trustLine?: string[];
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

export interface ProofStat {
  value: string;
  label: string;
  description: string;
}

export interface SkuOffer {
  id: string;
  title: string;
  priceLabel: string;
  description: string;
  tags: string[];
}

export interface CaseCard {
  id: string;
  title: string;
  budget: string;
  timeline: string;
  result: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  meta: string;
}

export interface LeadMagnet {
  title: string;
  description: string;
}

export interface ServicePageData {
  id: ServiceId;
  slug: string;
  hero: ServiceHeroData;
  proofStats?: ProofStat[];
  segments: B2BSegment[];
  sku?: SkuOffer[];
  packages: PricingPackage[];
  caseCards?: CaseCard[];
  process?: ProcessStep[];
  leadMagnets?: LeadMagnet[];
  comparison?: {
    variant?: 'default' | 'premium-dark';
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
  contentMeta: KnowledgeContentMeta;
}

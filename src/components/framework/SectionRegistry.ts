'use client';

import dynamic from 'next/dynamic';
import type { SectionConfig } from './types';

// === Existing Sections ===
const HeroSection = dynamic(() => import('@/components/sections/Hero'));
const Services = dynamic(() => import('@/components/sections/Services'));
const Safety = dynamic(() => import('@/components/sections/Safety'));
const Process = dynamic(() => import('@/components/sections/Process'));
const Clients = dynamic(() => import('@/components/sections/Clients'));
const FAQ = dynamic(() => import('@/components/sections/FAQ'));
const MapSection = dynamic(() => import('@/components/sections/MapSection'));
const Pricing = dynamic(() => import('@/components/sections/Pricing'));
const ProductionDaily = dynamic(() => import('@/components/sections/ProductionDaily'));
const CalculatorSection = dynamic(() => import('@/components/sections/CalculatorSection'));
const Cases = dynamic(() => import('@/components/sections/Cases'));
const Benefits = dynamic(() => import('@/components/sections/Benefits'));
const MaterialComparison = dynamic(() => import('@/components/sections/MaterialComparison'));
const ServiceRates = dynamic(() => import('@/components/sections/ServiceRates'));

// === New Shared Sections (v8) ===
const HeroGeneric = dynamic(() => import('@/components/sections/HeroGeneric'));
const StatsSection = dynamic(() => import('@/components/sections/StatsSection'));
const CTASection = dynamic(() => import('@/components/sections/CTASection'));
const ValuesSection = dynamic(() => import('@/components/sections/ValuesSection'));
const TeamSection = dynamic(() => import('@/components/sections/TeamSection'));
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'));
const ContactInfoSection = dynamic(() => import('@/components/sections/ContactInfoSection'));
const GalleryGrid = dynamic(() => import('@/components/sections/GalleryGrid'));
const CasesArchive = dynamic(() => import('@/components/sections/CasesArchive'));
const PricingExplainer = dynamic(() => import('@/components/sections/PricingExplainer'));
const PricingCompliance = dynamic(() => import('@/components/sections/PricingCompliance'));

/**
 * SectionRegistry — Maps section type strings to lazy-loaded React components.
 * Central source of truth for all available page sections.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SECTION_REGISTRY: Record<string, React.ComponentType<any>> = {
  // Existing sections
  'hero-home': HeroSection,
  'services': Services,
  'safety': Safety,
  'process': Process,
  'clients': Clients,
  'faq': FAQ,
  'map': MapSection,
  'pricing': Pricing,
  'production-daily': ProductionDaily,
  'calculator': CalculatorSection,
  'cases': Cases,
  'benefits': Benefits,
  'material-comparison': MaterialComparison,
  'service-rates': ServiceRates,

  // New shared sections (v8)
  'hero-generic': HeroGeneric,
  'stats': StatsSection,
  'cta': CTASection,
  'values': ValuesSection,
  'team': TeamSection,
  'testimonials': TestimonialsSection,
  'contact-info': ContactInfoSection,
  'gallery-grid': GalleryGrid,
  'cases-archive': CasesArchive,
  'pricing-explainer': PricingExplainer,
  'pricing-compliance': PricingCompliance,
};

/**
 * Resolve a section type to its component.
 * Returns null if section type is not registered.
 */
export function resolveSection(type: string) {
  return SECTION_REGISTRY[type] ?? null;
}

// Presentation Framework Core — Type Definitions
// Genesis v8: Expoint ADV

import type { ReactNode } from 'react';

/**
 * Configuration for a single section in a page blueprint.
 */
export interface SectionConfig {
  /** Key matching SectionRegistry entry */
  type: string;
  /** Unique section ID for scroll targeting and DOM identification */
  id: string;
  /** Props passed to the section component */
  props?: Record<string, unknown>;
  /** Conditional rendering */
  condition?: 'mobile-only' | 'desktop-only';
}

/**
 * Breadcrumb navigation item.
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Complete page blueprint for declarative page rendering.
 */
export interface PageBlueprint {
  /** URL slug identifier */
  slug: string;
  /** SEO metadata */
  metadata: {
    title: string;
    description: string;
    ogImage?: string;
    schemaType?: 'Organization' | 'LocalBusiness' | 'WebPage' | 'Article' | 'Service';
  };
  /** Header variant for this page */
  headerVariant?: 'default' | 'immersive';
  /** Breadcrumb trail */
  breadcrumbs?: BreadcrumbItem[];
  /** Show footer (default: true) */
  showFooter?: boolean;
  /** Show AI assistant widget (default: true) */
  showAssistant?: boolean;
  /** Ordered list of sections to render */
  sections: SectionConfig[];
}

/**
 * Props for PageShell wrapper component.
 */
export interface PageShellProps {
  children: ReactNode;
  headerVariant?: 'default' | 'immersive';
  breadcrumbs?: BreadcrumbItem[];
  showFooter?: boolean;
  showAssistant?: boolean;
  withMesh?: boolean;
}

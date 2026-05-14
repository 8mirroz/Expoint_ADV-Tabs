'use client';

import { Suspense } from 'react';
import { resolveSection } from './SectionRegistry';
import type { SectionConfig } from './types';

interface PageRendererProps {
  sections: SectionConfig[];
}

/**
 * PageRenderer — Iterates over a sections array and renders
 * each section from the SectionRegistry with its props.
 * 
 * Supports conditional rendering (mobile-only / desktop-only).
 */
export function PageRenderer({ sections }: PageRendererProps) {
  return (
    <>
      {sections.map((section) => {
        const Component = resolveSection(section.type);

        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[PageRenderer] Unknown section type: "${section.type}"`);
          }
          return null;
        }

        // Conditional rendering classes
        let conditionalClass = '';
        if (section.condition === 'mobile-only') {
          conditionalClass = 'lg:hidden';
        } else if (section.condition === 'desktop-only') {
          conditionalClass = 'hidden lg:block';
        }

        return (
          <Suspense
            key={section.id}
            fallback={
              <div className="section-padding flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <div id={section.id} className={conditionalClass}>
              <Component {...(section.props ?? {})} />
            </div>
          </Suspense>
        );
      })}
    </>
  );
}

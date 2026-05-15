import React from 'react';
import { Metadata } from 'next';
import { PRICES_PAGE } from '@/data/pages/prices';
import PageShell from '@/components/framework/PageShell';
import { PageRenderer } from '@/components/framework/PageRenderer';

export const metadata: Metadata = {
  title: PRICES_PAGE.metadata.title,
  description: PRICES_PAGE.metadata.description,
};

/**
 * PricesPage — Renders the commercial terms and pricing grid.
 * Uses the Presentation Framework Core (PFC) architecture for consistency.
 */
export default function PricesPage() {
  return (
    <PageShell
      withMesh
      headerVariant={PRICES_PAGE.headerVariant}
      breadcrumbs={PRICES_PAGE.breadcrumbs}
    >
      <main className="min-h-screen">
        <PageRenderer sections={PRICES_PAGE.sections} />
      </main>
    </PageShell>
  );
}

import PageShell from '@/components/framework/PageShell';
import Hero from '../../components/sections/Hero';
import Services from '../../components/sections/Services';
import DesignProjectCTA from '../../components/sections/DesignProjectCTA';
import Safety from '../../components/sections/Safety';
import Process from '../../components/sections/Process';
import Clients from '../../components/sections/Clients';
import MapSection from '../../components/sections/MapSection';
import Script from 'next/script';

import { generateLocalBusinessSchema, generateFAQSchema, generateOrganizationSchema, generateWebSiteSchema } from '../../lib/seo/schema';

export default function MarketingPage() {
  const schemas = [
    generateLocalBusinessSchema(),
    generateFAQSchema(),
    generateOrganizationSchema(),
    generateWebSiteSchema(),
  ];

  return (
    <PageShell headerVariant="immersive">
      <Script
        id="json-ld-marketing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Hero />
      <Clients />
      <Services />
      <DesignProjectCTA />
      <Safety />
      <Process />
      <MapSection />
    </PageShell>
  );
}

import PageShell from '@/components/framework/PageShell';
import Hero from '../../components/sections/Hero';
import Services from '../../components/sections/Services';
import Safety from '../../components/sections/Safety';
import Process from '../../components/sections/Process';
import Clients from '../../components/sections/Clients';
import MapSection from '../../components/sections/MapSection';
import AssistantWidget from '../../components/ai/AssistantWidget';

import { generateLocalBusinessSchema, generateFAQSchema } from '../../lib/seo/schema';

export default function MarketingPage() {
  const schemas = [generateLocalBusinessSchema(), generateFAQSchema()];

  return (
    <PageShell headerVariant="immersive">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Hero />
      <Clients />
      <Services />
      <Safety />
      <Process />
      <MapSection />
      <AssistantWidget />
    </PageShell>
  );
}

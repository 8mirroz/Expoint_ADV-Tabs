import Header from '../../components/sections/Header';
import Hero from '../../components/sections/Hero';
import Services from '../../components/sections/Services';
import Safety from '../../components/sections/Safety';
import Process from '../../components/sections/Process';
import Clients from '../../components/sections/Clients';
import Footer from '../../components/sections/Footer';
import MapSection from '../../components/sections/MapSection';
import AssistantWidget from '../../components/ai/AssistantWidget';

import { generateLocalBusinessSchema, generateFAQSchema } from '../../lib/seo/schema';

export default function MarketingPage() {
  const schemas = [generateLocalBusinessSchema(), generateFAQSchema()];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Header variant="immersive" />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Safety />
        <Process />
        <MapSection />
      </main>
      <Footer />
      <AssistantWidget />
    </>
  );
}

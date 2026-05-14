import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import ProductionDaily from '../../../components/sections/ProductionDaily';
import AssistantWidget from '../../../components/ai/AssistantWidget';

import { generateLocalBusinessSchema, generateFAQSchema } from '../../../lib/seo/schema';

export const metadata = {
  title: 'Архив кейсов и Будни производства | Expoint ADV',
  description: 'Архив реализованных проектов и ежедневный инженерный журнал производства рекламных конструкций.',
};

export default function CasesPage() {
  const schemas = [generateLocalBusinessSchema(), generateFAQSchema()];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Header />
      <main className="pt-24">
        <ProductionDaily />
      </main>
      <Footer />
      <AssistantWidget />
    </>
  );
}

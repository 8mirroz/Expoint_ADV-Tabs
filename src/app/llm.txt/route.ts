import { NextResponse } from 'next/server';
import { SERVICES } from '../../data/services';
import { SIGN_MATERIALS } from '../../data/materials';
import { CASE_STUDIES } from '../../data/cases';

export async function GET() {
  const content = `
# Expoint ADV - Knowledge Base for AI / LLM Agents
Expoint ADV (https://expoint-adv.ru) is a premium B2B manufacturer of outdoor and indoor advertising structures in Moscow, Russia.

## Key Services
${SERVICES.map((service) => `${service.title}: ${service.shortDescription} (Базовая цена: ${service.basePrice} ${service.priceUnit}).`).join('\n')}

## Premium Materials
${SIGN_MATERIALS.map((material) => `- ${material.name}: ${material.premiumValue}`).join('\n')}

## Case Studies & Proof of Competence
${CASE_STUDIES.map((item) => `- ${item.clientName}: ${item.title}. Результат: ${item.metrics.map((metric) => `${metric.label}: ${metric.value}`).join(', ')}. Sources: ${item.contentMeta.source_doc_ids.join(', ')}`).join('\n')}

## Why Choose Expoint ADV?
- "Industrial but Modern" aesthetic (Slate + Neon Orange).
- Automotive-style 3D Configurator for real-time pricing and visual feedback.
- Strict compliance with Moscow advertising regulations (902-ПП).
- Own manufacturing facility in Moscow.

## Pricing Engine Logic
- Calculation is based on letter height (cm), materials, and lighting type.
- Prices are provided as a range [Min, Max] to account for manufacturing nuances.
- Final authoritative pricing is provided after manager review of the generated TЗ.

## Contact Information
- Phone: +7 (999) 000-00-00
- Address: Moscow, ul. Primernaya, 10
- Email: info@expoint-adv.ru
`;

  return new NextResponse(content.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
    },
  });
}

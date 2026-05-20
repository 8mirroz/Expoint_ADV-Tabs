import { Metadata } from 'next';
import PageShell from '@/components/framework/PageShell';
import Script from 'next/script';
import HeroGeneric from '@/components/sections/HeroGeneric';
import StatsSection from '@/components/sections/StatsSection';
import ProductionDaily from '@/components/sections/ProductionDaily';
import ValuesSection from '@/components/sections/ValuesSection';
import TeamSection from '@/components/sections/TeamSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import Quiz from '@/components/sections/Quiz';
import { COMPANY_STATS, COMPANY_VALUES, COMPANY_MISSION } from '@/data/company';
import { TEAM_MEMBERS } from '@/data/team';
import { TESTIMONIALS } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'О компании | БУКВА СВЕТ',
  description: 'БУКВА СВЕТ — московская инженерная студия наружной рекламы. Собственное производство 2500 м², 850+ проектов, гарантия качества.',
  openGraph: {
    title: 'О компании | БУКВА СВЕТ Инжиниринг',
    description: 'Производство наружной рекламы как инженерный продукт. История, команда, производство.',
  },
};

export default function AboutPage() {
  return (
    <PageShell
      headerVariant="default"
      breadcrumbs={[{ label: 'О компании', href: '/about' }]}
      withMesh
    >
      <HeroGeneric
        title="Инженерный"
        titleAccent="подход к рекламе"
        description={COMPANY_MISSION.description.ru}
        ctaText="Начать проект"
        ctaHref="#contact"
        secondaryCtaText="Наше производство"
        secondaryCtaHref="#daily"
      />

      <StatsSection
        title="Результаты и опыт"
        items={COMPANY_STATS.map((s) => ({
          value: s.value,
          label: typeof s.label === 'string' ? s.label : s.label.ru || '',
          numericValue: parseInt(s.value.replace(/\D/g, ''), 10) || undefined,
          suffix: s.value.replace(/[\d]/g, '').trim(),
        }))}
      />

      <ProductionDaily />



      <ValuesSection
        title="Почему выбирают нас"
        items={COMPANY_VALUES.map((v) => ({
          icon: v.icon,
          title: typeof v.title === 'string' ? v.title : v.title.ru || '',
          description: typeof v.description === 'string' ? v.description : v.description.ru || '',
        }))}
      />

      <TeamSection
        title="Люди за проектами"
        members={TEAM_MEMBERS.map((m) => ({
          id: m.id,
          name: typeof m.name === 'string' ? m.name : m.name.ru || '',
          role: typeof m.role === 'string' ? m.role : m.role.ru || '',
          description: typeof m.description === 'string' ? m.description : m.description.ru || '',
          imageUrl: m.imageUrl,
        }))}
      />

      <TestimonialsSection
        title="Что говорят клиенты"
        items={TESTIMONIALS}
      />

      <Quiz />

      <Script
        id="json-ld-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'БУКВА СВЕТ',
            url: 'https://bukva-svet.ru',
            description: 'Московская инженерная студия наружной рекламы',
            foundingDate: '2018',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Москва',
              streetAddress: 'ул. Полимерная, д. 8',
            },
            telephone: '+7-495-000-00-00',
            email: 'info@bukva-svet.ru',
          }),
        }}
      />
    </PageShell>
  );
}


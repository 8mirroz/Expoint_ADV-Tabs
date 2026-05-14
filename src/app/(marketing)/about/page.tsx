import { Metadata } from 'next';
import PageShell from '@/components/framework/PageShell';
import HeroGeneric from '@/components/sections/HeroGeneric';
import StatsSection from '@/components/sections/StatsSection';
import ValuesSection from '@/components/sections/ValuesSection';
import TeamSection from '@/components/sections/TeamSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import { COMPANY_STATS, COMPANY_VALUES, COMPANY_MISSION } from '@/data/company';
import { TEAM_MEMBERS } from '@/data/team';
import { TESTIMONIALS } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'О компании | Expoint ADV',
  description: 'Expoint ADV — московская инженерная студия наружной рекламы. Собственное производство 2500 м², 850+ проектов, гарантия качества.',
  openGraph: {
    title: 'О компании | Expoint ADV Engineering',
    description: 'Производство наружной рекламы как инженерный продукт. История, команда, производство.',
  },
};

export default function AboutPage() {
  return (
    <PageShell
      headerVariant="default"
      breadcrumbs={[{ label: 'О компании', href: '/about' }]}
    >
      <HeroGeneric
        subtitle="О компании"
        title="Инженерный"
        titleAccent="подход к рекламе"
        description={COMPANY_MISSION.description.ru}
        ctaText="Начать проект"
        ctaHref="#contact"
        secondaryCtaText="Наше производство"
        secondaryCtaHref="#production"
      />

      <StatsSection
        subtitle="Цифры и факты"
        title="Результаты работы"
        items={COMPANY_STATS.map((s) => ({
          value: s.value,
          label: typeof s.label === 'string' ? s.label : s.label.ru || '',
          numericValue: parseInt(s.value.replace(/\D/g, ''), 10) || undefined,
          suffix: s.value.replace(/[\d]/g, '').trim(),
        }))}
      />

      <ValuesSection
        subtitle="Наши ценности"
        title="Почему выбирают нас"
        items={COMPANY_VALUES.map((v) => ({
          icon: v.icon,
          title: typeof v.title === 'string' ? v.title : v.title.ru || '',
          description: typeof v.description === 'string' ? v.description : v.description.ru || '',
        }))}
      />

      <TeamSection
        subtitle="Команда"
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
        subtitle="Отзывы"
        title="Что говорят клиенты"
        items={TESTIMONIALS}
      />

      <CTASection
        title="Готовы обсудить"
        titleAccent="проект?"
        description="Расскажите нам о вашей задаче — мы подготовим расчёт и визуализацию в течение 24 часов."
        buttonText="Оставить заявку"
        buttonHref="/contacts"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Expoint ADV',
            url: 'https://expoint-adv.ru',
            description: 'Московская инженерная студия наружной рекламы',
            foundingDate: '2018',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Москва',
              streetAddress: 'ул. Промышленная, д. 12, стр. 3',
            },
            telephone: '+7-495-000-00-00',
            email: 'info@expoint-adv.ru',
          }),
        }}
      />
    </PageShell>
  );
}

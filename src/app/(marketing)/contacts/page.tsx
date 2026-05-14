import { Metadata } from 'next';
import PageShell from '@/components/framework/PageShell';
import HeroGeneric from '@/components/sections/HeroGeneric';
import ContactInfoSection from '@/components/sections/ContactInfoSection';
import MapSection from '@/components/sections/MapSection';
import CTASection from '@/components/sections/CTASection';
import { COMPANY_INFO } from '@/data/company';

export const metadata: Metadata = {
  title: 'Контакты | Expoint ADV',
  description: 'Свяжитесь с Expoint ADV: адрес производства, телефон, email, Telegram. Москва, ул. Промышленная, д. 12.',
  openGraph: {
    title: 'Контакты | Expoint ADV Engineering',
    description: 'Адрес, телефон, email и карта проезда к производству Expoint ADV.',
  },
};

export default function ContactsPage() {
  return (
    <PageShell
      headerVariant="default"
      breadcrumbs={[{ label: 'Контакты', href: '/contacts' }]}
    >
      <HeroGeneric
        subtitle="Контакты"
        title="Свяжитесь"
        titleAccent="с нами"
        description="Мы всегда рады обсудить ваш проект. Приезжайте к нам на производство или оставьте заявку — мы ответим в течение 2 часов."
        compact
      />

      <ContactInfoSection
        subtitle="Как связаться"
        title="Контактная информация"
        address={typeof COMPANY_INFO.address === 'string' ? COMPANY_INFO.address : COMPANY_INFO.address.ru}
        phone={COMPANY_INFO.phone}
        email={COMPANY_INFO.email}
        telegram={COMPANY_INFO.telegram}
        whatsapp={COMPANY_INFO.whatsapp}
        workingHours={typeof COMPANY_INFO.workingHours === 'string' ? COMPANY_INFO.workingHours : COMPANY_INFO.workingHours.ru}
        showForm={true}
      />

      <div id="map">
        <MapSection />
      </div>

      <CTASection
        title="Предпочитаете"
        titleAccent="позвонить?"
        description="Наши менеджеры на связи в рабочее время. Звоните, и мы ответим на все вопросы."
        buttonText="Позвонить"
        buttonHref="tel:+74950000000"
        variant="secondary"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Expoint ADV',
            url: 'https://expoint-adv.ru/contacts',
            telephone: '+7-495-000-00-00',
            email: 'info@expoint-adv.ru',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Москва',
              streetAddress: 'ул. Промышленная, д. 12, стр. 3',
              addressCountry: 'RU',
            },
            openingHours: 'Mo-Fr 09:00-19:00, Sa 10:00-16:00',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 55.7558,
              longitude: 37.6173,
            },
          }),
        }}
      />
    </PageShell>
  );
}

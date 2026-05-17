import { Metadata } from 'next';
import PageShell from '@/components/framework/PageShell';
import Script from 'next/script';
import ContactInfoSection from '@/components/sections/ContactInfoSection';
import B2BRequisitesSection from '@/components/sections/B2BRequisitesSection';
import MapSection from '@/components/sections/MapSection';
import { COMPANY_INFO } from '@/data/company';

export const metadata: Metadata = {
  title: 'Контакты | Expoint ADV',
  description: 'Свяжитесь с Expoint ADV: адрес производства, телефон, email, Telegram. Москва, ул. Полимерная, д. 8.',
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
      withMesh
    >

      <ContactInfoSection
        title="Контактная информация"
        address={typeof COMPANY_INFO.address === 'string' ? COMPANY_INFO.address : COMPANY_INFO.address.ru}
        phone={COMPANY_INFO.phone}
        email={COMPANY_INFO.email}
        telegram={COMPANY_INFO.telegram}
        whatsapp={COMPANY_INFO.whatsapp}
        workingHours={typeof COMPANY_INFO.workingHours === 'string' ? COMPANY_INFO.workingHours : COMPANY_INFO.workingHours.ru}
        showForm={true}
      />

      <B2BRequisitesSection />

      <div id="map">
        <MapSection />
      </div>

      <Script
        id="json-ld-contacts"
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
              streetAddress: 'ул. Полимерная, д. 8',
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

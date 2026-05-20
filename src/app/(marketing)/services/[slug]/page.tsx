import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/data/services';
import { ServiceLandingContent } from './ServiceLandingContent';
import { getServiceHref } from '@/lib/utils';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} | БУКВА СВЕТ`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Премиальное рекламное производство`,
      description: service.fullDescription,
    },
  };
}

import { JsonLd, generateServiceSchema, generateFAQSchema } from '@/components/seo/JsonLd';

import PageShell from '@/components/framework/PageShell';

export default async function ServiceLandingPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(service);
  const faqSchema = service.faq ? generateFAQSchema(service.faq) : null;

  return (
    <PageShell
      headerVariant="immersive"
      breadcrumbs={[
        { label: 'Услуги', href: '/#services' },
        { label: service.title, href: getServiceHref(service.id) },
      ]}
      withMesh
    >
      <JsonLd data={serviceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <ServiceLandingContent service={service} />
    </PageShell>
  );
}

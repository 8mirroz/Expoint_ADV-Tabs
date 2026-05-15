import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES } from '@/data/cases';
import PageShell from '@/components/framework/PageShell';
import { CaseDetailContent } from '@/components/sections/cases/CaseDetailContent';

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({
    slug: c.id,
  }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES.find((c) => c.id === slug);

  if (!caseStudy) return { title: 'Case Not Found' };

  return {
    title: `${caseStudy.title} | Кейсы Expoint ADV`,
    description: caseStudy.description,
    openGraph: {
      title: `${caseStudy.title} | Инженерный кейс`,
      description: caseStudy.solution,
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES.find((c) => c.id === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <PageShell
      headerVariant="immersive"
      breadcrumbs={[
        { label: 'Кейсы', href: '/cases' },
        { label: caseStudy.clientName, href: `/cases/${caseStudy.id}` },
      ]}
      withMesh
    >
      <CaseDetailContent caseStudy={caseStudy} />
    </PageShell>
  );
}

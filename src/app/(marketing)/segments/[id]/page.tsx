import { notFound } from 'next/navigation';
import { segments } from '@/data/segments';
import Hero from '@/components/sections/Hero';
import BenefitsAndWorkflow from '@/components/sections/Benefits';
import PortfolioMini from '@/components/sections/PortfolioMini';

export function generateStaticParams() {
  return Object.keys(segments).map((id) => ({
    id: id,
  }));
}

export default function SegmentPage({ params }: { params: { id: string } }) {
  const segment = segments[params.id as keyof typeof segments];
  
  if (!segment) {
    notFound();
  }

  return (
    <main>
      <Hero segment={segment} />
      <BenefitsAndWorkflow segment={segment} />
      <PortfolioMini />
    </main>
  );
}

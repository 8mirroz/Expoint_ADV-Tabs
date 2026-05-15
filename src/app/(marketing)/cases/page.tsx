import { Metadata } from 'next';
import PageShell from '@/components/framework/PageShell';
import HeroGeneric from '@/components/sections/HeroGeneric';
import CasesArchive from '@/components/sections/CasesArchive';
import CTASection from '@/components/sections/CTASection';
import { CASE_STUDIES } from '@/data/cases';

export const metadata: Metadata = {
  title: 'Кейсы | Expoint ADV',
  description: 'Реальные кейсы Expoint ADV: задачи, решения, метрики. Ритейл, HoReCa, корпоративный сегмент, клиники, франшизы.',
  openGraph: {
    title: 'Кейсы | Expoint ADV Engineering',
    description: 'Портфолио кейсов с метриками: ROI, сроки, бюджеты.',
  },
};

const caseFilters = [
  { id: 'retail', label: 'Ритейл' },
  { id: 'horeca', label: 'HoReCa' },
  { id: 'corporate', label: 'Корпоративные' },
  { id: 'clinics', label: 'Клиники' },
  { id: 'franchise', label: 'Франшизы' },
];

export default function CasesPage() {
  return (
    <PageShell
      headerVariant="default"
      breadcrumbs={[{ label: 'Кейсы', href: '/cases' }]}
      withMesh
    >
      <HeroGeneric
        title="Реальные"
        titleAccent="результаты"
        description="Каждый кейс — это задача клиента, наше решение и измеримые метрики. Изучите наш опыт, чтобы оценить подход."
        compact
      />

      <CasesArchive
        cases={CASE_STUDIES}
        filters={caseFilters}
      />

      <CTASection
        title="Нужно аналогичное"
        titleAccent="решение?"
        description="Мы подготовим индивидуальный расчёт на основе вашей задачи."
        buttonText="Рассчитать проект"
        buttonHref="/calculator"
        variant="secondary"
      />
    </PageShell>
  );
}

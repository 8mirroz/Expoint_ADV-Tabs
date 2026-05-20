import { Metadata } from 'next';
import PageShell from '@/components/framework/PageShell';
import HeroGeneric from '@/components/sections/HeroGeneric';
import GalleryGrid from '@/components/sections/GalleryGrid';
import CTASection from '@/components/sections/CTASection';
import { CASE_STUDIES } from '@/data/cases';
import { PRODUCT_PACKS } from '@/data/services';

export const metadata: Metadata = {
  title: 'Портфолио | БУКВА СВЕТ',
  description: 'Портфолио реализованных проектов БУКВА СВЕТ: вывески, объемные буквы, световые короба, неоновые конструкции.',
  openGraph: {
    title: 'Портфолио | БУКВА СВЕТ Инжиниринг',
    description: 'Галерея работ: от малого бизнеса до корпоративных проектов.',
  },
};

// Combine gallery items from case studies and product packs
const galleryItems = [
  ...CASE_STUDIES.map((c) => ({
    id: c.id,
    title: c.title,
    imageUrl: c.imageUrl || 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop',
    segment: c.segment,
  })),
  ...PRODUCT_PACKS.flatMap((pack) =>
    (pack.gallery || []).map((g) => ({
      id: `${pack.id}-${g.id}`,
      title: `${pack.name} — ${g.title}`,
      imageUrl: g.imageUrl,
      segment: pack.id,
    }))
  ),
];

const filters = [
  { id: 'retail', label: 'Ритейл' },
  { id: 'horeca', label: 'HoReCa' },
  { id: 'corporate', label: 'Корпоративные' },
  { id: 'clinics', label: 'Клиники' },
  { id: 'franchise', label: 'Франшизы' },
];

export default function PortfolioPage() {
  return (
    <PageShell
      headerVariant="default"
      breadcrumbs={[{ label: 'Портфолио', href: '/portfolio' }]}
      withMesh
    >
      <HeroGeneric
        title="Наши"
        titleAccent="работы"
        description="Более 850 реализованных проектов: от компактных неоновых вывесок до крышных установок."
        compact
      />

      <GalleryGrid
        items={galleryItems}
        filters={filters}
      />

      <CTASection
        title="Хотите такой же"
        titleAccent="результат?"
        description="Расскажите о вашем проекте — мы подготовим 3D-визуализацию и расчёт."
        buttonText="Обсудить проект"
        buttonHref="/contacts"
      />
    </PageShell>
  );
}

import { Metadata } from 'next';
import PageShell from '@/components/framework/PageShell';
import HeroGeneric from '@/components/sections/HeroGeneric';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Академия | БУКВА СВЕТ',
  description: 'Полезные материалы о наружной рекламе: статьи, гайды, чек-листы по материалам, законодательству и технологиям.',
  openGraph: {
    title: 'Академия | БУКВА СВЕТ Инжиниринг',
    description: 'Образовательные материалы по наружной рекламе от экспертов.',
  },
};

const articles = [
  {
    slug: 'choosing-materials',
    title: 'Как выбрать материал для вывески',
    description: 'Сравнение ПВХ, акрила, алюминия и нержавеющей стали: плюсы, минусы, применение.',
    category: 'Материалы',
    readTime: '8 мин',
  },
  {
    slug: '902-pp-guide',
    title: 'Гайд по 902-ПП: что можно и нельзя',
    description: 'Полный разбор постановления 902-ПП Правительства Москвы для владельцев бизнеса.',
    category: 'Законодательство',
    readTime: '12 мин',
  },
  {
    slug: 'led-modules-comparison',
    title: 'LED-модули: Samsung vs Elf vs бюджетные',
    description: 'Тест яркости, деградации и энергопотребления за 12 месяцев.',
    category: 'Технологии',
    readTime: '6 мин',
  },
  {
    slug: 'signage-roi',
    title: 'ROI наружной рекламы: как считать',
    description: 'Методика расчёта окупаемости вывески для ритейла и HoReCa.',
    category: 'Бизнес',
    readTime: '10 мин',
  },
  {
    slug: 'neon-vs-led',
    title: 'Неон vs LED: что выбрать в 2026',
    description: 'Сравнение гибкого неона и LED-модулей по 7 критериям.',
    category: 'Технологии',
    readTime: '7 мин',
  },
  {
    slug: 'installation-checklist',
    title: 'Чек-лист монтажа вывески',
    description: '15 пунктов, которые нужно проверить перед, во время и после установки.',
    category: 'Практика',
    readTime: '5 мин',
  },
];

const categories = ['Все', 'Материалы', 'Законодательство', 'Технологии', 'Бизнес', 'Практика'];

export default function AcademyPage() {
  return (
    <PageShell
      headerVariant="default"
      breadcrumbs={[{ label: 'Академия', href: '/academy' }]}
    >
      <HeroGeneric
        title="Знания для"
        titleAccent="вашего бизнеса"
        description="Статьи, гайды и чек-листы от инженеров БУКВА СВЕТ. Практические знания о наружной рекламе, материалах и законодательстве."
        compact
      />

      {/* Articles Section */}
      <section className="section-padding bg-background">
        <div className="section-container">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-[var(--radius-8)] verge-mono-label bg-surface border border-outline text-on-surface-variant hover:border-primary hover:text-primary transition-all"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <a
                key={article.slug}
                href={`/academy/${article.slug}`}
                className="group bg-surface rounded-[var(--radius-12)] border border-outline p-8 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="verge-mono-label text-primary">{article.category}</span>
                  <span className="verge-mono-label text-on-surface-variant">{article.readTime}</span>
                </div>
                <h3 className="font-sans font-bold text-lg text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm leading-[1.7] text-on-surface-variant">
                  {article.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Остались"
        titleAccent="вопросы?"
        description="Наши инженеры ответят на любые вопросы о наружной рекламе, материалах и технологиях."
        buttonText="Задать вопрос"
        buttonHref="/contacts"
        variant="secondary"
      />
    </PageShell>
  );
}

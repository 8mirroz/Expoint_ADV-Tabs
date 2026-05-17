import type { Metadata } from 'next';
import { SERVICES } from '@/data/services';
import PersonalOrderCTA from '@/components/sections/PersonalOrderCTA';
import PageShell from '@/components/framework/PageShell';
import ServicesConsoleClient from './ServicesConsoleClient';
import { Factory, ShieldCheck, FileCheck2, Wrench } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Услуги и цены | Производство вывесок и объемных букв под ключ Expoint ADV',
  description:
    'Полный спектр услуг по изготовлению наружной и интерьерной световой рекламы в Москве. Световые буквы, лайтбоксы, гибкий неон, навигационные стелы. Собственное производство, соответствие 902-ПП, гарантия до 5 лет.',
  alternates: {
    canonical: 'https://expoint.ru/services',
  },
  openGraph: {
    title: 'Услуги и цены | Собственное производство вывесок Expoint ADV',
    description: 'Проектируем, производим и монтируем наружную и интерьерную рекламу для бизнеса в Москве. Расчет стоимости, собственное производство, монтаж и гарантия.',
    type: 'website',
    url: 'https://expoint.ru/services',
  }
};

export default function ServicesPage() {
  // Генерация Schema.org JSON-LD для структурированной разметки услуг и цен
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Услуги и цены производства вывесок Expoint ADV',
    'description': 'Каталог производственных направлений наружной и интерьерной рекламы, цены, материалы и сроки изготовления в Москве.',
    'numberOfItems': SERVICES.length,
    'itemListElement': SERVICES.map((service, index) => {
      let unitText = 'шт';
      if (service.priceUnit.includes('см')) unitText = 'сантиметр высоты';
      else if (service.priceUnit.includes('м²')) unitText = 'квадратный метр';
      else if (service.priceUnit.includes('м.п.')) unitText = 'метр погонный';
      else if (service.priceUnit.includes('проект')) unitText = 'проект';

      return {
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'Service',
          'name': service.title,
          'description': service.fullDescription,
          'provider': {
            '@type': 'LocalBusiness',
            'name': 'Expoint ADV',
            'image': 'https://expoint.ru/img/logo.png',
            'priceRange': '$$',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'ул. Полимерная, д. 8',
              'addressLocality': 'Москва',
              'addressCountry': 'RU'
            }
          },
          'offers': {
            '@type': 'Offer',
            'price': service.basePrice,
            'priceCurrency': 'RUB',
            'priceSpecification': {
              '@type': 'UnitPriceSpecification',
              'price': service.basePrice,
              'priceCurrency': 'RUB',
              'unitText': unitText
            }
          }
        }
      };
    })
  };

  return (
    <PageShell headerVariant="immersive" showFooter={true}>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 bg-surface pb-24">
        {/* Services Hero - Black background with premium generated architectural background */}
        <section className="relative bg-black pt-36 pb-20 px-6 lg:px-20 overflow-hidden">
          {/* Generated Premium Architectural Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/img/backgrounds/services-hero-bg.png"
              alt="Services architectural blueprint background"
              fill
              className="object-cover opacity-25"
              priority
            />
            {/* Elegant dark gradient fade overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-surface" />
          </div>
          
          {/* Subtle industrial grid in background */}
          <div className="absolute inset-0 industrial-grid opacity-10 pointer-events-none" />
          
          {/* Glowing accent orb */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="section-container relative z-10 flex flex-col gap-10 max-w-5xl">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
                Наши <span className="text-accent opacity-95">Услуги</span>
              </h1>
            </div>

            <div className="max-w-2xl border-l border-accent/40 pl-6">
              <p className="text-lg md:text-xl text-neutral-100 font-light leading-relaxed">
                От базовых элементов навигации до сложных архитектурных световых инсталляций. 
                Мы берем на себя весь цикл: от концепции до монтажа.
              </p>
            </div>

            {/* Quick Stats/Trust Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-outline/30">
              {[
                { 
                  label: 'Собственное производство', 
                  value: '1\u00A0200', 
                  unit: 'м²',
                  sub: 'Собственные цеха с ЧПУ стадиями',
                  code: 'SYS // AREA_01', 
                  icon: Factory 
                },
                { 
                  label: 'Гарантия на изделия', 
                  value: 'до\u00A05', 
                  unit: 'лет',
                  sub: 'Расширенная техподдержка',
                  code: 'WRN // TERM_02', 
                  icon: ShieldCheck 
                },
                { 
                  label: 'Соответствие стандартам', 
                  value: '100%', 
                  unit: '902-ПП',
                  sub: 'Прохождение согласований',
                  code: 'REG // COMP_03', 
                  icon: FileCheck2 
                },
                { 
                  label: 'Монтажные бригады', 
                  value: '24/7', 
                  unit: 'выезд',
                  sub: 'Круглосуточный спец-монтаж',
                  code: 'OPS // TEAM_04', 
                  icon: Wrench 
                }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={i} 
                    className="group relative flex flex-col justify-between p-5 md:p-6 bg-surface/30 border border-outline/25 rounded-2xl transition-all duration-300 hover:border-accent/40 hover:bg-surface/50 hover:shadow-[0_0_24px_rgba(0,245,160,0.1)] hover:-translate-y-1.5 overflow-hidden"
                  >
                    {/* HUD corner accents */}
                    <div className="absolute top-0 right-0 w-3.5 h-3.5 border-r border-t border-outline/20 group-hover:border-accent transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-l border-b border-outline/20 group-hover:border-accent transition-colors duration-300" />

                    {/* Top corner light dot & HUD code */}
                    <div className="flex items-center justify-between gap-4 mb-8 relative z-10">
                      <span className="text-[9px] font-mono text-on-surface-variant/40 uppercase tracking-[0.2em] group-hover:text-on-surface-variant/60 transition-colors">{stat.code}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/20 group-hover:bg-accent group-hover:shadow-[0_0_8px_rgba(0,245,160,0.8)] animate-pulse transition-all duration-300" />
                    </div>

                    {/* Metric and Icon */}
                    <div className="flex items-baseline justify-between gap-2 relative z-10 mb-4">
                      <div className="flex items-baseline min-w-0 flex-wrap gap-x-1.5 gap-y-1">
                        <span className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight group-hover:text-accent transition-colors duration-300 leading-none font-sans">
                          {stat.value}
                        </span>
                        {stat.unit && (
                          <span className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight group-hover:text-accent transition-colors duration-300 leading-none font-sans">
                            {stat.unit}
                          </span>
                        )}
                      </div>
                      <Icon className="w-5.5 h-5.5 text-on-surface-variant/15 group-hover:text-accent/70 group-hover:scale-105 transition-all duration-300 shrink-0" />
                    </div>

                    {/* Description labels */}
                    <div className="relative z-10 mt-2 border-t border-outline/10 pt-3">
                      <span className="block text-xs font-bold text-white uppercase tracking-wide group-hover:text-accent transition-colors">
                        {stat.label}
                      </span>
                      <span className="block text-[10px] text-on-surface-variant/60 mt-1 font-medium leading-normal">
                        {stat.sub}
                      </span>
                    </div>

                    {/* Premium radial hover glow in background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,245,160,0.04),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Industrial micro grid hover effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.012)_1px,transparent_1px)] bg-[size:12px_12px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dynamic Services Interactive Console */}
        <section id="services" className="py-24 bg-surface relative">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />
          <ServicesConsoleClient services={SERVICES} />
        </section>

        {/* Personal Order CTA */}
        <section className="py-24 px-6 lg:px-20 bg-surface">
          <div className="section-container">
            <PersonalOrderCTA />
          </div>
        </section>
      </main>
    </PageShell>
  );
}

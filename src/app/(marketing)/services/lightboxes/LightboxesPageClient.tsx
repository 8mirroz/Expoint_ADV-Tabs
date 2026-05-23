'use client';

import React, { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, CheckCircle2, Clock, FileUp, Sparkles, Zap,
  Shield, Truck, Tag, Plus, Settings, Layers, Flame,
  Eye, Heart, Ruler, Cpu, Check, ShoppingCart, MessageSquare, Code, Compass,
  Activity, Info, AlertTriangle, HelpCircle, Construction, Hammer, MapPin
} from 'lucide-react';
import PageShell from '@/components/framework/PageShell';
import HeroGeneric from '@/components/sections/HeroGeneric';
import B2BSegmentTabs from '@/components/service-pages/B2BSegmentTabs';
import ServiceCalculatorShell from '@/components/service-pages/ServiceCalculatorShell';
import { CalculatorContainer } from '@/components/calculator/CalculatorContainer';
import PricingPackages from '@/components/service-pages/PricingPackages';
import TechnologyComparison from '@/components/service-pages/TechnologyComparison';
import LegalTrustBlock from '@/components/service-pages/LegalTrustBlock';
import ServiceFAQ from '@/components/service-pages/ServiceFAQ';
import FinalCTA from '@/components/service-pages/FinalCTA';
import { lightboxesData } from '@/data/service-pages/lightboxes';
import { useModalStore } from '@/store/useModalStore';

export default function LightboxesPageClient() {
  const openModal = useModalStore((state) => state.openModal);

  const pricingPreview = {
    items: [
      { label: 'Start короб', price: '4 500', unit: '₽/м²' },
      { label: 'Business', price: '8 500', unit: '₽/м²' },
      { label: 'Premium', price: '15 000', unit: '₽/м²' },
      { label: 'Согласование', price: '0', unit: '₽' },
    ],
    badges: lightboxesData.hero.trustLine,
    meta: [
      { label: 'Расчет', value: '30 мин' },
      { label: 'Макет', value: '24 ч' },
      { label: 'Гарантия', value: 'до 3 лет' },
    ],
  };

  return (
    <PageShell headerVariant="immersive" breadcrumbs={[
      { label: 'Услуги', href: '/#services' },
      { label: 'Световые Короба', href: '/services/lightboxes' },
    ]} withMesh>
      <HeroGeneric
        subtitle={lightboxesData.hero.eyebrow}
        title="Световые короба"
        titleAccent="для бизнеса"
        description={lightboxesData.hero.subtitle}
        highlights={[
          'Считаем не абстрактный метр, а готовый фасад: ветровые нагрузки, глубина короба, монтаж и спецтехника.',
          'Показываем 3 честных сметных ориентира (Start, Business, Premium) сразу во избежание сюрпризов.',
          'Абсолютная юридическая прозрачность: бесплатная проверка макета и привязки по 902-ПП до запуска.',
        ]}
        pricingPreview={pricingPreview}
        ctaText={lightboxesData.hero.primaryCTA.label}
        ctaHref={lightboxesData.hero.primaryCTA.href}
        secondaryCtaText={lightboxesData.hero.secondaryCTA?.label}
        secondaryCtaHref={lightboxesData.hero.secondaryCTA?.href}
        bgImage="/img/lightboxes/lightbox-showcase.png"
      />
      <ProofStats />
      <B2BSegmentTabs segments={lightboxesData.segments} />
      <ServiceCalculatorShell 
        title="Конструктор стоимости" 
        description="Введите размеры светового короба и выберите сценарий исполнения. Калькулятор мгновенно рассчитает площади и покажет диапазон цен."
      >
        <Suspense fallback={<div className="rounded-3xl border border-outline bg-surface p-8 text-on-surface">Загрузка калькулятора...</div>}>
          <CalculatorContainer serviceId="lightbox" />
        </Suspense>
      </ServiceCalculatorShell>
      <EngineeringShowcase />
      <PricingPackages packages={lightboxesData.packages} />
      <CaseCards />
      {lightboxesData.comparison && (
        <TechnologyComparison title={lightboxesData.comparison.title} items={lightboxesData.comparison.items} />
      )}
      {lightboxesData.legal && (
        <LegalTrustBlock title={lightboxesData.legal.title} content={lightboxesData.legal.content} bullets={lightboxesData.legal.bullets} />
      )}
      <ProcessTimeline />
      <LeadMagnets />
      <ServiceFAQ items={lightboxesData.faq} />
      <FinalCTA 
        title={lightboxesData.finalCTA.title} 
        description={lightboxesData.finalCTA.description} 
        buttonText={lightboxesData.finalCTA.buttonText}
        modalContext="Расчет светового короба"
        modalSource="service_lightboxes_final_cta"
      />
      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <button
          onClick={() => openModal({ context: 'Мобильный CTA: расчет световых коробов', source: 'service_lightboxes_mobile_sticky' })}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-accent-warm px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_48px_rgba(var(--accent-warm-rgb),0.34)]"
        >
          Рассчитать в WhatsApp
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </PageShell>
  );
}

function ProofStats() {
  if (!lightboxesData.proofStats?.length) return null;

  const statIcons = [Clock, FileUp, Truck, Shield] as const;

  return (
    <section className="relative overflow-hidden border-t border-outline/70 bg-black py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.028)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(0,245,160,0.14),transparent_48%)]" />
      <div className="section-container relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 xl:grid-cols-4">
        {lightboxesData.proofStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28, delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-[20px] border border-white/14 bg-[linear-gradient(180deg,rgba(12,12,14,0.94),rgba(6,7,9,0.96))] p-6 md:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/55 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_34px_rgba(0,245,160,0.14)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_18%_22%,rgba(0,245,160,0.1),transparent_58%)]" />
            <div className="relative z-10 mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/3 text-accent transition-all duration-300 group-hover:border-accent/45 group-hover:bg-accent/10">
              {React.createElement(statIcons[index] ?? Clock, { className: 'h-5 w-5' })}
            </div>
            <div className="relative z-10 mb-3 text-[3.25rem] md:text-[3.45rem] lg:text-[3.7rem] font-black leading-[0.88] tracking-[-0.04em] text-white">
              {stat.value.includes(' ') ? (
                <>
                  <span className="block">{stat.value.split(' ')[0]}</span>
                  <span className="block">{stat.value.split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                stat.value
              )}
            </div>
            <h2 className="relative z-10 mb-2 text-xs font-black uppercase tracking-[0.16em] text-white/95">{stat.label}</h2>
            <p className="relative z-10 text-[15px] leading-relaxed text-white/66">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function EngineeringShowcase() {
  const [activeType, setActiveType] = useState<'acrylic' | 'composite' | 'banner' | 'thin'>('acrylic');
  const [activeThickness, setActiveThickness] = useState<'90mm' | '130mm' | '180mm'>('130mm');
  const [activeBacking, setActiveBacking] = useState<'standard' | 'glow' | 'incut'>('standard');

  const types = [
    { id: 'acrylic', size: 'Акриловый', title: 'Равномерный засвет 360°', desc: 'Световой молочный акрил 3-4 мм. Идеально для максимальной яркости всей лицевой части.', color: '#00F5A0', price: 'от 8 500 ₽/м²' },
    { id: 'composite', size: 'Композитный', title: 'Премиум прорезка букв', desc: 'Алюмокомпозит 3 мм с лазерной фрезеровкой. Светятся только буквы с инкрустацией акрилом.', color: '#FF007F', price: 'от 15 000 ₽/м²' },
    { id: 'banner', size: 'Баннерный', title: 'Крупноформатный бесшовный', desc: 'Металлокаркас с натяжкой транслюцентного баннера Backlit 500г/м². Для вывесок более 3 метров.', color: '#00DFFF', price: 'от 4 500 ₽/м²' },
    { id: 'thin', size: 'Тонкий', title: 'Сверхтонкий интерьерный', desc: 'Клик-профиль из анодированного алюминия, LGP-матрица с торцевым свечением. Толщина всего 20-30 мм!', color: '#FFB800', price: 'от 8 000 ₽/шт' },
  ] as const;

  const thicknesses = [
    { id: '90mm', title: '90-110 мм // Слим-стандарт', desc: 'Минимальный габарит для равномерного засвета акрила без образования световых пятен.', highlight: 'Оптимум для ритейла' },
    { id: '130mm', title: '130-150 мм // Фасадный', desc: 'Усиленный борт для уличного размещения. Рассчитан под снеговые нагрузки.', highlight: 'Стандарт по 902-ПП' },
    { id: '180mm', title: '180 мм // Крупноформатный', desc: 'Глубокий профиль для баннерных коробов со скрытой внутренней рамой жесткости.', highlight: 'Для ТЦ и крыш' },
  ] as const;

  const backingOptions = [
    { name: 'Стандартный засвет', desc: 'Равномерный яркий свет сквозь лицевой светорассеивающий экран.', highlight: 'Выбор 90%' },
    { name: 'Инкрустация букв', desc: 'Световые элементы выступают над глухой матовой композитной панелью.', highlight: 'Премиальный вид' },
    { name: 'Контражурное свечение', desc: 'Свет направлен на фасад, создавая мягкий парящий нимб вокруг короба.', highlight: 'Стильный акцент' }
  ];

  return (
    <section id="anatomy" className="scroll-mt-28 relative overflow-hidden border-t border-outline bg-slate-50/60 py-24">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-90" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(0,245,160,0.04),transparent_50%)] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="mb-16 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-8)] border border-outline bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary shadow-sm">
            <Cpu className="h-4 w-4 text-primary animate-pulse" />
            Инженерное проектирование
          </div>
          <h2 className="geist-display-lg text-on-surface mb-4">Анатомия светового короба.</h2>
          <p className="text-lg text-on-surface-variant max-w-2xl font-light">
            Качественный лайтбокс — это не просто коробка со светодиодами. Это жесткая рама, герметичный борт и правильный светорассеиватель. Изменяйте параметры ниже для симуляции вашей вывески.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Column 1 & 2: Interactive Sandbox Visualizer */}
          <div className="lg:col-span-8 flex flex-col justify-between rounded-[var(--radius-24)] border border-outline bg-white p-8 shadow-sm relative overflow-hidden min-h-[500px]">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />
            <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-outline bg-slate-50 px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-widest text-on-surface-variant/70 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              Live preview sandbox
            </div>

            <div className="relative z-10 flex-grow flex flex-col items-center justify-center py-12 px-4 border border-slate-100 rounded-2xl bg-slate-50/30 backdrop-blur-[2px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
              <div className="text-center relative">
                <div 
                  className="absolute inset-0 blur-3xl opacity-20 scale-150 transition-all duration-500 pointer-events-none"
                  style={{
                    backgroundColor: types.find(t => t.id === activeType)?.color || '#00F5A0',
                    transform: `scale(${activeThickness === '90mm' ? 1.2 : activeThickness === '130mm' ? 1.5 : 1.9})`
                  }}
                />

                <motion.div 
                  layout
                  className="relative z-10 transition-all duration-300 p-8 rounded-xl border flex flex-col items-center justify-center"
                  style={{
                    width: '320px',
                    height: '140px',
                    backgroundColor: activeType === 'composite' ? '#0f172a' : '#ffffff',
                    borderColor: activeType === 'composite' ? '#1e293b' : '#e2e8f0',
                    boxShadow: activeBacking === 'glow' 
                      ? `0 0 45px ${(types.find(t => t.id === activeType)?.color || '#00F5A0')}80`
                      : activeType === 'composite'
                        ? '0 10px 30px rgba(0,0,0,0.15)'
                        : `0 0 25px ${(types.find(t => t.id === activeType)?.color || '#00F5A0')}40`,
                  }}
                >
                  <span 
                    className="text-2xl font-black uppercase tracking-[0.15em] transition-all duration-350 select-none text-center"
                    style={{
                      color: activeType === 'composite' ? '#ffffff' : '#0f172a',
                      textShadow: activeType === 'composite' || activeBacking === 'incut'
                        ? `0 0 10px #ffffff, 0 0 20px ${types.find(t => t.id === activeType)?.color || '#00F5A0'}`
                        : 'none'
                    }}
                  >
                    LIGHTBOX
                  </span>
                  <span className="text-[9px] font-mono mt-2 tracking-widest text-slate-400 uppercase">
                    {types.find(t => t.id === activeType)?.size} {"//"} {activeThickness}
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-2 font-mono">Тип лицевой поверхности</span>
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveType(t.id)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                        activeType === t.id 
                          ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 text-on-surface'
                      }`}
                    >
                      {t.size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-2 font-mono">Сценарий свечения</span>
                <div className="flex flex-wrap gap-2">
                  {['standard', 'glow', 'incut'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setActiveBacking(opt as 'standard' | 'glow' | 'incut')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                        activeBacking === opt 
                          ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 text-on-surface'
                      }`}
                    >
                      {opt === 'standard' ? 'Лицевой' : opt === 'glow' ? 'Контражур' : 'Инкрустация'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Customization Panel Controls */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-[var(--radius-20)] border border-outline bg-white p-6 shadow-sm">
              <span className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-4 font-mono">
                <Ruler className="h-4 w-4 text-primary" />
                Глубина конструкции (Борт)
              </span>

              <div className="flex flex-col gap-3">
                {thicknesses.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveThickness(item.id)}
                    className={`flex items-start gap-4 text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      activeThickness === item.id 
                        ? 'border-primary/40 bg-primary/5 shadow-sm' 
                        : 'border-slate-100 hover:border-slate-200 bg-slate-50/20'
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 relative overflow-hidden">
                      <div 
                        className="rounded-full transition-all duration-300 bg-primary"
                        style={{
                          height: item.id === '90mm' ? '12px' : item.id === '130mm' ? '20px' : '30px',
                          width: '10px',
                        }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-on-surface text-xs">{item.title.split(' // ')[0]}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant leading-relaxed mt-1 font-light">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[var(--radius-20)] border border-outline bg-white p-6 shadow-sm">
              <span className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-4 font-mono">
                <Settings className="h-4 w-4 text-primary" />
                Стандарты и опции сборки
              </span>

              <div className="flex flex-col gap-3">
                {backingOptions.map((item) => (
                  <div
                    key={item.name}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface text-xs uppercase tracking-tight">{item.name}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[8px] font-bold tracking-wider text-on-surface/60 font-mono uppercase">
                        {item.highlight}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant font-light mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
          <div className="md:col-span-8 rounded-[var(--radius-24)] border border-outline bg-white p-8 shadow-sm">
            <span className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-6 font-mono">
              <Layers className="h-4 w-4 text-primary" />
              Внутреннее наполнение короба (Технический пирог)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/20">
                <span className="inline-block rounded-full bg-primary/8 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-primary mb-3">
                  Лицевой экран
                </span>
                <h4 className="font-bold text-on-surface text-sm mb-2 uppercase tracking-tight">Plexiglas XT // 3-4 мм</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                  Светотехнический акрил Plexiglas. Обеспечивает яркое, равномерное свечение без желтизны и световых пятен.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/20">
                <span className="inline-block rounded-full bg-primary/8 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-primary mb-3">
                  Подсветка
                </span>
                <h4 className="font-bold text-on-surface text-sm mb-2 uppercase tracking-tight">LED ELF IP67 // 170°</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                  Светодиодные линзованные кластеры ELF высокой плотности. Влагозащита IP67, линза 170° для идеального рассеивания.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/20">
                <span className="inline-block rounded-full bg-primary/8 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-primary mb-3">
                  Бортовой профиль
                </span>
                <h4 className="font-bold text-on-surface text-sm mb-2 uppercase tracking-tight">Alu-Profile // 90-130 мм</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                  Несущий алюминиевый профиль с порошковой покраской или жесткий ПВХ 4-5 мм с ламинированием пленкой Oracal 641.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-[var(--radius-24)] border border-outline bg-white p-8 shadow-sm flex flex-col justify-between relative overflow-hidden bg-[linear-gradient(135deg,#ffffff,#f8fafc)]">
            <span className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-4 font-mono">
              <Tag className="h-4 w-4 text-primary" />
              Ценовой ориентир
            </span>

            <div className="border border-slate-100 rounded-xl bg-white/70 p-5 shadow-[0_10px_25px_rgba(0,0,0,0.02)] relative overflow-hidden backdrop-blur-sm">
              <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
              <span className="block text-[9px] font-mono tracking-widest uppercase text-on-surface/40 font-bold mb-3">Стоимость производства</span>

              <div className="flex items-end justify-between border-b border-slate-100 pb-3 mb-3">
                <span className="font-light text-on-surface-variant text-xs">Start короб (баннерный)</span>
                <span className="font-black text-primary text-sm">от 4 500 ₽/м²</span>
              </div>
              <div className="flex items-end justify-between border-b border-slate-100 pb-3 mb-3">
                <span className="font-light text-on-surface-variant text-xs">Business короб (акриловый)</span>
                <span className="font-black text-primary text-sm">от 8 500 ₽/м²</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="font-light text-on-surface-variant text-xs">Premium короб (композитный)</span>
                <span className="font-black text-primary text-sm">от 15 000 ₽/м²</span>
              </div>
            </div>

            <p className="text-[10px] text-on-surface-variant/60 font-light leading-relaxed mt-4">
              *Включает полный комплект готового изделия с блоком питания MeanWell 12V, защитой от скачков напряжения и крепежными уголками.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseCards() {
  if (!lightboxesData.caseCards?.length) return null;

  return (
    <section className="section-padding border-t border-outline bg-surface">
      <div className="section-container">
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-8)] border border-outline bg-background px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            B2B сценарии
          </div>
          <h2 className="geist-display-lg text-on-surface">Пакеты, которые продают задачу, а не метр короба.</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {lightboxesData.caseCards.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="rounded-[var(--radius-16)] border border-outline bg-surface p-7 shadow-sm"
            >
              <h3 className="mb-5 text-2xl font-black uppercase tracking-tight">{item.title}</h3>
              <p className="mb-8 text-on-surface-variant text-sm font-light leading-relaxed">{item.description}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-background p-4">
                  <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-on-surface/45">Бюджет</div>
                  <div className="font-black text-primary">{item.budget}</div>
                </div>
                <div className="rounded-2xl bg-background p-4">
                  <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-on-surface/45">Срок</div>
                  <div className="font-black">{item.timeline}</div>
                </div>
              </div>
              <div className="mt-4 rounded-[var(--radius-8)] border border-primary/15 bg-primary/5 p-4 text-sm font-bold text-on-surface">
                Результат: {item.result}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessTimeline() {
  if (!lightboxesData.process?.length) return null;

  return (
    <section id="process" className="scroll-mt-28 section-padding border-t border-outline bg-background">
      <div className="section-container">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-8)] border border-outline bg-surface px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">
              <Clock className="h-4 w-4 text-primary" />
              SLA
            </div>
            <h2 className="geist-display-lg text-on-surface">От эскиза до света на объекте.</h2>
          </div>
          <p className="max-w-xl text-on-surface-variant">
            Процесс специально разложен на короткие этапы: клиент понимает, когда будет расчет, макет, производство и монтаж.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {lightboxesData.process.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="relative rounded-[var(--radius-16)] border border-outline bg-surface p-6 shadow-sm"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-5xl font-black text-on-surface/10">0{index + 1}</span>
                <span className="rounded-full bg-primary/8 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">{step.meta}</span>
              </div>
              <h3 className="mb-3 text-xl font-black uppercase tracking-tight">{step.title}</h3>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadMagnets() {
  if (!lightboxesData.leadMagnets?.length) return null;

  return (
    <section className="border-t border-outline bg-surface py-16">
      <div className="section-container grid grid-cols-1 gap-4 px-6 md:grid-cols-3">
        {lightboxesData.leadMagnets.map((item) => (
          <div key={item.title} className="flex gap-4 rounded-[var(--radius-12)] border border-outline bg-surface p-6 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-8)] bg-primary/8 text-primary">
              {item.title.includes('макет') || item.title.includes('Фото') ? <FileUp className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="mb-2 text-base font-black uppercase tracking-tight">{item.title}</h3>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

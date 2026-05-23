'use client';

import React, { Suspense, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, CheckCircle2, Clock, FileUp, Sparkles, Zap,
  Shield, Truck, Tag, Plus, Settings, Layers, Flame,
  Eye, Heart, Ruler, Cpu, Check, ShoppingCart, MessageSquare, Code, Compass
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
import { neonData } from '@/data/service-pages/neon';
import { useModalStore } from '@/store/useModalStore';

export default function NeonPageClient() {
  const openModal = useModalStore((state) => state.openModal);

  const pricingPreview = {
    items: [
      { label: 'Готовые SKU', price: '1 900', unit: '₽' },
      { label: 'Кастом', price: '9 500', unit: '₽' },
      { label: 'Business', price: '18 000', unit: '₽' },
      { label: 'B2B пакет', price: '90 000', unit: '₽' },
    ],
    badges: neonData.hero.trustLine,
    meta: [
      { label: 'Расчет', value: '30 мин' },
      { label: 'Макет', value: '24 ч' },
      { label: 'Производство', value: '3-5 дн.' },
    ],
  };

  return (
    <PageShell headerVariant="immersive" breadcrumbs={[
      { label: 'Услуги', href: '/#services' },
      { label: 'Гибкий Неон', href: '/services/neon' },
    ]} withMesh>
      <HeroGeneric
        subtitle={neonData.hero.eyebrow}
        title="Гибкий неон"
        titleAccent="для бизнеса"
        description={neonData.hero.subtitle}
        highlights={[
          'Считаем не метр ради метра, а задачу: витрина, фотозона, интерьер или запуск точки.',
          'Показываем честную вилку бюджета: готовые SKU, кастом, монтаж и B2B-пакеты отдельно.',
          'До производства проверяем макет, питание, место размещения и риски по 902-ПП.',
        ]}
        pricingPreview={pricingPreview}
        ctaText={neonData.hero.primaryCTA.label}
        ctaHref={neonData.hero.primaryCTA.href}
        secondaryCtaText={neonData.hero.secondaryCTA?.label}
        secondaryCtaHref={neonData.hero.secondaryCTA?.href}
        bgImage="/img/neon/neon-hero-premium-01.png"
      />
      <ProofStats />
      <B2BSegmentTabs segments={neonData.segments} />
      <ServiceCalculatorShell 
        title="Конструктор стоимости" 
        description="Введите текст, выберите размер и сценарий свечения. Покажем честный ориентир без цены ниже минимального кастомного чека."
      >
        <Suspense fallback={<div className="rounded-3xl border border-outline bg-surface p-8 text-on-surface">Загрузка калькулятора...</div>}>
          <CalculatorContainer serviceId="neon" />
        </Suspense>
      </ServiceCalculatorShell>
      <EngineeringShowcase />
      <SkuShowcase />
      <PricingPackages packages={neonData.packages} />
      <CaseCards />
      {neonData.comparison && <TechnologyComparison title={neonData.comparison.title} items={neonData.comparison.items} />}
      {neonData.legal && <LegalTrustBlock title={neonData.legal.title} content={neonData.legal.content} bullets={neonData.legal.bullets} />}
      <ProcessTimeline />
      <LeadMagnets />
      <ServiceFAQ items={neonData.faq} />
      <FinalCTA title={neonData.finalCTA.title} description={neonData.finalCTA.description} buttonText={neonData.finalCTA.buttonText} />
      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <button
          onClick={() => openModal({ context: 'Мобильный CTA: расчет гибкого неона', source: 'service_neon_mobile_sticky' })}
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
  if (!neonData.proofStats?.length) return null;

  const statIcons = [Clock, FileUp, Shield, Compass] as const;

  return (
    <section className="relative overflow-hidden border-t border-outline/70 bg-black py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.028)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(0,245,160,0.14),transparent_48%)]" />
      <div className="section-container relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 xl:grid-cols-4">
        {neonData.proofStats.map((stat, index) => (
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
  const [activeThickness, setActiveThickness] = useState<'6mm' | '10mm' | '12mm'>('10mm');
  const [activeFont, setActiveFont] = useState<'glow' | 'cursive' | 'limitless'>('cursive');
  const [activeColor, setActiveColor] = useState<string>('#00F5A0'); // Default bright teal
  const [customText, setCustomText] = useState<string>('Create');

  const thicknesses = [
    { id: '6mm', size: '6мм', title: 'Тонкая детализация', desc: 'Для мелкого шрифта, сложных логотипов и контурного арта.', color: '#FF007F', glow: 'rgba(255, 0, 127, 0.4)' },
    { id: '10mm', size: '10мм', title: 'Стандартный баланс', desc: 'Оптимальная яркость и плавные гибы для большинства интерьерных вывесок.', color: '#00F5A0', glow: 'rgba(0, 245, 160, 0.4)' },
    { id: '12mm', size: '12мм', title: 'Максимальный поток', desc: 'Уличный неон, крупные буквы, максимальная видимость с расстояния.', color: '#00DFFF', glow: 'rgba(0, 223, 255, 0.4)' },
  ] as const;

  const fontStyles = [
    { id: 'glow', title: 'Simple / Glow', label: 'Прямые рубленые линии', sample: 'Буква Свет', fontClass: 'font-sans font-black tracking-wider uppercase', discount: 'Базовый тариф' },
    { id: 'cursive', title: 'Script / Cursive', label: 'Плавный рукописный шрифт', sample: 'Beautiful', fontClass: 'font-serif italic font-medium', discount: '+25% к базе' },
    { id: 'limitless', title: 'Calligraphy / Limitless', label: 'Сложные перекрытия', sample: 'Limitless', fontClass: 'font-sans font-light tracking-[-0.05em] uppercase', discount: '+45% к базе' },
  ] as const;

  const neonColors = [
    { name: 'Teal', code: '#00F5A0', glow: 'rgba(0, 245, 160, 0.4)' },
    { name: 'Hot Pink', code: '#FF007F', glow: 'rgba(255, 0, 127, 0.4)' },
    { name: 'Neon Blue', code: '#00DFFF', glow: 'rgba(0, 223, 255, 0.4)' },
    { name: 'Electric Green', code: '#00F5A0', glow: 'rgba(0, 245, 160, 0.4)' },
    { name: 'Pure White', code: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.3)' },
  ];

  const backingOptions = [
    { name: 'Рез по контуру', desc: 'Акрил повторяет форму букв, минимальный вес, неон словно парит в воздухе.', highlight: 'Выбор 90%' },
    { name: 'Прямоугольный короб', desc: 'Защищенный прочный короб, идеален для монтажа на неровные стены.', highlight: 'Антивандальный' },
    { name: 'Гравировка торцов', desc: 'Акрил гравируется лазером, создавая дополнительное премиальное свечение контура.', highlight: 'Свечение 360°' }
  ];

  return (
    <section id="anatomy" className="scroll-mt-28 relative overflow-hidden border-t border-outline bg-slate-50/60 py-24">
      {/* Light technical grid background inspired by reference 1 */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-90" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(0,245,160,0.04),transparent_50%)] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header Block */}
        <div className="mb-16 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-8)] border border-outline bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary shadow-sm">
            <Cpu className="h-4 w-4 text-primary animate-pulse" />
            Инженерное проектирование
          </div>
          <h2 className="geist-display-lg text-on-surface mb-4">Анатомия кастомной вывески.</h2>
          <p className="text-lg text-on-surface-variant max-w-2xl font-light">
            Каждая неоновая вывеска Буква Свет проектируется как законченное инженерное изделие. Изменяйте параметры ниже, чтобы увидеть, как они влияют на визуальный объем и свечение.
          </p>
        </div>

        {/* Blueprint Interactive Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Column 1 & 2: Interactive Sandbox Visualizer (Blueprint Look) */}
          <div className="lg:col-span-8 flex flex-col justify-between rounded-[var(--radius-24)] border border-outline bg-white p-8 shadow-sm relative overflow-hidden min-h-[500px]">
            {/* Visualizer Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />
            <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-outline bg-slate-50 px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-widest text-on-surface-variant/70 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              Live preview sandbox
            </div>

            {/* Simulated Glassmorphic Blueprint Display */}
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center py-12 px-4 border border-slate-100 rounded-2xl bg-slate-50/30 backdrop-blur-[2px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
              {/* Dynamic Neon Sign Glow Stage */}
              <div className="text-center relative">
                {/* Glowing Aura Effect */}
                <div 
                  className="absolute inset-0 blur-3xl opacity-20 scale-150 transition-all duration-500 pointer-events-none"
                  style={{
                    backgroundColor: activeColor,
                    transform: `scale(${activeThickness === '6mm' ? 1.2 : activeThickness === '10mm' ? 1.5 : 1.9})`
                  }}
                />

                {/* Rendered customized neon text */}
                <motion.h3 
                  layout
                  className={`relative z-10 transition-all duration-300 font-sans tracking-tight text-white select-none ${
                    activeFont === 'glow' 
                      ? 'font-sans font-black tracking-wider uppercase' 
                      : activeFont === 'cursive'
                        ? 'font-serif italic font-semibold tracking-wide'
                        : 'font-serif tracking-[-0.04em] font-normal lowercase'
                  }`}
                  style={{
                    fontSize: '4.8rem',
                    color: '#FFF',
                    textShadow: `0 0 10px #FFF, 0 0 20px ${activeColor}, 0 0 35px ${activeColor}, 0 0 55px ${activeColor}80`,
                    WebkitTextStroke: activeThickness === '6mm' 
                      ? '1px rgba(255,255,255,0.9)' 
                      : activeThickness === '10mm' 
                        ? '2.5px rgba(255,255,255,0.95)' 
                        : '4px #FFF',
                  }}
                >
                  {customText || 'Create'}
                </motion.h3>

                {/* Simulated acrylic transparent backplate backing */}
                <div 
                  className="absolute -inset-8 -z-10 rounded-[var(--radius-16)] border border-white/50 bg-white/20 backdrop-blur-[6px] shadow-sm transition-all duration-500"
                  style={{
                    borderRadius: activeFont === 'limitless' ? '40px 10px 40px 10px' : '20px',
                    borderColor: 'rgba(255,255,255,0.6)',
                  }}
                />
              </div>
            </div>

            {/* Sandbox Bottom Interactive Bar */}
            <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Text Input */}
              <div className="relative">
                <span className="block text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-2 font-mono">Введите ваш текст</span>
                <input 
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.slice(0, 16))}
                  placeholder="Своё слово..."
                  className="w-full rounded-xl border border-outline bg-slate-50 px-4 py-2.5 text-sm font-semibold tracking-tight text-on-surface outline-none focus:border-primary transition-colors font-sans"
                />
              </div>

              {/* Color Selector */}
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-2 font-mono">Выбор оттенка силикона</span>
                <div className="flex items-center gap-3">
                  {neonColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setActiveColor(color.code)}
                      className={`h-7 w-7 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                        activeColor === color.code 
                          ? 'border-primary scale-110 shadow-sm' 
                          : 'border-white hover:scale-105'
                      }`}
                      style={{ 
                        backgroundColor: color.code,
                        boxShadow: activeColor === color.code ? `0 0 10px ${color.code}` : 'none'
                      }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Customization Panel Controls */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Control Group 1: Thickness Profiles (Tray inspired) */}
            <div className="rounded-[var(--radius-20)] border border-outline bg-white p-6 shadow-sm">
              <span className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-4 font-mono">
                <Ruler className="h-4 w-4 text-primary" />
                Толщина профиля (диаметр)
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
                    {/* Simulated glowing tube on tray */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 relative overflow-hidden">
                      <div 
                        className="rounded-full transition-all duration-300"
                        style={{
                          height: item.id === '6mm' ? '6px' : item.id === '10mm' ? '10px' : '12px',
                          width: '80%',
                          backgroundColor: item.color,
                          boxShadow: `0 0 8px ${item.color}, 0 0 16px ${item.color}80`,
                          transform: 'rotate(-45deg)',
                        }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-on-surface text-sm">{item.size}</span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-on-surface/40">— {item.title}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed mt-1 font-light">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control Group 2: Font Complexity (Typography comparison) */}
            <div className="rounded-[var(--radius-20)] border border-outline bg-white p-6 shadow-sm">
              <span className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-4 font-mono">
                <Settings className="h-4 w-4 text-primary" />
                Сложность гибов / шрифта
              </span>

              <div className="flex flex-col gap-3">
                {fontStyles.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveFont(item.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      activeFont === item.id 
                        ? 'border-primary/40 bg-primary/5 shadow-sm' 
                        : 'border-slate-100 hover:border-slate-200 bg-slate-50/20'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-on-surface text-sm block">{item.title}</span>
                      <span className="text-[10px] text-on-surface-variant font-light mt-0.5 block">{item.label}</span>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[9px] font-bold tracking-wider text-on-surface/60 font-mono uppercase">
                      {item.discount}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Pricing Gauge & Backing grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
          {/* Acrylic Backing options explanation block */}
          <div className="md:col-span-8 rounded-[var(--radius-24)] border border-outline bg-white p-8 shadow-sm">
            <span className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-6 font-mono">
              <Layers className="h-4 w-4 text-primary" />
              Варианты акрилового основания (подложки)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {backingOptions.map((item) => (
                <div key={item.name} className="p-5 rounded-xl border border-slate-100 bg-slate-50/20 hover:border-slate-200 transition-colors">
                  <span className="inline-block rounded-full bg-primary/8 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-primary mb-3">
                    {item.highlight}
                  </span>
                  <h4 className="font-bold text-on-surface text-sm mb-2 uppercase tracking-tight">{item.name}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Glassmorphic Meter pricing scale inspired by reference 1 */}
          <div className="md:col-span-4 rounded-[var(--radius-24)] border border-outline bg-white p-8 shadow-sm flex flex-col justify-between relative overflow-hidden bg-[linear-gradient(135deg,#ffffff,#f8fafc)]">
            <span className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 mb-4 font-mono">
              <Tag className="h-4 w-4 text-primary" />
              Ориентировочная шкала тарифа
            </span>

            {/* Glowing simulated card graphic */}
            <div className="border border-slate-100 rounded-xl bg-white/70 p-5 shadow-[0_10px_25px_rgba(0,0,0,0.02)] relative overflow-hidden backdrop-blur-sm">
              <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
              <span className="block text-[9px] font-mono tracking-widest uppercase text-on-surface/40 font-bold mb-3">Стоимость погонного метра</span>

              <div className="flex items-end justify-between border-b border-slate-100 pb-3 mb-3">
                <span className="font-light text-on-surface-variant text-sm">6мм неон (мини)</span>
                <span className="font-black text-primary text-base">от 1 200 ₽/м</span>
              </div>
              <div className="flex items-end justify-between border-b border-slate-100 pb-3 mb-3">
                <span className="font-light text-on-surface-variant text-sm">10мм неон (стандарт)</span>
                <span className="font-black text-primary text-base">от 1 900 ₽/м</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="font-light text-on-surface-variant text-sm">12мм неон (наружный)</span>
                <span className="font-black text-primary text-base">от 2 400 ₽/м</span>
              </div>
            </div>

            <p className="text-[10px] text-on-surface-variant/60 font-light leading-relaxed mt-4">
              *Включает полный комплект готового изделия: блок питания 12V, диммер яркости, кабель питания и контурный акрил.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

function SkuShowcase() {
  const openModal = useModalStore((state) => state.openModal);

  const readyMadeSkus = [
    { id: 'open', title: 'Open / Открыто', price: '1 900 ₽', oldPrice: '2 800 ₽', color: '#FF007F', secondaryColor: '#00DFFF', glow: 'rgba(255, 0, 127, 0.4)', textClass: 'uppercase tracking-widest font-black', bgClass: 'bg-[#FF007F]/5 border-[#FF007F]/20' },
    { id: 'coffee', title: 'Coffee Icon', price: '7 500 ₽', oldPrice: '9 900 ₽', color: '#00F5A0', secondaryColor: '#00F5A0', glow: 'rgba(0, 245, 160, 0.4)', textClass: 'italic font-serif font-semibold', bgClass: 'bg-[#00F5A0]/5 border-[#00F5A0]/20' },
    { id: 'heart', title: 'Neon Heart', price: '1 490 ₽', oldPrice: '2 200 ₽', color: '#FF0055', secondaryColor: '#FF0055', glow: 'rgba(255, 0, 85, 0.4)', textClass: 'uppercase font-light tracking-widest', bgClass: 'bg-[#FF0055]/5 border-[#FF0055]/20' },
    { id: 'bolt', title: 'Lightning Bolt', price: '1 290 ₽', oldPrice: '1 900 ₽', color: '#00DFFF', secondaryColor: '#00DFFF', glow: 'rgba(0, 223, 255, 0.4)', textClass: 'uppercase font-black italic', bgClass: 'bg-[#00DFFF]/5 border-[#00DFFF]/20' },
    { id: 'lips', title: 'Hot Lips', price: '1 890 ₽', oldPrice: '2 700 ₽', color: '#FF007F', secondaryColor: '#FF007F', glow: 'rgba(255, 0, 127, 0.4)', textClass: 'font-serif font-black tracking-[-0.05em]', bgClass: 'bg-[#FF007F]/5 border-[#FF007F]/20' },
    { id: 'planet', title: 'Cosmic Planet', price: '2 490 ₽', oldPrice: '3 500 ₽', color: '#00F5A0', secondaryColor: '#00DFFF', glow: 'rgba(0, 245, 160, 0.4)', textClass: 'uppercase font-mono font-medium', bgClass: 'bg-[#00F5A0]/5 border-[#00F5A0]/20' },
    { id: 'cactus', title: 'Fresh Cactus', price: '1 790 ₽', oldPrice: '2 500 ₽', color: '#00FF66', secondaryColor: '#00FF66', glow: 'rgba(0, 255, 102, 0.4)', textClass: 'uppercase tracking-tighter font-black', bgClass: 'bg-[#00FF66]/5 border-[#00FF66]/20' },
    { id: 'good', title: 'Good Vibes', price: '9 500 ₽', oldPrice: '14 000 ₽', color: '#FF007F', secondaryColor: '#00F5A0', glow: 'rgba(255, 0, 127, 0.4)', textClass: 'font-serif font-semibold italic', bgClass: 'bg-[#FF007F]/5 border-[#FF007F]/20' },
  ];

  return (
    <section id="sku" className="relative overflow-hidden border-t border-outline bg-white py-24">
      {/* Visual shelves backdrop pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px)] [background-size:100%_480px] pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* Header Block with Trust Badges (Image 2 style) */}
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-8)] border border-outline bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">
              <Sparkles className="h-4 w-4 text-primary" />
              Ready-made Neon
            </div>
            <h2 className="geist-display-lg text-on-surface mb-4">Готовые вывески и быстрые SKU.</h2>
            <p className="text-lg text-on-surface-variant font-light">
              Яркие идеи, готовые к отправке за 24 часа. Безопасное 12V напряжение, фиксированная стоимость без скрытых платежей, полная комплектация.
            </p>
          </div>

          {/* Badges Grid matching Reference 2 */}
          <div className="grid grid-cols-3 gap-4 shrink-0">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-center backdrop-blur-sm">
              <Truck className="h-5 w-5 text-primary mx-auto mb-2" />
              <span className="block text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Доставка</span>
              <span className="block text-[11px] text-on-surface-variant font-light leading-none">за 24 часа</span>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-center backdrop-blur-sm">
              <Tag className="h-5 w-5 text-primary mx-auto mb-2" />
              <span className="block text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Цены</span>
              <span className="block text-[11px] text-on-surface-variant font-light leading-none">фиксированы</span>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-center backdrop-blur-sm">
              <Shield className="h-5 w-5 text-primary mx-auto mb-2" />
              <span className="block text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Гарантия</span>
              <span className="block text-[11px] text-on-surface-variant font-light leading-none">12 месяцев</span>
            </div>
          </div>
        </div>

        {/* Tiered Shelves Showroom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: The Tiered Shelf of Podiums (8 items) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {readyMadeSkus.map((item) => (
              <div 
                key={item.id}
                className="group flex flex-col justify-between rounded-[var(--radius-20)] border border-outline bg-slate-50/30 p-5 transition-all duration-300 hover:shadow-md hover:border-slate-200 relative overflow-hidden"
              >
                {/* Visual Shelf Tier Bottom Line to mimic 3D depth */}
                <div className="absolute bottom-0 inset-x-0 h-1.5 bg-slate-200/60" />

                {/* Ambient glow container behind sign */}
                <div 
                  className="absolute inset-x-4 top-4 bottom-12 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${item.color}, transparent 70%)`
                  }}
                />

                {/* Tiered Block Podium Mockup */}
                <div className="mb-6 flex h-36 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm relative overflow-hidden">
                  {/* Neon Sign Visualizer inside podium */}
                  <span 
                    className={`relative z-10 transition-all duration-300 text-lg ${item.textClass} text-white select-none`}
                    style={{
                      textShadow: `0 0 4px #FFF, 0 0 8px ${item.color}, 0 0 16px ${item.color}bb`,
                      WebkitTextStroke: '1px rgba(255,255,255,0.92)'
                    }}
                  >
                    {item.id}
                  </span>
                  
                  {/* The Physical acrylic contour glass backplate */}
                  <div className="absolute inset-4 rounded-xl border border-slate-50 bg-slate-50/20 backdrop-blur-[1px] -z-10" />
                </div>

                {/* SKU Meta & Pricing details */}
                <div className="relative z-10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-on-surface mb-2 truncate">{item.title}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-black text-primary">{item.price}</span>
                    <span className="text-[10px] text-on-surface-variant/40 font-bold line-through">{item.oldPrice}</span>
                  </div>
                  
                  {/* Quick order in WhatsApp button */}
                  <button 
                    onClick={() => openModal({ context: `Готовое SKU: ${item.title} за ${item.price}`, source: `ready_sku_${item.id}` })}
                    className="w-full rounded-xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50 py-2.5 text-[9px] font-black uppercase tracking-widest text-on-surface transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    Заказать за 24ч
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel: The Custom Designer Card ("Dream Big" Vibe from Image 2) */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-[var(--radius-24)] border border-primary/20 bg-slate-900 text-white p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group min-h-[500px]">
            {/* Visual background gradient with animated border-like accents */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,245,160,0.15),transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,127,0.1),transparent_60%)] pointer-events-none" />
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity" />

            {/* Real premium custom neon work showcase */}
            <div className="relative z-10 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-950 mb-8 h-48 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              <img
                src="/img/neon/neon-hero-premium-01.png"
                alt="Кастомный гибкий неон БУКВА СВЕТ"
                className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 z-10 text-left">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary mb-1">
                  Наше производство
                </span>
                <span className="block text-[11px] text-white font-bold leading-tight">
                  Премиальный силикон 12V на прозрачном акриле
                </span>
              </div>
            </div>

            {/* Card Content & details */}
            <div className="relative z-10 mt-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/20 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-primary mb-4 font-mono shadow-sm">
                <Flame className="h-3 w-3 text-primary animate-pulse" />
                Индивидуальный проект
              </span>

              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">Любой текст, логотип или размер.</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light mb-6">
                Не нашли подходящую вывеску в каталоге готовых? Мы создадим уникальную конструкцию по вашей идее или брендбуку.
              </p>

              <div className="space-y-3.5 text-xs text-white/80 font-light border-t border-white/5 pt-5 mb-8">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>3D-визуализация в интерьере бесплатно</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>Любые шрифты, цвета и габариты</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>Безопасная доставка в жесткой обрешетке</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  onClick={() => openModal({ context: 'Кастомный неон: Dream Big', source: 'neon_custom_premium_card' })}
                  className="rounded-xl bg-primary hover:bg-primary-hover text-slate-900 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_12px_28px_rgba(0,245,160,0.22)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Рассчитать
                </button>
                <a
                  href="#calculator"
                  className="rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white py-3.5 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Code className="h-3.5 w-3.5 text-primary" />
                  Конструктор
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function CaseCards() {
  if (!neonData.caseCards?.length) return null;

  return (
    <section className="section-padding border-t border-outline bg-surface">
      <div className="section-container">
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-8)] border border-outline bg-background px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            B2B сценарии
          </div>
          <h2 className="geist-display-lg text-on-surface">Пакеты, которые продают задачу, а не метр неона.</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {neonData.caseCards.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="rounded-[var(--radius-16)] border border-outline bg-surface p-7 shadow-sm"
            >
              <h3 className="mb-5 text-2xl font-black uppercase tracking-tight">{item.title}</h3>
              <p className="mb-8 text-on-surface-variant">{item.description}</p>
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
  if (!neonData.process?.length) return null;

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
          {neonData.process.map((step, index) => (
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
              <p className="text-sm text-on-surface-variant">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadMagnets() {
  if (!neonData.leadMagnets?.length) return null;

  return (
    <section className="border-t border-outline bg-surface py-16">
      <div className="section-container grid grid-cols-1 gap-4 px-6 md:grid-cols-3">
        {neonData.leadMagnets.map((item) => (
          <div key={item.title} className="flex gap-4 rounded-[var(--radius-12)] border border-outline bg-surface p-6 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-8)] bg-primary/8 text-primary">
              {item.title.includes('макет') ? <FileUp className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="mb-2 text-base font-black uppercase tracking-tight">{item.title}</h3>
              <p className="text-sm text-on-surface-variant">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

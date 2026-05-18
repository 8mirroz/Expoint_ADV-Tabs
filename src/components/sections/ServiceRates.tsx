'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Building2, Landmark, Lightbulb, PanelsTopLeft, ShieldCheck, Sparkles, Gauge, Timer, Target } from 'lucide-react';

import { SERVICES } from '@/data/services';
import gsap, { useGSAP } from '@/lib/gsap';

interface ServiceRatesProps {
  compact?: boolean;
}

/** Complexity indicator — 5 segment bar */
function ComplexityBar({ level }: { level: number }) {
  return (
    <div className="flex gap-1 mt-1.5" aria-label={`Сложность: ${level} из 5`}>
      {[1, 2, 3, 4, 5].map((seg) => (
        <div
          key={seg}
          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
            seg <= level
              ? 'bg-[#00ffa3] shadow-[0_0_8px_rgba(0,255,163,0.6)]'
              : 'bg-white/[0.08]'
          }`}
        />
      ))}
    </div>
  );
}

/** Maps service ID to complexity level (1-5) */
const complexityMap: Record<string, number> = {
  'volumetric-letters': 3,
  'lightbox': 2,
  'flex-neon': 2,
  'metal-letters': 4,
  'pylon-signs': 5,
  'roof-installations': 5,
};

/** Maps service ID to production timeline */
const timelineMap: Record<string, string> = {
  'volumetric-letters': '5–10 дн.',
  'lightbox': '3–7 дн.',
  'flex-neon': '3–5 дн.',
  'metal-letters': '7–14 дн.',
  'pylon-signs': '14–30 дн.',
  'roof-installations': '30–60 дн.',
};

/** Maps service ID to best-for label */
const bestForMap: Record<string, string> = {
  'volumetric-letters': 'Универсал',
  'lightbox': 'Ритейл / Сети',
  'flex-neon': 'HoReCa / Интерьер',
  'metal-letters': 'Премиум / Бутик',
  'pylon-signs': 'ТЦ / Бизнес-парки',
  'roof-installations': 'Корпорации',
};

const serviceIconMap: Record<string, typeof Building2> = {
  'volumetric-letters': Building2,
  'lightbox': PanelsTopLeft,
  'flex-neon': Sparkles,
  'metal-letters': ShieldCheck,
  'pylon-signs': Landmark,
  'roof-installations': Lightbulb,
};

interface PricingDetail {
  formula: string;
  formulaLabel: string;
  subservices: { name: string; price: string }[];
  variability: { label: string; value: string }[];
  hiddenCosts: { label: string; value: string }[];
}

const pricingDetailsMap: Record<string, PricingDetail> = {
  'volumetric-letters': {
    formula: 'Цена = (Высота × Ставка × K_шрифта) × K_срочности + БП + Монтаж',
    formulaLabel: 'Логика расчета за 1 см высоты буквы',
    subservices: [
      { name: 'Несветовые буквы ПВХ', price: 'от 35–55 ₽/см' },
      { name: 'Световые (лицевые LED)', price: 'от 65–140 ₽/см' },
      { name: 'Контражурная подсветка', price: 'от 70–155 ₽/см' },
      { name: 'Премиум нержавеющая сталь', price: 'от 180–259 ₽/см' }
    ],
    variability: [
      { label: 'Шрифт прямой печатный', value: 'x1.0 (база)' },
      { label: 'Шрифт с засечками', value: 'x1.15' },
      { label: 'Рукописный / Сложный', value: 'x1.25–1.5' },
      { label: 'Блок питания IP67', value: '+2 000–6 000 ₽' }
    ],
    hiddenCosts: [
      { label: 'Монтаж (1-2 этаж)', value: 'от 4 000 ₽' },
      { label: 'Автовышка (выс. монтаж)', value: 'от 17 000 ₽/смена' },
      { label: 'Демонтаж вывески', value: 'от 2 500 ₽' },
      { label: 'Аудит по 902-ПП (МСК)', value: '0 ₽ (Бесплатно)' }
    ]
  },
  'lightbox': {
    formula: 'Цена = (Площадь × Ставка × K_формы × K_сторон) × K_срочности + Монтаж',
    formulaLabel: 'Логика расчета за кв. метр лицевой площади',
    subservices: [
      { name: 'Малые короба (<0.25 м²)', price: 'от 6 500 ₽ (фикс)' },
      { name: 'Стандартные короба (от 1 м²)', price: 'от 7 000–8 000 ₽/м²' },
      { name: 'Композит с инкрустацией', price: 'от 12 000–18 500 ₽/м²' },
      { name: 'Двусторонняя консоль', price: 'коэффицент x1.6' }
    ],
    variability: [
      { label: 'Прямоугольная форма', value: 'x1.0 (база)' },
      { label: 'Круглая / фигурная форма', value: 'x1.25' },
      { label: 'Светодиоды высокой яркости', value: '+15–25%' },
      { label: 'Срочность (в пределах 3 дн.)', value: 'от +40%' }
    ],
    hiddenCosts: [
      { label: 'Монтаж короба', value: 'от 4 000 ₽' },
      { label: 'Вышка (высотные работы)', value: 'от 17 000 ₽/смена' },
      { label: 'Демонтаж короба', value: 'от 2 500 ₽ / 1 900 ₽/м²' },
      { label: 'Проект дизайн-привязки', value: 'от 5 000 ₽' }
    ]
  },
  'flex-neon': {
    formula: 'Цена = База + (Длина × Ставка × K_шрифта) × K_цвета + Стыки + Подложка',
    formulaLabel: 'Логика расчета за погонный метр контура неона',
    subservices: [
      { name: 'Силиконовый неон (6x12/8x16)', price: 'от 1 200–1 900 ₽/м.п.' },
      { name: 'Расход на символ (S / M / L)', price: '~30 / 50 / 80 см' },
      { name: 'Пайка и коммутация стыков', price: '187 ₽ / контакт' },
      { name: 'Акриловая подложка (5-8 мм)', price: 'в комплекте' }
    ],
    variability: [
      { label: 'Одноцветный неон', value: 'x1.0 (база)' },
      { label: 'RGB-динамика / Эффекты', value: 'x1.5' },
      { label: 'Рукописный сложный изгиб', value: 'x1.25' },
      { label: 'Диммер с пультом управления', value: 'от 1 500 ₽' }
    ],
    hiddenCosts: [
      { label: 'Прецизионный монтаж неона', value: 'от 8 200 ₽' },
      { label: 'Сетевой адаптер 12В', value: 'от 2 000 ₽' },
      { label: 'Демонтаж старого неона', value: 'от 2 500 ₽' },
      { label: 'Проверка по 902-ПП (МСК)', value: '0 ₽ (Бесплатно)' }
    ]
  },
  'metal-letters': {
    formula: 'Цена = (Высота × Ставка × K_геометрии) × K_срочности + Крепеж + Монтаж',
    formulaLabel: 'Логика расчета без подсветки за 1 см высоты буквы',
    subservices: [
      { name: 'Нержавеющая сталь AISI 304', price: 'от 110–180 ₽/см' },
      { name: 'Покрытие нитридом титана (золото)', price: 'от 180 ₽/см' },
      { name: 'Антикоррозийная AISI 316', price: 'от 240 ₽/см' },
      { name: 'Шлифованная / Зеркальная сталь', price: 'в комплекте' }
    ],
    variability: [
      { label: 'Толщина стали 0.8–1.5 мм', value: 'x1.0–1.3' },
      { label: 'Сложные углы (микросварка)', value: 'x1.25' },
      { label: 'Скрытые шпильки / держатели', value: 'в комплекте' },
      { label: 'Срочность (изготовление <5 дн.)', value: 'от +45%' }
    ],
    hiddenCosts: [
      { label: 'Монтаж на шпильки к фасаду', value: 'от 5 000 ₽' },
      { label: 'Монтажный трафарет (ЧПУ)', value: 'от 1 500 ₽' },
      { label: 'Вышка (высотные работы)', value: 'от 17 000 ₽/смена' },
      { label: 'Демонтаж старых букв', value: 'от 3 000 ₽' }
    ]
  },
  'pylon-signs': {
    formula: 'Цена = Каркас + Облицовка АКП + Фундамент + Питание + КМ/КМД + Доставка',
    formulaLabel: 'Логика расчета за готовое навигационное изделие',
    subservices: [
      { name: 'Индивидуальные стелы (до 3м)', price: 'от 180 000 ₽' },
      { name: 'Навигационные пилоны (до 6м)', price: 'от 350 000 ₽' },
      { name: 'Световые панели навигации', price: 'от 45 000 ₽' },
      { name: 'Фундамент с армированием', price: 'от 35 000 ₽' }
    ],
    variability: [
      { label: 'Пакет чертежей КМ / КМД', value: 'в комплекте' },
      { label: 'Ветровые нагрузки (СНиП)', value: 'в комплекте' },
      { label: 'Сложные консольные вылеты', value: 'коэффициент x1.2' },
      { label: 'Масштаб (объем заказа)', value: 'скидки до 20%' }
    ],
    hiddenCosts: [
      { label: 'Доставка & монтаж краном', value: 'от 15 000 ₽' },
      { label: 'Инженерное обследование грунта', value: 'от 5 000 ₽' },
      { label: 'Согласование (высота > 6 метров)', value: 'от 14 000 ₽' },
      { label: 'Почасовая работа спецтехники', value: 'от 1 200 ₽/час' }
    ]
  },
  'roof-installations': {
    formula: 'Цена = Экспертиза + КМ/КМД + Рама + Электрика 380В + Буквы + Кран + Альпинисты',
    formulaLabel: 'Логика расчета крышного крупноформатного проекта',
    subservices: [
      { name: 'Крышные световые буквы', price: 'от 350 000 ₽' },
      { name: 'Рекламные панно на кровлю', price: 'от 600 000 ₽' },
      { name: 'Несущий горячекатаный каркас', price: 'от 120 000 ₽' },
      { name: 'Шкаф управления и электрика 380В', price: 'от 45 000 ₽' }
    ],
    variability: [
      { label: 'СНиП расчет ветровых нагрузок', value: 'в комплекте' },
      { label: 'Высотность здания (коэффициент)', value: 'x1.15–1.4' },
      { label: 'Экспертиза кровли (заключение)', value: 'от 25 000 ₽' },
      { label: 'Срочность (сжатый график)', value: 'от +40%' }
    ],
    hiddenCosts: [
      { label: 'Доставка & монтаж краном', value: 'от 25 000 ₽/смена' },
      { label: 'Работы промышленных альпинистов', value: 'от 12 000 ₽/смена' },
      { label: 'Согласование и разработка проекта', value: 'от 45 000 ₽' },
      { label: 'Смена спецтехники (7+1 часов)', value: 'от 17 000 ₽' }
    ]
  }
};

function formatSegments(segments: string[]) {
  const labels: Record<string, string> = {
    horeca: 'HoReCa',
    retail: 'Retail',
    clinics: 'Clinics',
    corporate: 'Corporate',
    franchise: 'Franchise',
  };

  return segments.slice(0, 2).map((segment) => labels[segment] ?? segment).join(' / ');
}

/**
 * ServiceRates — v10: Service rate cards with complexity indicators,
 * production timelines, best-for badges, and motion reveal.
 */
export default function ServiceRates({ compact = false }: ServiceRatesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        once: true,
      },
    });

    tl.from('.service-rates-headline', { opacity: 0, y: 26, duration: 0.65 })
      .from('.service-rate-card', { opacity: 0, y: 34, stagger: 0.08, duration: 0.52 }, '-=0.35');

    gsap.to('.service-rates-ambient', {
      xPercent: 4,
      yPercent: -2,
      duration: 5.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className={`${compact ? 'py-16' : 'py-24'} relative overflow-hidden border-t border-white/[0.08] bg-[radial-gradient(120%_100%_at_50%_0%,rgba(0,255,163,0.08),rgba(0,0,0,0)_45%),#090909]`}
    >
      <div className="service-rates-ambient pointer-events-none absolute inset-0 opacity-75 bg-[radial-gradient(circle_at_20%_18%,rgba(0,245,160,0.14),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.028)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="section-container space-y-14 px-6">
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="service-rates-headline relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          >
            <div className="space-y-5">
              <p className="verge-mono-label text-primary tracking-[0.22em]">Матрица базовых ставок</p>
              <h2 className="geist-display-lg text-white max-w-[17ch]">
                Сравните конструкцию, единицу расчёта и проектный сценарий.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-[1.7] text-neutral-300/88">
              Мы показываем стартовую ставку по каждой конструкции, подробную B2B-логику расчёта, коэффициенты вариативности и цены сопутствующих услуг, чтобы бюджет проекта был полностью прозрачным.
            </p>
          </motion.div>
        )}

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => {
            const notes = service.expertNotes;
            const complexity = complexityMap[service.id] ?? 3;
            const timeline = timelineMap[service.id] ?? '—';
            const bestFor = bestForMap[service.id] ?? '—';
            const Icon = serviceIconMap[service.id] ?? Building2;
            const pricingDetail = pricingDetailsMap[service.id];

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * (index + 1) }}
                className="service-rate-card group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-20)] border border-white/[0.1] bg-[linear-gradient(180deg,rgba(12,12,14,0.94),rgba(8,8,10,0.9))] p-6 shadow-[0_18px_46px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-[#00ffa3]/35 hover:shadow-[0_24px_54px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,255,163,0.2)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(0,255,163,0.12),transparent_55%)]" />
                {/* Header */}
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-white/[0.07] pb-2.5">
                    <p className="text-[9px] font-mono tracking-widest text-[#00ffa3] uppercase select-none">
                      {formatSegments(service.segments)}
                    </p>
                    <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase select-none">
                      {notes?.source_doc_ids.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/24 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(0,245,160,0.22)]">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <h3 className="text-[2.05rem] font-black uppercase tracking-[-0.024em] text-white break-words leading-[0.96] md:text-[2.2rem]">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="relative z-10 mt-4 text-sm leading-[1.62] text-neutral-300/84">{service.shortDescription}</p>

                {/* Metrics Row: Complexity + Timeline + Best For (Compact & Elegant) */}
                <div className="relative z-10 mt-4 flex items-center justify-between border-b border-white/[0.06] pb-3.5 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Timer className="h-3.5 w-3.5 text-[#00ffa3]/85" />
                    <span>Срок: <strong className="text-white">{timeline}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-[#00ffa3]/85" />
                    <span>Сложность: <strong className="text-white">{complexity}/5</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Target className="h-3.5 w-3.5 text-[#00ffa3]/85 shrink-0" />
                    <span className="truncate max-w-[90px]" title={bestFor}>Подходит: <strong className="text-white">{bestFor}</strong></span>
                  </div>
                </div>

                {/* Base Price Block */}
                <div className="relative z-10 mt-4 rounded-xl border border-white/[0.06] bg-white/[0.01] px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-mono tracking-widest text-neutral-500 uppercase">Базовая ставка</p>
                      <div className="mt-0.5 flex items-baseline gap-1">
                        <span className="text-[2.2rem] font-black text-white tracking-[-0.03em] tabular-nums leading-[0.95]" data-testid={`service-rate-price-${service.id}`}>
                          {service.basePrice.toLocaleString('ru-RU')}
                        </span>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#00ffa3]" data-testid={`service-rate-unit-${service.id}`}>
                          {service.priceUnit}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-mono tracking-widest text-neutral-500 uppercase">Сценарий</p>
                      <span className="mt-1 inline-flex rounded-md border border-[#00ffa3]/20 bg-[#00ffa3]/5 px-2 py-0.5 text-xs font-semibold leading-tight text-[#00ffa3] uppercase tracking-wider">
                        {bestFor}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing Calculation Formula */}
                {pricingDetail && (
                  <div className="relative z-10 mt-4 rounded-xl border border-[#00ffa3]/10 bg-[#00ffa3]/[0.01] p-3">
                    <p className="text-[9px] font-mono tracking-widest text-[#00ffa3]/80 uppercase">Математика расчета</p>
                    <code className="mt-1.5 block font-mono text-[10.5px] leading-relaxed text-white/90 break-words whitespace-pre-wrap select-all bg-black/40 px-2.5 py-2 rounded-lg border border-white/[0.04]">
                      {pricingDetail.formula}
                    </code>
                    <span className="mt-1 block text-[9px] text-neutral-500 italic leading-snug">{pricingDetail.formulaLabel}</span>
                  </div>
                )}

                {/* Subservices & Rates List */}
                {pricingDetail && (
                  <div className="relative z-10 mt-4 space-y-2">
                    <p className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Варианты изготовления и ставки</p>
                    <div className="space-y-2 rounded-xl border border-white/[0.04] bg-white/[0.01] p-3.5">
                      {pricingDetail.subservices.map((sub, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-neutral-300">{sub.name}</span>
                          <span className="h-px flex-1 border-b border-dotted border-white/[0.12] mx-2" />
                          <span className="font-semibold text-white shrink-0 whitespace-nowrap">{sub.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variability & Hidden Costs (2 Columns) */}
                {pricingDetail && (
                  <div className="relative z-10 mt-4 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-4">
                    {/* Multipliers & Variability */}
                    <div className="space-y-2">
                      <p className="text-[9px] font-mono tracking-widest text-[#00ffa3]/90 uppercase">Коэффициенты</p>
                      <ul className="space-y-2 text-[10.5px] leading-normal text-neutral-400">
                        {pricingDetail.variability.map((v, idx) => (
                          <li key={idx} className="flex flex-col gap-0.5">
                            <span className="text-neutral-300 font-medium font-sans leading-tight">{v.label}</span>
                            <span className="text-[#00ffa3] font-mono font-semibold">{v.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Associated services & Hidden Costs */}
                    <div className="space-y-2">
                      <p className="text-[9px] font-mono tracking-widest text-[#00ffa3]/90 uppercase">Сопутствующие услуги</p>
                      <ul className="space-y-2 text-[10.5px] leading-normal text-neutral-400">
                        {pricingDetail.hiddenCosts.map((h, idx) => (
                          <li key={idx} className="flex flex-col gap-0.5">
                            <span className="text-neutral-300 font-medium font-sans leading-tight">{h.label}</span>
                            <span className="text-white font-semibold font-sans">{h.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="relative z-10 mt-auto flex flex-col gap-4 pt-6">
                  <div className="text-[10px] font-mono text-neutral-500 border-t border-white/[0.05] pt-3.5">
                    <span className="text-neutral-400 font-sans">Проверено:</span>{' '}
                    {notes?.last_verified_at ?? '2026-05-12'} · <span className="text-[#00ffa3]/85">{notes?.owner ?? 'content-team'}</span>
                  </div>
                  <Link
                    href={`/calculator?type=${service.id}`}
                    data-testid={`service-rate-link-${service.id}`}
                    className="relative flex h-[50px] w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#00ffa3] text-black font-semibold text-sm tracking-[-0.01em] transition-all duration-300 hover:bg-[#00ffa3]/90 hover:shadow-[0_0_20px_rgba(0,255,163,0.4)] group"
                  >
                    <span>Считать {service.title}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

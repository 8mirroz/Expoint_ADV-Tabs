"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Calculator,
  Check,
  ClipboardList,
  FileCog,
  FileText,
  Layers,
  Ruler,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CalculatorHandoffPanel } from './CalculatorHandoffPanel';
import { useCalculatorHandoff } from './hooks/useCalculatorHandoff';
import { useCartDrawerStore } from '@/store/useCartDrawerStore';
import {
  DEFAULT_CALCULATOR_CONFIG,
  type BusinessSegment,
  type CalculatorComplexity,
  type CalculatorConfig,
  type CalculatorLighting,
  type CalculatorMaterialTier,
  type CalculatorMounting,
  type CalculatorProductType,
  type CalculatorUrgency,
  type QuotePackage,
} from '@/lib/pricingEngine';
import { createExpointSalesEngine, useSalesEngineStore, type CapabilityState } from '@/lib/salesEngine';

interface CalculatorContainerProps {
  serviceId?: string;
  surface?: 'page' | 'section';
}

const productOptions: { id: CalculatorProductType; label: string; description: string }[] = [
  { id: 'volumetric-letters', label: 'Объемные световые буквы', description: 'Расчет за сантиметр высоты и количество символов.' },
  { id: 'lightbox', label: 'Световой короб', description: 'Расчет по площади, форме и сценарию монтажа.' },
  { id: 'flex-neon', label: 'Гибкий неон', description: 'Расчет по длине контура, цвету свечения и подложке.' },
  { id: 'metal-letters', label: 'Нержавеющие буквы', description: 'Премиальная фасадная и интерьерная айдентика.' },
  { id: 'pylon-signs', label: 'Стела / навигация', description: 'Проектная оценка инженерной конструкции.' },
  { id: 'roof-installations', label: 'Крышная установка', description: 'Крупноформатный проект с инженерной проверкой.' },
];

const segmentOptions: { id: BusinessSegment; label: string }[] = [
  { id: 'retail', label: 'Ритейл' },
  { id: 'horeca', label: 'HoReCa' },
  { id: 'clinic', label: 'Клиника' },
  { id: 'corporate', label: 'Офис / B2B' },
  { id: 'franchise', label: 'Франшиза' },
];

const materialOptions: { id: CalculatorMaterialTier; label: string; description: string }[] = [
  { id: 'standard', label: 'Standard', description: 'ПВХ, акрил, базовая гарантия.' },
  { id: 'premium', label: 'Premium', description: 'Премиум акрил и усиленная электрика.' },
  { id: 'exclusive', label: 'Exclusive', description: 'Металл, сложная отделка и расширенный ресурс.' },
];

const lightingOptions: { id: CalculatorLighting; label: string }[] = [
  { id: 'internal', label: 'Лицевая LED' },
  { id: 'halo', label: 'Контражур' },
  { id: 'combined', label: 'Комбинированная / RGB' },
  { id: 'open_neon', label: 'Открытый неон' },
  { id: 'none', label: 'Без подсветки' },
];

const complexityOptions: { id: CalculatorComplexity; label: string }[] = [
  { id: 'standard', label: 'Прямой' },
  { id: 'serif', label: 'С засечками' },
  { id: 'script', label: 'Рукописный' },
];

const mountingOptions: { id: CalculatorMounting; label: string }[] = [
  { id: 'none', label: 'Без монтажа' },
  { id: 'wall_simple', label: '1-2 этаж' },
  { id: 'frame', label: 'Рама / сложный фасад' },
  { id: 'roof', label: 'Крыша / спецработы' },
];

const urgencyOptions: { id: CalculatorUrgency; label: string; description: string }[] = [
  { id: 'standard', label: 'Стандарт', description: '7-14 рабочих дней' },
  { id: 'express', label: 'Экспресс', description: '3-5 рабочих дней, +40%' },
];

const stepOrder = ['product', 'geometry', 'services', 'quote'] as const;
type CalculatorStep = typeof stepOrder[number];
type ResumeStatus = 'fresh' | 'resumed' | 'stale';

const stepMeta: Record<CalculatorStep, { index: string; title: string; body: string }> = {
  product: {
    index: '01',
    title: 'Тип и сегмент',
    body: 'Определяем тип конструкции и бизнес-контекст, чтобы применить корректные допущения и pricing anchors.',
  },
  geometry: {
    index: '02',
    title: 'Габариты и визуал',
    body: 'Фиксируем текст, размеры, материалы и сценарий свечения. Предпросмотр и смета обновляются сразу.',
  },
  services: {
    index: '03',
    title: 'Монтаж и согласование',
    body: 'Добавляем монтажный доступ, срочность и проверку по 902-ПП. Это влияет на финальную упаковку сделки.',
  },
  quote: {
    index: '04',
    title: 'Коммерческая смета',
    body: 'Сравните пакеты Start / Business / Premium и сохраните выбранный setup в quote cart.',
  },
};

function productFromService(serviceId?: string): CalculatorProductType {
  if (serviceId === 'lightbox' || serviceId === 'lightboxes') return 'lightbox';
  if (serviceId === 'flex-neon' || serviceId === 'neon') return 'flex-neon';
  if (serviceId === 'metal-letters') return 'metal-letters';
  if (serviceId === 'pylon-signs' || serviceId === 'wayfinding') return 'pylon-signs';
  if (serviceId === 'roof-installations') return 'roof-installations';
  return 'volumetric-letters';
}

function formatRub(value: number): string {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

function getPackageTone(pkg: QuotePackage, selected: boolean): string {
  if (selected) return 'border-accent bg-accent/8 shadow-[0_20px_60px_rgba(0,245,160,0.12)]';
  if (pkg.recommended) return 'border-accent/40 bg-white';
  return 'border-outline bg-white';
}

function getOptionLabel<T extends string>(options: Array<{ id: T; label: string }>, value: T): string {
  return options.find((option) => option.id === value)?.label ?? value;
}

function getStepIndex(step: CalculatorStep): number {
  return stepOrder.indexOf(step);
}

function renderProductIcon(type: CalculatorProductType, active: boolean) {
  const cn = active ? "text-accent transition-colors duration-300" : "text-white/40 transition-colors duration-300";
  switch (type) {
    case 'volumetric-letters':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}>
          <path d="M4 20L12 4L20 20" />
          <path d="M7 14H17" />
          <path d="M12 4L14 7M4 20L5 22M20 20L19 22" className="opacity-60" strokeWidth="1.5" />
          <path d="M5 22H19" className="opacity-40" strokeWidth="1" />
        </svg>
      );
    case 'lightbox':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}>
          <rect x="5" y="4" width="16" height="16" rx="2" />
          <line x1="1" y1="8" x2="5" y2="8" />
          <line x1="1" y1="16" x2="5" y2="16" />
          <rect x="8" y="7" width="10" height="10" rx="1" className="opacity-60" strokeWidth="1.5" />
        </svg>
      );
    case 'flex-neon':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}>
          <path d="M3 12C3 7 7 3 12 3C17 3 21 7 21 12C21 17 17 21 12 21" />
          <path d="M8 12C8 9.8 9.8 8 12 8C14.2 8 16 9.8 16 12" className="opacity-60" strokeWidth="1.5" />
        </svg>
      );
    case 'metal-letters':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}>
          <path d="M4 20V4L12 14L20 4V20" />
          <path d="M6 18V6L12 12" className="opacity-50" strokeWidth="1" />
        </svg>
      );
    case 'pylon-signs':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}>
          <rect x="8" y="2" width="8" height="20" rx="1" />
          <line x1="8" y1="8" x2="16" y2="8" strokeWidth="1.5" className="opacity-60" />
          <line x1="8" y1="14" x2="16" y2="14" strokeWidth="1.5" className="opacity-60" />
          <path d="M11 5L13 5" strokeWidth="1.5" />
          <path d="M10 11L12 11" strokeWidth="1.5" />
          <path d="M12 17L14 17" strokeWidth="1.5" />
        </svg>
      );
    case 'roof-installations':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn}>
          <path d="M2 20L12 12L22 20" />
          <rect x="8" y="5" width="8" height="7" rx="1" />
          <line x1="9" y1="12" x2="6" y2="17" className="opacity-60" strokeWidth="1.5" />
          <line x1="15" y1="12" x2="18" y2="17" className="opacity-60" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
}

export function CalculatorContainer({ serviceId, surface = 'page' }: CalculatorContainerProps) {
  const searchParams = useSearchParams();
  const cartItemId = searchParams.get('cartItem');
  const requestedType = searchParams.get('type') ?? serviceId;
  const flowKey = cartItemId ? `cart:${cartItemId}` : `service:${requestedType ?? 'default'}`;
  const { openDrawer } = useCartDrawerStore();
  const [isSaved, setIsSaved] = useState(false);
  const [flowState, setFlowState] = useState<{ key: string; step: CalculatorStep; resumeStatus: ResumeStatus }>(() => ({
    key: flowKey,
    step: cartItemId ? 'quote' : 'product',
    resumeStatus: 'fresh',
  }));
  const initializedKeyRef = useRef<string | null>(null);
  const draft = useSalesEngineStore((state) => state.draft);
  const salesEngine = useMemo(() => createExpointSalesEngine(), []);
  const estimate = draft.estimate;
  const selectedPackage = draft.selectedPackage;
  const isCompact = surface === 'section';
  const currentStep = flowState.key === flowKey ? flowState.step : cartItemId ? 'quote' : 'product';
  const resumeStatus = flowState.key === flowKey ? flowState.resumeStatus : 'fresh';
  const stepIndex = getStepIndex(currentStep);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === stepOrder.length - 1;
  const step = stepMeta[currentStep];
  const capabilityIcons = {
    lead_scoring: Activity,
    pdf_proposal: FileCog,
    ai_visualization: Sparkles,
    follow_up: ClipboardList,
  } as const;
  const handoff = useCalculatorHandoff(surface);

  useEffect(() => {
    const nextKey = flowKey;
    if (initializedKeyRef.current === nextKey) return;

    const productType = productFromService(requestedType);
    let nextResumeStatus: ResumeStatus = 'fresh';

    if (cartItemId) {
      const resumedDraft = salesEngine.resume(cartItemId);
      if (!resumedDraft) {
        salesEngine.patchConfig({
          ...DEFAULT_CALCULATOR_CONFIG,
          productType,
        });
        nextResumeStatus = 'stale';
      } else {
        nextResumeStatus = 'resumed';
      }
    } else {
      salesEngine.patchConfig({
        ...DEFAULT_CALCULATOR_CONFIG,
        productType,
      });
    }

    setFlowState({
      key: nextKey,
      step: cartItemId ? 'quote' : 'product',
      resumeStatus: nextResumeStatus,
    });
    initializedKeyRef.current = nextKey;
  }, [cartItemId, flowKey, requestedType, salesEngine]);

  const updateConfig = <K extends keyof CalculatorConfig>(key: K, value: CalculatorConfig[K]) => {
    setIsSaved(false);
    salesEngine.patchConfig({ [key]: value } as Partial<CalculatorConfig>);
  };

  const updateText = (text: string) => {
    setIsSaved(false);
    salesEngine.patchConfig({
      text,
      quantity: Math.max(1, text.replace(/\s/g, '').length),
    });
  };

  const handleSaveToCart = () => {
    salesEngine.saveQuoteCart();
    setIsSaved(true);
    openDrawer();
  };

  const goToStep = (nextStep: CalculatorStep) => {
    setFlowState((current) => ({
      key: flowKey,
      step: nextStep,
      resumeStatus: current.resumeStatus,
    }));
  };

  const goNext = () => {
    if (isLastStep) return;
    setFlowState((current) => ({
      key: flowKey,
      step: stepOrder[stepIndex + 1],
      resumeStatus: current.resumeStatus,
    }));
  };

  const goBack = () => {
    if (isFirstStep) return;
    setFlowState((current) => ({
      key: flowKey,
      step: stepOrder[stepIndex - 1],
      resumeStatus: current.resumeStatus,
    }));
  };

  const handleReviewParameters = () => {
    setFlowState({
      key: flowKey,
      step: 'product',
      resumeStatus: 'fresh',
    });
  };

  const handleStayOnQuote = () => {
    setFlowState({
      key: flowKey,
      step: 'quote',
      resumeStatus: 'fresh',
    });
  };

  const summaryItems = [
    {
      label: 'Конструкция',
      value: getOptionLabel(productOptions, estimate.config.productType),
    },
    {
      label: 'Сегмент',
      value: getOptionLabel(segmentOptions, estimate.config.businessSegment),
    },
    {
      label: 'Размер',
      value: `${estimate.config.widthMm} x ${estimate.config.heightMm} x ${estimate.config.depthMm} мм`,
    },
    {
      label: 'Материал / свет',
      value: `${getOptionLabel(materialOptions, estimate.config.materialTier)} / ${getOptionLabel(lightingOptions, estimate.config.lighting)}`,
    },
    {
      label: 'Монтаж / срок',
      value: `${getOptionLabel(mountingOptions, estimate.config.mounting)} / ${getOptionLabel(urgencyOptions, estimate.config.urgency)}`,
    },
  ];

  const renderProductStep = () => (
    <div className="space-y-6">
      <OptionGroup title="Тип конструкции">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productOptions.map((item) => {
            const isActive = estimate.config.productType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateConfig('productType', item.id)}
                className={`flex flex-col h-full rounded-2xl border p-4 text-left transition-all duration-300 relative group overflow-hidden ${
                  isActive
                    ? 'border-accent bg-accent/[0.04] shadow-[0_0_20px_rgba(0,245,160,0.1)]'
                    : 'border-white/10 bg-white/[0.01] hover:border-accent/40 hover:bg-white/[0.03] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                )}

                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-accent/15 text-accent shadow-[0_0_15px_rgba(0,245,160,0.2)]' 
                    : 'bg-white/[0.03] text-white/50 group-hover:text-accent group-hover:bg-accent/5'
                }`}>
                  {renderProductIcon(item.id, isActive)}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className={`block text-sm font-black transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white'}`}>
                      {item.label}
                    </span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-white/50 font-medium">
                      {item.description}
                    </span>
                  </div>
                  
                  {isActive && (
                    <div className="mt-3.5 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-accent animate-fade-in">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      Выбрано
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </OptionGroup>

      <OptionGroup title="Сегмент бизнеса">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          {segmentOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateConfig('businessSegment', item.id)}
              className={`rounded-xl border px-3 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                estimate.config.businessSegment === item.id
                  ? 'border-accent bg-accent text-background shadow-[0_0_12px_rgba(0,245,160,0.25)]'
                  : 'border-white/10 bg-white/[0.01] text-white/60 hover:border-white/30 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </OptionGroup>
    </div>
  );

  const renderGeometryStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="relative group rounded-2xl border border-white/10 bg-white/[0.01] p-5 transition-all duration-300 focus-within:border-accent focus-within:bg-accent/[0.02] focus-within:shadow-[0_0_30px_rgba(0,245,160,0.08)]">
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="calculator-text-input" className="verge-mono-label text-accent font-black tracking-wider text-[10px] uppercase flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Текст / бренд
            </label>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              {estimate.config.text ? `${estimate.config.text.length} симв.` : 'введите надпись'}
            </span>
          </div>
          
          <div className="relative flex items-center">
            <div className="absolute left-0 text-white/30 group-focus-within:text-accent transition-colors duration-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <input
              id="calculator-text-input"
              type="text"
              value={estimate.config.text}
              onChange={(event) => updateText(event.target.value)}
              placeholder="НАЗВАНИЕ ВЫВЕСКИ"
              className="w-full bg-transparent pl-8 pr-4 py-2 text-xl font-black uppercase tracking-wider text-white placeholder:text-white/20 outline-none transition-all"
            />
          </div>
          
          <p className="mt-2.5 text-[10px] text-white/40 leading-relaxed">
            Будет отображаться на живом чертеже-превью ниже. Поддерживает кириллицу, латиницу и цифры.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Ширина, мм"
            type="number"
            min={100}
            value={estimate.config.widthMm}
            onChange={(event) => updateConfig('widthMm', Number(event.target.value))}
            className="rounded-2xl bg-white/[0.01] border-white/10 hover:border-white/20 focus:border-accent text-white"
          />
          <Input
            label="Высота, мм"
            type="number"
            min={100}
            value={estimate.config.heightMm}
            onChange={(event) => updateConfig('heightMm', Number(event.target.value))}
            className="rounded-2xl bg-white/[0.01] border-white/10 hover:border-white/20 focus:border-accent text-white"
          />
          <Input
            label="Глубина, мм"
            type="number"
            min={20}
            value={estimate.config.depthMm}
            onChange={(event) => updateConfig('depthMm', Number(event.target.value))}
            className="rounded-2xl bg-white/[0.01] border-white/10 hover:border-white/20 focus:border-accent text-white"
          />
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-black p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,245,160,0.06),transparent_60%)] pointer-events-none" />
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <p className="verge-mono-label text-accent flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Live industrial preview
            </p>
            <h3 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white md:text-5xl uppercase">
              {estimate.config.text || 'БУКВА'}
            </h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-right font-mono text-xs text-white/60">
            <div>{estimate.config.widthMm} x {estimate.config.heightMm} мм</div>
            <div>{getOptionLabel(lightingOptions, estimate.config.lighting)} / {getOptionLabel(materialOptions, estimate.config.materialTier)}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 relative z-10">
          {[
            { icon: Ruler, label: 'Символов', value: estimate.config.quantity },
            { icon: Layers, label: 'Формула', value: estimate.breakdown.formula },
            { icon: ShieldCheck, label: '902-ПП', value: estimate.config.needs902Audit ? 'проверка включена' : 'без проверки' },
            { icon: FileText, label: 'Snapshot', value: estimate.breakdown.sourceSnapshot.verifiedAt },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="min-h-24 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:bg-white/[0.05] hover:border-white/20">
                <Icon className="mb-3 h-4 w-4 text-accent" />
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">{item.label}</p>
                <p className="mt-1 line-clamp-2 text-xs font-bold text-white">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <OptionGroup title="Материал">
          {materialOptions.map((item) => (
            <ToggleCard
              key={item.id}
              active={estimate.config.materialTier === item.id}
              title={item.label}
              description={item.description}
              onClick={() => updateConfig('materialTier', item.id)}
            />
          ))}
        </OptionGroup>

        <OptionGroup title="Подсветка">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {lightingOptions.map((item) => (
              <SmallToggle
                key={item.id}
                active={estimate.config.lighting === item.id}
                label={item.label}
                onClick={() => updateConfig('lighting', item.id)}
              />
            ))}
          </div>
        </OptionGroup>
      </div>

      <OptionGroup title="Сложность шрифта">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {complexityOptions.map((item) => (
            <SmallToggle
              key={item.id}
              active={estimate.config.complexity === item.id}
              label={item.label}
              onClick={() => updateConfig('complexity', item.id)}
            />
          ))}
        </div>
      </OptionGroup>
    </div>
  );

  const renderServicesStep = () => (
    <div className="space-y-6">
      <OptionGroup title="Монтаж и срок">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {mountingOptions.map((item) => (
            <SmallToggle
              key={item.id}
              active={estimate.config.mounting === item.id}
              label={item.label}
              onClick={() => updateConfig('mounting', item.id)}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {urgencyOptions.map((item) => {
            const isActive = estimate.config.urgency === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateConfig('urgency', item.id)}
                className={`rounded-2xl border p-4 text-left transition-all duration-300 relative overflow-hidden group ${
                  isActive 
                    ? 'border-accent bg-accent/[0.04] shadow-[0_0_15px_rgba(0,245,160,0.1)]' 
                    : 'border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 bg-accent text-background px-3 py-1 rounded-bl-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Check className="h-3 w-3 stroke-[3]" />
                    Выбрано
                  </div>
                )}
                <span className={`block text-xs font-black uppercase tracking-wider ${isActive ? 'text-accent' : 'text-white'}`}>{item.label}</span>
                <span className={`mt-1 block text-xs ${isActive ? 'text-white/70' : 'text-white/40'}`}>{item.description}</span>
              </button>
            );
          })}
        </div>
      </OptionGroup>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <CheckOption
          checked={estimate.config.needs902Audit}
          label="Проверка по 902-ПП"
          onClick={() => updateConfig('needs902Audit', !estimate.config.needs902Audit)}
        />
        <CheckOption
          checked={estimate.config.needsDismantling}
          label="Нужен демонтаж старой вывески"
          onClick={() => updateConfig('needsDismantling', !estimate.config.needsDismantling)}
        />
        <CheckOption
          checked={estimate.config.highAccess}
          label="Высота / автовышка"
          onClick={() => updateConfig('highAccess', !estimate.config.highAccess)}
        />
      </div>

      <CalculatorHandoffPanel
        selectedKind={handoff.selectedKind}
        assets={handoff.assets}
        requirements={handoff.requirements}
        handoffStatus={handoff.handoffStatus}
        error={handoff.error}
        onKindChange={handoff.setSelectedKind}
        onFileChange={handoff.handleFileChange}
        onUploadAsset={handoff.uploadAsset}
        onRemoveAsset={handoff.removeAsset}
      />
    </div>
  );

  const renderQuoteStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {estimate.packages.map((pkg: QuotePackage) => (
          <button
            key={pkg.id}
            type="button"
            onClick={() => salesEngine.selectPackage(pkg.id)}
            className={`rounded-3xl border p-5 text-left transition-all ${getPackageTone(pkg, selectedPackage.id === pkg.id)}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-on-surface">{pkg.title}</h3>
                  {pkg.recommended && (
                    <span className="rounded-full bg-accent px-2 py-1 text-[9px] font-black uppercase tracking-wider text-on-accent">
                      выбор большинства
                    </span>
                  )}
                </div>
                <p
                  className="mt-2 text-3xl font-black tracking-[-0.04em] text-on-surface"
                  data-testid={`package-price-${pkg.id}`}
                >
                  {formatRub(pkg.price)}
                </p>
              </div>
              {selectedPackage.id === pkg.id && <Check className="h-5 w-5 text-accent" />}
            </div>

            <div className="mt-5 space-y-3">
              <div>
                <p className="verge-mono-label mb-2 text-on-surface-variant">Что входит</p>
                <ul className="space-y-2">
                  {pkg.included.map((line: string) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-accent" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="verge-mono-label mb-2 text-on-surface-variant">На что обратить внимание</p>
                <ul className="space-y-2">
                  {pkg.risks.map((line: string) => (
                    <li key={line} className="text-sm text-on-surface-variant">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-[28px] border border-outline bg-surface p-5">
        <p className="verge-mono-label mb-3 text-on-surface-variant">Логика выдачи</p>
        <p className="text-sm leading-relaxed text-on-surface-variant">
          Пакеты считаются из одной и той же расчетной базы. Отличается упаковка решения, уровень материалов,
          инженерное сопровождение и допустимый риск для проекта.
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="relative overflow-hidden rounded-[32px] border border-outline bg-surface shadow-elevation-2"
      data-surface={surface}
      data-step={currentStep}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:28px_28px] opacity-70" />
      <div className={`relative grid grid-cols-1 ${isCompact ? 'xl:grid-cols-[minmax(0,1fr)_320px]' : 'xl:grid-cols-[minmax(0,1fr)_400px]'}`}>
        <section className={`${isCompact ? 'p-5 md:p-6' : 'p-6 md:p-8'} space-y-6`}>
          {/* New Horizontal Progress Stepper */}
          <div className="w-full border-b border-outline pb-6 mb-6">
            <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:items-center md:justify-between md:gap-2">
              {stepOrder.map((stepId, index) => {
                const meta = stepMeta[stepId];
                const active = stepId === currentStep;
                const completed = getStepIndex(stepId) < stepIndex;
                return (
                  <div key={stepId} className="flex flex-1 items-center gap-3 min-w-[140px] md:min-w-0">
                    <button
                      key={stepId}
                      type="button"
                      onClick={() => goToStep(stepId)}
                      aria-label={`Шаг ${meta.index}: ${meta.title}`}
                      aria-current={active ? 'step' : undefined}
                      tabIndex={-1}
                      className="pointer-events-none cursor-default select-none outline-none border-none bg-transparent flex items-center gap-3 text-left"
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-black transition-all duration-300 ${
                        active
                          ? 'bg-accent text-background shadow-[0_0_15px_rgba(0,245,160,0.45)]'
                          : completed
                            ? 'bg-accent/10 text-accent border border-accent/30'
                            : 'bg-white/[0.03] text-white/30 border border-white/5'
                      }`}>
                        {completed ? <Check className="h-4.5 w-4.5 stroke-[2.5]" /> : meta.index}
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">Шаг {meta.index}</p>
                        <p className={`text-xs font-black transition-all duration-300 whitespace-nowrap ${
                          active ? 'text-accent' : completed ? 'text-white/80' : 'text-white/40'
                        }`}>
                          {meta.title}
                        </p>
                      </div>
                    </button>

                    {index < stepOrder.length - 1 && (
                      <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r mx-4 transition-all duration-300" style={{
                        backgroundImage: completed
                          ? 'linear-gradient(to right, rgb(0,245,160) 100%, rgb(0,245,160) 100%)'
                          : active
                            ? 'linear-gradient(to right, rgb(0,245,160) 30%, rgba(255,255,255,0.06) 100%)'
                            : 'linear-gradient(to right, rgba(255,255,255,0.06) 100%, rgba(255,255,255,0.06) 100%)'
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {resumeStatus === 'stale' && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4" data-testid="stale-recovery-banner">
              <p className="text-sm font-bold text-amber-900">Не удалось восстановить прошлую смету.</p>
              <p className="mt-1 text-sm text-amber-800">
                Мы открыли новый предварительный расчет по выбранному типу конструкции. Проверьте параметры перед сохранением setup в корзину.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={handleReviewParameters}>
                  Проверить параметры
                </Button>
                <Button type="button" onClick={handleStayOnQuote}>
                  Остаться в смете
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <p className="verge-mono-label text-accent">{isCompact ? 'Embedded configurator' : 'Quote configurator'}</p>
                  <h2 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-black tracking-tight text-on-surface`}>
                    {step.title}
                  </h2>
                </div>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant md:text-base">
                {step.body}
              </p>
            </div>
          </div>

          {currentStep === 'product' && renderProductStep()}
          {currentStep === 'geometry' && renderGeometryStep()}
          <div className={currentStep === 'services' ? 'block' : 'hidden'} aria-hidden={currentStep !== 'services'}>
            {renderServicesStep()}
          </div>
          {currentStep === 'quote' && renderQuoteStep()}

          <div className="flex flex-col gap-3 border-t border-outline pt-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={isFirstStep}
              className="rounded-2xl"
            >
              Назад
            </Button>
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                Шаг {stepIndex + 1} из {stepOrder.length}
              </p>
              {!isLastStep && (
                <Button
                  type="button"
                  onClick={goNext}
                  className="rounded-2xl bg-primary text-on-primary hover:bg-accent hover:text-on-accent"
                >
                  Далее
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </section>

        <aside className="border-t border-outline bg-background p-5 xl:p-6 xl:border-l xl:border-t-0">
          <div className="sticky top-28 space-y-5">
            <div>
              <p className="verge-mono-label text-accent">Предварительная смета</p>
              <div
                className="mt-2 text-[clamp(2.6rem,3.6vw,3.75rem)] font-black leading-none tracking-[-0.06em] text-on-surface whitespace-nowrap tabular-nums"
                data-testid="calculator-total"
              >
                {formatRub(selectedPackage.price)}
              </div>
              <p className="mt-2 text-sm text-on-surface-variant">
                Не является офертой. Финальная цена подтверждается после фото, замера и доступа к фасаду.
              </p>
            </div>

            <div className="rounded-3xl border border-outline bg-surface p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="verge-mono-label text-on-surface-variant">Активный пакет</p>
                  <p className="mt-1 text-lg font-black text-on-surface">{selectedPackage.title}</p>
                </div>
                <span className="rounded-full border border-outline bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Шаг {step.index}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {summaryItems.map((item, index) => {
                  const isWide = index === 0 || index === 3 || index === 4;
                  return (
                    <div
                      key={item.label}
                      className={`rounded-2xl border border-outline bg-background px-3 py-3 ${
                        isWide ? "col-span-2" : "col-span-1"
                      }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-on-surface leading-tight">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-outline bg-surface p-5">
              <p className="verge-mono-label mb-3 text-on-surface-variant">Breakdown</p>
              {[
                ['Производство', estimate.breakdown.productSubtotal],
                ['Материал', estimate.breakdown.materialModifier],
                ['Электрика', estimate.breakdown.powerSupply],
                ['Монтаж', estimate.breakdown.mounting],
                ['Демонтаж', estimate.breakdown.dismantling],
                ['Срочность', estimate.breakdown.urgency],
                ['902-ПП', estimate.breakdown.compliance],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-outline py-2 text-xs last:border-0">
                  <span className="text-on-surface-variant">{label}</span>
                  <span className="font-mono font-bold">{formatRub(Number(value))}</span>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-outline bg-surface p-5">
              <p className="verge-mono-label mb-3 text-on-surface-variant">Handoff readiness</p>
              <p className="text-sm font-bold text-on-surface">
                {draft.handoffStatus === 'ready' && 'Материалы готовы к review'}
                {draft.handoffStatus === 'collecting' && 'Материалы частично собраны'}
                {draft.handoffStatus === 'missing' && 'Не хватает материалов для review'}
              </p>
              <p className="mt-2 text-xs text-on-surface-variant">
                {draft.handoffRequirements.filter((item) => item.satisfied).length} / {draft.handoffRequirements.length} пунктов checklist закрыто
                {draft.handoffAssets.length > 0 ? ` · файлов: ${draft.handoffAssets.length}` : ''}
              </p>
            </div>

            {currentStep === 'quote' ? (
              <>
                <div className="rounded-3xl border border-outline bg-surface p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="verge-mono-label text-accent">Черновик заявки</p>
                      <p className="mt-2 text-sm font-bold text-on-surface">{draft.projectBrief}</p>
                    </div>
                    <span className="rounded-full border border-outline bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      {draft.stage === 'configured' && 'Настройка'}
                      {draft.stage === 'capture' && 'Сбор данных'}
                      {draft.stage === 'quoted' && 'Расчет цены'}
                      {draft.stage === 'carted' && 'В корзине'}
                      {draft.stage === 'submitted' && 'Заявка отправлена'}
                      {!['configured', 'capture', 'quoted', 'carted', 'submitted'].includes(draft.stage) && draft.stage}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {draft.capabilities.map((capability: CapabilityState) => {
                      const Icon = capabilityIcons[capability.id];
                      return (
                        <div key={capability.id} className="rounded-2xl border border-outline bg-background p-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-outline bg-surface">
                              <Icon className="h-4 w-4 text-accent" />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface">{capability.title}</p>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                                {capability.status === 'active' && 'Активен'}
                                {capability.status === 'coming-next' && 'В очереди'}
                                {capability.status === 'operator-reviewed' && 'На проверке'}
                                {capability.status === 'queued-manual-assist' && 'Очередь AI'}
                                {!['active', 'coming-next', 'operator-reviewed', 'queued-manual-assist'].includes(capability.status) && capability.status}
                              </p>
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-on-surface-variant">{capability.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleSaveToCart}
                  className="h-14 w-full rounded-2xl bg-primary text-on-primary hover:bg-accent hover:text-on-accent"
                >
                  {draft.cartItemId ? 'Сохранить setup' : 'Добавить setup в корзину'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {isSaved && (
                  <p className="text-center text-xs font-bold uppercase tracking-wider text-accent">
                    Setup сохранен в quote cart
                  </p>
                )}
              </>
            ) : (
              <div className="rounded-3xl border border-outline bg-surface p-5">
                <p className="verge-mono-label mb-3 text-accent">Следующий шаг</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Полный выбор пакета и сохранение setup доступны на шаге 4. До этого момента смета уже считается live,
                  но финальное решение лучше принимать после проверки сервисных условий.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => goToStep('quote')}
                  className="mt-4 w-full rounded-2xl"
                >
                  Перейти к смете
                </Button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function OptionGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-surface p-5">
      <h3 className="verge-mono-label mb-4 text-on-surface-variant">{title}</h3>
      {children}
    </div>
  );
}

function ToggleCard({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-2.5 last:mb-0 w-full rounded-2xl border p-4 text-left transition-all duration-300 relative overflow-hidden group ${
        active 
          ? 'border-accent bg-accent/[0.05] shadow-[0_0_15px_rgba(0,245,160,0.1)]' 
          : 'border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03]'
      }`}
    >
      {active && (
        <div className="absolute top-0 right-0 bg-accent text-background px-3 py-1 rounded-bl-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
          <Check className="h-3 w-3 stroke-[3]" />
          Активен
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
          active 
            ? 'bg-accent/20 text-accent' 
            : 'bg-white/[0.03] text-white/40 group-hover:text-white/80'
        }`}>
          {title.toLowerCase() === 'standard' && <Layers className="h-4 w-4" />}
          {title.toLowerCase() === 'premium' && <Sparkles className="h-4 w-4" />}
          {title.toLowerCase() === 'exclusive' && <ShieldCheck className="h-4 w-4" />}
        </div>
        
        <div>
          <span className={`block text-sm font-black transition-colors ${active ? 'text-accent' : 'text-white'}`}>
            {title}
          </span>
          <span className={`mt-0.5 block text-xs transition-colors ${active ? 'text-white/70' : 'text-white/40'}`}>
            {description}
          </span>
        </div>
      </div>
    </button>
  );
}

function SmallToggle({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border px-4 py-3 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
        active 
          ? 'border-accent bg-accent/[0.08] text-accent shadow-[0_0_15px_rgba(0,245,160,0.12)] scale-[0.98]' 
          : 'border-white/5 bg-white/[0.01] text-white/50 hover:border-white/20 hover:text-white hover:bg-white/[0.03]'
      }`}
    >
      {active && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-accent rounded-full animate-fade-in" />
      )}
      {label}
    </button>
  );
}

function CheckOption({ checked, label, onClick }: { checked: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-4.5 rounded-2xl border p-4 text-left transition-all duration-300 relative group overflow-hidden ${
        checked 
          ? 'border-accent bg-accent/[0.04] shadow-[0_0_15px_rgba(0,245,160,0.08)]' 
          : 'border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03]'
      }`}
    >
      <span className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
        checked 
          ? 'border-accent bg-accent text-background shadow-[0_0_8px_rgba(0,245,160,0.4)]' 
          : 'border-white/20 bg-black/40 group-hover:border-white/40'
      }`}>
        {checked && <Check className="h-3.5 w-3.5 stroke-[3.5]" />}
      </span>
      
      <span className={`text-xs font-black transition-colors ${checked ? 'text-accent' : 'text-white/70 group-hover:text-white'}`}>
        {label}
      </span>
    </button>
  );
}

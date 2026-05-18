"use client";

import { useMemo, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  Check,
  FileText,
  Layers,
  Ruler,
  ShieldCheck,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/store/useCartStore';
import { useCartDrawerStore } from '@/store/useCartDrawerStore';
import {
  calculateConfiguratorEstimate,
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
  type QuotePackageId,
} from '@/lib/pricingEngine';

interface CalculatorContainerProps {
  serviceId?: string;
}

const productOptions: { id: CalculatorProductType; label: string; description: string }[] = [
  { id: 'volumetric-letters', label: 'Объемные световые буквы', description: 'Расчет за сантиметр высоты и количество символов' },
  { id: 'lightbox', label: 'Световой короб', description: 'Расчет по площади, форме и подсветке' },
  { id: 'flex-neon', label: 'Гибкий неон', description: 'Расчет по длине контура, цвету и подложке' },
  { id: 'metal-letters', label: 'Нержавеющие буквы', description: 'Премиальная фасадная или интерьерная айдентика' },
  { id: 'pylon-signs', label: 'Стела / навигация', description: 'Проектная оценка инженерной конструкции' },
  { id: 'roof-installations', label: 'Крышная установка', description: 'Крупноформатный проект с инженерной проверкой' },
];

const segmentOptions: { id: BusinessSegment; label: string }[] = [
  { id: 'retail', label: 'Ритейл' },
  { id: 'horeca', label: 'HoReCa' },
  { id: 'clinic', label: 'Клиника' },
  { id: 'corporate', label: 'Офис / B2B' },
  { id: 'franchise', label: 'Франшиза' },
];

const materialOptions: { id: CalculatorMaterialTier; label: string; description: string }[] = [
  { id: 'standard', label: 'Standard', description: 'ПВХ, акрил, базовая гарантия' },
  { id: 'premium', label: 'Premium', description: 'Премиум акрил, усиленная электрика' },
  { id: 'exclusive', label: 'Exclusive', description: 'Металл, сложная отделка, расширенный ресурс' },
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

export function CalculatorContainer({ serviceId }: CalculatorContainerProps) {
  const searchParams = useSearchParams();
  const cartItemId = searchParams.get('cartItem');
  const { items, addItem, updateItem } = useCartStore();
  const { openDrawer } = useCartDrawerStore();
  const cartItem = cartItemId ? items.find((candidate) => candidate.id === cartItemId) : undefined;
  const cartConfig = cartItem?.metadata?.calculatorConfig;
  const [selectedPackageOverride, setSelectedPackageOverride] = useState<QuotePackageId | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [draftConfig, setDraftConfig] = useState<CalculatorConfig | null>(null);
  const config = draftConfig ?? cartConfig ?? {
    ...DEFAULT_CALCULATOR_CONFIG,
    productType: productFromService(serviceId),
  };
  const selectedPackageId = selectedPackageOverride ?? cartItem?.metadata?.selectedPackage?.id ?? 'business';

  const estimate = useMemo(() => calculateConfiguratorEstimate(config), [config]);
  const selectedPackage = estimate.packages.find((pkg) => pkg.id === selectedPackageId) ?? estimate.packages[1];
  const activeProduct = productOptions.find((item) => item.id === estimate.config.productType) ?? productOptions[0];

  const updateConfig = <K extends keyof CalculatorConfig>(key: K, value: CalculatorConfig[K]) => {
    setIsSaved(false);
    setDraftConfig((current) => ({
      ...(current ?? config),
      [key]: value,
    }));
  };

  const updateText = (text: string) => {
    setIsSaved(false);
    setDraftConfig((current) => ({
      ...(current ?? config),
      text,
      quantity: Math.max(1, text.replace(/\s/g, '').length),
    }));
  };

  const handleSaveToCart = () => {
    const id = cartItemId || `calc-${Date.now().toString(36)}`;
    const item = {
      id,
      type: 'custom' as const,
      name: activeProduct.label,
      price: selectedPackage.price,
      description: `${selectedPackage.title}: ${estimate.config.text}, ${estimate.config.widthMm}x${estimate.config.heightMm} мм`,
      metadata: {
        customDimensions: {
          width: estimate.config.widthMm,
          height: estimate.config.heightMm,
          depth: estimate.config.depthMm,
        },
        calculatorConfig: estimate.config,
        selectedPackage,
        priceBreakdown: estimate.breakdown,
        sourceSnapshotVersion: estimate.breakdown.sourceSnapshot.version,
        editUrl: `/calculator?cartItem=${id}`,
      },
    };

    if (cartItemId && items.some((candidate) => candidate.id === cartItemId)) {
      updateItem(cartItemId, item);
    } else {
      addItem(item);
    }
    setIsSaved(true);
    openDrawer();
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-outline bg-surface shadow-elevation-2">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:28px_28px] opacity-70" />
      <div className="relative grid grid-cols-1 xl:grid-cols-[340px_1fr_360px]">
        <aside className="border-b border-outline bg-surface/86 p-6 xl:border-b-0 xl:border-r">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <p className="verge-mono-label text-accent">Quote configurator</p>
              <h2 className="text-lg font-black tracking-tight">Параметры setup</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="verge-mono-label mb-3 block text-on-surface-variant">Тип конструкции</label>
              <div className="space-y-2">
                {productOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateConfig('productType', item.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition-all ${
                      estimate.config.productType === item.id
                        ? 'border-accent bg-accent/10'
                        : 'border-outline bg-background hover:border-accent/30'
                    }`}
                  >
                    <span className="block text-sm font-black text-on-surface">{item.label}</span>
                    <span className="mt-1 block text-xs text-on-surface-variant">{item.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="verge-mono-label mb-3 block text-on-surface-variant">Сегмент</label>
              <div className="grid grid-cols-2 gap-2">
                {segmentOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateConfig('businessSegment', item.id)}
                    className={`rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      estimate.config.businessSegment === item.id
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-outline bg-background text-on-surface-variant hover:border-primary/30'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="space-y-8 p-6 md:p-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Input
              label="Текст / бренд"
              value={estimate.config.text}
              onChange={(event) => updateText(event.target.value)}
              className="rounded-2xl bg-background text-lg font-black"
            />
            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Ширина, мм"
                type="number"
                min={100}
                value={estimate.config.widthMm}
                onChange={(event) => updateConfig('widthMm', Number(event.target.value))}
                className="rounded-2xl bg-background"
              />
              <Input
                label="Высота, мм"
                type="number"
                min={100}
                value={estimate.config.heightMm}
                onChange={(event) => updateConfig('heightMm', Number(event.target.value))}
                className="rounded-2xl bg-background"
              />
              <Input
                label="Глубина, мм"
                type="number"
                min={20}
                value={estimate.config.depthMm}
                onChange={(event) => updateConfig('depthMm', Number(event.target.value))}
                className="rounded-2xl bg-background"
              />
            </div>
          </div>

          <div className="rounded-[28px] border border-outline bg-black p-6 text-white shadow-2xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="verge-mono-label text-accent">Live industrial preview</p>
                <h3 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
                  {estimate.config.text || 'EXPOINT'}
                </h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-right font-mono text-xs text-white/60">
                <div>{estimate.config.widthMm} x {estimate.config.heightMm} мм</div>
                <div>{estimate.config.lighting} / {estimate.config.materialTier}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { icon: Ruler, label: 'Символов', value: estimate.config.quantity },
                { icon: Layers, label: 'Формула', value: estimate.breakdown.formula },
                { icon: ShieldCheck, label: '902-ПП', value: estimate.config.needs902Audit ? 'проверка включена' : 'без проверки' },
                { icon: FileText, label: 'Snapshot', value: estimate.breakdown.sourceSnapshot.verifiedAt },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="min-h-24 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
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

            <OptionGroup title="Сложность шрифта">
              <div className="grid grid-cols-3 gap-2">
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
              <div className="mt-3 grid grid-cols-2 gap-2">
                {urgencyOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateConfig('urgency', item.id)}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      estimate.config.urgency === item.id ? 'border-accent bg-accent/10' : 'border-outline bg-background'
                    }`}
                  >
                    <span className="block text-xs font-black uppercase tracking-wider">{item.label}</span>
                    <span className="mt-1 block text-xs text-on-surface-variant">{item.description}</span>
                  </button>
                ))}
              </div>
            </OptionGroup>
          </div>

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

          <div className="rounded-[28px] border border-dashed border-outline bg-background p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-outline bg-surface">
                  <Upload className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-black">Фото фасада и логотип</h3>
                  <p className="mt-1 max-w-xl text-sm text-on-surface-variant">
                    В MVP это presale-зона без загрузки файла: приложите фото на этапе заявки, инженер подтвердит монтажный доступ и финальную цену.
                  </p>
                </div>
              </div>
              <span className="verge-mono-label rounded-full border border-outline bg-surface px-3 py-1 text-on-surface-variant">
                Upload-ready
              </span>
            </div>
          </div>
        </section>

        <aside className="border-t border-outline bg-background p-6 xl:border-l xl:border-t-0">
          <div className="sticky top-28 space-y-5">
            <div>
              <p className="verge-mono-label text-accent">Предварительная смета</p>
              <div className="mt-2 text-4xl font-black tracking-[-0.05em] text-on-surface">
                {formatRub(selectedPackage.price)}
              </div>
              <p className="mt-2 text-sm text-on-surface-variant">
                Не является офертой. Финальная цена после проверки фото, замера и доступа к фасаду.
              </p>
            </div>

            <div className="space-y-3">
              {estimate.packages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackageOverride(pkg.id)}
                  className={`w-full rounded-3xl border p-5 text-left transition-all ${getPackageTone(pkg, selectedPackage.id === pkg.id)}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black">{pkg.title}</h3>
                        {pkg.recommended && (
                          <span className="rounded-full bg-accent px-2 py-1 text-[9px] font-black uppercase tracking-wider text-on-accent">
                            выбор большинства
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-2xl font-black text-on-surface">{formatRub(pkg.price)}</p>
                    </div>
                    {selectedPackage.id === pkg.id && <Check className="h-5 w-5 text-accent" />}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {pkg.included.slice(0, 3).map((line) => (
                      <li key={line} className="flex items-start gap-2 text-xs text-on-surface-variant">
                        <BadgeCheck className="mt-0.5 h-3.5 w-3.5 text-accent" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
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

            <Button
              type="button"
              onClick={handleSaveToCart}
              className="h-14 w-full rounded-2xl bg-primary text-on-primary hover:bg-accent hover:text-on-accent"
            >
              {cartItemId ? 'Сохранить setup' : 'Добавить setup в корзину'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {isSaved && (
              <p className="text-center text-xs font-bold uppercase tracking-wider text-accent">
                Setup сохранен в quote cart
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function OptionGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[28px] border border-outline bg-surface p-5">
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
      className={`mb-2 w-full rounded-2xl border p-4 text-left transition-all last:mb-0 ${
        active ? 'border-primary bg-primary text-on-primary' : 'border-outline bg-background hover:border-primary/30'
      }`}
    >
      <span className="block text-sm font-black">{title}</span>
      <span className={`mt-1 block text-xs ${active ? 'text-white/70' : 'text-on-surface-variant'}`}>{description}</span>
    </button>
  );
}

function SmallToggle({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-3 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
        active ? 'border-primary bg-primary text-on-primary' : 'border-outline bg-background text-on-surface-variant hover:border-primary/30'
      }`}
    >
      {label}
    </button>
  );
}

function CheckOption({ checked, label, onClick }: { checked: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
        checked ? 'border-accent bg-accent/10' : 'border-outline bg-surface'
      }`}
    >
      <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${checked ? 'border-accent bg-accent text-on-accent' : 'border-outline'}`}>
        {checked && <Check className="h-3.5 w-3.5" />}
      </span>
      <span className="text-sm font-bold text-on-surface">{label}</span>
    </button>
  );
}

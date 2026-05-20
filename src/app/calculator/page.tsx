import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, ShieldCheck, Sparkles } from 'lucide-react';
import PageShell from '@/components/framework/PageShell';
import { CalculatorContainer } from '@/components/calculator/CalculatorContainer';
import { MeshBackground } from '@/components/ui/MeshBackground';

export const metadata: Metadata = {
  title: 'Калькулятор-конфигуратор вывесок | БУКВА СВЕТ',
  description: 'Соберите рекламную конструкцию онлайн: объемные буквы, лайтбокс, гибкий неон, монтаж и проверка по 902-ПП. Получите 3 предварительных варианта сметы.',
};

const heroStats = [
  { label: 'Пакетов в выдаче', value: '3', note: 'Start / Business / Premium' },
  { label: 'Live расчет', value: 'сразу', note: 'Смета обновляется по параметрам' },
  { label: 'Проверка', value: '902-ПП', note: 'Отдельный сервисный контур' },
  { label: 'Сохранение', value: 'в корзину', note: 'Setup можно вернуться и править' },
] as const;

const heroSignals = [
  {
    icon: Calculator,
    title: 'Производственный расчет',
    text: 'Считаем не только цену, а инженерный setup с материалами, подсветкой и монтажной логикой.',
  },
  {
    icon: ShieldCheck,
    title: 'Согласование и доступ',
    text: 'Заранее учитываем 902-ПП, демонтаж, высотные работы и ограничения по фасаду.',
  },
  {
    icon: Sparkles,
    title: 'Готово к сделке',
    text: 'Выбранный пакет можно сохранить в quote cart и передать в дальнейшую обработку.',
  },
] as const;

export default function CalculatorPage() {
  return (
    <PageShell
      headerVariant="default"
      breadcrumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Калькулятор', href: '/calculator' },
      ]}
      showFooter
      withMesh
    >
      <section className="relative overflow-hidden bg-background px-6 pb-14 pt-16 md:pb-20 md:pt-24">
        <MeshBackground opacity={0.08} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(var(--accent-rgb),0.14),transparent_36%),radial-gradient(circle_at_top_right,rgba(var(--accent-rgb),0.08),transparent_30%),linear-gradient(to_bottom,rgba(0,0,0,0.16),transparent_55%)] opacity-90" />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:items-start">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Калькулятор-конфигуратор
                </span>
                <span className="verge-mono-label rounded-full border border-outline bg-background/70 px-3 py-2 text-on-surface-variant">
                  Live estimate / snapshot 2026-05-18
                </span>
              </div>

              <h1 className="max-w-4xl text-balance text-[clamp(3.15rem,6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-on-surface">
                Считайте вывеску как <span className="text-accent-warm">производственный</span> проект
              </h1>

              <p className="max-w-2xl text-lg leading-[1.7] text-on-surface-variant md:text-xl">
                Конфигуратор собирает предварительную смету по типу конструкции, материалам,
                подсветке, монтажному доступу и проверке по 902-ПП. Результат можно сразу
                сохранить в quote cart и вернуться к редактированию setup.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#calculator"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-accent/40 bg-accent px-6 text-sm font-bold uppercase tracking-[0.14em] text-on-accent shadow-[0_0_32px_rgba(0,245,160,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(0,245,160,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  Открыть калькулятор
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contacts"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-outline bg-surface/80 px-6 text-sm font-bold uppercase tracking-[0.14em] text-on-surface transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                >
                  Обсудить проект
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {heroStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-outline bg-surface/80 p-4 shadow-sm backdrop-blur-sm"
                  >
                    <p className="verge-mono-label text-on-surface-variant">{item.label}</p>
                    <p className="mt-2 text-[clamp(1.15rem,1.8vw,1.55rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-on-surface">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-accent/10 blur-3xl opacity-60" />
              <div className="relative overflow-hidden rounded-[32px] border border-outline bg-surface/90 p-6 shadow-elevation-2 backdrop-blur-2xl">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="max-w-xs">
                    <p className="verge-mono-label text-accent">Что получает клиент</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-on-surface">
                      Короткий, но полный контур расчета
                    </h2>
                  </div>
                  <span className="rounded-full border border-outline bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    3 пакета
                  </span>
                </div>

                <div className="space-y-3">
                  {heroSignals.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="group flex items-start gap-4 rounded-[24px] border border-outline bg-background/80 p-4 transition-colors duration-200 hover:border-accent/40"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-on-surface">{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-on-surface-variant">{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-outline bg-black px-4 py-4 text-white">
                    <p className="verge-mono-label text-accent">Live status</p>
                    <p className="mt-2 text-lg font-semibold tracking-tight text-white">Смета обновляется по каждому шагу</p>
                    <p className="mt-2 text-sm leading-6 text-white/65">
                      Без отдельной заявки, с понятной структурой и без скрытых допущений.
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-outline bg-surface px-4 py-4">
                    <p className="verge-mono-label text-on-surface-variant">Дальше в процессе</p>
                    <p className="mt-2 text-lg font-semibold tracking-tight text-on-surface">Сохранение в корзину и handoff</p>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                      Setup можно передать в заявку вместе с файлами, фото фасада и чеклистом.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-on-surface-variant">
            <span className="rounded-full border border-outline bg-surface/80 px-3 py-2">
              Производственная логика
            </span>
            <span className="rounded-full border border-outline bg-surface/80 px-3 py-2">
              902-ПП / монтаж / срочность
            </span>
            <span className="rounded-full border border-outline bg-surface/80 px-3 py-2">
              Quote cart compatible
            </span>
          </div>

          <Suspense fallback={<div className="rounded-3xl border border-outline bg-surface p-8 text-on-surface">Загрузка конфигуратора...</div>}>
            <CalculatorContainer surface="page" />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}

import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, ShieldCheck, Sparkles, Layers3, Radar, FileCheck2, ShoppingCart, Activity, Workflow } from 'lucide-react';
import PageShell from '@/components/framework/PageShell';
import { CalculatorContainer } from '@/components/calculator/CalculatorContainer';
import { MeshBackground } from '@/components/ui/MeshBackground';
import DesignProjectCTA from '@/components/sections/DesignProjectCTA';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Калькулятор-конфигуратор вывесок | БУКВА СВЕТ',
  description: 'Соберите рекламную конструкцию онлайн: объемные буквы, лайтбокс, гибкий неон, монтаж и проверка по 902-ПП. Получите 3 предварительных варианта сметы.',
};

const heroStats = [
  { label: 'Пакетов в выдаче', value: '3', note: 'Start / Business / Premium', icon: Layers3 },
  { label: 'Live расчет', value: 'сразу', note: 'Смета обновляется в процессе', icon: Radar },
  { label: 'Проверка', value: '902-ПП', note: 'Контур согласования включен', icon: FileCheck2 },
  { label: 'Сохранение', value: 'в корзину', note: 'Setup можно править позже', icon: ShoppingCart },
] as const;

const heroSignals = [
  {
    icon: Calculator,
    title: 'Производственный расчет',
    text: 'Не только цена: материалы, подсветка и монтаж в одном setup.',
  },
  {
    icon: ShieldCheck,
    title: 'Согласование и доступ',
    text: 'Сразу учитываем 902-ПП, демонтаж и ограничения по фасаду.',
  },
  {
    icon: Sparkles,
    title: 'Готово к сделке',
    text: 'Пакет сохраняется в quote cart и передается в handoff без потерь.',
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
      <main className="flex-1 bg-surface pb-24">
        <section className="relative overflow-hidden bg-black px-5 pb-12 pt-14 sm:px-6 sm:pb-14 sm:pt-16 lg:px-20 lg:pb-16 lg:pt-18">
          <div className="absolute inset-0 z-0">
            <Image
              src="/img/backgrounds/services-hero-bg.png"
              alt="Calculator architectural blueprint background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-surface" />
          </div>
          <div className="absolute inset-0 industrial-grid opacity-10 pointer-events-none" />
          <MeshBackground opacity={0.05} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(var(--accent-rgb),0.14),transparent_36%),radial-gradient(circle_at_top_right,rgba(var(--accent-rgb),0.08),transparent_30%),linear-gradient(to_bottom,rgba(0,0,0,0.16),transparent_55%)] opacity-90" />

          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:items-start lg:gap-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Калькулятор-конфигуратор
                  </span>
                  <span className="verge-mono-label rounded-full border border-outline bg-background/70 px-3 py-2 text-on-surface-variant">
                    Live estimate / snapshot 2026-05-18
                  </span>
                </div>

                <h1 className="max-w-4xl lg:max-w-[12ch] text-balance break-words text-[clamp(2.35rem,6vw,5.15rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white">
                  Считайте вывеску как <span className="text-accent [overflow-wrap:anywhere]">производственный</span> проект
                </h1>

                <p className="max-w-2xl text-base leading-7 text-neutral-200 md:text-lg">
                  Цель блока: за 2-3 минуты собрать инженерно корректную предварительную смету
                  и сразу передать ее в работу. Главный CTA: открыть калькулятор и запустить расчет.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="#calculator" className="geist-button-primary min-h-[52px] h-auto px-6 py-3 group">
                    <span className="text-center break-words leading-tight">Открыть калькулятор</span>
                    <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/contacts" className="geist-button-secondary min-h-[52px] h-auto px-6 py-3">
                    <span className="text-center break-words leading-tight">Обсудить проект</span>
                  </Link>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
                  {heroStats.map((item) => (
                    <div
                      key={item.label}
                      className="group relative overflow-hidden rounded-2xl border border-outline/25 bg-surface/35 p-3.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-[0_18px_40px_-24px_rgba(var(--accent-rgb),0.6)] motion-safe:animate-signal-breathe"
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(var(--accent-rgb),0.2),transparent_50%)]" />
                      <div className="relative flex items-start justify-between gap-3">
                        <p className="verge-mono-label text-neutral-400">{item.label}</p>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                          <item.icon className="h-3.5 w-3.5" />
                        </div>
                      </div>
                      <p className="relative mt-2 text-[clamp(1.15rem,1.8vw,1.55rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">{item.value}</p>
                      <p className="relative mt-1.5 text-sm leading-5 text-neutral-300">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-accent/10 blur-3xl opacity-60" />
                <div className="relative overflow-hidden rounded-[28px] border border-outline bg-surface/90 p-5 sm:p-6 shadow-elevation-2 backdrop-blur-2xl">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="max-w-xs">
                      <p className="verge-mono-label text-accent">Что получает клиент</p>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight text-on-surface sm:text-2xl">
                        Короткий, но полный контур расчета
                      </h2>
                    </div>
                    <span className="rounded-full border border-outline bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      3 пакета
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {heroSignals.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="group relative overflow-hidden flex items-start gap-3 rounded-[20px] border border-outline bg-background/80 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_18px_40px_-24px_rgba(var(--accent-rgb),0.6)]"
                        >
                          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(120deg,rgba(var(--accent-rgb),0.12),transparent_45%)]" />
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
                            <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                          </div>
                          <div className="min-w-0 relative">
                            <p className="text-sm font-semibold text-on-surface">{item.title}</p>
                            <p className="mt-1 text-sm leading-5 text-on-surface-variant">{item.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    <div className="group relative overflow-hidden rounded-[24px] border border-outline bg-black px-4 py-4 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-[0_18px_40px_-24px_rgba(var(--accent-rgb),0.6)]">
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(var(--accent-rgb),0.22),transparent_52%)]" />
                      <div className="relative flex items-center justify-between gap-3">
                        <p className="verge-mono-label text-accent">Live status</p>
                        <Activity className="h-4 w-4 text-accent motion-safe:animate-signal-heartbeat" />
                      </div>
                      <p className="relative mt-2 text-base font-semibold tracking-tight text-white sm:text-lg">Смета обновляется по каждому шагу</p>
                      <p className="relative mt-1.5 text-sm leading-5 text-white/65">
                        Без отдельной заявки и скрытых допущений.
                      </p>
                    </div>
                    <div className="group relative overflow-hidden rounded-[24px] border border-outline bg-surface px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_18px_40px_-26px_rgba(var(--accent-rgb),0.45)]">
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(120deg,rgba(var(--accent-rgb),0.08),transparent_42%)]" />
                      <div className="relative flex items-center justify-between gap-3">
                        <p className="verge-mono-label text-on-surface-variant">Дальше в процессе</p>
                        <Workflow className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                      <p className="relative mt-2 text-base font-semibold tracking-tight text-on-surface sm:text-lg">Сохранение в корзину и handoff</p>
                      <p className="relative mt-1.5 text-sm leading-5 text-on-surface-variant">
                        Setup передается в заявку с файлами и фото фасада.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="calculator" className="relative bg-surface pb-10 pt-24">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />
          <div className="section-container">
            <Suspense fallback={<div className="rounded-3xl border border-outline bg-surface p-8 text-on-surface">Загрузка конфигуратора...</div>}>
              <CalculatorContainer surface="page" />
            </Suspense>
          </div>
        </section>

        <DesignProjectCTA className="mt-12 mb-20" />
      </main>
    </PageShell>
  );
}

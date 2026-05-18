import { Suspense } from 'react';
import type { Metadata } from 'next';
import PageShell from '@/components/framework/PageShell';
import { CalculatorContainer } from '@/components/calculator/CalculatorContainer';
import { MeshBackground } from '@/components/ui/MeshBackground';

export const metadata: Metadata = {
  title: 'Калькулятор-конфигуратор вывесок | Expoint ADV',
  description: 'Соберите рекламную конструкцию онлайн: объемные буквы, лайтбокс, гибкий неон, монтаж и проверка по 902-ПП. Получите 3 предварительных варианта сметы.',
};

export default function CalculatorPage() {
  return (
    <PageShell
      headerVariant="default"
      breadcrumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Калькулятор', href: '/calculator' },
      ]}
      showFooter
      showAssistant
      withMesh
    >
      <section className="relative overflow-hidden bg-background px-6 pb-16 pt-28 md:pb-24 md:pt-36">
        <MeshBackground opacity={0.08} />
        <div className="section-container relative z-10">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div className="max-w-4xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-10 bg-accent" />
                <p className="verge-mono-label text-accent">
                  B2B quote configurator / snapshot 2026-05-18
                </p>
              </div>
              <h1 className="geist-display-2xl mb-8 text-on-surface">
                Соберите вывеску как <span className="text-accent-warm">инженерный setup</span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
                Конфигуратор считает предварительную смету по типу конструкции, материалам,
                подсветке, монтажному доступу и проверке по 902-ПП. Результат можно сохранить
                в quote cart и вернуться к редактированию setup.
              </p>
            </div>

            <div className="rounded-[28px] border border-outline bg-surface p-6 shadow-elevation-2">
              <p className="verge-mono-label mb-4 text-on-surface-variant">Что получит клиент</p>
              <div className="space-y-3 text-sm text-on-surface-variant">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  3 варианта сметы: Start / Business / Premium.
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  Прозрачный breakdown: производство, монтаж, срочность, 902-ПП.
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  Возможность изменить setup из корзины перед заявкой.
                </div>
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="rounded-3xl border border-outline bg-surface p-8 text-on-surface">Загрузка конфигуратора...</div>}>
            <CalculatorContainer />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}

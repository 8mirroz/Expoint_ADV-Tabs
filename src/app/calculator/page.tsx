import React from 'react';
import { CalculatorContainer } from '@/components/calculator/CalculatorContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Промышленный калькулятор вывесок | Expoint ADV',
  description: 'Рассчитайте стоимость изготовления объемных букв и наружной рекламы в режиме реального времени. Профессиональная конфигурация по стандартам Reklamastroy.',
};

import { MeshBackground } from '@/components/ui/MeshBackground';

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 relative overflow-hidden">
      <MeshBackground opacity={0.1} />
      <div className="section-container relative z-10 mb-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            <p className="text-primary verge-mono-label">
              Конфигурация в реальном времени
            </p>
          </div>
          <h1 className="geist-display-2xl text-on-surface mb-8">
            Соберите свою <span className="text-primary">Айдентику</span>
          </h1>
          <p className="text-on-surface-variant text-[18px] md:text-[22px] leading-relaxed max-w-2xl font-light">
            Проектируйте свою вывеску в реальном времени. Наш 3D-движок мгновенно рассчитывает стоимость с учетом материалов, сложности монтажа и требований 902-ПП.
          </p>
        </div>
      </div>
      
      <div className="section-container relative z-10">
        <CalculatorContainer />
      </div>
      
      <div className="section-container relative z-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-surface border border-outline rounded-2xl shadow-sm group hover:border-primary/20 transition-all">
          <h4 className="geist-display-sm !text-[16px] text-on-surface mb-3 uppercase">Точность расчета</h4>
          <p className="text-[14px] text-on-surface-variant leading-relaxed">Алгоритм базируется на актуальной стоимости материалов и нормо-часах производства.</p>
        </div>
        <div className="p-8 bg-surface border border-outline rounded-2xl shadow-sm group hover:border-primary/20 transition-all">
          <h4 className="geist-display-sm !text-[16px] text-on-surface mb-3 uppercase">Build Sheet</h4>
          <p className="text-[14px] text-on-surface-variant leading-relaxed">После завершения вы получите PDF-спецификацию для согласования внутри компании.</p>
        </div>
        <div className="p-8 bg-surface border border-outline rounded-2xl shadow-sm group hover:border-primary/20 transition-all">
          <h4 className="geist-display-sm !text-[16px] text-on-surface mb-3 uppercase">Прямая интеграция</h4>
          <p className="text-[14px] text-on-surface-variant leading-relaxed">Данные мгновенно передаются в производственный отдел для подтверждения сроков.</p>
        </div>
      </div>
    </main>
  );
}

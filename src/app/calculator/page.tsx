import React from 'react';
import { CalculatorContainer } from '@/components/calculator/CalculatorContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Промышленный калькулятор вывесок | Expoint ADV',
  description: 'Рассчитайте стоимость изготовления объемных букв и наружной рекламы в режиме реального времени. Профессиональная конфигурация по стандартам Reklamastroy.',
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="max-w-4xl">
          <p className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">
            Конфигурация в реальном времени
          </p>
          <h1 className="text-4xl md:text-6xl font-black font-outfit text-white mb-6 uppercase tracking-tighter leading-[0.9]">
            Соберите свою <span className="text-orange-500">Айдентику</span>
          </h1>
          <p className="text-slate-400 max-w-3xl text-base md:text-lg leading-relaxed">
            Проектируйте свою вывеску в реальном времени. Наш 3D-движок мгновенно рассчитывает стоимость с учетом материалов, сложности монтажа и требований 902-ПП.
          </p>
        </div>
      </div>
      
      <CalculatorContainer />
      
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-slate-900 bg-slate-900/20">
          <h4 className="text-white font-bold text-sm uppercase mb-2">Точность расчета</h4>
          <p className="text-xs text-slate-500">Алгоритм базируется на актуальной стоимости материалов и нормо-часах производства.</p>
        </div>
        <div className="p-6 border border-slate-900 bg-slate-900/20">
          <h4 className="text-white font-bold text-sm uppercase mb-2">Build Sheet</h4>
          <p className="text-xs text-slate-500">После завершения вы получите PDF-спецификацию для согласования внутри компании.</p>
        </div>
        <div className="p-6 border border-slate-900 bg-slate-900/20">
          <h4 className="text-white font-bold text-sm uppercase mb-2">Прямая интеграция</h4>
          <p className="text-xs text-slate-500">Данные мгновенно передаются в производственный отдел для подтверждения сроков.</p>
        </div>
      </div>
    </main>
  );
}

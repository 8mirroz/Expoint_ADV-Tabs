import React from 'react';
import Link from 'next/link';
import { SERVICES } from '@/data/services';
import { ArrowRight, Calculator } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Цены на изготовление наружной рекламы | Expoint ADV',
  description: 'Прозрачные цены на производство вывесок, объемных букв, световых коробов и стел. Базовые тарифы и расчет стоимости онлайн.',
};

export default function PricesPage() {
  return (
    <main className="pt-24 pb-16 bg-canvas text-white min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-manuka uppercase tracking-tight text-white mb-6">
            Тарифы и <span className="text-jelly-mint">Цены</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-polysans">
            Ознакомьтесь с базовыми ставками на наши услуги. Для точного расчета стоимости воспользуйтесь онлайн-калькулятором или свяжитесь с нашим инженером.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="group border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-jelly-mint/50 flex flex-col h-full"
            >
              <div className="mb-6 flex-grow">
                <h3 className="text-2xl font-bold font-polysans mb-3 text-white group-hover:text-jelly-mint transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {service.shortDescription}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start">
                      <span className="text-jelly-mint mr-2 mt-1 text-xs">▼</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-6 border-t border-white/10 mt-auto">
                <div className="flex items-baseline mb-6">
                  <span className="text-sm text-gray-400 mr-2">от</span>
                  <span className="text-4xl font-manuka text-white">{service.basePrice}</span>
                  <span className="text-jelly-mint ml-2 font-polysans text-sm">{service.priceUnit}</span>
                </div>
                
                <Link 
                  href={`/calculator?type=${service.id}`}
                  className="w-full flex items-center justify-center space-x-2 bg-jelly-mint/10 hover:bg-jelly-mint hover:text-canvas text-jelly-mint border border-jelly-mint px-6 py-3 font-polysans text-sm font-medium transition-all duration-300 uppercase tracking-wider"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Рассчитать</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 border border-white/10 bg-white/5 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h3 className="text-2xl font-bold text-white mb-2 font-polysans">Нужно готовое решение?</h3>
            <p className="text-gray-400">Перейдите в наш каталог стандартизированных пакетов для бизнеса.</p>
          </div>
          <Link 
            href="/catalog" 
            className="flex items-center space-x-2 bg-white text-canvas px-8 py-4 font-polysans uppercase font-bold text-sm hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            <span>В каталог пакетов</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

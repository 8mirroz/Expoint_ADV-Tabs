import React from 'react';
import { PRODUCT_PACKS } from '@/data/services';
import { ProductPackCard } from '@/components/ui/ProductPackCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Каталог готовых решений | Expoint ADV',
  description: 'Каталог стандартизированных рекламных решений (Product Packs) для бизнеса. Выберите готовый пакет с известной ценой.',
};

export default function CatalogPage() {
  return (
    <main className="pt-24 pb-16 bg-canvas text-white min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-manuka uppercase tracking-tight text-white mb-6">
            Пакетные <span className="text-jelly-mint">Решения</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-polysans mb-8">
            Готовые стандартизированные наборы для быстрого старта. Выбирайте пакет под свой сегмент и добавляйте в корзину для оформления заказа.
          </p>
          
          {/* Simple Segment Filter (Static for now, can be interactive later) */}
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 border border-jelly-mint bg-jelly-mint/10 text-jelly-mint font-polysans text-sm uppercase tracking-wider cursor-pointer">
              Все решения
            </span>
            <span className="px-4 py-2 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white font-polysans text-sm uppercase tracking-wider cursor-pointer transition-colors">
              HoReCa
            </span>
            <span className="px-4 py-2 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white font-polysans text-sm uppercase tracking-wider cursor-pointer transition-colors">
              Ритейл
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_PACKS.map((pack) => (
            <ProductPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </div>
    </main>
  );
}

'use client';

import React, { useState } from 'react';
import { ProductPack } from '@/data/services';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart, Check, Zap } from 'lucide-react';
import { ImageAccordion } from './ImageAccordion';

interface ProductPackCardProps {
  pack: ProductPack;
}

export function ProductPackCard({ pack }: ProductPackCardProps) {
  const [premiumLighting, setPremiumLighting] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  
  // Extract base price number from string like '25 000 ₽'
  const basePriceNum = parseInt(pack.priceStart.replace(/\D/g, ''), 10) || 0;
  
  // Premium lighting adds 25% to base price
  const finalPrice = premiumLighting ? Math.round(basePriceNum * 1.25) : basePriceNum;
  
  const isAdded = items.some(item => item.id === pack.id);

  const handleAddToCart = () => {
    if (isAdded) return;
    
    addItem({
      id: pack.id,
      type: 'pack',
      name: pack.name,
      price: finalPrice,
      description: pack.description,
      metadata: {
        premiumLighting
      }
    });
  };

  return (
    <div className={`group relative border flex flex-col h-full transition-all duration-500 bg-white/[0.02] backdrop-blur-sm overflow-hidden ${
      pack.isPopular ? 'border-jelly-mint shadow-[0_0_40px_-15px_rgba(111,255,233,0.2)]' : 'border-white/10 hover:border-white/20'
    }`}>
      {pack.isPopular && (
        <div className="absolute top-4 right-4 z-20 bg-jelly-mint text-canvas px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-neon">
          Хит продаж
        </div>
      )}

      {/* Accordion Header */}
      {pack.gallery && (
        <div className="p-2">
          <ImageAccordion items={pack.gallery} height="200px" />
        </div>
      )}
      
      <div className="p-8 pt-6 flex-grow flex flex-col">
        <div className="mb-6 flex-grow">
        <h3 className="text-2xl font-bold font-polysans mb-2 text-white">
          {pack.name}
        </h3>
        <p className="text-jelly-mint text-sm font-polysans mb-4">{pack.target}</p>
        <p className="text-gray-400 text-sm mb-6">
          {pack.description}
        </p>
        
        <ul className="space-y-3 mb-8">
          {pack.features.map((feature, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start">
              <Check className="w-4 h-4 text-jelly-mint mr-3 mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mini-Configurator */}
      <div className="bg-canvas p-4 mb-6 border border-white/5">
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={premiumLighting}
              onChange={() => setPremiumLighting(!premiumLighting)}
            />
            <div className={`w-10 h-6 bg-white/10 rounded-full shadow-inner transition-colors ${premiumLighting ? 'bg-jelly-mint/20' : ''}`}></div>
            <div className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform ${premiumLighting ? 'transform translate-x-4 bg-jelly-mint' : ''}`}></div>
          </div>
          <div className="ml-3">
            <span className={`text-sm font-polysans flex items-center ${premiumLighting ? 'text-white' : 'text-gray-400'}`}>
              <Zap className={`w-3 h-3 mr-1 ${premiumLighting ? 'text-jelly-mint' : ''}`} />
              Premium LED (+25%)
            </span>
          </div>
        </label>
      </div>
      
      <div className="pt-6 border-t border-white/10 mt-auto">
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-manuka text-white">{finalPrice.toLocaleString('ru-RU')}</span>
          <span className="text-jelly-mint ml-2 font-polysans text-sm">₽</span>
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full flex items-center justify-center space-x-2 px-6 py-3 font-polysans text-sm font-medium transition-all duration-300 uppercase tracking-wider ${
            isAdded 
              ? 'bg-white/10 text-white/50 cursor-not-allowed border border-transparent' 
              : 'bg-white text-canvas hover:bg-gray-200 border border-transparent'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>В корзине</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>В корзину</span>
            </>
          )}
        </button>
      </div>
    </div>
  </div>
  );
}

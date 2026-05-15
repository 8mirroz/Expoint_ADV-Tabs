"use client";

import { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { calculatePrice, getPriceRange } from '@/lib/pricingEngine';
import { SERVICES } from '@/data/services';

interface CalculatorContainerProps {
  serviceId?: string;
}

export function CalculatorContainer({ serviceId }: CalculatorContainerProps) {
  const [service, setService] = useState(serviceId && SERVICES.some(s => s.id === serviceId) ? serviceId : '');
  const [width, setWidth] = useState('1000');
  const [height, setHeight] = useState('500');
  const [depth, setDepth] = useState('100');
  const [result, setResult] = useState<{ min: number, max: number } | null>(null);
  const [addToCart, setAddToCart] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const { addItem } = useCartStore();

  const calculate = () => {
    if (!service) return;

    setIsCalculating(true);
    const serviceData = SERVICES.find(s => s.id === service);
    if (serviceData) {
      const dimensions = {
        width: parseInt(width) || 0,
        height: parseInt(height) || 0,
        depth: parseInt(depth) || 0
      };
      const priceRange = getPriceRange(service);
      setResult(priceRange);
    }
    setIsCalculating(false);
  };

  const handleAddToCart = () => {
    if (result) {
      const serviceData = SERVICES.find(s => s.id === service);
      if (serviceData) {
        const item = {
          id: serviceData.id,
          type: 'custom' as const,
          name: serviceData.title,
          price: result.min,
          description: serviceData.title,
          metadata: {
            customDimensions: {
              width: parseInt(width) || 0,
              height: parseInt(height) || 0,
              depth: parseInt(depth) || 0
            }
          }
        };
        addItem(item);
        setAddToCart(true);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block verge-mono-label mb-2">Тип конструкции</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full bg-surface border border-outline p-4 rounded-xl text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          >
            <option value="">Выберите тип</option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id} className="bg-surface text-on-surface">
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block verge-mono-label mb-2">Ширина (мм)</label>
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full bg-surface border-outline rounded-xl"
            />
          </div>
          <div>
            <label className="block verge-mono-label mb-2">Высота (мм)</label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-surface border-outline rounded-xl"
            />
          </div>
          <div>
            <label className="block verge-mono-label mb-2">Глубина (мм)</label>
            <Input
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="w-full bg-surface border-outline rounded-xl"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={calculate} className="geist-button-primary flex-1 h-14">
            Рассчитать
          </button>
          {result && (
            <button
              onClick={handleAddToCart}
              className="geist-button-secondary flex-1 h-14"
              disabled={!addToCart}
            >
              В корзину
            </button>
          )}
        </div>
      </div>

      {result && (
        <div className="p-8 bg-surface-variant/30 border border-outline rounded-2xl shadow-elevation-1">
          <h3 className="geist-display-sm !text-[18px] text-on-surface mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Результаты расчета
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="verge-mono-label">Ориентировочная стоимость:</p>
              <p className="geist-display-md font-bold text-primary">
                {result.min.toLocaleString('ru-RU')} - {result.max.toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <div className="space-y-1">
              <p className="verge-mono-label">Размер НДС:</p>
              <p className="geist-display-md text-on-surface">0 ₽</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
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
  const [service, setService] = useState('');
  const [width, setWidth] = useState('1000');
  const [height, setHeight] = useState('500');
  const [depth, setDepth] = useState('100');
  const [result, setResult] = useState<{ min: number, max: number } | null>(null);
  const [addToCart, setAddToCart] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const { addItem } = useCartStore();

  // Initialize with the provided serviceId if available
  useEffect(() => {
    if (serviceId && SERVICES.some(s => s.id === serviceId)) {
      setService(serviceId);
    }
  }, [serviceId]);

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
        // @ts-ignore - ignoring type mismatch for simplicity
        addCartItem(item);
        setAddToCart(true);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-mono text-gray-400 mb-2">Тип конструкции</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full bg-white/10 border border-white/30 p-4 rounded"
          >
            <option value="">Выберите тип</option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id} className="bg-canvas">
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">Ширина (мм)</label>
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">Высота (мм)</label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">Глубина (мм)</label>
            <Input
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Рассчитать
          </Button>
          {result && (
            <Button
              onClick={handleAddToCart}
              className="flex-1"
              disabled={!addToCart}
            >
              В корзину
            </Button>
          )}
        </div>
      </div>

      {result && (
        <div className="p-6 bg-white/10 border border-white/20">
          <h3 className="text-xl font-bold text-jelly-mint mb-4">Результаты расчета</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Ориентировочная стоимость:</p>
              <p className="text-2xl font-bold">
                {result.min.toLocaleString('ru-RU')} - {result.max.toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <div>
              <p className="text-gray-400">Размер НДС:</p>
              <p className="text-2xl font-bold">0 ₽</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
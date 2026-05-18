"use client";

import { Edit3, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { CartItem as CartItemType } from '@/store/useCartStore';

interface CartItemProps {
    item: CartItemType;
    onRemove: (id: string) => void;
    onEdit?: (id: string) => void;
}

export function CartItem({ item, onRemove, onEdit }: CartItemProps) {
    const selectedPackage = item.metadata?.selectedPackage;
    const calculatorConfig = item.metadata?.calculatorConfig;
    const salesStage = item.metadata?.salesStage;
    const projectBrief = item.metadata?.projectBrief;

    return (
        <div className="flex items-center justify-between p-5 bg-background border border-outline rounded-2xl transition-all hover:bg-background/80">
            <div className="flex-1 pr-4">
                <h3 className="font-bold text-base text-on-surface">{item.name}</h3>
                <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">{item.description}</p>
                {selectedPackage && (
                    <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                        <span className="rounded-full border border-outline bg-surface px-2.5 py-1">
                            Пакет: {selectedPackage.title}
                        </span>
                        {salesStage && (
                            <span className="rounded-full border border-outline bg-surface px-2.5 py-1">
                                Stage: {salesStage}
                            </span>
                        )}
                        <span className="rounded-full border border-outline bg-surface px-2.5 py-1">
                            Предварительная смета
                        </span>
                    </div>
                )}
                {projectBrief && (
                    <div className="mt-2 text-xs text-on-surface-variant">
                        {projectBrief}
                    </div>
                )}
                {calculatorConfig && (
                    <div className="mt-2 text-xs text-on-surface-variant">
                        {calculatorConfig.text} · {calculatorConfig.heightMm} мм · {calculatorConfig.lighting}
                    </div>
                )}
                {!!(item.metadata?.customDimensions) && (
                    <div className="text-xs font-bold text-on-surface-variant/60 mt-2 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 bg-outline-strong/40 rounded-full" />
                        <span>Размеры:{' '}
                            {(item.metadata.customDimensions as {width:number}).width} ×{' '}
                            {(item.metadata.customDimensions as {height:number}).height} ×{' '}
                            {(item.metadata.customDimensions as {depth:number}).depth} мм
                        </span>
                    </div>
                )}
                <span className="text-lg font-black text-accent mt-3 block font-sans">
                    {item.price?.toLocaleString('ru-RU')} ₽
                </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                {calculatorConfig && onEdit && (
                    <Button
                        onClick={() => onEdit(item.id)}
                        className="p-2.5 bg-transparent border border-outline hover:border-accent/40 text-on-surface-variant hover:text-accent hover:bg-accent/10 rounded-xl transition-all duration-200 shadow-xs"
                        aria-label="Изменить setup"
                    >
                        <Edit3 className="w-4 h-4" />
                    </Button>
                )}
                <Button
                    onClick={() => onRemove(item.id)}
                    className="p-2.5 bg-transparent border border-outline hover:border-accent/40 text-on-surface-variant hover:text-accent hover:bg-accent/10 rounded-xl transition-all duration-200 shadow-xs"
                    aria-label="Удалить товар"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}

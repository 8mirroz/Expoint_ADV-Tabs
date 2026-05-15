"use client";

import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { CartItem as CartItemType } from '@/store/useCartStore';

interface CartItemProps {
    item: CartItemType;
    onRemove: (id: string) => void;
}

export function CartItem({ item, onRemove }: CartItemProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/10 border border-white/20">
            <div className="flex-1">
                <h3 className="font-bold text-white">{item.name}</h3>
                <p className="text-gray-400">{item.description}</p>
                <p className="text-jelly-mint font-bold">{item.price?.toLocaleString('ru-RU')} ₽</p>
                {!!(item.metadata?.customDimensions) && (
                    <div className="text-sm text-gray-400 mt-2">
                        <p>Размеры: 
                            {(item.metadata.customDimensions as {width:number}).width}×
                            {(item.metadata.customDimensions as {height:number}).height}×
                            {(item.metadata.customDimensions as {depth:number}).depth} мм
                        </p>
                    </div>
                )}
            </div>
            <div className="flex items-center">
                <Button
                    onClick={() => onRemove(item.id)}
                    className="p-2 bg-red-500 hover:bg-red-600"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
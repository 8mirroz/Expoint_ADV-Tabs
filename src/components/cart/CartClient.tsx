"use client";

import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from './CartItem';

export function CartClient() {
    const { items, getTotal, getItemCount, removeItem, clearCart } = useCartStore();
    const [isCheckout, setIsCheckout] = useState(false);

    const total = getTotal();
    const itemCount = getItemCount();

    const handleRemoveItem = (id: string) => {
        removeItem(id);
    };

    const handleClearCart = () => {
        clearCart();
    };

    return (
        <div className="bg-white/5 border border-white/10 p-8">
            {items.length === 0 ? (
                <div className="text-center py-16">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-4">Корзина пуста</h3>
                    <p className="text-gray-400 mb-6">В вашей корзине пока нет товаров.</p>
                    <a
                        href="/catalog"
                        className="inline-block bg-jelly-mint text-canvas px-6 py-3 font-polysans font-bold hover:bg-jelly-mint/80 transition-colors"
                    >
                        Перейти в каталог
                    </a>
                </div>
            ) : (
                <>
                    <div className="space-y-6">
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onRemove={handleRemoveItem}
                            />
                        ))}

                        <div className="border-t border-white/20 pt-6 mt-8">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold">Итого: {total.toLocaleString('ru-RU')} ₽</span>
                                <div className="flex gap-4">
                                    <Button
                                        onClick={handleClearCart}
                                        className="bg-red-500 hover:bg-red-600"
                                    >
                                        Очистить корзину
                                    </Button>
                                    <a
                                        href="/checkout"
                                        className="inline-block bg-jelly-mint text-canvas px-6 py-3 font-polys1ans font-bold hover:bg-jelly-mint/80 transition-colors"
                                    >
                                        Оформить заказ
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
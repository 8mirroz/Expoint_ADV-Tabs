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
        <div className="bg-surface border border-outline p-8 md:p-10 rounded-3xl shadow-xs text-on-surface">
            {items.length === 0 ? (
                <div className="text-center py-16">
                    <ShoppingCart className="w-16 h-16 mx-auto text-on-surface-variant/30 mb-4" />
                    <h3 className="text-xl font-bold text-on-surface mb-2">Корзина пуста</h3>
                    <p className="text-on-surface-variant mb-6 text-sm">В вашей корзине пока нет выбранных товаров или услуг.</p>
                    <a
                        href="/catalog"
                        className="inline-block bg-primary hover:bg-accent text-on-primary hover:text-on-accent px-6 py-3 font-bold rounded-full transition-all shadow-xs"
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

                        <div className="border-t border-outline pt-6 mt-8">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <span className="text-xl font-black text-on-surface">
                                    Итого: <span className="text-accent">{total.toLocaleString('ru-RU')} ₽</span>
                                </span>
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <Button
                                        onClick={handleClearCart}
                                        className="flex-1 sm:flex-initial bg-transparent hover:bg-accent/10 text-accent border border-accent/20 hover:border-accent/40 font-bold rounded-full transition-all"
                                    >
                                        Очистить
                                    </Button>
                                    <a
                                        href="/checkout"
                                        className="flex-1 sm:flex-initial text-center bg-primary hover:bg-accent text-on-primary hover:text-on-accent px-6 py-3 font-bold rounded-full transition-all shadow-md hover:shadow-lg"
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
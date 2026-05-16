import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export function CartIndicator() {
    const { items } = useCartStore();
    const itemCount = items.reduce((total, item) => total + (item.quantity || 0), 0);

    return (
        <div className="relative">
            <button
                className="p-2 rounded-full hover:bg-surface/50 transition-colors"
                onClick={() => window.location.href = '/cart'}
            >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        {itemCount}
                    </span>
                )}
            </button>
        </div>
    );
}
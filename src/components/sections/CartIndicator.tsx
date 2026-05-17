import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export function CartIndicator() {
    const { items } = useCartStore();
    const itemCount = items.reduce((total, item) => total + (item.quantity || 0), 0);

    return (
        <div className="relative">
            <button
                className="relative h-9 w-9 flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white/90 transition-all duration-300 hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
                onClick={() => window.location.href = '/cart'}
                aria-label="Корзина"
            >
                <ShoppingCart className="w-[18px] h-[18px]" />
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        {itemCount}
                    </span>
                )}
            </button>
        </div>
    );
}
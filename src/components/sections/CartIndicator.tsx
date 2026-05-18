import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useCartDrawerStore } from '@/store/useCartDrawerStore';

export function CartIndicator() {
    const { items } = useCartStore();
    const { openDrawer } = useCartDrawerStore();
    const itemCount = items.reduce((total, item) => total + (item.quantity || 1), 0);

    return (
        <button
            className="group inline-flex h-[34px] items-center gap-2 rounded-full border border-white/[0.12] bg-[linear-gradient(180deg,rgba(10,10,10,0.82),rgba(16,16,16,0.76))] px-3 text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-px hover:border-accent/40 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_16px_rgba(0,245,160,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 active:scale-[0.97]"
            onClick={openDrawer}
            aria-label="Корзина"
        >
            <ShoppingCart className="h-[15px] w-[15px] shrink-0 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-[12px] font-semibold tracking-[-0.01em] tabular-nums">
                {itemCount}
            </span>
        </button>
    );
}

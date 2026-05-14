import { CartClient } from '@/components/cart/CartClient';

export const metadata = {
    title: 'Корзина | Expoint ADV',
    description: 'Ваша корзина товаров',
};

export default function CartPage() {
    return (
        <main className="pt-24 pb-16 bg-canvas text-white min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-manuka uppercase tracking-tight text-white mb-6">
                        Корзина <span className="text-jelly-mint">Товаров</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl font-polysans">
                        Ваши выбранные товары и услуги
                    </p>
                </header>

                <CartClient />
            </div>
        </main>
    );
}
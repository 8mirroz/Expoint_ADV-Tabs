import { CheckoutClient } from '@/components/checkout/CheckoutClient';

export const metadata = {
    title: 'Оформление заказа | Expoint ADV',
    description: 'Страница оформления заказа',
};

export default function CheckoutPage() {
    return (
        <main className="pt-24 pb-16 bg-canvas text-white min-h-screen">
            <div className="container mx-auto px-4 max-w-2xl">
                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-manuka uppercase tracking-tight text-white mb-6">
                        Оформление <span className="text-jelly-mint">Заказа</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl font-polysans">
                        Заполните контактные данные для оформления заказа
                    </p>
                </header>

                <CheckoutClient />
            </div>
        </main>
    );
}
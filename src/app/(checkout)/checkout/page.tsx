import { CheckoutClient } from '@/components/checkout/CheckoutClient';

export const metadata = {
    title: 'Оформление заказа | БУКВА СВЕТ',
    description: 'Страница оформления заказа',
};

export default function CheckoutPage() {
    return (
        <main className="pt-28 pb-20 bg-background text-on-surface min-h-screen">
            <div className="container mx-auto px-4 max-w-3xl">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black font-manuka uppercase tracking-tight text-on-surface mb-4">
                        Оформление <span className="text-accent-warm">Заказа</span>
                    </h1>
                    <p className="text-on-surface-variant text-base md:text-lg max-w-2xl">
                        Заполните контактные данные для оформления и расчета заказа
                    </p>
                </header>

                <CheckoutClient />
            </div>
        </main>
    );
}
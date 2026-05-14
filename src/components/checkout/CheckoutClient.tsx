"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import { submitOrder } from '@/app/api/orders/actions';
import { DeliveryCalendar } from './DeliveryCalendar';

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    address: string;
}

export const CheckoutClient = () => {
    const { items, getTotal } = useCartStore();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: ''
    });
    const [dates, setDates] = useState<{ readiness: Date; delivery: Date } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<{ success: boolean, message: string } | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitResult(null);

        try {
            const result = await submitOrder({
                ...formData,
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price || 0,
                    description: item.description || ''
                })),
                total: getTotal(),
                readinessDate: dates?.readiness,
                deliveryDate: dates?.delivery,
            });
            setSubmitResult(result);
        } catch (error) {
            console.error('Order submission error:', error);
            setSubmitResult({ success: false, message: 'Ошибка при отправке заказа' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Contact Info */}
                <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[32px] backdrop-blur-sm">
                    <h2 className="text-2xl font-black mb-8 uppercase tracking-tight text-white/90">Контактная информация</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Input
                            label="Имя"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            className="bg-white/5 border-white/10"
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className="bg-white/5 border-white/10"
                        />
                        <Input
                            label="Телефон"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            required
                            className="bg-white/5 border-white/10"
                        />
                        <Input
                            label="Компания"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="bg-white/5 border-white/10"
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[32px] backdrop-blur-sm">
                    <h2 className="text-2xl font-black mb-8 uppercase tracking-tight text-white/90">Адрес доставки</h2>
                    <Input
                        label="Укажите точный адрес для доставки или монтажа"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                        className="bg-white/5 border-white/10"
                    />
                </div>

                {/* Delivery Calendar */}
                <DeliveryCalendar onDateChange={setDates} />

                {/* Order Summary */}
                <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[32px] backdrop-blur-sm">
                    <h3 className="text-2xl font-black mb-8 uppercase tracking-tight text-white/90">Ваш заказ</h3>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl transition-all hover:bg-white/[0.04]">
                                <div>
                                    <h4 className="font-bold text-lg text-white">{item.name}</h4>
                                    <p className="text-sm text-white/40">{item.description}</p>
                                </div>
                                <div className="font-black text-xl text-indigo-400">
                                    {item.price?.toLocaleString('ru-RU')} ₽
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col items-end">
                            <p className="text-sm text-white/40 uppercase font-bold tracking-widest mb-1">Итого к оплате</p>
                            <p className="text-4xl font-black text-white">{getTotal().toLocaleString('ru-RU')} ₽</p>
                        </div>
                    </div>
                </div>

                {submitResult && (
                    <div className={cn(
                        "p-6 rounded-2xl border text-center font-bold",
                        submitResult.success ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"
                    )}>
                        {submitResult.message}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-20 rounded-2xl text-xl font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <span className="flex items-center gap-3">
                        {isSubmitting ? 'Обработка...' : 'Подтвердить заказ'}
                        {!isSubmitting && (
                            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        )}
                    </span>
                </Button>
            </form>
        </div>
    );
};
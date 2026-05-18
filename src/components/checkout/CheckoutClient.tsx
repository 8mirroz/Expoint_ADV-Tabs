"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import { DeliveryCalendar } from './DeliveryCalendar';
import { createExpointSalesEngine, useSalesEngineStore, type CapabilityState } from '@/lib/salesEngine';

export const CheckoutClient = () => {
    const { items, getTotal } = useCartStore();
    const salesDraft = useSalesEngineStore((state) => state.draft);
    const salesEngine = createExpointSalesEngine();
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
            const result = await salesEngine.submit({
                ...formData,
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
            <form onSubmit={handleSubmit} className="space-y-8 text-on-surface">
                {/* Contact Info */}
                <div className="bg-surface border border-outline p-8 rounded-3xl shadow-xs">
                    <h2 className="text-2xl font-black mb-8 uppercase tracking-tight text-on-surface">Контактная информация</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Имя"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                        />
                        <Input
                            label="Телефон"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            required
                        />
                        <Input
                            label="Компания"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="bg-surface border border-outline p-8 rounded-3xl shadow-xs">
                    <h2 className="text-2xl font-black mb-6 uppercase tracking-tight text-on-surface">Адрес доставки</h2>
                    <Input
                        label="Укажите точный адрес для доставки или монтажа"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                    />
                </div>

                {/* Delivery Calendar */}
                <DeliveryCalendar onDateChange={setDates} />

                {/* Order Summary */}
                <div className="bg-surface border border-outline p-8 rounded-3xl shadow-xs">
                    <div className="mb-6 rounded-2xl border border-outline bg-background p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">Статус автоматизации</p>
                                <p className="mt-2 text-sm font-bold text-on-surface">{salesDraft.projectBrief}</p>
                            </div>
                            <span className="rounded-full border border-outline bg-surface px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                                {salesDraft.stage === 'configured' && 'Настройка'}
                                {salesDraft.stage === 'capture' && 'Сбор данных'}
                                {salesDraft.stage === 'quoted' && 'Расчет цены'}
                                {salesDraft.stage === 'carted' && 'В корзине'}
                                {salesDraft.stage === 'submitted' && 'Заявка отправлена'}
                                {!['configured', 'capture', 'quoted', 'carted', 'submitted'].includes(salesDraft.stage) && salesDraft.stage}
                            </span>
                        </div>
                        <div className="mt-4 grid gap-2 md:grid-cols-2">
                            {salesDraft.capabilities.map((capability: CapabilityState) => (
                                <div key={capability.id} className="rounded-2xl border border-outline bg-surface px-3 py-3">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface">{capability.title}</p>
                                    <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                                        {capability.status === 'active' && 'Активен'}
                                        {capability.status === 'coming-next' && 'В очереди'}
                                        {capability.status === 'operator-reviewed' && 'На проверке'}
                                        {capability.status === 'queued-manual-assist' && 'Очередь AI'}
                                        {!['active', 'coming-next', 'operator-reviewed', 'queued-manual-assist'].includes(capability.status) && capability.status}
                                    </p>
                                    <p className="mt-2 text-xs text-on-surface-variant">{capability.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 className="text-2xl font-black mb-3 uppercase tracking-tight text-on-surface">Ваш расчет</h3>
                    <p className="mb-8 text-sm text-on-surface-variant">
                        Корзина фиксирует предварительную смету. Финальная стоимость подтверждается инженером после фото, замера и проверки монтажного доступа.
                    </p>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-5 bg-background border border-outline rounded-2xl transition-all hover:bg-background/80">
                                <div>
                                    <h4 className="font-bold text-base text-on-surface">{item.name}</h4>
                                    <p className="text-xs text-on-surface-variant mt-1">{item.description}</p>
                                    {item.metadata?.selectedPackage && (
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-accent mt-2">
                                            Пакет: {item.metadata.selectedPackage.title} · Snapshot {item.metadata.sourceSnapshotVersion}
                                        </p>
                                    )}
                                </div>
                                <div className="font-black text-lg text-accent-warm font-sans shrink-0 ml-4">
                                    {item.price?.toLocaleString('ru-RU')} ₽
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-outline pt-6 mt-6 flex flex-col items-end">
                            <p className="text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-1">Итого к оплате</p>
                            <p className="text-3xl font-black text-on-surface">{getTotal().toLocaleString('ru-RU')} ₽</p>
                        </div>
                    </div>
                </div>

                {submitResult && (
                    <div className={cn(
                        "p-5 rounded-2xl border text-center font-bold text-sm uppercase tracking-wider",
                        submitResult.success ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700" : "bg-red-500/10 border-red-500/20 text-red-700"
                    )}>
                        {submitResult.message}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-full text-base font-bold uppercase tracking-widest bg-primary hover:bg-accent text-on-primary hover:text-on-accent transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
                >
                    {isSubmitting ? 'Обработка...' : 'Подтвердить заказ'}
                    {!isSubmitting && (
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    )}
                </Button>
            </form>
        </div>
    );
};

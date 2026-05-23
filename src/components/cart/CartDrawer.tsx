"use client";

import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, Palette, Layers, Ruler, RotateCcw, ShieldCheck, Clock } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useCartDrawerStore } from '@/store/useCartDrawerStore';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CartDrawer() {
  const { locale } = useLanguage();
  const router = useRouter();
  const { items, getTotal, removeItem, clearCart } = useCartStore();
  const { isOpen, closeDrawer } = useCartDrawerStore();

  const total = getTotal();
  const itemCount = items.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    closeDrawer();
    router.push('/checkout');
  };

  const handleEditSetup = (id: string) => {
    closeDrawer();
    router.push(`/calculator?cartItem=${encodeURIComponent(id)}`);
  };

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 240 }}
            className="relative w-full max-w-md h-full bg-zinc-950 border-l border-white/[0.08] shadow-[-20px_0_50px_rgba(0,0,0,0.8)] flex flex-col z-10 text-white overflow-hidden"
          >
            {/* Mesh Atmospheric Background Glow */}
            <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-[0.12] pointer-events-none filter blur-[100px] bg-gradient-to-tr from-[#00ffa3] via-transparent to-[#7928ca] z-0" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] opacity-[0.06] pointer-events-none filter blur-[80px] bg-gradient-to-br from-[#00ffa3] to-transparent z-0" />

            {/* Header */}
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between relative z-10 bg-zinc-950/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00ffa3]/10 border border-[#00ffa3]/20 text-[#00ffa3]">
                  <ShoppingBag className="w-4.5 h-4.5" />
                </div>
                <h2 className="text-lg font-headline font-bold uppercase tracking-wider text-white">
                  {locale === 'ru' ? 'Корзина' : 'Cart'}
                </h2>
                {itemCount > 0 && (
                  <span className="bg-[#00ffa3]/10 text-[#00ffa3] border border-[#00ffa3]/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-[0_0_15px_rgba(0,255,163,0.15)]">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-accent group"
                aria-label="Закрыть корзину"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 relative z-10 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 relative overflow-hidden">
                  {/* Subtle grid background for empty state */}
                  <div className="absolute inset-0 z-0 opacity-[0.02] bg-[url('/img/patterns/grid.svg')] bg-[length:24px_24px] pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00ffa3]/5 rounded-full filter blur-3xl pointer-events-none" />

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="w-20 h-20 bg-white/[0.02] border border-white/[0.06] rounded-full flex items-center justify-center mb-6 relative z-10 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
                  >
                    <ShoppingBag className="w-9 h-9 text-neutral-600 animate-pulse" />
                  </motion.div>
                  
                  <h3 className="text-xl font-headline font-bold text-white mb-2 relative z-10 uppercase tracking-tight">
                    {locale === 'ru' ? 'Ваша корзина пуста' : 'Your cart is empty'}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-[280px] mb-8 leading-relaxed relative z-10">
                    {locale === 'ru'
                      ? 'Добавьте премиальные вывески, пакетные услуги или инжиниринг-расчеты из каталога, чтобы начать.'
                      : 'Add premium signage, service packs, or engineering calculations from the catalog.'}
                  </p>
                  
                  <button
                    onClick={closeDrawer}
                    className="relative group overflow-hidden rounded-full bg-white hover:bg-white/95 text-black font-bold uppercase tracking-wider text-[11px] px-8 h-12 flex items-center justify-center gap-2 transition-all active:scale-[0.98] z-10 shadow-lg"
                  >
                    <span>{locale === 'ru' ? 'Продолжить покупки' : 'Continue Shopping'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => {
                    const isDesignProject = item.id.includes('design') || item.name.toLowerCase().includes('дизайн') || item.name.toLowerCase().includes('проект');
                    const isPack = item.type === 'pack';
                    const calculatorConfig = item.metadata?.calculatorConfig;
                    const selectedPackage = item.metadata?.selectedPackage;
                    const salesStage = item.metadata?.salesStage;
                    const projectBrief = item.metadata?.projectBrief;
                    const handoffStatus = item.metadata?.handoffStatus;
                    const handoffAssets = Array.isArray(item.metadata?.handoffAssets) ? item.metadata.handoffAssets : [];
                    
                    return (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        className="group relative p-5 bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.12] rounded-xl flex gap-4 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                      >
                        {/* Visual Icon / Frame */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/[0.02] border border-white/[0.08] text-neutral-400 transition-all duration-300 group-hover:bg-[#00ffa3]/5 group-hover:border-[#00ffa3]/20 group-hover:text-[#00ffa3]">
                          {isDesignProject ? (
                            <Palette className="h-5 w-5" />
                          ) : isPack ? (
                            <Layers className="h-5 w-5" />
                          ) : (
                            <ShoppingBag className="h-5 w-5" />
                          )}
                        </div>

                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-headline font-bold text-sm text-white tracking-tight leading-snug">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="text-neutral-500 hover:text-[#00ffa3] p-1.5 rounded-lg hover:bg-[#00ffa3]/10 border border-transparent hover:border-[#00ffa3]/10 transition-all shrink-0"
                              title={locale === 'ru' ? 'Удалить' : 'Remove'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          {item.description && (
                            <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed font-sans line-clamp-2">
                              {item.description}
                            </p>
                          )}

                          {selectedPackage && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              <span className="rounded-full border border-[#00ffa3]/20 bg-[#00ffa3]/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#00ffa3]">
                                {selectedPackage.title}
                              </span>
                              {salesStage && (
                                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                                  {salesStage}
                                </span>
                              )}
                              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                                Quote setup
                              </span>
                              {handoffStatus && (
                                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                                  Handoff {handoffStatus}
                                </span>
                              )}
                            </div>
                          )}

{projectBrief && (
                             <p className="mt-3 text-[11px] leading-relaxed text-neutral-400">
                               {projectBrief}
                             </p>
                           )}

                          {item.metadata?.capabilities && (
                             <div className="mt-3 grid grid-cols-2 gap-2">
                               {(item.metadata.capabilities as Array<{ id: string; title: string; status: string; description: string }>).map((cap) => {
                                 const tone = cap.status === 'active'
                                   ? 'border-[#00ffa3]/20 bg-[#00ffa3]/5'
                                   : cap.status === 'operator-reviewed'
                                     ? 'border-emerald-300/20 bg-emerald-300/5'
                                     : cap.status === 'queued-manual-assist'
                                       ? 'border-cyan-400/20 bg-cyan-400/5'
                                       : 'border-white/8 bg-white/2';
                                 return (
                                   <div key={cap.id} className={`rounded-lg border px-2.5 py-1.5 ${tone}`}>
                                     <p className="text-[9px] font-bold uppercase tracking-wider text-white/80">{cap.title}</p>
                                     <p className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">{cap.status}</p>
                                   </div>
                                 );
                               })}
                             </div>
                          )}

                          {handoffStatus && (
                            <div className="mt-3 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-2 text-[10px] font-mono text-neutral-350">
                              {handoffStatus === 'ready' ? 'Материалы готовы к review' : handoffStatus === 'collecting' ? 'Материалы частично собраны' : 'Не хватает материалов для review'}
                              {handoffAssets.length > 0 ? ` · файлов: ${handoffAssets.length}` : ''}
                            </div>
                          )}

                          {calculatorConfig && (
                            <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-450">
                              <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1">
                                {calculatorConfig.text}
                              </span>
                              <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1">
                                {calculatorConfig.heightMm} мм / {calculatorConfig.lighting}
                              </span>
                              <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1">
                                Монтаж: {calculatorConfig.mounting}
                              </span>
                              <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1">
                                902-ПП: {calculatorConfig.needs902Audit ? 'да' : 'нет'}
                              </span>
                            </div>
                          )}

                          {/* Display Custom Dimensions if they exist */}
                          {!!(item.metadata?.customDimensions) && (
                            <div className="mt-3 flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] font-mono text-neutral-450 w-fit">
                              <Ruler className="w-3 h-3 text-[#00ffa3]" />
                              <span>
                                {locale === 'ru' ? 'Габариты: ' : 'Size: '}
                                {(item.metadata.customDimensions as { width: number }).width} × {' '}
                                {(item.metadata.customDimensions as { height: number }).height} × {' '}
                                {(item.metadata.customDimensions as { depth: number }).depth} мм
                              </span>
                            </div>
                          )}

                          <div className="mt-4 flex items-center justify-between border-t border-white/[0.04] pt-3">
                            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">
                              {item.type === 'pack' ? (locale === 'ru' ? 'Пакет услуг' : 'Package') : (locale === 'ru' ? 'Индивидуальный расчет' : 'Bespoke Item')}
                            </span>
                            <span className="font-bold text-base text-[#00ffa3] font-sans tracking-tight">
                              {item.price?.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>

                          {calculatorConfig && (
                            <button
                              type="button"
                              onClick={() => handleEditSetup(item.id)}
                              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[#00ffa3]/20 bg-[#00ffa3]/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#00ffa3] transition-all hover:border-[#00ffa3]/40 hover:bg-[#00ffa3]/10"
                            >
                              Изменить setup
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/[0.08] bg-zinc-950/80 backdrop-blur-md space-y-5 relative z-10">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                {/* Cost breakdown */}
                <div className="space-y-2.5 text-xs text-neutral-400 pt-1 font-sans">
                  <div className="flex justify-between items-center">
                    <span>{locale === 'ru' ? 'Услуги и производство' : 'Services & Production'}</span>
                    <span className="font-mono text-white">{(total * 0.85).toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{locale === 'ru' ? 'Инженерный расчет и проект' : 'Engineering & Project'}</span>
                    <span className="font-mono text-white">{(total * 0.15).toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-neutral-500">
                    <span>{locale === 'ru' ? 'НДС (УСН / патентная ставка)' : 'VAT (Simplified)'}</span>
                    <span className="font-mono">0%</span>
                  </div>
                </div>

                <div className="border-t border-white/[0.06] pt-4 flex items-baseline justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {locale === 'ru' ? 'Итого к оплате:' : 'Total amount:'}
                  </span>
                  <span className="text-3xl font-bold tracking-tight text-white font-sans">
                    {total.toLocaleString('ru-RU')} <span className="text-xl text-[#00ffa3]">₽</span>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  {/* Reset */}
                  <button
                    onClick={clearCart}
                    className="relative col-span-1 group overflow-hidden rounded-full border border-white/[0.08] hover:border-[#00ffa3]/30 hover:bg-[#00ffa3]/5 text-neutral-450 hover:text-[#00ffa3] text-[11px] font-bold uppercase tracking-wider transition-all h-[52px] flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover:-rotate-45 duration-300 text-neutral-500 group-hover:text-[#00ffa3]" />
                    <span>{locale === 'ru' ? 'Сброс' : 'Clear'}</span>
                  </button>
                  
                  {/* Checkout */}
                  <button
                    onClick={handleCheckout}
                    className="relative col-span-2 group overflow-hidden rounded-full bg-white hover:bg-white/95 text-black font-bold uppercase tracking-wider text-[11px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] h-[52px] shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  >
                    {/* Rotating Conic Gradient on Hover */}
                    <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: 'conic-gradient(from 0deg, transparent 30%, #00ffa3 45%, #7928ca 55%, transparent 70%)',
                          }}
                    />
                    {/* Solid inner core masking the center of the gradient */}
                    <span className="absolute inset-[1.5px] rounded-full bg-white group-hover:bg-white/95 z-0 transition-colors pointer-events-none" />
                    
                    <span className="relative z-10 flex items-center gap-2 text-black">
                      {locale === 'ru' ? 'Оформить заказ' : 'Checkout'}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
                    </span>
                  </button>
                </div>

                {/* Trust & Guarantee Panel */}
                <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-500 font-sans pt-1">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00ffa3]" />
                    <span>Премиум БУКВА СВЕТ</span>
                  </div>
                  <span className="h-1 w-1 rounded-full bg-neutral-700" />
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00ffa3]" />
                    <span>Расчет сметы: 30м</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

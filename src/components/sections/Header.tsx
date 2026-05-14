"use client";
import { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight, Sparkles, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { CartIndicator } from '@/components/sections/CartIndicator';

const navItems = [
  { id: 'services', label: { ru: 'Производство', be: 'Вытворчасць', kk: 'Өндіріс', en: 'Production', zh: '生产', ce: 'Кхоллам', tt: 'Җитештерү' } },
  { id: 'audit', label: { ru: 'Аудит', be: 'Аўдыт', kk: 'Аудит', en: 'Audit', zh: '审计', ce: 'Аудит', tt: 'Аудит' } },
  { id: 'process', label: { ru: 'Процесс', be: 'Працэс', kk: 'Процесс', en: 'Process', zh: '流程', ce: 'Процесс', tt: 'Процесс' } },
  { id: 'cases', label: { ru: 'Кейсы', be: 'Кейсы', kk: 'Кейстер', en: 'Cases', zh: '案例', ce: 'Кхинсаш', tt: 'Кейслар' } },
  { id: 'footer', label: { ru: 'Контакты', be: 'Кантакты', kk: 'Байланыс', en: 'Contact', zh: '联系', ce: 'Байланыш', tt: 'Контактлар' } },
] as const;

const copy = {
  requestAudit: { ru: 'Запросить аудит', be: 'Запытаць аудыт', kk: 'Аудитті сұрау', en: 'Request Audit', zh: '申请审计', ce: 'Аудит деха', tt: 'Аудит сорау' },
  openMenu: { ru: 'Открыть меню', be: 'Адкрыць меню', kk: 'Мәзірді ашу', en: 'Open menu', zh: '打开菜单', ce: 'Меню дIайаккха', tt: 'Менюны ачу' },
  closeMenu: { ru: 'Закрыть меню', be: 'Закрыць меню', kk: 'Мәзірді жабу', en: 'Close menu', zh: '关闭菜单', ce: 'Меню дIаяккха', tt: 'Менюны ябу' },
  callUs: { ru: 'Связаться с нами', be: 'Звязацца з намі', kk: 'Бізбен байланысыңыз', en: 'Contact us', zh: '联系我们', ce: 'Тхуна деза', tt: 'Безнең белән элемтәгә керегез' }
};

export default function Header({ variant = 'default' }: { variant?: 'default' | 'immersive' }) {
  const { locale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isImmersive = variant === 'immersive';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-outline py-0 shadow-lg'
          : 'bg-background/40 backdrop-blur-sm border-b border-outline/10 py-2'
        }`}
    >
      <div className="section-container px-4">
        <div className="flex items-center justify-between transition-all duration-300 ease-in-out relative w-full py-2">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 group relative z-10 shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-headline text-xl lg:text-2xl font-black uppercase tracking-tight text-on-surface leading-none">
                EXPOINT <span className="text-primary">ADV</span>
              </span>
              <div className="hidden xs:flex items-center gap-3">
                <div className="w-[1px] h-4 bg-outline/20" />
                <span className="text-[8px] lg:text-[9px] uppercase tracking-[0.3em] font-mono opacity-40">Engineering</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="verge-mono-label text-[11px] uppercase tracking-widest text-on-surface/80 transition-all duration-200 hover:text-primary hover:tracking-[0.15em]"
              >
                {item.label[locale]}
              </a>
            ))}
          </nav>

          {/* Actions Section */}
          <div className="hidden lg:flex items-center gap-8 relative z-10">
            <div className="flex flex-col items-end">
              <a
                href="tel:+74950000000"
                className="flex items-center gap-2 text-[14px] font-black transition-colors font-mono text-on-surface hover:text-primary group"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>+7 (495) 000-00-00</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <CartIndicator />
              <button
                onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2.5 bg-primary border border-primary text-on-primary font-mono font-bold uppercase tracking-[1px] text-[10px] rounded-[var(--radius-4)] transition-all hover:bg-transparent hover:text-primary flex items-center gap-2 active:scale-95"
              >
                {copy.requestAudit[locale]}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Fixed Top Right Corner Switcher Placeholder or Container */}
          <div className="fixed top-6 right-6 z-[60] hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Toggle & Phone */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="tel:+74950000000"
              className="flex items-center gap-2 px-2 py-2 rounded-lg bg-surface/50 border border-outline/10 text-on-surface transition-all active:scale-95"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="font-mono text-[10px] font-bold tracking-tighter">+7 495 000-0000</span>
            </a>
            <CartIndicator />
            <button
              className={`p-2 rounded-[var(--radius-4)] transition-all ${isScrolled
                ? 'bg-surface border border-outline'
                : 'bg-surface/50 border border-outline/20'
                }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? copy.closeMenu[locale] : copy.openMenu[locale]}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-on-surface" /> : <Menu className="w-6 h-6 text-on-surface" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-3xl z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 top-0 h-[85vh] bg-surface z-50 shadow-2xl lg:hidden flex flex-col p-8 rounded-b-[2rem] border-b border-outline/20"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl font-black text-on-primary text-lg">EX</div>
                  <div className="flex flex-col">
                    <span className="font-headline font-bold text-lg uppercase tracking-tighter">Expoint</span>
                    <span className="text-[8px] font-bold tracking-[0.3em] uppercase opacity-40 leading-none">Engineering</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center bg-secondary/50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-6 mb-auto overflow-y-auto pb-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-black uppercase tracking-tight text-on-surface hover:text-accent transition-all flex items-center justify-between group"
                  >
                    <span>{item.label[locale]}</span>
                    <div className="h-[2px] flex-grow mx-4 bg-outline/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    <ArrowRight className="w-6 h-6 text-accent" />
                  </motion.a>
                ))}
              </div>

              <div className="pt-8 border-t border-outline/20 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-2xl">
                    <span className="text-[9px] font-black uppercase tracking-widest text-on-surface/30 block mb-2">{copy.callUs[locale]}</span>
                    <a href="tel:+74950000000" className="text-sm font-black text-on-surface font-mono">+7 495 000-0000</a>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-2xl flex flex-col justify-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-on-surface/30 block mb-2">Language</span>
                    <LanguageSwitcher />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-primary text-on-primary px-8 py-5 rounded-full font-black uppercase tracking-widest text-[11px] shadow-xl shadow-primary/10 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                >
                  {copy.requestAudit[locale]}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

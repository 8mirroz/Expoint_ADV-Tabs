"use client";
import { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { CartIndicator } from '@/components/sections/CartIndicator';

const navItems = [
  { id: 'services', href: '/services', label: { ru: 'Услуги', be: 'Паслугі', kk: 'Қызметтер', en: 'Services', zh: '服务', ce: 'ГIуллакхаш', tt: 'Хезмәтләр' } },
  { id: 'prices', href: '/prices', label: { ru: 'Цены', be: 'Цэны', kk: 'Бағалар', en: 'Prices', zh: '价格', ce: 'Баьхнаш', tt: 'Бәяләр' } },
  { id: 'cases', href: '/cases', label: { ru: 'Кейсы', be: 'Кейсы', kk: 'Кейстер', en: 'Cases', zh: '案例', ce: 'Кхинсаш', tt: 'Кейслар' } },
  { id: 'about', href: '/about', label: { ru: 'О нас', be: 'Пра нас', kk: 'Біз туралы', en: 'About', zh: '关于', ce: 'Тхуьга дуьйцу', tt: 'Без турында' } },
  { id: 'contacts', href: '/contacts', label: { ru: 'Контакты', be: 'Кантакты', kk: 'Байланыс', en: 'Contact', zh: '联系', ce: 'Байланыш', tt: 'Контактлар' } },
] as const;

const copy = {
  requestAudit: { ru: 'Запросить аудит', be: 'Запытаць аудыт', kk: 'Аудитті сұрау', en: 'Request Audit', zh: '申请审计', ce: 'Аудит деха', tt: 'Аудит сорау' },
  openMenu: { ru: 'Открыть меню', be: 'Адкрыць меню', kk: 'Мәзірді ашу', en: 'Open menu', zh: '打开菜单', ce: 'Меню дIайаккха', tt: 'Менюны ачу' },
  closeMenu: { ru: 'Закрыть меню', be: 'Закрыць меню', kk: 'Мәзірді жабу', en: 'Close menu', zh: '关闭菜单', ce: 'Меню дIаяккха', tt: 'Менюны ябу' },
  callUs: { ru: 'Связаться с нами', be: 'Звязацца з намі', kk: 'Бізбен байланысыңыз', en: 'Contact us', zh: '联系我们', ce: 'Тхуна деза', tt: 'Безнең белән элемтәгә керегез' }
};

export default function Header({ variant = 'default' }: { variant?: 'default' | 'immersive' }) {
  const { locale } = useLanguage();
  const pathname = usePathname();
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
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-outline shadow-sm'
          : 'bg-background/0 border-b border-transparent'
        }`}
    >
      <div className="section-container h-full px-6">
        <div className="flex items-center justify-between h-full relative w-full">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group relative z-10 shrink-0">
            <span className="font-sans text-[22px] font-semibold tracking-[-1.1px] text-on-surface leading-none">
              Expoint <span className="text-primary-light font-normal">Adv</span>
            </span>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-[1px] h-3 bg-outline" />
              <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider">Engineering</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full text-[14px] transition-all duration-200 ${
                    isActive 
                      ? 'text-primary font-medium' 
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50'
                  }`}
                >
                  {item.label[locale]}
                </Link>
              );
            })}
          </nav>

          {/* Actions Section */}
          <div className="hidden lg:flex items-center gap-6 relative z-10">
            <a
              href="tel:+74950000000"
              className="text-[14px] text-on-surface-variant hover:text-on-surface transition-colors font-sans"
            >
              +7 (495) 000-00-00
            </a>

            <div className="flex items-center gap-3">
              <CartIndicator />
              <button
                onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
                className="geist-button-primary geist-button-sm px-4 h-9 text-[13px] rounded-[6px]"
              >
                {copy.requestAudit[locale]}
              </button>
            </div>
            
            <div className="flex items-center h-8 gap-2 px-2 border border-outline rounded-[6px] bg-surface">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Toggle & Actions */}
          <div className="lg:hidden flex items-center gap-4">
            <CartIndicator />
            <button
              className="p-1.5 rounded-[6px] border border-outline bg-surface transition-all active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? copy.closeMenu[locale] : copy.openMenu[locale]}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                  <motion.div key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl font-black uppercase tracking-tight transition-all flex items-center justify-between group ${
                        pathname === item.href ? 'text-primary' : 'text-on-surface hover:text-primary'
                      }`}
                    >
                      <span>{item.label[locale]}</span>
                      <div className="h-[2px] flex-grow mx-4 bg-outline/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </Link>
                  </motion.div>
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

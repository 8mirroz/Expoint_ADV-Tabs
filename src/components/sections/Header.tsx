"use client";
import { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import Link from 'next/link';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? 'py-3 xl:py-4' : isImmersive ? 'py-6 xl:py-10' : 'py-5 xl:py-8'
      }`}
    >
      <div className="section-container">
        <div
          className={`flex items-center justify-between transition-all duration-700 ease-in-out relative ${
            isScrolled
              ? 'bg-surface/80 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl px-6 py-3 border border-outline/50 rounded-2xl'
              : 'bg-transparent px-2 py-2'
          }`}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 group relative z-10">
            <div className="relative overflow-hidden w-12 h-12 bg-primary flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-premium">
              <span className="font-headline font-black text-on-primary text-2xl tracking-tighter">EX</span>
              <div className="absolute inset-0 bg-linear-to-tr from-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Sparkles className="absolute top-1 right-1 w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="font-headline text-2xl font-black uppercase tracking-tight text-on-surface leading-none">
                Expoint <span className="text-accent">ADV</span>
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-px w-4 bg-accent/30" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 text-on-surface leading-none">Engineering</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-2 p-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="relative px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 text-on-surface/60 hover:text-on-surface group"
              >
                <span className="relative z-10">{item.label[locale]}</span>
                <span className="absolute inset-0 bg-secondary/0 rounded-xl group-hover:bg-secondary/50 transition-colors" />
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform duration-300" />
              </a>
            ))}
          </nav>

          {/* Actions Section */}
          <div className="hidden xl:flex items-center gap-8 relative z-10">
            <div className="flex flex-col items-end">
              <a
                href="tel:+74950000000"
                className="flex items-center gap-2 text-sm font-black transition-colors font-mono text-on-surface hover:text-accent group"
              >
                <Phone className="w-3.5 h-3.5 text-accent group-hover:rotate-12 transition-transform" />
                <span>+7 (495) 000-00-00</span>
              </a>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1 h-1 rounded-full bg-success animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface/40">Online Support</span>
              </div>
            </div>

            <div className="h-10 w-px bg-outline/20" aria-hidden="true" />

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <button
                onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative overflow-hidden group px-8 py-4 bg-primary text-on-primary font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {copy.requestAudit[locale]}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="xl:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className={`p-3.5 rounded-2xl transition-all active:scale-90 ${
                isScrolled 
                  ? 'bg-secondary/50 text-on-surface' 
                  : 'bg-surface/50 text-on-surface border border-outline/30 backdrop-blur-md'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? copy.closeMenu[locale] : copy.openMenu[locale]}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              className="fixed inset-0 bg-background/80 backdrop-blur-2xl z-40 xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[85%] max-w-md bg-surface z-50 shadow-2xl xl:hidden flex flex-col p-10"
            >
              <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-2xl font-black text-on-primary text-xl">EX</div>
                  <div className="flex flex-col">
                    <span className="font-headline font-bold text-xl uppercase tracking-tighter">Expoint</span>
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">Engineering</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-secondary rounded-2xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-8 mb-auto">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-black uppercase tracking-tighter text-on-surface hover:text-accent transition-all flex items-center justify-between group"
                  >
                    <span>{item.label[locale]}</span>
                    <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-8 group-hover:translate-x-0 transition-all text-accent" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-16 pt-16 border-t border-outline/30 space-y-10">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface/30">{copy.callUs[locale]}</span>
                    <LanguageSwitcher />
                  </div>
                  <a href="tel:+74950000000" className="text-3xl font-black text-on-surface hover:text-accent transition-colors font-mono">
                    +7 (495) 000-00-00
                  </a>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40">Available for orders</span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-primary text-on-primary px-8 py-6 rounded-2xl font-black uppercase tracking-widest text-[13px] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-accent"
                >
                  {copy.requestAudit[locale]}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

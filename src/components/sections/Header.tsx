"use client";
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

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
};

export default function Header({ variant = 'default' }: { variant?: 'default' | 'immersive' }) {
  const { locale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isImmersive = variant === 'immersive';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2 xl:py-3' : isImmersive ? 'py-3 xl:py-5' : 'py-4 xl:py-6'
      }`}
    >
      <div className="section-container">
        <div
          className={`flex items-center justify-between border transition-all duration-500 ${
            isScrolled
              ? 'border-outline bg-surface/80 px-4 py-2.5 shadow-premium backdrop-blur-2xl'
              : isImmersive
                ? 'border-outline/30 bg-surface/20 px-4 py-3 shadow-premium backdrop-blur-xl'
                : 'bg-surface/70 backdrop-blur-md border-outline/60 px-4 py-3.5'
          }`}
        >
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-accent flex items-center justify-center font-black text-on-accent text-xl">EX</div>
            <div className="font-headline text-lg xl:text-xl font-black uppercase tracking-tighter text-on-surface">
              Expoint <span className="text-accent">ADV</span>
            </div>
          </div>

          <nav className={`hidden xl:flex items-center gap-1 overflow-hidden px-2 py-1.5 border border-outline/30 bg-surface/40 backdrop-blur-md`}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-2 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background text-on-surface-variant hover:text-accent hover:bg-secondary"
              >
                {item.label[locale]}
              </a>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <a
              href="tel:+74950000000"
              className="text-sm font-bold transition-colors font-mono whitespace-nowrap text-on-surface hover:text-accent"
            >
              +7 (495) 000-00-00
            </a>

            <div className="h-8 w-px shrink-0 bg-outline/40" aria-hidden="true" />

            <div className="flex items-center gap-3 shrink-0">
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 font-black uppercase tracking-widest text-[10px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent bg-accent hover:bg-accent/90 text-on-accent hover:-translate-y-0.5 hover:shadow-neon"
              >
                {copy.requestAudit[locale]}
              </button>
            </div>
          </div>

          <div className="xl:hidden flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className="p-2 text-on-surface border border-outline/70 bg-surface/70 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? copy.closeMenu[locale] : copy.openMenu[locale]}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-40 overflow-y-auto xl:hidden ${
              isImmersive ? 'bg-background/96 backdrop-blur-3xl' : 'bg-surface/98 backdrop-blur-3xl'
            }`}
          >
            <div className="px-8 py-24 flex flex-col min-h-screen">
              <div className="flex flex-col gap-8 grow">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-black uppercase tracking-tighter text-on-surface hover:text-accent transition-colors"
                  >
                    {item.label[locale]}
                  </motion.a>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-12 border-t border-outline/30 flex flex-col gap-8"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/60">Связаться с нами</span>
                  <a href="tel:+74950000000" className="text-2xl font-black text-on-surface hover:text-accent transition-colors font-mono">
                    +7 (495) 000-00-00
                  </a>
                </div>
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-accent text-white px-8 py-5 font-black uppercase tracking-widest text-[12px] transition-all w-full text-center hover:bg-primary"
                >
                  {copy.requestAudit[locale]}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

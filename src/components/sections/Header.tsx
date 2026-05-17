"use client";

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import Link from 'next/link';
import { CartIndicator } from '@/components/sections/CartIndicator';

const navItems = [
  { id: 'services', href: '/services', label: { ru: 'Услуги', be: 'Паслугі', kk: 'Қызметтер', en: 'Services', zh: '服务', ce: 'ГIуллакхаш', tt: 'Хезмәтләр' } },
  { id: 'prices', href: '/prices', label: { ru: 'Цены', be: 'Цэны', kk: 'Бағалар', en: 'Prices', zh: '价格', ce: 'Баьхнаш', tt: 'Бәяләр' } },
  { id: 'cases', href: '/cases', label: { ru: 'Кейсы', be: 'Кейсы', kk: 'Кейстер', en: 'Cases', zh: '案例', ce: 'Кхинсаш', tt: 'Кейслар' } },
  { id: 'about', href: '/about', label: { ru: 'О нас', be: 'Пра нас', kk: 'Біз туралы', en: 'About', zh: '关于', ce: 'Тхуьга дуьйцу', tt: 'Без турында' } },
  { id: 'contacts', href: '/contacts', label: { ru: 'Контакты', be: 'Кантакты', kk: 'Байланыс', en: 'Contact', zh: '联系', ce: 'Байланыш', tt: 'Контактлар' } },
] as const;

const copy = {
  requestAudit: { ru: 'Заказать', be: 'Заказаць', kk: 'Тапсырыс беру', en: 'Order', zh: '订购', ce: 'Деха', tt: 'Заказ итү' },
  openMenu: { ru: 'Открыть меню', be: 'Адкрыць меню', kk: 'Мәзірді ашу', en: 'Open menu', zh: '打开菜单', ce: 'Меню дIайаккха', tt: 'Менюны ачу' },
  closeMenu: { ru: 'Закрыть меню', be: 'Закрыць меню', kk: 'Мәзірді жабу', en: 'Close menu', zh: '关闭菜单', ce: 'Меню дIаяккха', tt: 'Менюны ябу' },
  callUs: { ru: 'Связаться с нами', be: 'Звязацца з намі', kk: 'Бізбен байланысыңыз', en: 'Contact us', zh: '联系我们', ce: 'Тхуна деза', tt: 'Безнең белән элемтәгә керегез' },
  directLine: { ru: 'Прямая линия', be: 'Прамая лінія', kk: 'Тікелей желі', en: 'Direct line', zh: '直连线路', ce: 'Нийсса лини', tt: 'Туры линия' },
  language: { ru: 'Язык', be: 'Мова', kk: 'Тіл', en: 'Language', zh: '语言', ce: 'Мотт', tt: 'Тел' },
  telegram: { ru: 'Telegram', be: 'Telegram', kk: 'Telegram', en: 'Telegram', zh: 'Telegram', ce: 'Telegram', tt: 'Telegram' },
  whatsapp: { ru: 'WhatsApp', be: 'WhatsApp', kk: 'WhatsApp', en: 'WhatsApp', zh: 'WhatsApp', ce: 'WhatsApp', tt: 'WhatsApp' },
};

const PHONE_LABEL = '+7 (495) 000-00-00';
const PHONE_HREF = 'tel:+74950000000';

const contactActions = [
  {
    id: 'telegram',
    href: 'https://t.me/expoint_adv',
    labelKey: 'telegram',
    icon: Send,
    brandColor: 'var(--brand-telegram)',
    softGlow: 'rgba(38, 165, 228, 0.3)',
  },
  {
    id: 'whatsapp',
    href: 'https://wa.me/74950000000',
    labelKey: 'whatsapp',
    icon: MessageCircle,
    brandColor: 'var(--brand-whatsapp)',
    softGlow: 'rgba(37, 211, 102, 0.28)',
  },
] as const;

// Framer Motion Variants for Staggered Mobile Menu
const menuVariants: Variants = {
  hidden: { y: '-100%', opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.05,
      delayChildren: 0.1
    } 
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring' as const, damping: 20, stiffness: 100 }
  }
};

export default function Header({ variant = 'default' }: { variant?: 'default' | 'immersive' }) {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    // Trigger once on mount to avoid hydration mismatch if already scrolled
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const desktopHeaderShell = isScrolled
    ? 'h-[4.5rem] border-b border-[color:rgba(120,120,120,0.08)] bg-[#0A0A0A]/80 backdrop-blur-xl'
    : `h-[5.5rem] bg-transparent border-transparent`;

  // Unified transparent pill for the top menu
  const desktopNavShell = isScrolled
    ? 'border-white/[0.08] bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
    : 'border-white/[0.12] bg-white/[0.04] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]';

  return (
    <header
      data-variant={variant}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${desktopHeaderShell}`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo (flex-1 for perfect centering of nav) */}
        <div className="relative z-10 flex flex-1 items-center justify-start">
          <Link href="/" className="group rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary animate-fade-in">
            <div className="flex flex-col items-start gap-1">
              <span
                className="text-[1.22rem] font-semibold leading-none tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-primary sm:text-[1.4rem]"
                style={{ fontFamily: 'var(--font-header)' }}
              >
                Expoint <span className="font-medium text-white/70">Adv</span>
              </span>
              <span
                className="hidden sm:block text-[10px] font-medium uppercase leading-none tracking-[0.22em] text-white/55 transition-colors duration-300 group-hover:text-white/75"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Engineering
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Premium Desktop Pill Navigation (Unified Transparent) */}
        <div className="relative z-10 hidden xl:flex shrink-0 items-center justify-center">
          <nav className={`flex items-center rounded-full border p-1.5 transition-all duration-500 ${desktopNavShell}`}>
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group relative rounded-full px-5 py-2.5 text-[15px] font-semibold tracking-[-0.01em] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary"
                  style={{ fontFamily: 'var(--font-header)' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full border border-white/[0.12] bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${
                    isActive 
                      ? 'text-white'
                      : 'text-white/60 group-hover:text-white'
                  }`}>
                    {item.label[locale]}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions Section (flex-1 for perfect centering) */}
        <div className="relative z-10 hidden items-center justify-end gap-2.5 lg:flex flex-1 xl:gap-3">

          {/* Language Switcher — minimal pill style */}
          <LanguageSwitcher />

          {/* Cart Icon */}
          <CartIndicator />

          {/* Login/Registration Button — pill style matching nav */}
          <button
            type="button"
            className="hidden xl:inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.04] px-5 text-[13px] font-semibold tracking-[-0.01em] text-white/90 transition-all duration-300 hover:-translate-y-px hover:bg-white/[0.1] hover:text-white active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-primary"
            style={{ fontFamily: 'var(--font-header)' }}
          >
            {locale === 'ru' ? 'Вход' : 'Sign In'}
          </button>

          {/* CTA Button — clockwise rainbow border glow */}
          <button
            onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
            className="rainbow-btn flex h-9 items-center justify-center rounded-full px-5 text-[13px] font-semibold outline-none transition-all hover:scale-[1.03] active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary cursor-pointer"
            style={{ fontFamily: 'var(--font-header)' }}
          >
            <span className="relative z-10">{copy.requestAudit[locale]}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-4 relative z-50">
          <CartIndicator />
          <button
            className={`rounded-2xl border p-2.5 transition-all active:scale-[0.92] ${
              isMobileMenuOpen || isScrolled
                ? 'border-[color:rgba(128,128,128,0.22)] bg-[rgba(255,255,255,0.84)] text-on-surface shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl'
                : 'border-[color:rgba(128,128,128,0.16)] bg-[rgba(255,255,255,0.58)] text-on-surface backdrop-blur-sm'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? copy.closeMenu[locale] : copy.openMenu[locale]}
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Luxury Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.3 } }}
              className="fixed inset-0 bg-background/60 backdrop-blur-2xl z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-x-0 top-0 z-40 flex h-[85vh] flex-col rounded-b-[2.5rem] border-b border-[color:rgba(120,120,120,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,247,244,0.94))] px-6 pb-8 pt-24 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-3xl lg:hidden sm:px-8"
            >
              <div className="flex flex-col gap-6 mb-auto overflow-y-auto pb-8 scrollbar-hide">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <motion.div key={item.id} variants={itemVariants}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center justify-between border-b border-[color:rgba(120,120,120,0.08)] pb-4 text-[2rem] font-semibold tracking-[-0.04em] transition-all sm:text-[2.3rem] ${
                          isActive ? 'text-primary' : 'text-on-surface hover:text-primary'
                        }`}
                        style={{ fontFamily: 'var(--font-header)' }}
                      >
                        <span>{item.label[locale]}</span>
                        <div className="mx-6 h-px flex-grow origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(var(--accent-rgb),0.02),rgba(var(--accent-rgb),0.32),rgba(var(--accent-rgb),0.02))] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <ArrowRight className={`w-6 h-6 transition-transform duration-300 group-hover:translate-x-2 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div variants={itemVariants} className="space-y-5 border-t border-[color:rgba(120,120,120,0.12)] pt-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.35fr_0.9fr]">
                  <div className="rounded-[24px] border border-[color:rgba(120,120,120,0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,245,241,0.84))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_14px_28px_rgba(15,23,42,0.07)]">
                    <span className="mb-3 block text-[10px] uppercase tracking-[0.22em] text-[color:rgba(67,67,67,0.54)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {copy.callUs[locale]}
                    </span>
                    <a
                      href={PHONE_HREF}
                      className="mb-4 block text-[1.35rem] font-semibold leading-tight tracking-[-0.04em] text-on-surface"
                      style={{ fontFamily: 'var(--font-header)' }}
                    >
                      {PHONE_LABEL}
                    </a>
                    <div className="flex items-center gap-3">
                      {contactActions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <a
                            key={action.id}
                            href={action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={copy[action.labelKey][locale]}
                            className="relative flex h-12 w-12 items-center justify-center rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            style={{
                              background: `radial-gradient(circle at 50% 38%, color-mix(in srgb, ${action.brandColor} 28%, white), color-mix(in srgb, ${action.brandColor} 12%, transparent))`,
                              borderColor: `color-mix(in srgb, ${action.brandColor} 34%, rgba(255,255,255,0.94))`,
                              boxShadow: `0 0 18px ${action.softGlow}, inset 0 1px 0 rgba(255,255,255,0.92)`,
                            }}
                          >
                            <span
                              className="absolute h-3 w-3 rounded-full"
                              style={{ backgroundColor: action.brandColor }}
                            />
                            <Icon className="relative z-10 h-5 w-5" style={{ color: action.brandColor }} />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center rounded-[24px] border border-[color:rgba(120,120,120,0.12)] bg-[rgba(255,255,255,0.74)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.88)]">
                    <span className="mb-3 block text-[10px] uppercase tracking-[0.22em] text-[color:rgba(67,67,67,0.54)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {copy.language[locale]}
                    </span>
                    <LanguageSwitcher />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex w-full items-center justify-center gap-3 rounded-[20px] bg-primary px-8 py-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-on-primary shadow-[0_18px_30px_rgba(23,23,23,0.18)] transition-all hover:bg-primary/90 active:scale-[0.98]"
                  style={{ fontFamily: 'var(--font-header)' }}
                >
                  {copy.requestAudit[locale]}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

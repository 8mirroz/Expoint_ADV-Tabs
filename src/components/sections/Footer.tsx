"use client";
import type { SVGProps } from 'react';
import { MapPin, ArrowUpRight, Send, Mail } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import Link from 'next/link';

const VkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M15.072 2H8.928C3.121 2 2 3.121 2 8.928v6.144C2 20.879 3.121 22 8.928 22h6.144c5.807 0 6.928-1.121 6.928-6.928V8.928C22 3.121 20.879 2 15.072 2zm3.328 14.544c.168.456-.144.696-.144.696h-1.872c-.528 0-.96-.408-1.728-1.152-.648-.624-.936-.72-1.08-.72-.216 0-.288.072-.288.408v1.176c0 .192-.12.288-.288.288h-.72c-1.536 0-3.144-.816-4.32-2.496-1.776-2.52-2.52-5.28-2.52-5.496 0-.12.048-.24.288-.24h1.872c.216 0 .312.096.384.288.048.096.312.816.696 1.488.84 1.44 1.128 1.92 1.416 1.92.12 0 .192-.048.192-.312V10.12c-.024-.528-.312-.576-.312-.768 0-.096.072-.192.192-.192h2.952c.168 0 .216.096.216.288v3.264c0 .36.168.48.264.48.216 0 .408-.12.816-.528.384-.408.672-1.248.672-1.248 0-.048.048-.192.192-.192h1.872c.168 0 .336.048.336.144 0 .096-.144.816-1.152 2.232-.864 1.152-1.008 1.32-1.008 1.488 0 .144.072.24.408.576.816.792 1.44 1.632 1.584 2.16z"/>
  </svg>
);

const ZenIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm.045 4.95a12.015 12.015 0 00-1.89 4.316l-.286 1.054a10.428 10.428 0 01-1.39 3.037l-.608.88a12.188 12.188 0 00-1.571 3.513 11.416 11.416 0 001.89-4.316l.286-1.054a10.428 10.428 0 011.39-3.037l.608-.88A12.188 12.188 0 0012.045 4.95zm.18 0l-.608.88a10.428 10.428 0 01-1.39 3.037l-.286 1.054a12.115 12.115 0 00-1.89 4.316 12.188 12.188 0 001.571 3.513l.608-.88a10.428 10.428 0 011.39-3.037l.286-1.054A12.115 12.115 0 0013.796 8.46a12.188 12.188 0 00-1.571-3.51z"/>
  </svg>
);

const copy = {
  description: { ru: 'Промышленное производство визуальных коммуникаций. Проектируем будущее вашего бренда в городском ландшафте.', be: 'Прамысловая вытворчасць візуальных камунікацый. Праектуем будучыню вашага брэнда ў гарадскім ландшафце.', kk: 'Көрнекі коммуникациялардың өнеркәсіптік өндірісі. Қалалық ортада брендіңіздің болашағын жобалаймыз.', en: 'Industrial production of visual communications. We engineer your brand future in the urban landscape.', zh: '工业级视觉 коммуникация 生产。我们在城市空间中设计您的品牌未来。', ce: 'Визуалан коммуникацин промышленни кхоллам. Шун брендан кхана шаьржин ландшафта проект йо.', tt: 'Визуаль коммуникацияләрнең индустриаль производствосы. Шәһәр мохитендә брендыгызның киләчәген проектлыйбыз.' },
  hardware: { ru: 'Изделия', be: 'Вырабы', kk: 'Өнімдер', en: 'Hardware', zh: '产品', ce: 'Изделеш', tt: 'Эшләнмәләр' },
  system: { ru: 'Система', be: 'Сістэма', kk: 'Жүйе', en: 'System', zh: '系统', ce: 'Система', tt: 'Система' },
  headquarters: { ru: 'Штаб-квартира', be: 'Штаб-кватэра', kk: 'Штаб-пәтер', en: 'Headquarters', zh: '总部', ce: 'Штаб-квартира', tt: 'Штаб-фатир' },
  industrialZone: { ru: 'Промышленная зона "Запад"', be: 'Прамысловая зона "Захад"', kk: 'Өнеркәсіптік аймақ "Батыс"', en: 'Industrial Zone "West"', zh: '“西部”工业区', ce: 'Промышленни зона "Запад"', tt: 'Промышленность зонасы "Көнбатыш"' },
  privacy: { ru: 'Политика конфиденциальности', be: 'Палітыка прыватнасці', kk: 'Құпиялылық саясаты', en: 'Privacy Policy', zh: '隐私政策', ce: 'Конфиденциальностан политика', tt: 'Хосусыйлык сәясәте' },
  terms: { ru: 'Условия сервиса', be: 'Умовы сэрвісу', kk: 'Қызмет шарттары', en: 'Service Terms', zh: '服务条款', ce: 'Сервисан шарт', tt: 'Сервис шартлары' },
} as const;

const hardwareItems = [
  { label: 'Объемные буквы', href: '/services/volumetric-letters' },
  { label: 'Неон', href: '/services/flex-neon' },
  { label: 'Лайтбоксы', href: '/services/lightbox' },
  { label: 'Индивидуальные решения', href: '/services' },
] as const;

const systemItems = [
  { label: 'Портфолио', href: '/#cases' },
  { label: 'Процесс', href: '/#process' },
  { label: '902-ПП', href: '/compliance' },
  { label: 'Конфигуратор', href: '/calculator' },
] as const;

const socialLinks = [
  { name: 'Mail', href: 'mailto:hello@expoint.pro', icon: Mail },
  { name: 'Telegram', href: 'https://t.me/expoint_adv', icon: Send },
  { name: 'VK', href: 'https://vk.com/', icon: VkIcon },
  { name: 'Zen', href: 'https://dzen.ru/', icon: ZenIcon },
];

export default function Footer() {
  const { locale } = useLanguage();

  return (
    <footer id="footer" className="bg-surface text-on-surface-variant py-20 lg:py-32 border-t border-outline/20">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-x border-b border-outline/10">
          
          {/* Logo & Description */}
          <div className="md:col-span-4 p-8 lg:p-12 border-b md:border-b-0 md:border-r border-outline/10 flex flex-col gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-on-surface flex items-center justify-center rounded-none font-black text-surface text-sm tracking-tighter">EX</div>
              <div className="font-headline text-lg font-black uppercase tracking-widest text-on-surface">
                Expoint <span className="text-accent">ADV</span>
              </div>
            </div>
            <p className="text-xs font-normal leading-relaxed max-w-xs text-on-surface-variant/70 uppercase tracking-wider">
              {t(locale, copy.description)}
            </p>
            <div className="flex gap-4 mt-auto pt-8">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a 
                  key={name} 
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-on-surface-variant hover:text-accent transition-colors group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 p-8 lg:p-12 border-b md:border-b-0 md:border-r border-outline/10">
            <h4 className="verge-mono-label mb-8 text-[10px] opacity-40 uppercase tracking-[0.3em]">{t(locale, copy.hardware)}</h4>
            <ul className="space-y-4">
              {hardwareItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center group">
                    {item.label}
                    <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 p-8 lg:p-12 border-b md:border-b-0 md:border-r border-outline/10">
            <h4 className="verge-mono-label mb-8 text-[10px] opacity-40 uppercase tracking-[0.3em]">{t(locale, copy.system)}</h4>
            <ul className="space-y-4">
              {systemItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center group">
                    {item.label}
                    <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts & Address */}
          <div className="md:col-span-4 p-8 lg:p-12 flex flex-col gap-8">
            <h4 className="verge-mono-label mb-2 text-[10px] opacity-40 uppercase tracking-[0.3em]">
              {t(locale, copy.headquarters)} • Производство
            </h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-headline uppercase leading-tight mb-1">Москва, Полимерная 8</p>
                  <p className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest">{t(locale, copy.industrialZone)}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-6 border-t border-outline/10">
                <a href="tel:+74950000000" className="text-xl md:text-2xl font-headline text-on-surface hover:text-primary transition-colors tracking-tight whitespace-nowrap">+7 (495) 000-00-00</a>
                <a href="mailto:hello@expoint.pro" className="text-[10px] font-mono text-primary hover:text-on-surface transition-colors tracking-[0.2em] uppercase">hello@expoint.pro</a>
              </div>
            </div>
          </div>


        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex gap-12 items-center">
            <p className="text-[9px] font-mono text-on-surface-variant/50 uppercase tracking-[0.3em]">© 2026 EXPOINT ADV LABS — ALL RIGHTS RESERVED</p>
            <div className="hidden md:flex gap-6 items-center">
              <div className="h-px w-8 bg-outline/20" />
              <span className="text-[8px] font-mono text-on-surface-variant/30 uppercase tracking-[0.4em]">v.2.4.0_CORP_STRICT</span>
            </div>
          </div>
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.2em]">
            <Link href="/privacy" className="text-on-surface-variant/60 hover:text-on-surface transition-colors">{t(locale, copy.privacy)}</Link>
            <Link href="/terms" className="text-on-surface-variant/60 hover:text-on-surface transition-colors">{t(locale, copy.terms)}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";
import type { SVGProps } from 'react';
import { MapPin, ArrowUpRight, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import Link from 'next/link';

const Linkedin = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
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
  { name: 'Telegram', href: 'https://t.me/', icon: Send },
  { name: 'WhatsApp', href: 'https://wa.me/74950000000', icon: MessageCircle },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: Linkedin },
];

export default function Footer() {
  const { locale } = useLanguage();

  return (
    <footer id="footer" className="bg-surface text-on-surface-variant py-24 lg:py-40 border-t border-outline/30">
      <div className="section-container grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-24 lg:mb-32">
        
        <div className="md:col-span-4 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl font-black text-on-primary text-xl shadow-premium">EX</div>
            <div className="font-headline text-xl font-black uppercase tracking-tight text-on-surface">
              Expoint <span className="text-accent">ADV</span>
            </div>
          </div>
          <p className="text-sm font-light leading-relaxed max-w-sm text-on-surface-variant/80">
            {t(locale, copy.description)}
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a 
                key={name} 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="w-12 h-12 border border-outline/30 rounded-xl flex items-center justify-center hover:bg-accent hover:border-accent hover:text-on-accent transition-all group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="verge-mono-label mb-8 opacity-40">{t(locale, copy.hardware)}</h4>
          <ul className="space-y-4">
            {hardwareItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center group">
                  {item.label}
                  <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="verge-mono-label mb-8 opacity-40">{t(locale, copy.system)}</h4>
          <ul className="space-y-4">
            {systemItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center group">
                  {item.label}
                  <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4 flex flex-col gap-8">
          <h4 className="verge-mono-label mb-8 opacity-40">{t(locale, copy.headquarters)}</h4>
          <div className="border border-outline/10 bg-surface/30 p-8 flex flex-col gap-8 rounded-24">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-sm shrink-0">
                <MapPin className="w-6 h-6 text-on-primary" />
              </div>
              <div>
                <p className="text-lg font-headline uppercase leading-none mb-2">Москва, Полимерная 8</p>
                <p className="verge-mono-label text-on-surface-variant">{t(locale, copy.industrialZone)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-8 border-t border-outline/10">
              <a href="tel:+74950000000" className="text-3xl font-headline text-on-surface hover:text-primary transition-colors tracking-tight">+7 (495) 000-00-00</a>
              <a href="mailto:hello@expoint.pro" className="verge-mono-label text-primary hover:text-on-surface transition-colors tracking-[0.2em]">hello@expoint.pro</a>
            </div>
          </div>
        </div>

      </div>
      
      <div className="section-container pt-16 border-t border-outline/10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex gap-12 items-center">
          <p className="verge-mono-label text-on-surface-variant">© 2026 EXPOINT ADV LABS</p>
          <div className="hidden md:flex gap-6 items-center">
            <div className="h-px w-12 bg-outline/20" />
            <span className="text-[10px] font-mono text-on-surface-variant/40 uppercase tracking-widest">Build_v.2.1.0_GENESIS</span>
          </div>
        </div>
        <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
          <Link href="/privacy" className="text-on-surface-variant hover:text-on-surface transition-colors">{t(locale, copy.privacy)}</Link>
          <Link href="/terms" className="text-on-surface-variant hover:text-on-surface transition-colors">{t(locale, copy.terms)}</Link>
        </div>
      </div>
    </footer>
  );
}

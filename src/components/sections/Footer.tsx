"use client";
import { MapPin, ArrowUpRight, MessageCircle, Send } from 'lucide-react';

const Linkedin = (props: any) => (
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

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';

const copy = {
  description: { ru: 'Промышленное производство визуальных коммуникаций. Проектируем будущее вашего бренда в городском ландшафте.', be: 'Прамысловая вытворчасць візуальных камунікацый. Праектуем будучыню вашага брэнда ў гарадскім ландшафце.', kk: 'Көрнекі коммуникациялардың өнеркәсіптік өндірісі. Қалалық ортада брендіңіздің болашағын жобалаймыз.', en: 'Industrial production of visual communications. We engineer your brand future in the urban landscape.', zh: '工业级视觉 коммуникация 生产。我们在城市空间中设计您的品牌未来。', ce: 'Визуалан коммуникацин промышленни кхоллам. Шун брендан кхана шаьржин ландшафта проект йо.', tt: 'Визуаль коммуникацияләрнең индустриаль производствосы. Шәһәр мохитендә брендыгызның киләчәген проектлыйбыз.' },
  hardware: { ru: 'Изделия', be: 'Вырабы', kk: 'Өнімдер', en: 'Hardware', zh: '产品', ce: 'Изделеш', tt: 'Эшләнмәләр' },
  system: { ru: 'Система', be: 'Сістэма', kk: 'Жүйе', en: 'System', zh: '系统', ce: 'Система', tt: 'Система' },
  headquarters: { ru: 'Штаб-квартира', be: 'Штаб-кватэра', kk: 'Штаб-пәтер', en: 'Headquarters', zh: '总部', ce: 'Штаб-квартира', tt: 'Штаб-фатир' },
  industrialZone: { ru: 'Промышленная зона "Запад"', be: 'Прамысловая зона "Захад"', kk: 'Өнеркәсіптік аймақ "Батыс"', en: 'Industrial Zone "West"', zh: '“西部”工业区', ce: 'Промышленни зона "Запад"', tt: 'Промышленность зонасы "Көнбатыш"' },
  privacy: { ru: 'Политика конфиденциальности', be: 'Палітыка прыватнасці', kk: 'Құпиялылық саясаты', en: 'Privacy Policy', zh: '隐私政策', ce: 'Конфиденциальностан политика', tt: 'Хосусыйлык сәясәте' },
  terms: { ru: 'Условия сервиса', be: 'Умовы сэрвісу', kk: 'Қызмет шарттары', en: 'Service Terms', zh: '服务条款', ce: 'Сервисан шарт', tt: 'Сервис шартлары' },
} as const;

const hardwareItems = ['Объемные буквы', 'Неон', 'Лайтбоксы', 'Индивидуальные решения'];
const systemItems = ['Портфолио', 'Процесс', '902-ПП', 'Конфигуратор'];
const socialLinks = [
  { name: 'Telegram', href: 'https://t.me/', icon: Send },
  { name: 'WhatsApp', href: 'https://wa.me/74950000000', icon: MessageCircle },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: Linkedin },
];

export default function Footer() {
  const { locale } = useLanguage();

  return (
    <footer id="footer" className="bg-surface text-on-surface-variant py-32 border-t border-outline">
      <div className="section-container grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-32">
        
        <div className="md:col-span-4 flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent flex items-center justify-center font-black text-on-accent text-2xl shadow-neon">EX</div>
            <div className="font-headline text-2xl font-black uppercase tracking-tighter text-on-surface">
              Expoint <span className="text-accent">ADV</span>
            </div>
          </div>
          <p className="text-base font-light leading-relaxed max-w-sm text-on-surface-variant">
            {t(locale, copy.description)}
          </p>
          <div className="flex gap-4">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a 
                key={name} 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="w-14 h-14 border border-outline flex items-center justify-center hover:bg-accent hover:border-accent hover:text-on-accent transition-all text-[10px] font-black uppercase tracking-widest text-on-surface-variant group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-on-surface font-black uppercase tracking-[0.3em] text-[10px] mb-10">{t(locale, copy.hardware)}</h4>
          <ul className="space-y-5">
            {hardwareItems.map(item => (
              <li key={item}>
                <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-accent transition-colors flex items-center group">
                  {item}
                  <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-on-surface font-black uppercase tracking-[0.3em] text-[10px] mb-10">{t(locale, copy.system)}</h4>
          <ul className="space-y-5">
            {systemItems.map(item => (
              <li key={item}>
                <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-accent transition-colors flex items-center group">
                  {item}
                  <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4 flex flex-col gap-10">
          <h4 className="text-on-surface font-black uppercase tracking-[0.3em] text-[10px] mb-10">{t(locale, copy.headquarters)}</h4>
          <div className="rounded-2xl border border-outline bg-surface-variant/20 p-6 md:p-7 flex flex-col gap-7">
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 border border-outline bg-surface flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <p className="text-sm font-light leading-relaxed text-on-surface-variant">
                г. Москва, ул. Полимерная, д. 8 <br/>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mt-2 block font-mono">{t(locale, copy.industrialZone)}</span>
              </p>
            </div>
            <div className="w-full h-72 md:h-80 border border-outline overflow-hidden rounded-xl">
              <iframe
                title="Яндекс Карта: Москва, Полимерная, 8"
                src="https://yandex.ru/map-widget/v1/?mode=search&text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9F%D0%BE%D0%BB%D0%B8%D0%BC%D0%B5%D1%80%D0%BD%D0%B0%D1%8F%2C%208&z=16"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 pt-4 border-t border-outline">
            <a href="tel:+74950000000" className="text-3xl font-black text-on-surface hover:text-accent transition-colors font-mono tracking-tighter">+7 (495) 000-00-00</a>
            <a href="mailto:hello@expoint.pro" className="text-sm font-medium text-on-surface-variant hover:text-accent transition-colors uppercase tracking-[0.3em]">hello@expoint.pro</a>
          </div>
        </div>

      </div>
      
      <div className="section-container pt-16 border-t border-outline flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex gap-12 items-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant">© 2026 EXPOINT ADV LABS</p>
          <div className="hidden md:flex gap-6 items-center">
            <div className="h-px w-12 bg-outline" />
            <span className="text-[10px] font-mono text-on-surface-variant/40 uppercase tracking-widest">Build_v.2.1.0_GENESIS</span>
          </div>
        </div>
        <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
          <a href="#" className="text-on-surface-variant hover:text-on-surface transition-colors">{t(locale, copy.privacy)}</a>
          <a href="#" className="text-on-surface-variant hover:text-on-surface transition-colors">{t(locale, copy.terms)}</a>
        </div>
      </div>
    </footer>
  );
}

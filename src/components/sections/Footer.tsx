"use client";
import type { SVGProps } from 'react';
import { MapPin, Send, Mail } from 'lucide-react';
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
  description: { ru: 'Промышленное производство визуальных коммуникаций. Проектируем будущее вашего бренда в городском ландшафте.', be: 'Прамысловая вытворчасць візуальных камунікацый. Праектуем будучыню вашага брэнда ў гарадскім ландшафце.', kk: 'Көрнекі коммуникациялардың өнеркәсіптік өндірісі. Қалалық ортада брендіңіздің болашағын жобалаймыз.', en: 'Industrial production of visual communications. We engineer your brand future in the urban landscape.', ko: '산업용 비주얼 커뮤니케이션 제작. 도시 공간 속에서 브랜드의 미래를 설계합니다.', zh: '工业级视觉传达生产。我们在城市景观中设计您品牌的未来。', hi: 'दृश्य संचार का औद्योगिक उत्पादन। हम शहरी परिदृश्य में आपके ब्रांड का भविष्य डिज़ाइन करते हैं।', ce: 'Визуалан коммуникацин промышленни кхоллам. Шун брендан кхана шаьржин ландшафта проект йо.', tt: 'Визуаль коммуникацияләрнең индустриаль производствосы. Шәһәр мохитендә брендыгызның киләчәген проектлыйбыз.' },
  hardware: { ru: 'Изделия', be: 'Вырабы', kk: 'Өнімдер', en: 'Hardware', ko: '제품', zh: '产品', hi: 'उत्पाद', ce: 'Изделеш', tt: 'Эшләнмәләр' },
  system: { ru: 'Система', be: 'Сістэма', kk: 'Жүйе', en: 'System', ko: '시스템', zh: '系统', hi: 'सिस्टम', ce: 'Система', tt: 'Система' },
  headquarters: { ru: 'Штаб-квартира', be: 'Штаб-кватэра', kk: 'Штаб-пәтер', en: 'Headquarters', ko: '본사', zh: '总部', hi: 'मुख्यालय', ce: 'Штаб-квартира', tt: 'Штаб-фатир' },
  privacy: { ru: 'Политика конфиденциальности', be: 'Палітыка прыватнасці', kk: 'Құпиялылық саясаты', en: 'Privacy Policy', ko: '개인정보 처리방침', zh: '隐私政策', hi: 'गोपनीयता नीति', ce: 'Конфиденциальностан политика', tt: 'Хосусыйлык сәясәте' },
  terms: { ru: 'Условия сервиса', be: 'Умовы сэрвісу', kk: 'Қызмет шарттары', en: 'Service Terms', ko: '서비스 약관', zh: '服务条款', hi: 'सेवा शर्तें', ce: 'Сервисан шарт', tt: 'Сервис шартлары' },
  productionComplex: { ru: 'Производственный комплекс', be: 'Вытворчы комплекс', kk: 'Өндірістік кешен', en: 'Production complex', ko: '생산 단지', zh: '生产综合体', hi: 'उत्पादन परिसर', ce: 'Кхолламан комплекс', tt: 'Җитештерү комплексы' },
  rightsReserved: { ru: 'Все права защищены', be: 'Усе правы абаронены', kk: 'Барлық құқықтар қорғалған', en: 'All rights reserved', ko: '모든 권리 보유', zh: '保留所有权利', hi: 'सर्वाधिकार सुरक्षित', ce: 'Дерриг хьакъ дийцарна', tt: 'Барлык хокуклар сакланган' },
} as const;

const hardwareItems = [
  { label: { ru: 'Объемные буквы', en: 'Channel letters', ko: '입체 문자', zh: '立体字', hi: 'वॉल्यूमेट्रिक अक्षर' }, href: '/services/volumetric-letters' },
  { label: { ru: 'Неон', en: 'Neon', ko: '네온', zh: '霓虹', hi: 'नियॉन' }, href: '/services/neon' },
  { label: { ru: 'Лайтбоксы', en: 'Lightboxes', ko: '라이트박스', zh: '灯箱', hi: 'लाइटबॉक्स' }, href: '/services/lightboxes' },
  { label: { ru: 'Дизайн', en: 'Design', ko: '디자인', zh: '设计', hi: 'डिज़ाइन' }, href: '/services' },
] as const;

const systemItems = [
  { label: { ru: 'Кейсы', en: 'Cases', ko: '사례', zh: '案例', hi: 'केसेस' }, href: '/cases' },
  { label: { ru: '902-ПП', en: '902-PP', ko: '902-PP', zh: '902-ПП', hi: '902-ПП' }, href: '/compliance' },
  { label: { ru: 'Конфигуратор', en: 'Configurator', ko: '구성기', zh: '配置器', hi: 'कॉन्फिगरेटर' }, href: '/calculator' },
] as const;

const socialLinks = [
  { name: 'Mail', href: 'mailto:hello@bukva-svet.ru', icon: Mail },
  { name: 'Telegram', href: 'https://t.me/bukva_svet', icon: Send },
  { name: 'VK', href: 'https://vk.com/', icon: VkIcon },
  { name: 'Zen', href: 'https://dzen.ru/', icon: ZenIcon },
];

export default function Footer() {
  const { locale } = useLanguage();

  return (
    <footer id="footer" className="bg-surface text-on-surface-variant section-padding border-t border-outline/10">
      <div className="section-container">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Logo & Description */}
          <div className="md:col-span-4 flex flex-col gap-8 lg:pr-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-on-surface flex items-center justify-center rounded-sm font-black text-surface text-base tracking-tighter">БС</div>
              <div className="font-headline text-xl font-black uppercase tracking-widest text-on-surface">
                Буква <span className="text-accent">Свет</span>
              </div>
            </div>
            <p className="text-sm font-normal leading-relaxed text-on-surface-variant/80 max-w-sm">
              {t(locale, copy.description)}
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a 
                  key={name} 
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-on-surface/5 text-on-surface-variant hover:bg-accent hover:text-on-accent hover:scale-105 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links - Hardware */}
          <div className="md:col-span-2 flex flex-col gap-6 lg:pl-8">
            <h4 className="font-mono text-xs font-bold text-on-surface/50 uppercase tracking-[0.2em]">{t(locale, copy.hardware)}</h4>
            <ul className="flex flex-col gap-4">
              {hardwareItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant hover:text-accent transition-colors flex items-center w-fit">
                    {t(locale, item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links - System */}
          <div className="md:col-span-2 flex flex-col gap-6 lg:pl-4">
            <h4 className="font-mono text-xs font-bold text-on-surface/50 uppercase tracking-[0.2em]">{t(locale, copy.system)}</h4>
            <ul className="flex flex-col gap-4">
              {systemItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant hover:text-accent transition-colors flex items-center w-fit">
                    {t(locale, item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts & Address */}
          <div className="md:col-span-4 flex flex-col gap-6 lg:pl-12">
            <h4 className="font-mono text-xs font-bold text-on-surface/50 uppercase tracking-[0.2em]">
              {t(locale, copy.headquarters)}
            </h4>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg md:text-xl font-headline font-black uppercase leading-tight text-on-surface tracking-tight">
                    Москва,<br/>
                    Полимерная 8
                  </h3>
                  <p className="text-sm text-on-surface-variant/70 mt-2">{t(locale, copy.productionComplex)}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <a href="tel:+74950000000" className="text-2xl font-headline font-bold text-on-surface hover:text-accent transition-colors tracking-tight w-fit">
                  +7 (495) 000-00-00
                </a>
                <a href="mailto:hello@bukva-svet.ru" className="text-sm font-mono text-on-surface-variant/70 hover:text-accent transition-colors tracking-wider w-fit">
                  hello@bukva-svet.ru
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-outline/10">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 items-center">
            <p className="text-[10px] sm:text-xs font-mono text-on-surface-variant/50 uppercase tracking-[0.1em] md:tracking-[0.2em]">
              © {new Date().getFullYear()} БУКВА СВЕТ — {t(locale, copy.rightsReserved).toUpperCase()}
            </p>
            <div className="hidden md:flex gap-6 items-center">
              <div className="h-px w-6 bg-outline/20" />
              <span className="text-[10px] font-mono font-bold text-on-surface-variant/30 uppercase tracking-[0.2em]">v.2.4.0_CORP_STRICT</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em]">
            <Link href="/privacy" className="text-on-surface-variant/60 hover:text-on-surface transition-colors">
              {t(locale, copy.privacy)}
            </Link>
            <Link href="/terms" className="text-on-surface-variant/60 hover:text-on-surface transition-colors">
              {t(locale, copy.terms)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

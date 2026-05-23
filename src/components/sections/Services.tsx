"use client";

import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { type LocalizedText, t } from '@/i18n/site';
import { SERVICES } from '@/data/services';
import { CatalogProductCard } from '@/components/ui/CatalogProductCard';
import { getServiceHref } from '@/lib/utils';

const SERVICE_IMAGES: Record<string, string> = {
  'volumetric-letters': '/img/adv/volumetric-letters.png',
  'lightbox': '/img/adv/lightbox.png',
  'flex-neon': '/img/adv/flexible-neon.png',
  'metal-letters': '/img/adv/installation.png',
  'pylon-signs': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
  'roof-installations': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
};

const SERVICE_ACCENTS: Record<string, string> = {
  'volumetric-letters': 'var(--category-volumetric)',
  'lightbox': 'var(--category-lightbox)',
  'flex-neon': 'var(--category-neon)',
  'metal-letters': 'var(--category-metal)',
  'pylon-signs': 'var(--category-pylon)',
  'roof-installations': 'var(--category-roof)',
};

const SERVICE_TITLES: Record<string, LocalizedText> = {
  'volumetric-letters': { ru: 'Объемные\nбуквы', be: 'Аб’ёмныя\nлітары', kk: 'Көлемді\nәріптер', en: 'Channel\nLetters', ko: '입체\n문자', zh: '立体\n字', hi: 'वॉल्यूमेट्रिक\nअक्षर', ce: 'Комуьгли\nбухкъ', tt: 'Өлкле\nхәрефләр' },
  'flex-neon': { ru: 'Гибкий\nнеон', be: 'Гнуткі\nнеон', kk: 'Икемді\nнеон', en: 'Flexible\nNeon', ko: '플렉스\n네온', zh: '柔性\n霓虹', hi: 'फ्लेक्स\nनियॉन', ce: 'Говрта\nнеон', tt: 'Эластик\nнеон' },
  lightbox: { ru: 'Световые\nкороба', be: 'Святлавыя\nкаробкі', kk: 'Жарық\nқораптар', en: 'Light\nBoxes', ko: '라이트\n박스', zh: '灯光\n箱体', hi: 'लाइट\nबॉक्स', ce: 'Сийла\nкаробкаш', tt: 'Якты\nкороблар' },
  'pylon-signs': { ru: 'Элементы\nнавигации', be: 'Элементы\nнавігацыі', kk: 'Навигация\nэлементтері', en: 'Wayfinding\nElements', ko: '웨이파인딩\n요소', zh: '导视\n元素', hi: 'नेविगेशन\nएलिमेंट्स', ce: 'Навигацин\nэлементеш', tt: 'Навигация\nэлементлары' },
  'roof-installations': { ru: 'Крышные\nустановки', be: 'Дахавыя\nканструкцыі', kk: 'Шатырлық\nқондырғылар', en: 'Roof\nInstallations', ko: '옥상\n설치물', zh: '屋顶\n装置', hi: 'रूफ\nइंस्टॉलेशन्स', ce: 'КIовлан\nустановкаш', tt: 'Түбә\nурнаштырулар' },
  'metal-letters': { ru: 'Монтаж и\nзапуск', be: 'Мантаж і\nзапуск', kk: 'Монтаж және\nіске қосу', en: 'Install &\nLaunch', ko: '설치 및\n런칭', zh: '安装与\n启动', hi: 'इंस्टॉल और\nलॉन्च', ce: 'Монтаж а\nдIадолор а', tt: 'Монтаж һәм\nэшләтеп җибәрү' },
};

const SERVICE_SPECS: Record<string, LocalizedText[]> = {
  'volumetric-letters': [
    { ru: 'Акрил 2-10 мм', be: 'Акрыл 2-10 мм', kk: 'Акрил 2-10 мм', en: 'Acrylic 2-10 mm', ko: '아크릴 2-10mm', zh: '亚克力 2-10毫米', hi: 'ऐक्रेलिक 2-10 मिमी', ce: 'Акрил 2-10 мм', tt: 'Акрил 2-10 мм' },
    { ru: 'LED Samsung', be: 'LED Samsung', kk: 'LED Samsung', en: 'Samsung LEDs', ko: '삼성 LED', zh: 'Samsung LED', hi: 'Samsung LED', ce: 'LED Samsung', tt: 'LED Samsung' },
    { ru: 'Алюминий', be: 'Алюміній', kk: 'Алюминий', en: 'Aluminum edge', ko: '알루미늄 엣지', zh: '铝边', hi: 'एल्यूमिनियम एज', ce: 'Алюмини', tt: 'Алюминий' },
    { ru: 'Ресурс 50к ч.', be: 'Рэсурс 50 тыс. гадзін', kk: '50 мың сағат ресурсы', en: '50k h lifespan', ko: '수명 5만 시간', zh: '寿命5万小时', hi: '50k घंटे संसाधन', ce: '50 тыск. сахьт ресурс', tt: '50 мең сәгать ресурс' },
  ],
  lightbox: [
    { ru: 'УФ-печать', be: 'УФ-друк', kk: 'УФ-баспа', en: 'UV print', ko: 'UV 프린트', zh: 'UV打印', hi: 'UV प्रिं트', ce: 'УФ-печать', tt: 'UV басма' },
    { ru: 'Лицевой акрил', be: 'Лицавы акрыл', kk: 'Алдыңғы акрил', en: 'Face acrylic', ko: '전면 아크릴', zh: '面板亚克力', hi: 'फेस ऐक्रेलिक', ce: 'Юхьара акрил', tt: 'Алгы акрил' },
    { ru: 'Сотовый карбонат', be: 'Сотавы карбанат', kk: 'Ұяшықты поликарбонат', en: 'Cellular polycarbonate', ko: '셀룰러 폴리카보네이트', zh: '蜂窝聚碳酸酯', hi: 'सेल्युलर पॉलीकार्बोनेट', ce: 'Сота карбонат', tt: 'Кәрәзле поликарбонат' },
    { ru: 'Глубина 60-250 мм', be: 'Глыбіня 60-250 мм', kk: 'Тереңдігі 60-250 мм', en: 'Depth 60-250 mm', ko: '깊이 60-250mm', zh: '厚度60-250毫米', hi: 'गहराई 60-250 मिमी', ce: 'Глубина 60-250 мм', tt: 'Тирәнлек 60-250 мм' },
  ],
  'flex-neon': [
    { ru: 'Силиконовый неон', be: 'Сіліконавы неон', kk: 'Силикон неон', en: 'Silicone neon', ko: '실리콘 네온', zh: '硅胶霓虹', hi: 'सिलिकॉन नियॉन', ce: 'Силиконан неон', tt: 'Силикон неон' },
    { ru: 'Акрил 5-8 мм', be: 'Акрыл 5-8 мм', kk: 'Акрил 5-8 мм', en: 'Acrylic 5-8 mm', ko: '아크릴 5-8mm', zh: '亚克力5-8毫米', hi: 'ऐक्रेलिक 5-8 मिमी', ce: 'Акрил 5-8 мм', tt: 'Акрил 5-8 мм' },
    { ru: 'Питание 12В', be: 'Сілкаванне 12В', kk: '12В қуат', en: '12V power', ko: '12V 전원', zh: '12V供电', hi: '12V पावर', ce: '12В питани', tt: '12В тукландыру' },
    { ru: 'Контроллер яркости', be: 'Кантролер яркасці', kk: 'Жарықтық контроллері', en: 'Brightness controller', ko: '밝기 컨트롤러', zh: '亮度控制器', hi: 'ब्राइटनेस कंट्रोलर', ce: 'Яркостан контроллер', tt: 'Яктылык контроллеры' },
  ],
  'metal-letters': [
    { ru: 'Нерж. сталь', be: 'Нержавейка', kk: 'Тот баспайтын болат', en: 'Stainless steel', ko: '스테인리스 스틸', zh: '不锈钢', hi: 'स्टेनलेस स्टील', ce: 'Нерж. сталь', tt: 'Дат басмас корыч' },
    { ru: 'Без подсветки', be: 'Без падсветкі', kk: 'Жарықсыз', en: 'No illumination', ko: '비조명', zh: '无背光', hi: 'बिना लाइट', ce: 'Сийла ца цхьа', tt: 'Яктыртусыз' },
    { ru: 'Скрытый крепеж', be: 'Схаванае мацаванне', kk: 'Жасырын бекіту', en: 'Hidden mounting', ko: '히든 마운트', zh: '隐藏安装', hi: 'हिडन माउंट', ce: 'Къайлаха крепеж', tt: 'Яшерен беркетү' },
    { ru: 'Премиум фасад', be: 'Прэміум-фасад', kk: 'Премиум фасад', en: 'Premium facade', ko: '프리미엄 파사드', zh: '高级门头', hi: 'प्रीमियम फेसाड', ce: 'Премиум фасад', tt: 'Премиум фасад' },
  ],
  'pylon-signs': [
    { ru: 'Сталь + композит', be: 'Сталь + кампазіт', kk: 'Болат + композит', en: 'Steel + composite', ko: '스틸 + 복합재', zh: '钢材+复合板', hi: 'स्टील + कंपोजिट', ce: 'Сталь + композит', tt: 'Корыч + композит' },
    { ru: 'Навигация', be: 'Навігацыя', kk: 'Навигация', en: 'Wayfinding', ko: '웨이파인딩', zh: '导视系统', hi: 'वेफाइंडिंग', ce: 'Навигаци', tt: 'Навигация' },
    { ru: 'Уличное исполнение', be: 'Вонкавае выкананне', kk: 'Сыртқы орындалу', en: 'Outdoor grade', ko: '실외 등급', zh: '户外级', hi: 'आउटडोर ग्रेड', ce: 'Улични вариант', tt: 'Урам өчен эшләнгән' },
    { ru: 'LED / без света', be: 'LED / без святла', kk: 'LED / жарықсыз', en: 'LED / unlit', ko: 'LED / 비조명', zh: 'LED / 无灯', hi: 'LED / बिना लाइट', ce: 'LED / сийла ца цхьа', tt: 'LED / яктыртусыз' },
  ],
  'roof-installations': [
    { ru: 'Металлокаркас', be: 'Металакасцёр', kk: 'Металл қаңқа', en: 'Metal frame', ko: '메탈 프레임', zh: '金属框架', hi: 'मेटल फ्रेम', ce: 'Металлокаркас', tt: 'Металл каркас' },
    { ru: '380В', be: '380В', kk: '380В', en: '380V', ko: '380V', zh: '380V', hi: '380V', ce: '380В', tt: '380В' },
    { ru: 'КМ/КМД', be: 'КМ/КМД', kk: 'КМ/КМД', en: 'KM/KMD docs', ko: 'KM/KMD 도면', zh: 'KM/KMD图纸', hi: 'KM/KMD ड्रॉइंग्स', ce: 'КМ/КМД', tt: 'КМ/КМД' },
    { ru: 'Согласование', be: 'Узгадненне', kk: 'Келісу', en: 'Permit flow', ko: '허가 절차', zh: '审批流程', hi: 'अनुमोदन प्रक्रिया', ce: 'Узгадар', tt: 'Килештерү' },
  ],
};

const copy = {
  eyebrow: { ru: 'Производственные блоки', be: 'Вытворчыя блокі', kk: 'Өндіріс блоктары', en: 'Production Units', ko: '생산 유닛', zh: '生产单元', hi: 'प्रोडक्शन यूनिट्स', ce: 'Кхолламан блокаш', tt: 'Җитештерү блоклары' },
  titleTop: { ru: 'Производство', be: 'Вытворчасць', kk: 'Өндіріс', en: 'Production', ko: '생산', zh: '生产', hi: 'उत्पादन', ce: 'Кхоллам', tt: 'Җитештерү' },
  titleBottom: { ru: '', be: '', kk: '', en: '', ko: '', zh: '', hi: '', ce: '', tt: '' },
  intro: { ru: 'Проектируем и производим технологичные конструкции высокого качества', be: 'Праектуем і вырабляем тэхналагічныя канструкцыі высокай якасці', kk: 'Жоғары сапалы технологиялық конструкцияларды жобалаймыз және өндіреміз.', en: 'We design and manufacture high-quality technological structures.', ko: '고품질의 기술 중심 구조물을 설계하고 제작합니다.', zh: '我们设计和生产高质量的技术结构。', hi: 'हम उच्च गुणवत्ता वाली तकनीकी संरचनाओं का डिज़ाइन और उत्पादन करते हैं।', ce: 'Тхуна лакхара йолу технологин кхоллам йо.', tt: 'Югары сыйфатлы технологияле конструкцияләр проектлыйбыз һәм җитештерәбез.' },
  productionRate: { ru: 'Тариф производства', en: 'Production rate', ko: '생산 요율', zh: '生产价格', hi: 'उत्पादन दर' },
  from: { ru: 'от', en: 'from', ko: '부터', zh: '起', hi: 'से' },
} as const;

export default function Services() {
  const { locale } = useLanguage();

  return (
    <section id="services" className="scroll-mt-28 section-padding overflow-hidden bg-canvas-soft">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="verge-mono-label text-primary tracking-[0.2em]">
                {t(locale, copy.eyebrow)}
              </span>
              <div className="h-px flex-1 bg-outline" />
            </div>
            <h2 className="geist-display-lg md:text-[56px] lg:text-[72px] text-on-surface title-hover-group">
              <span className="title-hover-gradient">{t(locale, copy.titleTop)}</span>
              {t(locale, copy.titleBottom) && (
                <>
                  <br />
                  <span className="title-hover-gradient text-on-surface-variant/40">{t(locale, copy.titleBottom)}</span>
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
             <p className="text-white/90 text-xl leading-relaxed border-l-2 border-[#00ffa3] pl-8 py-2">
               {t(locale, copy.intro)}
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICES.map((service, idx) => {
            return (
              <motion.div 
                key={service.id}
                className="h-full"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <CatalogProductCard 
                  title={SERVICE_TITLES[service.id] ? t(locale, SERVICE_TITLES[service.id]) : service.title}
                  price={service.basePrice}
                  priceUnit={service.priceUnit}
                  image={SERVICE_IMAGES[service.id] || 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop'}
                  previewVideo={service.previewVideo}
                  specs={(SERVICE_SPECS[service.id] ?? service.technicalSpecs?.map((spec) => ({ ru: spec.value, en: spec.value } satisfies LocalizedText)) ?? []).map((spec) => ({
                    label: '',
                    value: t(locale, spec),
                  }))}
                  href={getServiceHref(service.id)}
                  accentColor={SERVICE_ACCENTS[service.id]}
                  index={idx}
                  priceLabel={t(locale, copy.productionRate)}
                  fromLabel={t(locale, copy.from)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

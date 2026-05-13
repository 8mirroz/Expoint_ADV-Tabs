"use client";
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';

const copy = {
  badge: { ru: 'Протокол соответствия', be: 'Пратакол адпаведнасці', kk: 'Сәйкестік хаттамасы', en: 'Compliance Protocol', zh: '合规协议', ce: 'Нийсъяр протокол', tt: 'Туры килү протоколы' },
  titleTop: { ru: 'Согласование', be: 'Узгадненне', kk: 'Келісу', en: 'Approvals', zh: '审批', ce: 'ДIаяхьар', tt: 'Килештерү' },
  titleBottom: { ru: 'без компромиссов.', be: 'без кампрамісаў.', kk: 'ымырасыз.', en: 'without compromise.', zh: '毫不妥协。', ce: 'компромисс боцуш.', tt: 'компромисссыз.' },
  body: { ru: 'В Москве действуют жесткие регламенты 902-ПП. Мы проводим предварительный аудит вашего фасада, гарантируя соответствие архитектурному коду города до начала производства.', be: 'У Маскве дзейнічаюць жорсткія рэгламенты 902-ПП. Мы праводзім папярэдні аўдыт вашага фасада, гарантуючы адпаведнасць архітэктурнаму коду горада да пачатку вытворчасці.', kk: 'Мәскеуде 902-ПП бойынша қатаң регламенттер бар. Біз өндіріс басталғанға дейін қасбетіңізге алдын ала аудит жүргізіп, қаланың сәулеттік кодына сәйкестігін қамтамасыз етеміз.', en: 'Moscow enforces strict 902-PP regulations. We audit your facade in advance to ensure it matches the city architectural code before production begins.', zh: '莫斯科执行严格的 902-ПП 规范。我们会在生产前先审查您的门头，确保符合城市建筑代码。', ce: 'Москвахь 902-ПП тIехь къовсаман регламентанаш ю. Тхуна шун фасад алдын аудит йо, кхоллам юьхьанца шаьржин архитектуран кодца нийса хилийта.', tt: 'Мәскәүдә 902-ПП буенча катгый регламентлар эшли. Без җитештерү башланганчы фасадыгызны алдан аудитлап, шәһәр архитектура коды белән туры килүен гарантиялибез.' },
  cta: { ru: 'Проверить объект на соответствие', be: 'Праверыць аб’ект на адпаведнасць', kk: 'Нысанның сәйкестігін тексеру', en: 'Check Property Compliance', zh: '检查 объекта 合规性', ce: 'Объект нийса хилар текха', tt: 'Объектның туры килүен тикшерү' },
  riskTitle: { ru: 'Снижение правовых рисков', be: 'Зніжэнне прававых рызык', kk: 'Құқықтық тәуекелді азайту', en: 'Legal Risk Mitigation', zh: '法律风险控制', ce: 'Хьакъикъатан риск къасто', tt: 'Хокукый рискларны киметү' },
  riskBody: { ru: 'Исключаем штрафы до 500 000 ₽ через точное соблюдение архитектурных границ и дизайн-кода.', be: 'Выключаем штрафы да 500 000 ₽ праз дакладнае выкананне архітэктурных межаў і дызайн-кода.', kk: 'Сәулеттік шекаралар мен дизайн-кодты дәл сақтау арқылы 500 000 ₽ дейінгі айыппұлдардың алдын аламыз.', en: 'We eliminate fines up to 500,000 RUB by adhering precisely to architectural limits and design-code rules.', zh: '通过严格遵守建筑边界和设计规范，避免最高 500,000 ₽ 的罚款。', ce: 'Архитектуран чегараш а дизайн-код а дика лардоьзна, 500 000 ₽ кхаччан штрафаш юьзна йоцу.', tt: 'Архитектура чикләрен һәм дизайн-кодны төгәл үтәп, 500 000 ₽ кадәр штрафларны булдырмыйбыз.' },
  architectureTitle: { ru: 'Архитектурная целостность', be: 'Архітэктурная цэласнасць', kk: 'Сәулеттік тұтастық', en: 'Architectural Integrity', zh: '建筑完整性', ce: 'Архитектуран цIанош', tt: 'Архитектур бөтенлек' },
  architectureBody: { ru: 'Сохраняем эстетику здания, интегрируя рекламные конструкции как часть фасадного решения.', be: 'Захоўваем эстэтыку будынка, інтэгруючы рэкламныя канструкцыі як частку фасаднага рашэння.', kk: 'Жарнама конструкцияларын қасбеттік шешімнің бөлігі ретінде біріктіріп, ғимарат эстетикасын сақтаймыз.', en: 'We preserve the building aesthetic by integrating signage as part of the facade concept.', zh: '我们将广告结构融入 фасад 方案，保持建筑美学完整。', ce: 'Реклама конструкцеш фасадан шийларан декъан юккъе доьхьалуш, цIенан эстетика лардо.', tt: 'Реклама конструкцияләрен фасад концепциясенең өлеше итеп кертеп, бинаның эстетикасын саклыйбыз.' },
} as const;

export default function Safety() {
  const { locale } = useLanguage();

  return (
    <section id="audit" className="bg-secondary py-32 text-on-surface relative overflow-hidden border-y border-outline">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 transform -skew-x-12 translate-x-32 pointer-events-none"></div>
      <div className="section-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-outline text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-8 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>{t(locale, copy.badge)}</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-headline font-black uppercase tracking-tighter leading-[0.9] mb-10 text-on-surface">
            {t(locale, copy.titleTop)} <br/><span className="text-on-surface-variant/60">{t(locale, copy.titleBottom)}</span>
          </h2>
          <p className="text-lg font-light text-on-surface-variant leading-relaxed mb-12 max-w-xl">
            {t(locale, copy.body)}
          </p>
          <button className="bg-on-surface hover:bg-accent text-surface px-10 py-5 font-black uppercase tracking-widest text-xs transition-all hover:text-on-accent flex items-center gap-4 shadow-premium">
            <ShieldCheck className="w-5 h-5" />
            {t(locale, copy.cta)}
          </button>
        </div>
        <div className="relative border border-outline bg-surface p-12 shadow-premium">
           <div className="space-y-10">
              <div className="flex gap-6 items-start">
                 <div className="w-12 h-12 border border-accent/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-accent shadow-neon"></div>
                 </div>
                 <div>
                   <p className="font-headline font-black text-on-surface uppercase tracking-wider text-sm mb-2">{t(locale, copy.riskTitle)}</p>
                   <p className="text-on-surface-variant text-sm font-light leading-relaxed">{t(locale, copy.riskBody)}</p>
                 </div>
              </div>
              <div className="h-px bg-outline w-full"></div>
              <div className="flex gap-6 items-start">
                 <div className="w-12 h-12 border border-outline flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-on-surface/20"></div>
                 </div>
                 <div>
                   <p className="font-headline font-black text-on-surface uppercase tracking-wider text-sm mb-2">{t(locale, copy.architectureTitle)}</p>
                   <p className="text-on-surface-variant text-sm font-light leading-relaxed">{t(locale, copy.architectureBody)}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

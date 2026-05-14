"use client";
import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
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
    <section id="audit" className="relative scroll-mt-28 py-12 lg:py-16 overflow-hidden">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bento-card min-h-[340px] relative overflow-hidden group border-none shadow-2xl bg-secondary"
        >
          {/* Blueprint Grid & Technical Overlays */}
          <div className="absolute inset-0 z-10 opacity-20 bg-[url('/img/patterns/grid.svg')] bg-[length:30px_30px] mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-r from-secondary via-secondary/90 to-transparent z-10" />
          
          {/* Technical Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-20 z-10" />
          
          {/* Content Layer - Widescreen Layout */}
          <div className="relative z-20 h-full p-8 md:p-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl flex-1">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/40 border border-white/10 text-[9px] font-black uppercase tracking-[0.4em] text-accent mb-6 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{t(locale, copy.badge)}</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tighter leading-none text-white mb-6">
                {t(locale, copy.titleTop)} <span className="text-white/40">{t(locale, copy.titleBottom)}</span>
              </h2>
              
              <p className="text-white/60 font-light text-base max-w-xl leading-relaxed border-l-2 border-accent/40 pl-6">
                {t(locale, copy.body)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 flex-1 lg:max-w-xl">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent shadow-neon" />
                  <p className="font-mono font-bold text-white uppercase tracking-wider text-[10px]">{t(locale, copy.riskTitle)}</p>
                </div>
                <p className="text-white/40 text-[12px] font-light leading-relaxed pl-4 border-l border-white/10">{t(locale, copy.riskBody)}</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-white/20" />
                  <p className="font-mono font-bold text-white uppercase tracking-wider text-[10px]">{t(locale, copy.architectureTitle)}</p>
                </div>
                <p className="text-white/40 text-[12px] font-light leading-relaxed pl-4 border-l border-white/10">{t(locale, copy.architectureBody)}</p>
              </div>

              <div className="md:col-span-2 pt-4">
                <button className="w-full md:w-auto bg-on-surface hover:bg-accent text-surface px-10 py-5 font-black uppercase tracking-widest text-[10px] transition-all hover:text-on-accent flex items-center justify-center gap-4 shadow-xl active:scale-95 group/btn">
                  <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {t(locale, copy.cta)}
                </button>
              </div>
            </div>
          </div>

          {/* Technical Corner Decals */}
          <div className="absolute bottom-4 left-4 text-[7px] font-mono text-white/20 select-none uppercase tracking-[0.5em]">
            Protocol: 902-PP / Compliance-Audit-V2
          </div>
        </motion.div>
      </div>
    </section>
  );
}

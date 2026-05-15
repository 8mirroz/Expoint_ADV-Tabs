"use client";
import { ShieldCheck, Scale, Building2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';

const copy = {
  badge: { ru: 'Протокол соответствия', be: 'Пратакол адпаведнасці', kk: 'Сәйкестік хаттамасы', en: 'Compliance Protocol', zh: '合规协议', ce: 'Нийсъяр протокол', tt: 'Туры килү протоколы' },
  titleTop: { ru: 'Согласование', be: 'Узгадненне', kk: 'Келісу', en: 'Approvals', zh: '审批', ce: 'ДIаяхьар', tt: 'Килештерү' },
  titleBottom: { ru: 'без компромиссов.', be: 'без кампрамісаў.', kk: 'ымырасыз.', en: 'without compromise.', zh: '毫不妥协。', ce: 'компромисс боцуш.', tt: 'компромисссыз.' },
  body: { ru: 'В Москве действуют жесткие регламенты 902-ПП. Мы проводим предварительный аудит вашего фасада, гарантируя соответствие архитектурному коду города до начала производства.', be: 'У Маскве дзейнічаюць жорсткія рэгламенты 902-ПП. Мы праводзім папярэдні аўдыт вашага фасада, гарантуючы адпаведнасць архітэктурнаму коду горада да пачатку вытворчасці.', kk: 'Мәскеуде 902-ПП бойынша қатаң регламенттер бар. Біз өндіріс басталғанға дейін қасбетіңізге алдын ала аудит жүргізіп, қаланың сәулеттік кодына сәйкестігін қамтамасыз етеміз.', en: 'Moscow enforces strict 902-PP regulations. We audit your facade in advance to ensure it matches the city architectural code before production begins.', zh: '莫斯科执行严格的 902-ПП 规范。我们会在生产前先审查您的门头，确保符合城市建筑代码。', ce: 'Москвахь 902-ПП тIехь къовсаман регламентанаш ю. Тхуна шун фасад алдын аудит йо, кхоллам юьхьанца шаьржин архитектуран кодца нийса хилийта.', tt: 'Мәскәүдә 902-ПП буенча катгый регламентлар эшли. Без җитештерү башланганчы фасадыгызны алдан аудитлап, шәһәр архитектура коды белән туры килүен гарантиялибез.' },
  cta: { ru: 'Проверить объект на соответствие', be: "Праверыць аб\u2019ект на адпаведнасць", kk: 'Нысанның сәйкестігін тексеру', en: 'Check Property Compliance', zh: '检查 объекта 合规性', ce: 'Объект нийса хилар текха', tt: 'Объектның туры килүен тикшерү' },
  riskTitle: { ru: 'Снижение правовых рисков', be: 'Зніжэнне прававых рызык', kk: 'Құқықтық тәуекелді азайту', en: 'Legal Risk Mitigation', zh: '法律风险控制', ce: 'Хьакъикъатан риск къасто', tt: 'Хокукый рискларны киметү' },
  riskBody: { ru: 'Исключаем штрафы до 500 000 ₽ через точное соблюдение архитектурных границ и дизайн-кода.', be: 'Выключаем штрафы да 500 000 ₽ праз дакладнае выкананне архітэктурных межаў і дызайн-кода.', kk: 'Сәулеттік шекаралар мен дизайн-кодты дәл сақтау арқылы 500 000 ₽ дейінгі айыппұлдардың алдын аламыз.', en: 'We eliminate fines up to 500,000 RUB by adhering precisely to architectural limits and design-code rules.', zh: '通过严格遵守建筑边界和设计规范，避免最高 500,000 ₽ 的罚款。', ce: 'Архитектуран чегараш а дизайн-код а дика лардоьзна, 500 000 ₽ кхаччан штрафаш юьзна йоцу.', tt: 'Архитектура чикләрен һәм дизайн-кодны төгәл үтәп, 500 000 ₽ кадәр штрафларны булдырмыйбыз.' },
  architectureTitle: { ru: 'Архитектурная целостность', be: 'Архітэктурная цэласнасць', kk: 'Сәулеттік тұтастық', en: 'Architectural Integrity', zh: '建筑完整性', ce: 'Архитектуран цIанош', tt: 'Архитектур бөтенлек' },
  architectureBody: { ru: 'Сохраняем эстетику здания, интегрируя рекламные конструкции как часть фасадного решения.', be: 'Захоўваем эстэтыку будынка, інтэгруючы рэкламныя канструкцыі як частку фасаднага рашэння.', kk: 'Жарнама конструкцияларын қасбеттік шешімнің бөлігі ретінде біріктіріп, ғимарат эстетикасын сақтаймыз.', en: 'We preserve the building aesthetic by integrating signage as part of the facade concept.', zh: '我们将广告结构融入 фасад 方案，保持建筑美学完整。', ce: 'Реклама конструкцеш фасадан шийларан декъан юккъе доьхьалуш, цIенан эстетика лардо.', tt: 'Реклама конструкцияләрен фасад концепциясенең өлеше итеп кертеп, бинаның эстетикасын саклыйбыз.' },
} as const;

const benefits = [
  {
    icon: Scale,
    titleKey: 'riskTitle' as const,
    bodyKey: 'riskBody' as const,
    metric: '500 000 ₽',
    metricLabel: { ru: 'экономия на штрафах', en: 'saved in fines', be: 'эканомія на штрафах', kk: 'айыппұлдардан үнемдеу', zh: '罚款节省', ce: 'штрафашна экономи', tt: 'штрафлардан экономия' },
  },
  {
    icon: Building2,
    titleKey: 'architectureTitle' as const,
    bodyKey: 'architectureBody' as const,
    metric: '902-ПП',
    metricLabel: { ru: 'полное соответствие', en: 'full compliance', be: 'поўная адпаведнасць', kk: 'толық сәйкестік', zh: '完全合规', ce: 'дерриг нийсъяр', tt: 'тулы туры килү' },
  },
];

export default function Safety() {
  const { locale } = useLanguage();

  return (
    <section id="audit" className="relative scroll-mt-28 section-padding overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16 px-6">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-8 w-8 rounded-xl bg-accent/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-accent" />
              </div>
              <span className="verge-mono-label text-accent tracking-[0.15em]">
                {t(locale, copy.badge)}
              </span>
              <div className="h-px flex-1 bg-outline" />
            </div>
            <h2 className="geist-display-lg md:text-[48px] lg:text-[56px] text-on-surface">
              {t(locale, copy.titleTop)}{' '}
              <span className="text-on-surface-variant/40">{t(locale, copy.titleBottom)}</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-on-surface-variant text-[17px] leading-relaxed border-l-2 border-accent/20 pl-8 py-2">
              {t(locale, copy.body)}
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mb-12">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-outline/50 bg-surface p-8 md:p-10 hover:shadow-lg hover:border-accent/30 transition-all duration-500"
              >
                {/* Subtle background glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-surface-variant/50 border border-outline/50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-on-surface-variant" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl md:text-3xl font-semibold text-on-surface tracking-tight">
                        {benefit.metric}
                      </p>
                      <p className="text-[11px] text-on-surface-variant/60 font-medium mt-1">
                        {t(locale, benefit.metricLabel)}
                      </p>
                    </div>
                  </div>

                  <h3 className="geist-display-sm text-on-surface mb-3">
                    {t(locale, copy[benefit.titleKey])}
                  </h3>
                  <p className="text-on-surface-variant text-[15px] leading-relaxed">
                    {t(locale, copy[benefit.bodyKey])}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex justify-center px-6"
        >
          <button className="geist-button-secondary gap-3">
            <ShieldCheck className="w-4 h-4 text-accent" />
            {t(locale, copy.cta)}
            <ArrowRight className="w-4 h-4 opacity-40" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

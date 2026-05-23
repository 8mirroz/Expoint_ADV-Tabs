"use client";
import { ShieldCheck, CheckSquare, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { cn } from '@/lib/utils';
import SafetyRiskQuiz from '@/components/sections/SafetyRiskQuiz';

const copy = {
  badge: { ru: 'Протокол соответствия', be: 'Пратакол адпаведнасці', kk: 'Сәйкестік хаттамасы', en: 'Compliance Protocol', ko: '규정 적합 프로토콜', zh: '合规协议', hi: 'कम्प्लायंस प्रोटोकॉल', ce: 'Нийсъяр протокол', tt: 'Туры килү протоколы' },
  titleTop: { ru: 'Согласование', be: 'Узгадненне', kk: 'Келісу', en: 'Approvals', ko: '승인', zh: '审批', hi: 'अनुमोदन', ce: 'ДIаяхьар', tt: 'Килештерү' },
  titleBottom: { ru: 'без компромиссов.', be: 'без кампрамісаў.', kk: 'ымырасыз.', en: 'without compromise.', ko: '타협 없이.', zh: '毫不妥协。', hi: 'बिना समझौते।', ce: 'компромисс боцуш.', tt: 'компромисссыз.' },
  body: { ru: 'В Москве действуют жесткие регламенты 902-ПП. Мы проводим предварительный аудит вашего фасада, гарантируя соответствие архитектурному коду города до начала производства.', be: 'У Маскве дзейнічаюць жорсткія рэгламенты 902-ПП. Мы праводзім папярэдні аўдыт вашага фасада, гарантуючы адпаведнасць архітэктурнаму коду горада да пачатку вытворчасці.', kk: 'Мәскеуде 902-ПП бойынша қатаң регламенттер бар. Біз өндіріс басталғанға дейін қасбетіңізге алдын ала аудит жүргізіп, қаланың сәулеттік кодына сәйкестігін қамтамасыз етеміз.', en: 'Moscow enforces strict 902-PP regulations. We audit your facade in advance to ensure it matches the city architectural code before production begins.', ko: '모스크바에는 엄격한 902-PP 규정이 적용됩니다. 생산 전 파사드를 사전 검토해 도시 건축 코드에 맞는지 확인합니다.', zh: '莫斯科执行严格的 902-ПП 规范。我们会在生产前先审查您的门头，确保符合城市建筑代码。', hi: 'मॉस्को में 902-ПП के कड़े नियम लागू हैं। उत्पादन शुरू होने से पहले हम आपके फैसाड का ऑडिट करते हैं और उसे शहर के आर्किटेक्चरल कोड के अनुसार जांचते हैं।', ce: 'Москвахь 902-ПП тIехь къовсаман регламентанаш ю. Тхуна шун фасад алдын аудит йо, кхоллам юьхьанца шаьржин архитектуран кодца нийса хилийта.', tt: 'Мәскәүдә 902-ПП буенча катгый регламентлар эшли. Без җитештерү башланганчы фасадыгызны алдан аудитлап, шәһәр архитектура коды белән туры килүен гарантиялибез.' },
  riskTitle: { ru: 'Снижение правовых рисков', be: 'Зніжэнне прававых рызык', kk: 'Құқықтық тәуекелді азайту', en: 'Legal Risk Mitigation', ko: '법적 리스크 최소화', zh: '法律风险控制', hi: 'कानूनी जोखिम में कमी', ce: 'Хьакъикъатан риск къасто', tt: 'Хокукый рискларны киметү' },
  riskBody: { ru: 'Исключаем штрафы до 500 000 ₽ через точное соблюдение архитектурных границ и дизайн-кода.', be: 'Выключаем штрафы да 500 000 ₽ праз дакладнае выкананне архітэктурных межаў і дызайн-кода.', kk: 'Сәулеттік шекаралар мен дизайн-кодты дәл сақтау арқылы 500 000 ₽ дейінгі айыппұлдардың алдын аламыз.', en: 'We eliminate fines up to 500,000 RUB by adhering precisely to architectural limits and design-code rules.', ko: '건축 경계와 디자인 코드를 정확히 지켜 최대 500,000 ₽의 벌금을 예방합니다.', zh: '通过严格遵守建筑边界和 design 规范，避免最高 500,000 ₽ 的罚款。', hi: 'आर्किटेक्चरल सीमाओं और डिज़ाइन-कोड का सटीक पालन करके हम 500,000 ₽ तक के जुर्माने का जोखिम हटाते हैं।', ce: 'Архитектуран чегараш а дизайн-код а дика лардоьзна, 500 000 ₽ кхаччан штрафаш юьзна йоцу.', tt: 'Архитектура чикләрен һәм дизайн-кодны төгәл үтәп, 500 000 ₽ кадәр штрафларны булдырмыйбыз.' },
  architectureTitle: { ru: 'Архитектурная целостность', be: 'Архітэктурная цэласнасць', kk: 'Сәулеттік тұтастық', en: 'Architectural Integrity', ko: '건축 일체감', zh: '建筑完整性', hi: 'आर्किटेक्चरल अखंडता', ce: 'Архитектуран цIанош', tt: 'Архитектур бөтенлек' },
  architectureBody: { ru: 'Сохраняем эстетику здания, интегрируя рекламные конструкции как часть фасадного решения.', be: 'Захоўваем эстэтыку будынка, інтэгруючы рэкламную канструкцыю як частку фасаднага рашэння.', kk: 'Жарнама конструкцияларын қасбеттік шешімнің бөлігі ретінде біріктіріп, ғимарат эстетикасын сақтаймыз.', en: 'We preserve the building aesthetic by integrating signage as part of the facade concept.', ko: '사인 구조물을 파사드 컨셉의 일부로 통합해 건물의 미감을 유지합니다.', zh: '我们将广告结构作为门头方案的一部分整合进去，保持建筑美学完整。', hi: 'हम विज्ञापन संरचनाओं को फैसाड कॉन्सेप्ट का हिस्सा बनाकर इमारत की एस्थेटिक्स को सुरक्षित रखते हैं।', ce: 'Реклама конструкцеш фасадан шийларан декъан юккъе доьхьалуш, цIенан эстетика лардо.', tt: 'Реклама конструкцияләрен фасад концепциясенең өлеше итеп кертеп, бинаның эстетикасын саклыйбыз.' },
} as const;

const benefits = [
  {
    icon: CheckSquare,
    titleKey: 'architectureTitle' as const,
    bodyKey: 'architectureBody' as const,
    metric: '902-ПП',
    metricLabel: { ru: 'полное соответствие', en: 'full compliance', be: 'поўная адпаведнасць', kk: 'толық сәйкестік', ko: '완전 적합', zh: '完全合规', hi: 'पूर्ण अनुपालन', ce: 'дерриг нийсъяр', tt: 'тулы туры килү' },
    colorClass: 'text-green-500',
    bgClass: 'bg-green-500/10',
    borderClass: 'border-green-500/20',
    highContrast: false
  },
  {
    icon: AlertCircle,
    titleKey: 'riskTitle' as const,
    bodyKey: 'riskBody' as const,
    metric: '500 000 ₽',
    metricLabel: { ru: 'риск штрафа', en: 'risk of fine', be: 'рызыка штрафу', kk: 'айыппұл тәуекелі', ko: '벌금 리스크', zh: '罚款风险', hi: 'जुर्माने का जोखिम', ce: 'штрафан риск', tt: 'штраф куркынычы' },
    colorClass: 'text-error',
    bgClass: 'bg-error/15',
    borderClass: 'border-error/40',
    highContrast: true
  },
];

export default function Safety() {
  const { locale } = useLanguage();

  return (
    <section id="audit" className="relative scroll-mt-28 section-padding overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16 sm:px-6">
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
            <h2 className="geist-display-lg lg:text-[56px] text-on-surface title-hover-group">
              <span className="title-hover-gradient">{t(locale, copy.titleTop)}</span>{' '}
              <span className="title-hover-gradient text-on-surface-variant/40">{t(locale, copy.titleBottom)}</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-on-surface-variant text-base leading-relaxed border-l-2 border-[#00ffa3] pl-8 py-2">
              {t(locale, copy.body)}
            </p>
          </div>
        </div>

        <div className="sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className={cn(
                    "group relative rounded-3xl border p-8 overflow-hidden flex flex-col h-full transition-all duration-500",
                    benefit.highContrast 
                      ? "bg-surface-variant/40 border-error/30 shadow-[0_0_40px_rgba(238,0,0,0.05)]" 
                      : "bg-surface-variant/20 border-outline/60"
                  )}
                >
                  {/* Left: Premium Glowing Icon Container */}
                  <div className={cn(
                    "w-12 h-12 rounded-xl border flex items-center justify-center mb-10 transition-all duration-500",
                    benefit.highContrast 
                      ? "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]" 
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]"
                  )}>
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  
                  {/* Right: Highly Expressive Glowing Gradient Metric */}
                  <div className="absolute top-8 right-8 text-right flex flex-col items-end">
                    <span className={cn(
                      "text-[28px] md:text-[32px] font-bold tracking-tight leading-none font-mono drop-shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]",
                      benefit.highContrast 
                        ? "bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(239,68,68,0.25)]" 
                        : "bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    )}>
                      {benefit.metric}
                    </span>
                    <p className="text-[10px] text-on-surface-variant/40 font-mono font-bold mt-1.5 uppercase tracking-[0.2em]">
                      {t(locale, benefit.metricLabel)}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">
                      {t(locale, copy[benefit.titleKey])}
                    </h3>
                    <p className="text-on-surface-variant/70 text-sm leading-relaxed max-w-[240px]">
                      {t(locale, copy[benefit.bodyKey])}
                    </p>
                  </div>

                  {benefit.highContrast && (
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-error/5 rounded-full blur-3xl -mr-16 -mb-16 pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
            
            <SafetyRiskQuiz />
          </div>
        </div>
      </div>
    </section>
  );
}

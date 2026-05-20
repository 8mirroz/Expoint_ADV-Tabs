'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Zap, 
  Shield, 
  Cpu, 
  Layers, 
  ChevronDown,
  Info,
  Maximize2,
  FileText,
  Activity,
  DollarSign
} from 'lucide-react';
import { Service } from '@/data/services';
import { useModalStore } from '@/store/useModalStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getServiceHref } from '@/lib/utils';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { FAQAccordion } from '@/components/ui/FAQAccordion';


interface ServicesConsoleClientProps {
  services: Service[];
}

export default function ServicesConsoleClient({ services }: ServicesConsoleClientProps) {
  const [activeId, setActiveId] = useState<string>(services[0]?.id || '');
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(services[0]?.id || null);
  const [faqExpandedIdx, setFaqExpandedIdx] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const openModal = useModalStore((state) => state.openModal);
  const router = useRouter();

  const activeService = services.find(s => s.id === activeId) || services[0];
  const activeIndex = services.findIndex(s => s.id === activeId);

  // Сбор FAQ
  const allFaqs = services.reduce<{ question: string; answer: string; serviceTitle: string }[]>((acc, service) => {
    if (service.faq) {
      service.faq.forEach(f => {
        acc.push({ ...f, serviceTitle: service.title });
      });
    }
    return acc;
  }, []);

  // Воспроизведение видео при переключении
  useEffect(() => {
    if (activeService.previewVideo) {
      const activeVideo = videoRefs.current[activeService.id];
      if (activeVideo) {
        activeVideo.play().catch(() => {});
      }
    }
  }, [activeId, activeService]);

  const handleMobileToggle = (id: string) => {
    setMobileExpandedId(mobileExpandedId === id ? null : id);
  };

  return (
    <div className="w-full">
      
      {/* 1. HORIZONTAL HUD TABS (Desktop / lg and above) */}
      <div className="hidden lg:block max-w-6xl mx-auto px-6 mb-12">
        <div className="flex justify-center p-1.5 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-md relative z-20">
          <div className="flex w-full justify-between items-center gap-1">
            {services.map((service, index) => {
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`flex-1 relative py-4 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 text-center cursor-pointer select-none ${
                    isActive 
                      ? 'text-accent' 
                      : 'text-neutral-450 hover:text-white hover:bg-white/[0.01]'
                  }`}
                >
                  {/* Sliding pill background */}
                  {isActive && (
                    <motion.div 
                      layoutId="hudActiveTab"
                      className="absolute inset-0 bg-accent/[0.04] border border-accent/20 rounded-xl z-0 shadow-[0_0_15px_rgba(0,255,163,0.03)]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center justify-center gap-2 font-mono">
                    <span className={`text-[9px] ${isActive ? 'text-accent' : 'text-neutral-600'}`}>
                      0{index + 1}
                    </span>
                    <span>{service.title.split(' ')[0]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. DESKTOP HUD BENTO GRID (lg and above) */}
      <div className="hidden lg:block section-container max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-12 gap-6 items-stretch"
          >
            
            {/* Bento Block 1: Cinematic Media Console (7 cols) — теперь полностью кликабельный на паспорт направления */}
            <Link
              href={getServiceHref(activeService.id)}
              className="col-span-7 group/media relative rounded-3xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-md overflow-hidden aspect-video shadow-2xl flex flex-col justify-between p-6 cursor-pointer hover:border-accent/30 hover:shadow-[0_0_50px_rgba(0,245,160,0.08)] transition-all duration-300"
              title="Открыть паспорт направления"
            >
              
              {/* background video or gradient */}
              <div className="absolute inset-0 z-0">
                {activeService.previewVideo ? (
                  <video
                    ref={(el) => { videoRefs.current[activeService.id] = el; }}
                    src={activeService.previewVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60 group-hover/media:scale-[1.02] transition-transform duration-1000"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-black via-neutral-900 to-black opacity-80" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              </div>

              {/* Top HUD Row */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    SYS // OPR_0{activeIndex + 1}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00FFA3]" />
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 border border-accent/20 bg-accent/5 text-accent text-[8px] font-mono uppercase tracking-widest rounded-md">
                    902-PP OK
                  </span>
                  <span className="px-2 py-0.5 border border-white/10 bg-white/5 text-neutral-400 text-[8px] font-mono uppercase tracking-widest rounded-md">
                    SLA // FAST
                  </span>
                </div>
              </div>

              {/* Bottom HUD Row */}
              <div className="flex justify-between items-end relative z-10">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">
                    EXPOINT INDUSTRIAL DESIGN
                  </span>
                  <h3 className="text-3xl font-black uppercase text-white tracking-tight">
                    {activeService.title}
                  </h3>
                </div>

                <div 
                  className="w-9 h-9 border border-white/10 bg-white/5 backdrop-blur-md group-hover/media:bg-accent group-hover/media:border-accent group-hover/media:text-black transition-all duration-300 rounded-xl flex items-center justify-center text-white shrink-0"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* HUD Hover grid effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,163,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,163,0.02)_1px,transparent_1px)] bg-[size:12px_12px] opacity-0 group-hover/media:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
            </Link>

            {/* Bento Block 2: Tech Specification Passport (5 cols) — теперь ведет на характеристики на странице услуги */}
            <Link
              href={`${getServiceHref(activeService.id)}#anatomy`}
              className="col-span-5 group/passport relative rounded-3xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-md p-6 flex flex-col justify-between overflow-hidden shadow-2xl cursor-pointer hover:border-accent/30 hover:shadow-[0_0_50px_rgba(0,245,160,0.08)] transition-all duration-300"
              title="Открыть характеристики"
            >
              
              {/* HUD top row */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  REG // COMP_0{activeIndex + 1}
                </span>
                <div 
                  className="w-9 h-9 border border-white/10 bg-white/5 backdrop-blur-md group-hover/passport:bg-accent group-hover/passport:border-accent group-hover/passport:text-black transition-all duration-300 rounded-xl flex items-center justify-center text-white shrink-0"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 relative z-10 flex-1">
                <div>
                  <span className="verge-kicker text-accent">Tech Passport</span>
                  <h4 className="text-xl font-bold uppercase text-white mt-1 tracking-tight">Характеристики</h4>
                </div>

                <p className="text-sm text-neutral-350 leading-relaxed font-light">
                  {activeService.shortDescription} {activeService.fullDescription.slice(0, 85)}...
                </p>

                {/* Grid of specs */}
                {activeService.technicalSpecs && (
                  <div className="grid grid-cols-2 gap-3 my-4">
                    {activeService.technicalSpecs.slice(0, 4).map((spec, i) => (
                      <div key={i} className="border border-white/5 bg-white/[0.01] p-3.5 rounded-xl space-y-1 relative group/item">
                        <span className="block text-[8px] font-mono uppercase tracking-wider text-neutral-500">{spec.label}</span>
                        <span className="block text-xs text-white font-bold truncate group-hover/item:text-accent transition-colors">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Micro specs */}
              <div className="flex flex-wrap gap-1.5 relative z-10 mt-4 border-t border-white/5 pt-4">
                {activeService.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-accent" />
                    <span className="text-[9px] text-neutral-300 font-medium uppercase font-mono tracking-wider">{feat}</span>
                  </div>
                ))}
              </div>

              {/* HUD Hover grid effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,163,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,163,0.02)_1px,transparent_1px)] bg-[size:12px_12px] opacity-0 group-hover/passport:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
            </Link>            {/* Bento Block 3: Engineering Memorandum & pricing CTA (12 cols) */}
            <div className="col-span-12 group/memo relative rounded-3xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-md p-6 md:p-8 overflow-hidden shadow-2xl">
              
              {/* HUD top row */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  OPS // EST_0{activeIndex + 1}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover/memo:bg-accent group-hover/memo:shadow-[0_0_8px_#00FFA3] transition-all duration-300" />
              </div>

              <div className="grid grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left side: Engineering Memorandum (8 cols) — ведет на SLA регламенты на странице услуги */}
                {activeService.expertNotes && (
                  <Link
                    href={`${getServiceHref(activeService.id)}#process`}
                    className="col-span-8 space-y-5 border-r border-white/5 pr-8 block cursor-pointer group/memolink hover:border-r-accent/30 transition-all duration-300"
                    title="Подробнее об этапах и SLA"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-accent" />
                        <h4 className="text-xs font-mono uppercase tracking-widest text-white group-hover/memolink:text-accent transition-colors">ENGINEERING MEMORANDUM</h4>
                      </div>
                      <div className="w-6 h-6 border border-white/10 bg-white/5 group-hover/memolink:bg-accent group-hover/memolink:border-accent group-hover/memolink:text-black transition-all duration-300 rounded-lg flex items-center justify-center text-white shrink-0">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <span className="block font-mono uppercase tracking-widest text-accent text-[10px] md:text-xs font-bold">Материалы сборки</span>
                        <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-light">{activeService.expertNotes.materials}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="block font-mono uppercase tracking-widest text-accent text-[10px] md:text-xs font-bold">Ограничения фасадного размещения</span>
                        <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-light">{activeService.expertNotes.constraints}</p>
                      </div>
                    </div>

                    {/* Timeline of process */}
                    {activeService.processSteps && (
                      <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/5 relative">
                        {activeService.processSteps.map((step, i) => (
                          <div key={i} className="space-y-2.5 relative group/step">
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-xs font-mono text-neutral-300 group-hover/step:border-accent/40 group-hover/step:bg-accent/5 group-hover/step:text-accent transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.3)] shrink-0">
                                0{i + 1}
                              </span>
                              <span className="text-xs md:text-[13px] font-black uppercase text-white tracking-wider group-hover/step:text-accent/90 transition-colors duration-300 truncate" title={step.title}>
                                {step.title}
                              </span>
                            </div>
                            <p className="text-[11px] md:text-xs text-neutral-400 leading-relaxed font-light group-hover/step:text-neutral-300 transition-colors duration-300">
                              {step.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </Link>
                )}

                {/* Right side: Pricing and Rainbow CTA (4 cols) */}
                <div className="col-span-4 space-y-6 flex flex-col justify-center pl-4">
                  <div className="space-y-1 text-center md:text-left">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                      Базовый Инженерный Тариф
                    </span>
                    <div className="flex items-baseline justify-center md:justify-start gap-2 mt-1">
                      <span className="text-[9px] font-mono text-accent uppercase tracking-wider self-end mb-2">от</span>
                      <span className="text-5xl font-black text-white leading-none font-mono tracking-tight">
                        {activeService.basePrice.toLocaleString('ru-RU')}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                        {activeService.priceUnit}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {/* Primary Button: Online Price Builder */}
                    <HoverBorderGradient 
                      onClick={() => router.push(`${getServiceHref(activeService.id)}#calculator`)}
                      containerClassName="w-full hover:scale-[1.02] active:scale-[0.97] transition-all cursor-pointer"
                      className="w-full h-[52px] rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-accent bg-black/90 hover:text-white"
                    >
                      Онлайн-конструктор
                      <ArrowRight className="w-4 h-4" />
                    </HoverBorderGradient>

                    {/* Secondary Button: Quick Modal Request */}
                    <button
                      onClick={() => openModal({ context: `Расчет стоимости: ${activeService.title}`, source: 'services_console_hud' })}
                      className="w-full h-[44px] rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white/90 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Быстрая заявка
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00FFA3]" />
                      <p className="text-neutral-500 text-[9px] font-mono uppercase tracking-wider">
                        SLA // Расчет за 30 минут
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* HUD Hover grid effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,163,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,163,0.02)_1px,transparent_1px)] bg-[size:12px_12px] opacity-0 group-hover/memo:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. MOBILE BENTO ACCORDION STACK (md and below) */}
      <div className="lg:hidden space-y-4 px-6">
        <div className="mb-6">
          <span className="verge-kicker text-accent">Service Directory</span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mt-1">
            Наши Услуги
          </h2>
          <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
            Производственные направления наружной и интерьерной рекламы
          </p>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => {
            const isExpanded = mobileExpandedId === service.id;
            return (
              <div 
                key={service.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? 'border-accent/30 bg-white/[0.03] shadow-[0_0_20px_rgba(0,255,163,0.03)]' 
                    : 'border-white/5 bg-transparent'
                }`}
              >
                {/* Header Switcher */}
                <button
                  onClick={() => handleMobileToggle(service.id)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-accent">0{index + 1}</span>
                      <h3 className="font-black text-base text-white uppercase tracking-tight">{service.title}</h3>
                    </div>
                    {!isExpanded && (
                      <p className="text-xs text-neutral-400 line-clamp-1 max-w-[240px]">
                        {service.shortDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right shrink-0">
                      <span className="block text-[8px] font-mono uppercase text-neutral-500">от</span>
                      <span className="font-black text-sm text-white">
                        {service.basePrice.toLocaleString('ru-RU')} {service.priceUnit.split('/')[0]}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-accent' : ''}`} />
                  </div>
                </button>

                {/* Expanded Content Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 pt-2 border-t border-white/5 space-y-5">
                        {/* Video / Gradient */}
                        <div className="relative rounded-xl overflow-hidden aspect-video border border-white/5 bg-black/40">
                          {service.previewVideo ? (
                            <video
                              src={service.previewVideo}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover opacity-80"
                            />
                          ) : (
                            <div className="w-full h-full bg-linear-to-br from-black to-surface opacity-80 flex items-center justify-center">
                              <Sparkles className="w-8 h-8 text-accent/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        </div>

                        {/* Descriptions */}
                        <p className="text-sm text-neutral-300 leading-relaxed font-light">
                          {service.fullDescription}
                        </p>

                        {/* Features Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-3 py-1 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                              <span className="text-[10px] text-neutral-200">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Technical Specs bento */}
                        {service.technicalSpecs && (
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            {service.technicalSpecs.map((spec, i) => (
                              <div key={i} className="border border-white/5 bg-white/[0.01] p-3.5 rounded-xl space-y-1">
                                <span className="block text-[8px] font-mono uppercase tracking-wider text-neutral-500">{spec.label}</span>
                                <span className="block text-xs text-white font-bold truncate">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Expert Notes */}
                        {service.expertNotes && (
                          <div className="border border-accent/15 bg-accent/[0.01] p-5 rounded-xl space-y-4">
                            <span className="block text-[10px] font-mono uppercase tracking-wider text-accent">Спецификация производства</span>
                            <div className="space-y-2.5 text-xs text-neutral-300">
                              <div>
                                <span className="block text-[9px] text-neutral-500 uppercase tracking-widest mb-0.5 font-mono">Материалы</span>
                                <p className="font-light">{service.expertNotes.materials}</p>
                              </div>
                              <div>
                                <span className="block text-[9px] text-neutral-500 uppercase tracking-widest mb-0.5 font-mono">Ограничения 902-ПП</span>
                                <p className="font-light">{service.expertNotes.constraints}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* CTA block */}
                        <div className="pt-4 flex flex-col gap-2.5">
                          {/* Primary Button: Online Price Builder */}
                          <HoverBorderGradient
                            onClick={() => router.push(`${getServiceHref(service.id)}#calculator`)}
                            containerClassName="w-full hover:scale-[1.02] active:scale-[0.97] transition-all cursor-pointer"
                            className="w-full h-[46px] text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 text-accent bg-black/90 hover:text-white"
                          >
                            Онлайн-конструктор
                            <ArrowRight className="w-3.5 h-3.5" />
                          </HoverBorderGradient>

                          {/* Secondary Grid: Quick Request & More Info */}
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => openModal({ context: `Мобильный расчет: ${service.title}`, source: 'services_console_mobile' })}
                              className="w-full h-12 text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center cursor-pointer text-white/90 transition-all duration-300"
                            >
                              Быстрая заявка
                            </button>
                            <Link
                              href={getServiceHref(service.id)}
                              className="w-full h-12 text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center cursor-pointer text-white/90 transition-all duration-300"
                            >
                              Все параметры
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. INTEGRATED SEO FAQ ACCORDION SECTION */}
      {allFaqs.length > 0 && (
        <section className="mt-16 pt-12 border-t border-white/5 section-container max-w-4xl px-6">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <span className="verge-kicker text-accent">FAQS & COMPLIANCE</span>
              <h2 className="geist-display-lg text-white">
                Часто Задаваемые Вопросы
              </h2>
              <p className="text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
                Инженерные регламенты, юридические согласования, сроки службы изделий и спецификации материалов.
              </p>
            </div>

            <FAQAccordion items={allFaqs} variant="console" />
          </div>
        </section>
      )}
    </div>
  );
}

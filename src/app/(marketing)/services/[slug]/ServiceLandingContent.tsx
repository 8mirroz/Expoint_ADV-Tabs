'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '@/data/services';
import { BentoGrid } from '@/components/ui/bento/BentoGrid';
import { BentoCard } from '@/components/ui/bento/BentoCard';
import { PriceCalculator } from '@/components/features/calculator/PriceCalculator';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { tracker } from '@/lib/analytics/tracker';
import { 
  Zap, 
  ShieldCheck, 
  Target, 
  Box, 
  Layers, 
  Truck,
  ChevronDown,
  Info,
  Maximize2,
  Activity,
  Cpu,
  Fingerprint
} from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';
import ConsultationModal from '@/components/ui/ConsultationModal';
import { MaterialComparison } from '@/components/sections/MaterialComparison';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

interface ServiceLandingContentProps {
  service: Service;
}

export function ServiceLandingContent({ service }: ServiceLandingContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const openModal = useModalStore((state) => state.openModal);
  const { locale } = useLanguage();
  const icons = [Zap, ShieldCheck, Target, Box, Layers, Truck];

  // Specific videos based on service type
  const getServiceVideo = () => {
    if (service.id === 'volumetric-letters' || service.id === 'signs') {
      return '/mp4/grok-video-4ba46673-a719-4e79-aa78-bd36329160e8 (1).mp4';
    }
    if (service.id === 'lightbox') {
      return '/mp4/grok-video-4ad41f12-1475-47c4-93d5-b42463ff34fc.mp4';
    }
    return service.previewVideo;
  };

  const previewVideo = getServiceVideo();

  useEffect(() => {
    tracker.track('page_view', { service: service.id });
  }, [service.id]);

  useGSAP(() => {
    // 1. Hero Entrance (Cinematic)
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.8 })
      .from('.hero-title', { opacity: 0, y: 60, duration: 1.2 }, '-=0.4')
      .from('.hero-desc', { opacity: 0, y: 30, duration: 1 }, '-=0.8');

    // 2. Parallax Background Glow
    gsap.to('.hero-glow', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 150,
      scale: 1.4,
      opacity: 0.4,
    });

    // 3. Bento Cards Staggered Reveal
    gsap.from('.bento-card-wrapper', {
      scrollTrigger: {
        trigger: '.bento-grid-section',
        start: 'top 70%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'expo.out',
    });

    // 4. Section Title Reveal
    gsap.utils.toArray<HTMLElement>('.section-title').forEach((title) => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    // 5. Calculator Float Effect
    gsap.from('.calculator-container', {
      scrollTrigger: {
        trigger: '.calculator-container',
        start: 'top 80%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.75)',
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-on-surface">
      {/* Cinematic Hero */}
      <section className="hero-section relative min-h-[90vh] flex items-center px-6 overflow-hidden bg-black">
        {/* Cinematic Video Background */}
        {previewVideo && (
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover opacity-60 grayscale scale-105"
            >
              <source src={previewVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-background" />
            <div className="absolute inset-0 industrial-grid opacity-20" />
            
            {/* Technical Scanlines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,107,0,0.05)_2px,transparent_3px)]" />
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-badge inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/40 border border-white/10 text-accent text-[10px] font-black tracking-[0.4em] uppercase backdrop-blur-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Technical Core V5
            </motion.div>
            
            <h1 className="hero-title text-6xl md:text-[120px] font-black tracking-tighter leading-[0.8] max-w-5xl uppercase text-white">
              {service.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? 'text-accent' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <p className="hero-desc text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed font-light border-l border-accent/30 pl-8">
              {service.fullDescription}
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <button 
                onClick={() => openModal({ context: `Hero: ${service.title}`, source: 'service_page' })}
                className="px-12 py-6 bg-accent text-white font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-transform"
              >
                {locale === 'ru' ? 'Получить консультацию' : 'Get Consultation'}
              </button>
              <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                <Activity className="w-4 h-4 text-accent" />
                <span>Status: Production_Ready</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] rotate-90 mb-4">Scroll</span>
          <div className="w-px h-12 bg-linear-to-b from-accent to-transparent animate-pulse" />
        </div>
      </section>

      {/* Technical Blueprint Section */}
      {service.technicalSpecs && (
        <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-accent" />
                  <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">Technical Protocol</span>
                </div>
                <h2 className="section-title text-5xl md:text-6xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">
                  {locale === 'ru' ? 'Инженерный' : 'Engineering'} <br/> 
                  <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Стандарт' : 'Standard'}</span>
                </h2>
                <p className="text-on-surface-variant leading-relaxed max-w-lg font-light text-lg">
                  {locale === 'ru' 
                    ? 'Промышленные параметры, гарантирующие долговечность и полное соответствие нормам безопасности 902-ПП.' 
                    : 'Industrial parameters ensuring durability and full compliance with 902-PP safety standards.'}
                </p>
              </div>
              <div className="grid gap-2">
                {service.technicalSpecs.map((spec, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center justify-between p-6 bg-surface border border-outline group hover:border-accent/40 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/0 group-hover:bg-accent transition-colors" />
                    <span className="text-on-surface-variant font-mono text-[11px] uppercase tracking-widest">{spec.label}</span>
                    <span className="font-black text-lg tracking-tight text-on-surface group-hover:text-accent transition-colors">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* High-Fidelity Blueprint Visualizer */}
            <div className="relative aspect-square bg-black border border-white/5 p-1 flex items-center justify-center overflow-hidden shadow-2xl group rounded-none">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 industrial-grid opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
                <div className="absolute inset-0 bg-linear-to-tr from-accent/5 via-transparent to-transparent" />
                
                {/* Technical Borders */}
                <div className="absolute inset-4 border border-white/5 pointer-events-none" />
                <div className="absolute inset-8 border border-white/5 pointer-events-none" />
                
                {/* Coordinates & Technical Markers */}
                <div className="absolute top-8 left-8 text-[9px] font-mono text-white/30 uppercase tracking-tighter flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent" />
                    <span>System_Check: PASS</span>
                  </div>
                  <span>Coord: 55.7558° N, 37.6173° E</span>
                </div>
                
                <div className="absolute top-8 right-8 text-[9px] font-mono text-white/30 uppercase tracking-tighter text-right flex flex-col gap-1">
                  <span>Timestamp: {new Date().toISOString().slice(0, 10)}</span>
                  <span className="text-accent">Auth: SECURE_CORE</span>
                </div>

                <div className="absolute bottom-24 left-8 text-[9px] font-mono text-white/30 uppercase tracking-tighter">
                  <div className="flex items-center gap-2 mb-1">
                    <Cpu className="w-3 h-3" />
                    <span>Unit: EX-902PP</span>
                  </div>
                  <span>Scale: 1:25</span>
                </div>
                
                <div className="relative w-full h-full flex items-center justify-center">
                   {/* Dynamic Schematic Lines */}
                   <div className="absolute inset-0 overflow-hidden pointer-events-none">
                     <div className="absolute top-1/2 left-0 w-full h-px bg-white/10" />
                     <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
                     
                     {/* Scanning Effect */}
                     <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-transparent via-accent/20 to-transparent -translate-y-full animate-scan pointer-events-none opacity-40" />
                   </div>

                   {/* Central Visualizer */}
                   <div className="relative w-[80%] h-[80%] border border-accent/20 flex items-center justify-center">
                      <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-accent" />
                      <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-accent" />
                      <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-accent" />
                      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-accent" />
                      
                      {/* Technical Circles */}
                      <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />
                      <div className="absolute inset-0 border border-white/5 rounded-full scale-75" />
                      <div className="absolute inset-0 border border-white/5 rounded-full scale-90" />
                      
                      <div className="text-center space-y-4">
                         <motion.div 
                           animate={{ scale: [1, 1.02, 1], opacity: [0.2, 0.4, 0.2] }}
                           transition={{ duration: 4, repeat: Infinity }}
                           className="text-white"
                         >
                           {service.id === 'volumetric-letters' ? <Fingerprint size={120} strokeWidth={0.5} /> : <Box size={120} strokeWidth={0.5} />}
                         </motion.div>
                         <div className="text-[10px] font-mono text-accent/60 tracking-[0.8em] uppercase">Visualizing_Core</div>
                      </div>
                   </div>
                </div>

                {/* Status Bar */}
                <div className="absolute bottom-24 right-8 flex gap-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-1 h-3 bg-white/10 group-hover:bg-accent/40 transition-colors" style={{ transitionDelay: `${i * 100}ms` }} />
                   ))}
                </div>

                {/* Decorative Overlay Label */}
                <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black to-transparent">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Maximize2 className="w-3 h-3 text-accent" />
                        <span className="text-[9px] font-mono text-accent uppercase tracking-[0.4em]">Engine_Core_Active</span>
                      </div>
                      <span className="block text-2xl font-black text-white uppercase tracking-tighter">EX-ARCH-GEN5</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">Tolerances</span>
                      <span className="block text-2xl font-black text-white uppercase tracking-tighter">±0.001mm</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Bento Features */}
      <section className="bento-grid-section py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">Quality Vector</span>
            </div>
            <h2 className="section-title text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
              {locale === 'ru' ? 'Преимущества' : 'Advantages'} <br/> 
              <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Решения' : 'Solutions'}</span>
            </h2>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-mono text-on-surface-variant/40 uppercase tracking-widest border-l border-outline pl-8">
            <div className="space-y-1">
              <div className="text-on-surface font-black">ISO-9001:2015</div>
              <div>CERTIFIED_WORKFLOW</div>
            </div>
            <div className="space-y-1">
              <div className="text-on-surface font-black">902-PP</div>
              <div>COMPLIANCE_GATE</div>
            </div>
          </div>
        </div>
        
        <BentoGrid>
          {service.features.map((feature, idx) => {
            const Icon = icons[idx % icons.length];
            const hasVideo = (service.id === 'volumetric-letters' || service.id === 'lightbox') && idx % 2 === 0;
            
            return (
              <div key={idx} className="bento-card-wrapper h-full group min-h-[450px]">
                <div className="relative h-full bg-surface border border-outline transition-all duration-700 group-hover:border-accent/40 rounded-none overflow-hidden flex flex-col justify-between">
                   {/* Background Visual (Video or Industrial Grid) */}
                   <div className="absolute inset-0 z-0">
                      {hasVideo ? (
                        <>
                          <video 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            className="w-full h-full object-cover opacity-10 grayscale group-hover:opacity-30 transition-opacity duration-1000 scale-105 group-hover:scale-100"
                          >
                            <source src={previewVideo} type="video/mp4" />
                          </video>
                          <div className="absolute inset-0 bg-linear-to-b from-transparent via-surface/40 to-surface" />
                        </>
                      ) : (
                        <div className="absolute inset-0 industrial-grid opacity-10 group-hover:opacity-20 transition-opacity" />
                      )}
                      
                      {/* Decorative Technical Overlay */}
                      <div className="absolute top-6 right-6 font-mono text-[8px] text-on-surface-variant/20 uppercase tracking-[0.4em] pointer-events-none">
                        Feature_ID: 0{idx + 1} // SYS_CORE
                      </div>
                   </div>

                   <div className="relative z-10 p-10 flex flex-col justify-between h-full">
                     <div className="space-y-8">
                       <div className="w-14 h-14 bg-accent/5 border border-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-700 rounded-none relative">
                         <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                         <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                       
                       <div className="space-y-4">
                         <h3 className="text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">
                           {feature}
                         </h3>
                         <div className="h-px w-12 bg-accent/20 group-hover:w-full transition-all duration-700" />
                         <p className="text-on-surface-variant text-sm leading-relaxed font-light">
                           {locale === 'ru' 
                             ? 'Высокотехнологичный процесс производства с использованием сертифицированных материалов и многоуровневым контролем качества на каждом этапе сборки.' 
                             : 'High-tech production process using certified materials and multi-level quality control at every stage of assembly.'}
                         </p>
                       </div>
                     </div>
                     
                     <div className="mt-8 pt-8 border-t border-outline/50 flex items-end justify-between">
                       <div className="space-y-2">
                         <div className="flex gap-1">
                           {[1,2,3,4].map(i => (
                             <div key={i} className={`w-3 h-1 ${i <= (idx + 2) ? 'bg-accent/40' : 'bg-outline'} transition-colors duration-500`} />
                           ))}
                         </div>
                         <span className="block text-[9px] font-mono text-on-surface-variant/40 uppercase tracking-widest">Efficiency_Index: 0.9{idx + 5}</span>
                       </div>
                       
                       <div className="text-right">
                         <div className="text-[10px] font-black text-on-surface uppercase tracking-widest">V5_PRO</div>
                         <div className="text-[8px] font-mono text-on-surface-variant/20 uppercase">Core_Verified</div>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            );
          })}
        </BentoGrid>
      </section>

      {/* Material Comparison Battle */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">Comparative Analysis</span>
            </div>
            <h2 className="section-title text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
              {locale === 'ru' ? 'Битва' : 'Battle of'} <br/> 
              <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Материалов' : 'Materials'}</span>
            </h2>
          </div>
          <p className="text-on-surface-variant max-w-md leading-relaxed font-light text-lg border-l border-accent/20 pl-8">
            {locale === 'ru' 
              ? 'Визуальное сравнение стандартных решений и премиального стандарта Expoint. Прозрачность качества на каждом этапе.' 
              : 'Visual comparison of standard solutions and the premium Expoint standard. Quality transparency at every stage.'}
          </p>
        </div>
        <div className="p-1 bg-outline rounded-[2px]">
          <div className="bg-surface p-1">
            <MaterialComparison />
          </div>
        </div>
      </section>
 
      {/* Pricing Lab Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="flex flex-col items-center text-center mb-20">
           <div className="flex items-center gap-3 mb-6">
             <div className="h-px w-8 bg-accent" />
             <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">Estimation Engine</span>
             <div className="h-px w-8 bg-accent" />
           </div>
           <h2 className="section-title text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
             {locale === 'ru' ? 'Интеллектуальный' : 'Intellectual'} <br/> 
             <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Расчет' : 'Calculation'}</span>
           </h2>
           <p className="text-on-surface-variant max-w-xl font-light text-lg">
             {locale === 'ru' 
               ? 'Получите детальную смету за 30 секунд. Итоговая стоимость может быть оптимизирована при комплексном заказе.' 
               : 'Get a detailed estimate in 30 seconds. The final cost can be optimized for complex orders.'}
           </p>
         </div>
         <div className="calculator-container relative p-1 bg-outline rounded-[2px] overflow-hidden group">
           <div className="absolute inset-0 industrial-grid opacity-5 group-hover:opacity-10 transition-opacity" />
           <div className="relative bg-surface p-6 md:p-12">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-accent/40 via-accent to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <PriceCalculator />
           </div>
         </div>
      </section>
 
      {/* FAQ & Support Section */}
      {service.faq && (
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-accent" />
                  <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">Knowledge Base</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
                  {locale === 'ru' ? 'Частые' : 'Common'} <br/> 
                  <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Вопросы' : 'Questions'}</span>
                </h2>
              </div>
              <div className="p-8 bg-accent/5 border border-accent/20 space-y-6">
                <div className="flex items-center gap-4 text-accent">
                  <Info className="w-6 h-6" />
                  <span className="font-black uppercase tracking-widest text-[10px]">Engineering Support</span>
                </div>
                <p className="text-on-surface-variant text-sm font-light leading-relaxed">
                  {locale === 'ru' 
                    ? 'Не нашли ответ? Наши инженеры готовы проконсультировать вас по любым техническим нюансам вашего проекта.' 
                    : 'Did not find the answer? Our engineers are ready to consult you on any technical nuances of your project.'}
                </p>
                <button 
                  onClick={() => openModal({ context: `FAQ Help: ${service.title}`, source: 'service_page' })}
                  className="w-full py-4 bg-accent text-white font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-transform"
                >
                  {locale === 'ru' ? 'Задать вопрос' : 'Ask Question'}
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-4">
               {service.faq.map((item, idx) => (
                 <div key={idx} className="group overflow-hidden">
                   <button
                     onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                     className={cn(
                       "w-full text-left p-8 bg-surface border transition-all duration-500 relative overflow-hidden",
                       expandedFaq === idx ? "border-accent/40" : "border-outline hover:border-accent/20"
                     )}
                   >
                     <div className={cn(
                       "absolute left-0 top-0 bottom-0 w-1 transition-all duration-500",
                       expandedFaq === idx ? "bg-accent" : "bg-accent/0"
                     )} />
                     
                     <div className="flex items-center justify-between gap-8">
                       <div className="space-y-1">
                         <span className="text-[9px] font-mono text-accent/40 uppercase tracking-[0.3em]">Ref_ID: FAQ_0{idx + 1}</span>
                         <h3 className="font-black text-xl tracking-tight text-on-surface uppercase">{item.question}</h3>
                       </div>
                       <div className={cn(
                         "w-10 h-10 shrink-0 flex items-center justify-center border transition-all duration-500",
                         expandedFaq === idx ? "border-accent/40 rotate-180 bg-accent/5" : "border-outline"
                       )}>
                         <ChevronDown className={cn(
                           "w-5 h-5 transition-colors",
                           expandedFaq === idx ? "text-accent" : "text-on-surface-variant"
                         )} />
                       </div>
                     </div>

                     <AnimatePresence mode="wait">
                       {expandedFaq === idx && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                         >
                           <div className="pt-8 mt-8 border-t border-outline/30">
                             <p className="text-on-surface-variant text-base leading-relaxed font-light">
                               {item.answer}
                             </p>
                             
                             <div className="mt-8 flex items-center gap-6">
                               <div className="flex items-center gap-2">
                                 <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                                 <span className="text-[9px] font-mono text-on-surface-variant/40 uppercase tracking-widest">Status: Verified_Core</span>
                               </div>
                               <div className="text-[9px] font-mono text-on-surface-variant/40 uppercase tracking-widest">
                                 Updated: {new Date().toLocaleDateString('ru-RU')}
                                </div>
                             </div>
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </button>
                 </div>
               ))}
            </div>
          </div>
        </section>
      )}

      {/* High-Impact Conversion CTA */}
      <section className="py-32 md:py-48 px-6 relative overflow-hidden bg-black">
         {/* Background Visual Engine */}
         <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 industrial-grid opacity-20" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,0,0.1),transparent_70%)]" />
           
           {/* Dynamic Scanning Effect */}
           <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-1/3 bg-linear-to-b from-accent/10 via-transparent to-transparent animate-scan opacity-20" />
             <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-accent/10 via-transparent to-transparent animate-scan-reverse opacity-20" />
           </div>

           {/* Technical Decorative Elements */}
           <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
           <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
           
           <div className="absolute inset-y-0 left-12 w-px bg-white/5 hidden xl:block" />
           <div className="absolute inset-y-0 right-12 w-px bg-white/5 hidden xl:block" />
           
           {/* Industrial Metadata Corners */}
           <div className="absolute top-12 left-12 hidden lg:flex flex-col gap-1 text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">
             <span>Terminal_ID: EXP-CTR-09</span>
             <span>Session_Key: {Math.random().toString(36).substring(7).toUpperCase()}</span>
           </div>
           <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-1 text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">
             <span>Security_Level: ENCRYPTED</span>
             <span>Lat: 55.7558° N | Lon: 37.6173° E</span>
           </div>
         </div>
         
         <div className="max-w-5xl mx-auto relative z-10">
           <div className="flex flex-col items-center gap-12 text-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-4 px-6 py-2 bg-accent/10 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-[0.5em] backdrop-blur-xl"
             >
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
               </span>
               Protocol_Final_Engagement
             </motion.div>
             
             <div className="space-y-8">
               <h2 className="text-6xl md:text-[140px] font-black uppercase tracking-tighter leading-[0.75] text-white">
                 {locale === 'ru' ? 'Запустите' : 'Ignite'} <br /> 
                 <span className="text-accent">{locale === 'ru' ? 'Проект' : 'Project'}</span>
               </h2>
               <div className="relative inline-block mt-8">
                 <p className="text-white/40 text-xl md:text-2xl font-light max-w-2xl mx-auto border-l-2 border-accent pl-8 text-left italic">
                   {locale === 'ru' 
                     ? `Превратите вашу идею в осязаемый актив. Детальный инженерный расчет ${service.title} в течение 2 часов.`
                     : `Transform your idea into a tangible asset. Detailed engineering estimate for ${service.title} within 2 hours.`}
                 </p>
                 <div className="absolute -right-8 top-0 text-accent/20 select-none hidden md:block">
                   <Target size={80} strokeWidth={0.5} />
                 </div>
               </div>
             </div>
  
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-3xl pt-12">
               <motion.button 
                 whileHover={{ scale: 1.02, backgroundColor: '#FF8A00' }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => {
                   tracker.track('cta_click', { type: 'estimate', service: service.id });
                   openModal({ context: `CTA: ${service.title}`, source: 'service_page' });
                 }}
                 className="group relative w-full sm:flex-1 py-10 bg-accent text-white font-black uppercase tracking-[0.4em] text-[11px] overflow-hidden shadow-[0_0_80px_rgba(255,107,0,0.2)] transition-all duration-500"
               >
                 <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                 <span className="relative z-10 flex items-center justify-center gap-3">
                   {locale === 'ru' ? 'Запросить расчет' : 'Request Estimate'}
                   <Zap className="w-5 h-5" />
                 </span>
                 {/* Decorative Corner */}
                 <div className="absolute top-0 right-0 w-8 h-8 bg-black/10 -rotate-45 translate-x-4 -translate-y-4" />
               </motion.button>
               
               <motion.button 
                 whileHover={{ scale: 1.02, borderColor: '#FF9F0A' }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => {
                   tracker.track('cta_click', { type: 'survey', service: service.id });
                   openModal({ context: `Замер: ${service.title}`, source: 'service_page' });
                 }}
                 className="relative w-full sm:flex-1 py-10 bg-transparent border border-white/10 text-white font-black uppercase tracking-[0.4em] text-[11px] hover:text-accent transition-all duration-500 overflow-hidden group"
               >
                 <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                 <span className="relative z-10">{locale === 'ru' ? 'Вызвать замерщика' : 'Book a Surveyor'}</span>
               </motion.button>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full pt-16 border-t border-white/5">
               {[
                 { label: 'SLA_Response', value: '< 120 MIN' },
                 { label: 'PP_Compliance', value: '902-PP_FULL' },
                 { label: 'System_Warranty', value: '60 MONTHS' },
                 { label: 'Visual_Model', value: '3D_RENDER' }
               ].map((stat, i) => (
                 <div key={i} className="text-center space-y-3 group/stat">
                   <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] group-hover/stat:text-accent/40 transition-colors">{stat.label}</div>
                   <div className="text-sm font-black text-white uppercase tracking-tighter group-hover/stat:scale-110 transition-transform">{stat.value}</div>
                 </div>
               ))}
             </div>
           </div>
         </div>
         
         {/* Enhanced Technical Overlay */}
         <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-black to-transparent pointer-events-none" />
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-accent/40 to-transparent" />
      </section>

      <ConsultationModal />
    </div>
  );
}

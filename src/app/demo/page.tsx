'use client';

import PageShell from "@/components/framework/PageShell";
import HoverBorderDemo, { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Sparkles, Cpu, Shield, Zap } from "lucide-react";

export default function DemoPage() {
  return (
    <PageShell headerVariant="immersive" showFooter={true} withMesh={true}>
      <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-16 bg-black relative overflow-hidden">
        {/* Decorative background grids and glows */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,163,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,163,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-4xl w-full px-6 text-center space-y-12 relative z-10">
          {/* Header */}
          <div className="space-y-4">
            <span className="verge-kicker text-accent inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 uppercase text-[10px] tracking-widest font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Component Showcase
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">
              Hover Border Gradient<span className="text-accent">.</span>
            </h1>
            <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed font-light">
              Премиальная интерактивная кнопка с динамическим градиентным свечением по контуру, плавным перетеканием цвета и адаптивной подсветкой при приближении курсора.
            </p>
          </div>

          {/* Interactive Playground / Showcase */}
          <div className="p-8 md:p-12 rounded-3xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-md relative overflow-hidden shadow-2xl flex flex-col items-center justify-center gap-8 min-h-[300px]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,163,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,163,0.01)_1px,transparent_1px)] bg-[size:12px_12px] opacity-100 pointer-events-none z-0" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* The primary demo button imported from the component */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Default Demo Export</span>
                <HoverBorderDemo />
              </div>

              {/* Customized variation: Premium Emerald CTA */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Interactive Custom Callout</span>
                <HoverBorderGradient
                  containerClassName="hover:scale-[1.03] active:scale-[0.96] transition-all cursor-pointer"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-black hover:text-white"
                >
                  <Zap className="w-4 h-4 text-accent fill-accent animate-pulse" />
                  <span>Рассчитать Проект</span>
                </HoverBorderGradient>
              </div>
            </div>

            <div className="text-[11px] font-mono text-neutral-500 max-w-md text-center leading-relaxed">
              * Наведите курсор на кнопки, чтобы запустить вращение градиента. При выходе курсора из активной зоны срабатывает гистерезис плавного угасания.
            </div>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-3">
              <div className="w-8 h-8 rounded-lg border border-accent/20 bg-accent/5 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-white font-bold uppercase text-xs tracking-wider font-mono">React 19 & Motion</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Полная совместимость с Next.js 16+, React 19 и современной библиотекой Motion/React для плавных, аппаратно-ускоренных анимаций.
              </p>
            </div>

            <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-3">
              <div className="w-8 h-8 rounded-lg border border-accent/20 bg-accent/5 flex items-center justify-center">
                <Shield className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-white font-bold uppercase text-xs tracking-wider font-mono">Proximity Pro</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Интеллектуальное отслеживание расстояния до курсора (Proximity) с эффектом гистерезиса для предотвращения мерцания.
              </p>
            </div>

            <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-3">
              <div className="w-8 h-8 rounded-lg border border-accent/20 bg-accent/5 flex items-center justify-center">
                <Zap className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-white font-bold uppercase text-xs tracking-wider font-mono">Tailwind Adaptive</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Легко настраиваемый дизайн через Tailwind CSS-классы, интегрируемый с любой цветовой палитрой и стилем бренда.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

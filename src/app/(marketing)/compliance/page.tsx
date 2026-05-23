'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Info, FileText, CheckCircle2 } from 'lucide-react';
import { ComplianceChecker } from '@/components/compliance/ComplianceChecker';

import PageShell from '@/components/framework/PageShell';

export default function CompliancePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from('.compliance-hero > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.regulation-card', {
        scrollTrigger: {
          trigger: '.regulations-grid',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageShell
      withMesh
      breadcrumbs={[{ label: 'Комплаенс 902-ПП', href: '/compliance' }]}
    >
      <div ref={containerRef} className="min-h-screen pt-32 pb-24 text-on-surface">
        <div className="section-container px-6">
          {/* Header Section */}
          <div className="compliance-hero mb-24 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-primary" />
              <span className="verge-mono-label text-primary uppercase tracking-[0.4em] text-xs">Regulatory Compliance</span>
            </div>
            
            <h1 className="geist-display-lg md:text-[84px] text-on-surface uppercase leading-[0.85] mb-10">
              Ваша реклама <br/>
              <span className="text-on-surface-variant/30">по правилам.</span>
            </h1>
            
            <p className="text-xl text-on-surface-variant leading-relaxed font-light border-l border-primary/20 pl-8 max-w-2xl">
              Мы берем на себя полную ответственность за соответствие ваших конструкций законодательству Москвы и регламенту 902-ПП.
            </p>
          </div>

          {/* Checker Section */}
          <section className="mb-32">
            <div className="mb-12 border-b border-outline/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-on-surface mb-2">Интерактивный чекер</h2>
                <p className="text-on-surface-variant font-light">Алгоритм на базе актуальной редакции постановления от 2024 года</p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">Live Regulation Engine</span>
              </div>
            </div>
            <ComplianceChecker />
          </section>

          {/* Regulations Grid */}
          <section className="mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter text-on-surface">Ключевые регламенты</h2>
              <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-primary" />
                  Актуально на 2024
                </div>
              </div>
            </div>

            <div className="regulations-grid grid md:grid-cols-3 gap-8">
              <RegulationCard 
                icon={<Info size={24} />}
                title="Размещение на фасадах"
                description="Вывески должны располагаться строго в границах занимаемого помещения, не выше линии перекрытий между 1-м и 2-м этажами."
              />
              <RegulationCard 
                icon={<FileText size={24} />}
                title="Типы конструкций"
                description="Разрешены: объемные буквы, световые короба (с ограничениями), консольные панели и витринные конструкции."
              />
              <RegulationCard 
                icon={<Shield size={24} />}
                title="Запрещенные элементы"
                description="Запрещена оклейка витрин пленкой более 50%, бегущие строки, динамическая подсветка и глухие фоновые подложки."
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="p-16 bento-card bg-surface-elevated/20 border-primary/10 overflow-hidden relative">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-black text-on-surface mb-6 uppercase tracking-tighter">Нужен официальный проект?</h2>
                <p className="text-on-surface-variant text-lg font-light leading-relaxed">
                  Для сложных объектов и торговых центров требуется разработка дизайн-проекта и согласование в Департаменте СМИ и рекламы. Наши инженеры сделают это за вас.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 shrink-0">
                <button className="px-10 py-5 bg-primary text-on-primary font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                  Заказать проект
                </button>
                <button className="px-10 py-5 bg-surface border border-outline text-on-surface font-black uppercase tracking-[0.2em] text-xs hover:bg-surface-variant transition-all">
                  Скачать PDF
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}

function RegulationCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="regulation-card p-8 rounded-3xl bg-neutral-900/40 border border-white/5 hover:border-emerald-400/30 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
        {description}
      </p>
    </div>
  );
}

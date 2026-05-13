'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Info, FileText, CheckCircle2 } from 'lucide-react';
import { ComplianceChecker } from '@/components/compliance/ComplianceChecker';

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
    <div ref={containerRef} className="min-h-screen bg-black pt-32 pb-20 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header Section */}
        <div className="compliance-hero text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-6"
          >
            <Shield size={16} />
            Регуляторный хаб: Постановление 902-ПП
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
            Ваша реклама по правилам <span className="text-neutral-500">Москвы</span>
          </h1>
          
          <p className="text-xl text-neutral-400 leading-relaxed mb-10">
            Мы берем на себя полную ответственность за соответствие ваших конструкций законодательству. 
            Проверьте свою концепцию за 30 секунд или изучите ключевые нормы регламента.
          </p>
        </div>

        {/* Checker Section */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Интерактивный чекер соответствия</h2>
            <p className="text-neutral-500">Алгоритм на базе актуальной редакции постановления от 2024 года</p>
          </div>
          <ComplianceChecker />
        </section>

        {/* Regulations Grid */}
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-white">Ключевые регламенты</h2>
            <div className="hidden md:flex gap-4">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Актуально на 2024
              </div>
            </div>
          </div>

          <div className="regulations-grid grid md:grid-cols-3 gap-6">
            <RegulationCard 
              icon={<Info size={24} />}
              title="Размещение на фасадах"
              description="Вывески должны располагаться строго в границах занимаемого помещения, не выше линии перекрытий между 1-м и 2-м этажами."
            />
            <RegulationCard 
              icon={<FileText size={24} />}
              title="Типы конструкций"
              description="Разрешены: объемные буквы, световые короба (с ограничениями), консольные панели (панель-кронштейны) и витринные конструкции."
            />
            <RegulationCard 
              icon={<Shield size={24} />}
              title="Запрещенные элементы"
              description="Запрещена оклейка витрин пленкой более 50%, бегущие строки, динамическая подсветка и глухие фоновые подложки."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 p-12 rounded-[2.5rem] bg-linear-to-br from-neutral-900 to-black border border-white/5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">Нужен официальный проект?</h2>
            <p className="text-neutral-400 mb-10 max-w-2xl mx-auto text-lg">
              Для сложных объектов, торговых центров и крышных установок требуется разработка дизайн-проекта и согласование в Департаменте СМИ и рекламы.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-neutral-200 transition-all">
                Заказать дизайн-проект
              </button>
              <button className="px-10 py-4 bg-transparent border border-white/20 text-white font-bold rounded-2xl hover:bg-white/5 transition-all">
                Скачать текст 902-ПП
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function RegulationCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="regulation-card p-8 rounded-3xl bg-neutral-900/40 border border-white/5 hover:border-amber-500/30 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
        {description}
      </p>
    </div>
  );
}

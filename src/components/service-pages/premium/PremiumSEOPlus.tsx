'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ShieldAlert, Sparkles, HelpCircle, FileText, CheckCircle } from 'lucide-react';

interface PremiumSEOPlusProps {
  title: string;
  content: string;
  bullets: string[];
}

export default function PremiumSEOPlus({ title, content, bullets }: PremiumSEOPlusProps) {
  return (
    <section className="py-24 border-t border-[var(--ds-border-default)] bg-[var(--ds-bg-page)] relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--ds-accent-softer)]/10 blur-[130px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - SEO Content & Success Criteria (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--ds-success-soft)] text-[var(--ds-success)] rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--ds-success-border)] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SLA COMPLIANCE // 902-ПП</span>
            </div>
            
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-white leading-none">
              {title}
            </h2>
            
            <p className="text-sm sm:text-base leading-relaxed text-[var(--ds-text-secondary)]">
              {content}
            </p>
            
            {/* Engineering Grid of Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bullets.map((bullet, i) => (
                <div key={i} className="flex gap-3.5 p-4 bg-[var(--ds-bg-card-solid)] rounded-xl border border-[var(--ds-border-card)]">
                  <div className="w-5 h-5 rounded-full bg-[var(--ds-accent-soft)] flex items-center justify-center shrink-0 border border-[var(--ds-accent-border)] mt-0.5">
                    <div className="w-1.5 h-1.5 bg-[var(--ds-accent)] rounded-full" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[var(--ds-text-primary)] leading-snug">{bullet}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Architectural Warnings & Audit Panel (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-[var(--ds-bg-card-inner)] border border-[var(--ds-border-card)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[var(--ds-shadow-panel)]">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldAlert className="w-64 h-64 text-[var(--ds-accent)]" />
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--ds-accent-soft)] rounded-xl flex items-center justify-center border border-[var(--ds-accent-border)]">
                    <ShieldAlert className="w-5 h-5 text-[var(--ds-accent)]" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--ds-text-ghost)]">
                      DANGER PROTOCOL
                    </span>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white">Критические городские риски</h3>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-[var(--ds-text-body)]">
                  Администрация штрафует и немедленно демонтирует конструкции, нарушающие требования благоустройства. Мы устраняем риски на этапе чертежа.
                </p>

                {/* Risk Bulletins */}
                <div className="space-y-3">
                  <div className="rounded-lg border border-[var(--ds-error-border)] bg-[var(--ds-error-soft)]/20 p-3.5">
                    <div className="flex gap-2">
                      <span className="font-mono text-[9px] font-black bg-[var(--ds-error)] text-white px-1.5 py-0.5 rounded leading-none">
                        ШТРАФ
                      </span>
                      <span className="text-xs font-bold text-white">Нарушение габаритов</span>
                    </div>
                    <p className="mt-1.5 text-[11px] text-[var(--ds-text-body)] font-medium leading-relaxed">
                      Высота букв более 50 см на жилых зданиях ведет к предписанию о сносе в течение 10 дней и штрафу до 500 000 ₽.
                    </p>
                  </div>

                  <div className="rounded-lg border border-[var(--ds-warning-border)] bg-[var(--ds-warning-soft)]/20 p-3.5">
                    <div className="flex gap-2">
                      <span className="font-mono text-[9px] font-black bg-[var(--ds-warning)] text-black px-1.5 py-0.5 rounded leading-none">
                        РИСК
                      </span>
                      <span className="text-xs font-bold text-white">Вылет на архитектуру</span>
                    </div>
                    <p className="mt-1.5 text-[11px] text-[var(--ds-text-body)] font-medium leading-relaxed">
                      Буквы, перекрывающие декоративные пояса, пилястры или окна фасада, запрещены к согласованию.
                    </p>
                  </div>
                </div>

                {/* Actionable guarantees */}
                <div className="pt-4 border-t border-[var(--ds-border-divider)] space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-[var(--ds-text-primary)] font-bold">
                    <CheckCircle className="w-4 h-4 text-[var(--ds-success)] shrink-0" />
                    <span>Официальный compliance-аудит (902-ПП)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[var(--ds-text-primary)] font-bold">
                    <CheckCircle className="w-4 h-4 text-[var(--ds-success)] shrink-0" />
                    <span>ГОСТ-калибровка крепежных конструкций</span>
                  </div>
                </div>

                {/* Badges Footer */}
                <div className="flex gap-2 pt-2">
                  <div className="px-3 py-1.5 bg-[var(--ds-bg-page)] border border-[var(--ds-border-card)] text-white text-[9px] font-black uppercase tracking-widest rounded-lg font-mono">
                    902-ПП МСК
                  </div>
                  <div className="px-3 py-1.5 bg-[var(--ds-bg-page)] border border-[var(--ds-border-card)] text-white text-[9px] font-black uppercase tracking-widest rounded-lg font-mono">
                    ГОСТ РФ
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

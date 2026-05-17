'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Send, FileText, CheckCircle2 } from 'lucide-react';

export function WayfindingBriefForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface/50 border border-accent rounded-[3rem] p-12 text-center backdrop-blur-2xl"
      >
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <h3 className="text-3xl font-black uppercase mb-4">Бриф получен!</h3>
        <p className="text-on-surface-variant max-w-md mx-auto mb-8">
          Наш эксперт по архитектурной навигации свяжется с вами в течение 24 часов для уточнения деталей.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-on-surface text-surface font-black uppercase tracking-widest rounded-full"
        >
          Отправить еще один запрос
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-surface/50 border border-outline/30 rounded-[3rem] p-8 md:p-16 shadow-2xl backdrop-blur-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Form */}
        <div className="space-y-8">
          <h3 className="text-2xl font-black uppercase tracking-tight">Заполните детали проекта</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/50 ml-2">Тип объекта</label>
                <select className="w-full bg-background/50 border border-outline/30 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-accent appearance-none">
                  <option>Бизнес-центр</option>
                  <option>Жилой комплекс</option>
                  <option>Медицинский центр</option>
                  <option>Торговый центр</option>
                  <option>Офис продаж</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/50 ml-2">Примерная площадь (м²)</label>
                <input type="number" placeholder="5000" className="w-full bg-background/50 border border-outline/30 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-accent" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/50 ml-2">Что требуется?</label>
              <div className="grid grid-cols-2 gap-3">
                {['Проектирование', 'Производство', 'Монтаж', 'Сервис'].map((item) => (
                  <label key={item} className="flex items-center gap-3 p-4 bg-background/30 border border-outline/20 rounded-xl cursor-pointer hover:border-accent/50 transition-colors">
                    <input type="checkbox" className="w-4 h-4 accent-accent" />
                    <span className="text-xs font-bold">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/50 ml-2">Комментарий к проекту</label>
              <textarea 
                rows={4} 
                className="w-full bg-background/50 border border-outline/30 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-accent resize-none"
                placeholder="Опишите ваши задачи или специфику объекта..."
              />
            </div>
          </div>
        </div>

        {/* Right: File Upload & Submit */}
        <div className="flex flex-col">
          <div className="flex-grow flex flex-col justify-center">
            <div className="border-2 border-dashed border-outline/30 rounded-3xl p-12 text-center group hover:border-accent/50 transition-colors cursor-pointer mb-8">
              <div className="w-16 h-16 bg-surface border border-outline/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-on-surface-variant group-hover:text-accent" />
              </div>
              <h4 className="text-lg font-black uppercase mb-2">Загрузить проект</h4>
              <p className="text-xs text-on-surface-variant max-w-[200px] mx-auto">
                DWG, PDF, JPG или ZIP архив до 100 Мб
              </p>
            </div>

            <div className="bg-background/30 border border-outline/20 rounded-2xl p-6 mb-8 flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-on-surface/50 mb-1">Конфиденциальность</h5>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">
                  Мы готовы подписать NDA перед получением проектной документации. Ваши данные защищены.
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setSubmitted(true)}
            className="w-full py-5 bg-on-surface text-surface font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-accent hover:text-on-surface transition-all active:scale-95 flex items-center justify-center gap-4 shadow-xl"
          >
            <span>Отправить на расчет</span>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

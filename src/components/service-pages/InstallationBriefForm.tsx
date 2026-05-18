'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, CheckCircle2, FileText, Send, Upload } from 'lucide-react';

export function InstallationBriefForm() {
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
        <h3 className="text-3xl font-black uppercase mb-4">Запрос на монтаж получен</h3>
        <p className="text-on-surface-variant max-w-md mx-auto mb-8">
          Инженер проверит фото фасада, условия доступа и вернется с ориентиром по стоимости и рискам монтажа.
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
        <div className="space-y-8">
          <h3 className="text-2xl font-black uppercase tracking-tight">Опишите условия монтажа</h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/50 ml-2">Тип объекта</label>
                <select className="w-full bg-background/50 border border-outline/30 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-accent appearance-none">
                  <option>Стрит-ритейл</option>
                  <option>Торговый центр</option>
                  <option>Бизнес-центр</option>
                  <option>Жилой дом</option>
                  <option>Отдельно стоящее здание</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/50 ml-2">Высота монтажа</label>
                <select className="w-full bg-background/50 border border-outline/30 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-accent appearance-none">
                  <option>1-2 этаж</option>
                  <option>3-5 этаж</option>
                  <option>Нужна автовышка</option>
                  <option>Промышленный альпинизм</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/50 ml-2">Что нужно выполнить?</label>
              <div className="grid grid-cols-2 gap-3">
                {['Монтаж новой вывески', 'Демонтаж старой', 'Подключение электрики', 'Ночной выезд'].map((item) => (
                  <label key={item} className="flex items-center gap-3 p-4 bg-background/30 border border-outline/20 rounded-xl cursor-pointer hover:border-accent/50 transition-colors">
                    <input type="checkbox" className="w-4 h-4 accent-accent" />
                    <span className="text-xs font-bold">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/50 ml-2">Комментарий</label>
              <textarea
                rows={4}
                className="w-full bg-background/50 border border-outline/30 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-accent resize-none"
                placeholder="Опишите фасад, доступ к точке 220V, ограничения по времени или требования УК."
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex-grow flex flex-col justify-center">
            <div className="border-2 border-dashed border-outline/30 rounded-3xl p-12 text-center group hover:border-accent/50 transition-colors cursor-pointer mb-8">
              <div className="w-16 h-16 bg-surface border border-outline/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-on-surface-variant group-hover:text-accent" />
              </div>
              <h4 className="text-lg font-black uppercase mb-2">Фото фасада или ТЗ</h4>
              <p className="text-xs text-on-surface-variant max-w-[220px] mx-auto">
                Прикрепите фото точки, старой вывески или проектную документацию для точного ориентирования по монтажу.
              </p>
            </div>

            <div className="bg-background/30 border border-outline/20 rounded-2xl p-6 mb-8 flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                <Camera className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-on-surface/50 mb-1">Что ускоряет расчет</h5>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">
                  Фото фасада, этажность, режим работы точки и информация о старой конструкции позволяют сразу понять, нужна ли автовышка и демонтаж.
                </p>
              </div>
            </div>

            <div className="bg-background/30 border border-outline/20 rounded-2xl p-6 mb-8 flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-on-surface/50 mb-1">Без скрытых доплат</h5>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">
                  В смете учитываем доступ, крепеж, электрику, демонтаж и спецтехнику отдельно, чтобы бюджет не расползся на объекте.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-5 bg-on-surface text-surface font-black uppercase tracking-[0.2em] rounded-full hover:bg-accent hover:text-on-surface transition-all active:scale-95 flex items-center justify-center gap-4 shadow-xl"
          >
            <span>Отправить на расчет</span>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

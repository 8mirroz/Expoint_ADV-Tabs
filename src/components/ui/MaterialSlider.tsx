'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MATERIALS = [
  {
    id: 'aluminum',
    title: 'Алюминий и композит',
    desc: 'Идеально для уличных стел и подвесных указателей. Легкие, не ржавеют, антивандальные.',
    image: '/img/materials/aluminum-macro.jpg', // Placeholder
    color: 'bg-zinc-300',
  },
  {
    id: 'acrylic',
    title: 'Акрил (Оргстекло)',
    desc: 'Премиальный глянец для зон ресепшн и статусных дверных табличек. Стойкость к УФ и царапинам.',
    image: '/img/materials/acrylic-macro.jpg',
    color: 'bg-white',
  },
  {
    id: 'panels',
    title: 'Тонкие световые панели',
    desc: 'Кристалайты и фреймлайты с торцевой подсветкой для интерьерных менюбордов и планов.',
    image: '/img/materials/panel-macro.jpg',
    color: 'bg-blue-100',
  },
  {
    id: 'metal',
    title: 'Латунь и нержавеющая сталь',
    desc: 'Выбор для luxury-сегмента. Эффект парения при контражурной подсветке.',
    image: '/img/materials/brass-macro.jpg',
    color: 'bg-yellow-600',
  },
];

export function MaterialSlider() {
  const [activeId, setActiveId] = useState(MATERIALS[0].id);

  const activeMaterial = MATERIALS.find((m) => m.id === activeId)!;

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* List */}
      <div className="space-y-4">
        {MATERIALS.map((mat) => (
          <div
            key={mat.id}
            onClick={() => setActiveId(mat.id)}
            className={`p-6 rounded-2xl cursor-pointer transition-all ${
              activeId === mat.id
                ? 'bg-surface border-2 border-accent shadow-xl'
                : 'bg-background border border-outline/50 hover:border-outline'
            }`}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className={`w-6 h-6 rounded-full shadow-inner ${mat.color}`} />
              <h3 className={`text-xl font-bold ${activeId === mat.id ? 'text-accent' : 'text-on-surface'}`}>
                {mat.title}
              </h3>
            </div>
            {activeId === mat.id && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-on-surface-variant text-sm pl-10"
              >
                {mat.desc}
              </motion.p>
            )}
          </div>
        ))}
      </div>

      {/* Image Preview */}
      <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-surface border border-outline/30 flex items-center justify-center">
        {/* Placeholder gradient for missing images */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeMaterial.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${
              activeMaterial.id === 'aluminum' ? 'from-zinc-400 to-zinc-800' :
              activeMaterial.id === 'acrylic' ? 'from-white to-zinc-300' :
              activeMaterial.id === 'panels' ? 'from-blue-200 to-cyan-500' :
              'from-yellow-400 to-yellow-800'
            } flex items-center justify-center`}
          >
            <div className="absolute inset-0 bg-black/20" />
            <span className="text-white/50 text-2xl font-black uppercase tracking-widest relative z-10 text-center px-4">
              {activeMaterial.title}<br/>
              <span className="text-sm font-light">Macro Texture Preview</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

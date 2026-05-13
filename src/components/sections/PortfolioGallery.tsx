"use client";

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/Card';

const IMAGES = [
  "WhatsApp Image 2026-05-10 at 14.36.20.jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.21 (1).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.21.jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.22 (1).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.22 (2).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.22.jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.23 (1).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.23.jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.24 (1).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.24 (2).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.24.jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.25 (1).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.25 (2).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.25.jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.26 (1).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.26 (2).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.26 (3).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.26.jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.27 (1).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.27 (2).jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.27.jpeg",
  "WhatsApp Image 2026-05-10 at 14.36.28.jpeg"
];

export default function PortfolioGallery() {
  return (
    <section className="py-32 px-6 lg:px-20 bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl w-full mx-auto">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">
              <span>Production Archive</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-headline font-black uppercase tracking-tighter leading-[0.85] text-white">
              Наши <span className="text-orange-500">будни.</span>
            </h2>
          </div>
          <div className="h-px grow bg-white/5 mx-12 hidden md:block mb-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {IMAGES.map((img, index) => (
            <motion.div
              key={index}
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Card className="aspect-square overflow-hidden bg-slate-900 border-white/5 relative group-hover:border-orange-500/50 transition-all duration-500">
                <Image
                  src={`/img/${img}`}
                  alt={`Project ${index + 1}`}
                  fill
                  className="object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-2 left-3 text-[8px] font-mono text-white/20 uppercase tracking-widest group-hover:text-orange-500 transition-colors">
                  IMG_REF_{index + 1024}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

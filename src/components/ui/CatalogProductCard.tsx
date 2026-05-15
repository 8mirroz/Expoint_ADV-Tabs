'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductSpec {
  label: string;
  value: string;
}

interface CatalogProductCardProps {
  title: string;
  category: string;
  description: string;
  price: number;
  priceUnit?: string;
  image: string;
  previewVideo?: string;
  specs: ProductSpec[];
  href: string;
  isNew?: boolean;
  modelId?: string;
  accentColor?: string;
}

/**
 * CatalogProductCard — Premium Technical Catalog Component.
 * Style: Apple-like minimalism + Industrial Design + Architectural Signage.
 */
export function CatalogProductCard({
  title,
  category,
  description,
  price,
  priceUnit = '₽',
  image,
  previewVideo,
  specs,
  href,
  isNew = false,
  modelId = 'MOD-01',
  accentColor = '#FFFFFF',
}: CatalogProductCardProps) {
  return (
    <motion.div 
      className="group relative w-full h-[580px] md:h-[620px] flex flex-col justify-between overflow-hidden rounded-[var(--radius-16)] bg-surface border border-outline/50 transition-all duration-700 hover:border-primary/40 hover:shadow-2xl"
      whileHover={{ y: -4 }}
    >
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0 transition-transform duration-[2s] ease-out group-hover:scale-105">
        {previewVideo ? (
          <video
            src={previewVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Strong Dark Gradient Overlay for 4.5:1 Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 z-10" />
      </div>

      {/* Top Layer: Labels */}
      <div className="relative z-20 p-6 md:p-8 flex justify-between items-start pointer-events-none">
        <div className="flex items-center gap-3">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: accentColor, boxShadow: `0 0 12px ${accentColor}` } as React.CSSProperties}
          />
          <span className="text-[11px] font-mono font-bold text-white/70 tracking-[0.3em] uppercase">
            {modelId} <span className="opacity-40 ml-2">/ {category}</span>
          </span>
        </div>
        
        {/* Info Icon / New Badge */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {isNew && (
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-[0.2em]">
              New
            </span>
          )}
          <Link
            href={href}
            className="h-10 w-10 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            aria-label="Подробнее"
          >
            <Info className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom Layer: Content Chunking */}
      <div className="relative z-20 p-6 md:p-8 flex flex-col flex-1 min-h-0">
        
        {/* 1. Title & Description */}
        <div className="space-y-3">
          <h3 className="geist-display-md text-white text-[28px] md:text-[32px] font-black uppercase tracking-tight leading-[1.1] group-hover:text-primary transition-colors duration-500">
            {title}
          </h3>
          <p className="text-white/70 text-[14px] md:text-[15px] font-light leading-relaxed max-w-[340px] line-clamp-2">
            {description}
          </p>
        </div>

        {/* 2. Specs Grid (Glassmorphism Chips) */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {specs.slice(0, 4).map((spec, idx) => (
            <div key={idx} className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 flex flex-col justify-center">
               <span className="text-[12px] text-white font-medium truncate">
                {spec.value}
              </span>
              <span className="text-[9px] uppercase tracking-[0.1em] text-white/50 font-mono truncate mt-0.5">
                {spec.label}
              </span>
            </div>
          ))}
        </div>

        {/* 3. Action Bar (Price + CTA) — always pinned to bottom */}
        <div className="flex items-end justify-between gap-4 pt-6 mt-auto border-t border-white/10">
          <div className="flex flex-col shrink-0">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono mb-1">От</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-white tracking-tighter leading-none">
                {price.toLocaleString('ru-RU')}
              </span>
              <span className="text-primary font-mono text-sm font-medium">{priceUnit}</span>
            </div>
          </div>

          <Link
            href={href}
            className="shrink-0 h-12 md:h-[52px] px-6 bg-white text-black text-[13px] font-black uppercase tracking-[0.1em] flex items-center justify-center gap-2 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            Рассчитать <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
      
      {/* Subtle Neon Glow */}
      <div 
        className="absolute -bottom-24 -right-24 w-64 h-64 blur-[100px] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />
    </motion.div>
  );
}

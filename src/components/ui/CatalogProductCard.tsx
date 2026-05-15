'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductSpec {
  label: string;
  value: string;
}

interface CatalogProductCardProps {
  title: string;
  price: number;
  priceUnit?: string;
  image: string;
  previewVideo?: string;
  specs: ProductSpec[];
  href: string;
  accentColor?: string;
}

/**
 * CatalogProductCard — Premium Technical Catalog Component.
 * Style: Apple-like minimalism + Industrial Design + Architectural Signage.
 */
export function CatalogProductCard({
  title,
  price,
  priceUnit = '₽',
  image,
  previewVideo,
  specs,
  href,
  accentColor = '#FFFFFF',
}: CatalogProductCardProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.article
      className="group relative w-full min-h-[520px] md:min-h-[560px] flex flex-col justify-between overflow-hidden rounded-[var(--radius-16)] bg-surface border border-outline/50 transition-all duration-700 hover:border-primary/40 hover:shadow-2xl"
      whileHover={{ y: -4 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href} aria-label={title} className="absolute inset-0 z-20" />

      {/* Background Visuals */}
      <div className="absolute inset-0 z-0 transition-all duration-[2s] ease-out group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100">
        {previewVideo ? (
          <video
            ref={videoRef}
            src={previewVideo}
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
        
        {/* Subtle Top Gradient for Header Readability */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent z-10" />
      </div>

      {/* Bottom Layer: Content Chunking */}
      <div className="relative z-20 px-6 pb-6 pt-2 md:px-7 md:pb-7 md:pt-4 flex flex-col flex-1 min-h-0">
        
        {/* 1. Title with Accent Bar */}
        <div className="flex gap-4 min-h-[140px]">
          <div 
            className="w-1.5 rounded-full shrink-0 transition-all duration-500" 
            style={{ backgroundColor: accentColor }}
          />
          <h3 className="text-white text-[34px] md:text-[42px] font-black uppercase tracking-tight leading-[0.95] group-hover:text-primary transition-colors duration-500 whitespace-pre-line">
            {title}
          </h3>
        </div>

        {/* 2. Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mt-auto mb-6">
          {specs.slice(0, 4).map((spec, idx) => (
            <div key={idx} className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 flex flex-col justify-center">
               <span className="text-[12px] text-white font-medium truncate">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* 3. Action Bar (Price + CTA) — always pinned to bottom */}
        <div className="pt-4 border-t border-white/10 h-[144px] flex flex-col justify-between">
          <div className="flex items-end justify-between gap-3 min-h-[64px]">
            <div className="flex flex-col min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-white tracking-tighter leading-none tabular-nums">
                  {price.toLocaleString('ru-RU')}
                </span>
                <span className="text-primary font-mono text-sm font-medium">{priceUnit}</span>
              </div>
            </div>
          </div>

          <div className="h-11 w-full bg-white text-black text-[12px] font-black uppercase tracking-[0.08em] flex items-center justify-center gap-2 rounded-[10px] shadow-[0_0_20px_rgba(255,255,255,0.12)] group-hover:shadow-[0_0_26px_rgba(255,255,255,0.25)] transition-all">
            Рассчитать <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      {/* Subtle Neon Glow */}
      <div 
        className="absolute -bottom-24 -right-24 w-64 h-64 blur-[100px] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />
    </motion.article>
  );
}

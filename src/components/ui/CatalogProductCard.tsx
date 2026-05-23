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
  priceLabel?: string;
  fromLabel?: string;
  image: string;
  previewVideo?: string;
  specs: ProductSpec[];
  href: string;
  accentColor?: string;
  index?: number;
}

/**
 * CatalogProductCard — Premium Technical Catalog Component.
 * Style: Apple-like minimalism + Industrial Design + Architectural Signage.
 */
export function CatalogProductCard({
  title,
  price,
  priceUnit = '₽',
  priceLabel = 'Тариф производства',
  fromLabel = 'от',
  image,
  previewVideo,
  specs,
  href,
  accentColor = '#FFFFFF',
  index = 0,
}: CatalogProductCardProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const activeAccent = accentColor || 'var(--accent)';

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
      className="group relative w-full min-h-[520px] md:min-h-[560px] flex flex-col justify-between overflow-hidden rounded-[var(--radius-16)] bg-surface border border-outline/50 transition-all duration-700 hover:border-[var(--accent-color)]/30 hover:shadow-2xl"
      style={{ 
        '--accent-color': activeAccent,
        borderColor: 'var(--outline)'
      } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href} aria-label={title} className="absolute inset-0 z-30" />

      {/* Background Visuals */}
      <div className="absolute inset-0 z-0 transition-all duration-[2s] ease-out opacity-85 group-hover:opacity-100">
        {previewVideo ? (
          <video
            ref={videoRef}
            src={previewVideo}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Strong Dark Gradient Overlay for 4.5:1 Text Contrast — transitions to a lighter state on hover to make videos shine */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 group-hover:via-black/40 group-hover:to-black/5 transition-all duration-[1000ms] z-10" />
        
        {/* Subtle Top Gradient for Header Readability — transitions to a lighter state on hover */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent group-hover:from-black/50 transition-all duration-[1000ms] z-10" />
      </div>

      {/* Bottom Layer: Content Chunking */}
      <div className="relative z-20 px-6 pb-6 pt-2 md:px-7 md:pb-7 md:pt-4 flex flex-col flex-1 min-h-0">
        
        {/* 1. Title with Accent Bar */}
        <div className="min-h-[140px]">
          <div className="flex gap-4">
            <div 
              className="w-1.5 rounded-full shrink-0 transition-all duration-500 bg-[#00ffa3] shadow-[0_0_8px_rgba(0,255,163,0.3)] group-hover:shadow-[0_0_16px_#00ffa3] group-hover:scale-y-[1.05]" 
            />
            <h3 className="text-white text-[34px] md:text-[42px] font-black uppercase tracking-tight leading-[0.95] group-hover:bg-gradient-to-r group-hover:from-[#00ffa3] group-hover:to-[#00c8ff] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 whitespace-pre-line pb-1 pr-2">
              {title}
            </h3>
          </div>
        </div>

        {/* 2. Specs Flow (Flex Wrap for Premium Micro-Tags) */}
        <div className="flex flex-wrap gap-1.5 mt-auto mb-2 min-h-[54px] items-start align-top content-start">
          {specs.slice(0, 6).map((spec, idx) => (
            <div 
              key={idx} 
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-md border border-white/10 transition-all duration-300 flex items-center shrink-0"
            >
              <span className="text-[11px] md:text-xs text-white/95 font-medium tracking-tight whitespace-nowrap">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* 3. Action Bar (Price + CTA) — always pinned to bottom */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-2">
          {/* Price details in premium accent color */}
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-1 font-bold">
              {priceLabel}
            </span>
            <div className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="text-[12px] font-mono text-white/60 uppercase tracking-[0.1em]">{fromLabel}</span>
              <span className="text-[32px] font-black text-white tracking-tight leading-none tabular-nums font-sans">
                {price.toLocaleString('ru-RU')}
              </span>
              <span className="text-[12px] font-mono text-white/60 font-medium tracking-wide lowercase">
                {priceUnit}
              </span>
            </div>
          </div>

          {/* Animated Outline Arrow CTA button with Premium Rhythmic Cyclic FX */}
          <div className="relative shrink-0">
            {/* Rhythmic breathing aura — continuously active in a coordinated wave pattern across cards, intensifies on hover */}
            <motion.div
              className="absolute -inset-1.5 rounded-full border border-[var(--accent-color)]/20 group-hover:border-[var(--accent-color)]/50 transition-colors duration-500 pointer-events-none"
              animate={{
                scale: [1, 1.28, 1],
                opacity: [0.15, 0.6, 0.15],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.0 + (index % 3) * 0.3,
                delay: index * 0.35,
                ease: "easeInOut",
              }}
            />
            {/* Main button — No Fill ("без заливки"), transitions to accent outlines on hover */}
            <div className="w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center transition-all duration-500 group-hover:border-[var(--accent-color)] group-hover:text-[var(--accent-color)] group-hover:scale-105 group-hover:shadow-[0_0_20px_color-mix(in_srgb,var(--accent-color)_45%,transparent)] active:scale-95">
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:-rotate-45" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle Neon Glow */}
      <div 
        className="absolute -bottom-24 -right-24 w-64 h-64 blur-[100px] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"
        style={{ backgroundColor: activeAccent }}
      />
    </motion.article>
  );
}

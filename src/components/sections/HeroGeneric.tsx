'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HeroGenericProps {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  description?: string;
  highlights?: string[];
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  bgImage?: string;
  compact?: boolean;
}

/**
 * HeroGeneric — Universal hero section for inner pages.
 * Light theme optimized with clean typography and subtle motion.
 */
export default function HeroGeneric({
  title,
  titleAccent,
  subtitle,
  description,
  highlights,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref,
  bgImage,
  compact = false,
}: HeroGenericProps) {
  return (
    <section
      className={`relative overflow-hidden bg-background ${compact ? 'py-16' : 'section-padding min-h-[70vh] flex items-center'}`}
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('/img/patterns/grid.svg')] bg-[length:40px_40px] pointer-events-none" />

      {/* Mesh Gradient Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] z-0 pointer-events-none">
        <div className="geist-mesh-gradient absolute inset-0 transform -translate-y-1/2 opacity-60" />
      </div>

      {/* Technical Label (HUD style) */}
      <div className="absolute top-10 right-10 z-10 hidden lg:block">
        <div className="flex flex-col items-end gap-1 opacity-20">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface">LOC: 55.7558° N, 37.6173° E</span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface">EST: 2018 / REV: 4.0</span>
        </div>
      </div>

      {/* Optional background image with overlay */}
      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-background/80 z-0" />
        </>
      )}

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-4xl"
        >
          {subtitle && (
            <p className="verge-mono-label text-primary mb-8">{subtitle}</p>
          )}

          <h1 className="geist-display-xl md:text-[64px] lg:text-[80px] xl:text-[96px] text-on-surface">
            {title}
            {titleAccent && (
              <>
                {' '}
                <span className="text-primary">{titleAccent}</span>
              </>
            )}
            .
          </h1>

          {description && (
            <p className="mt-8 max-w-2xl text-[18px] md:text-[20px] leading-[1.6] text-on-surface-variant">
              {description}
            </p>
          )}

          {highlights && highlights.length > 0 && (
            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[var(--radius-8)] border border-outline bg-surface/80 px-4 py-4 text-sm leading-relaxed text-on-surface shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          {(ctaText || secondaryCtaText) && (
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              {ctaText && (
                <Link
                  href={ctaHref}
                  className="geist-button-primary h-[52px] group"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {secondaryCtaText && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="geist-button-secondary h-[52px]"
                >
                  <span>{secondaryCtaText}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-outline" />
    </section>
  );
}

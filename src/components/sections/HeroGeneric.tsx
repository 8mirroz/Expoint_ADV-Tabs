'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HeroGenericProps {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  description?: string;
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
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref,
  bgImage,
  compact = false,
}: HeroGenericProps) {
  return (
    <section
      className={`relative overflow-hidden bg-background ${compact ? 'py-20 md:py-24' : 'py-28 md:py-36 lg:py-44'}`}
    >
      {/* Optional background image with overlay */}
      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-background/90" />
        </>
      )}

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-4xl"
        >
          {subtitle && (
            <p className="verge-kicker text-primary mb-6">{subtitle}</p>
          )}

          <h1 className="font-headline text-[48px] md:text-[72px] lg:text-[96px] uppercase leading-[0.85] text-on-surface tracking-tight">
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="text-primary">{titleAccent}</span>
              </>
            )}
          </h1>

          {description && (
            <p className="mt-8 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-on-surface-variant">
              {description}
            </p>
          )}

          {(ctaText || secondaryCtaText) && (
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {ctaText && (
                <Link
                  href={ctaHref}
                  className="bg-primary text-on-primary rounded-[var(--radius-12)] h-[52px] px-8 flex items-center justify-center gap-3 font-mono font-semibold uppercase tracking-[1px] text-[12px] hover:opacity-90 transition-opacity"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondaryCtaText && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="bg-transparent border border-outline text-on-surface rounded-[var(--radius-12)] h-[52px] px-8 flex items-center justify-center gap-3 font-mono font-semibold uppercase tracking-[1px] text-[12px] hover:border-primary hover:text-primary transition-colors"
                >
                  <span>{secondaryCtaText}</span>
                  <ArrowRight className="h-4 w-4" />
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

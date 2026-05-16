'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PricingPreviewItem {
  label: string;
  price: string;
  unit: string;
}

interface PricingPreviewData {
  items: PricingPreviewItem[];
  badges?: string[];
}

interface HeroGenericProps {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  description?: string;
  highlights?: string[];
  pricingPreview?: PricingPreviewData;
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
 * v10: Added optional pricingPreview panel for /prices page.
 */
export default function HeroGeneric({
  title,
  titleAccent,
  subtitle,
  description,
  highlights,
  pricingPreview,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref,
  bgImage,
  compact = false,
}: HeroGenericProps) {
  const hasPricingPanel = pricingPreview && pricingPreview.items.length > 0;

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
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface">LOC: 55.7558° N, 37.6173° E</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface">EST: 2018 / REV: 4.0</span>
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
        <div className={`${hasPricingPanel ? 'grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start' : ''}`}>
          {/* Main Content Column */}
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
              <p className="mt-8 max-w-2xl text-lg md:text-xl leading-[1.6] text-on-surface-variant">
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

          {/* Pricing Preview Panel (optional, v10) */}
          {hasPricingPanel && (
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="hidden lg:flex flex-col gap-0 mt-4"
            >
              {/* Price Cards */}
              <div className="rounded-t-[var(--radius-16)] border border-outline bg-surface/90 backdrop-blur-sm p-6 shadow-md">
                <p className="verge-mono-label text-primary mb-5">Ориентиры цен</p>
                <div className="space-y-4">
                  {pricingPreview.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-baseline justify-between gap-3 border-b border-outline/50 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-on-surface-variant">{item.label}</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold text-on-surface tabular-nums">
                          {item.price}
                        </span>
                        <span className="text-xs font-mono text-primary uppercase">
                          {item.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              {pricingPreview.badges && pricingPreview.badges.length > 0 && (
                <div className="rounded-b-[var(--radius-16)] border border-t-0 border-outline bg-surface-variant/40 backdrop-blur-sm px-6 py-5">
                  <div className="grid grid-cols-2 gap-3">
                    {pricingPreview.badges.map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-2 text-xs text-on-surface-variant"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.aside>
          )}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-outline" />
    </section>
  );
}

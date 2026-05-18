'use client';

import { motion } from 'motion/react';
import { ArrowRight, BadgeRussianRuble, Clock3, HardHat, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface PricingPreviewItem {
  label: string;
  price: string;
  unit: string;
}

interface PricingPreviewData {
  items: PricingPreviewItem[];
  badges?: string[];
  meta?: Array<{ label: string; value: string }>;
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
  const previewIcons = [BadgeRussianRuble, Sparkles, ShieldCheck, HardHat];
  const metaIcons = [Clock3, HardHat, ShieldCheck];

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
        <div className={`${hasPricingPanel ? 'grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-stretch' : ''}`}>
          {/* Main Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={`max-w-4xl ${hasPricingPanel ? 'flex flex-col justify-between h-full' : ''}`}
          >
            <div>
              {subtitle && (
                <p className="verge-mono-label text-primary mb-8">{subtitle}</p>
              )}

              <h1 className="geist-display-xl max-w-5xl text-balance md:text-[64px] lg:text-[78px] xl:text-[92px] text-on-surface">
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
            </div>

            {highlights && highlights.length > 0 && (
              <div className="mt-10 grid gap-3 md:grid-cols-3">
                {highlights.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-[var(--radius-12)] border border-outline bg-surface/85 px-5 py-5 text-sm leading-relaxed text-on-surface shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2 text-primary">
                      {index === 0 && <BadgeRussianRuble className="h-4 w-4" />}
                      {index === 1 && <HardHat className="h-4 w-4" />}
                      {index === 2 && <ShieldCheck className="h-4 w-4" />}
                      <span className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                        Проверяемый ориентир
                      </span>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Pricing Preview Panel (optional, v10) */}
          {hasPricingPanel && (
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="hidden lg:flex flex-col justify-between h-full mt-4"
            >
              <div className="flex flex-col gap-0">
                {/* Price Cards */}
                <div className="rounded-t-[var(--radius-20)] border border-white/[0.08] bg-zinc-950/80 p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <p className="verge-mono-label text-primary">Ориентиры цен</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00ffa3]/20 bg-[#00ffa3]/5 px-3 py-1 text-[10px] uppercase tracking-widest text-[#00ffa3] font-mono">
                      <span className="w-1 h-1 bg-[#00ffa3] rounded-full animate-pulse" />
                      Real input
                    </span>
                  </div>
                  <div className="space-y-3">
                    {pricingPreview.items.map((item, index) => {
                      const Icon = previewIcons[index] ?? BadgeRussianRuble;
                      return (
                        <div
                          key={item.label}
                          className="group flex items-center justify-between gap-4 rounded-[var(--radius-12)] border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] px-4 py-3.5 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary transition-colors group-hover:bg-primary/20">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-sm font-semibold text-white/90 truncate">{item.label}</span>
                              <span className="block text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                                стартовая единица
                              </span>
                            </div>
                          </div>
                          <div className="flex items-baseline gap-1.5 shrink-0 whitespace-nowrap text-right justify-end">
                            <span className="text-2xl font-bold tracking-tight text-white tabular-nums whitespace-nowrap">
                              {item.price}
                            </span>
                            <span className="text-[10px] font-mono text-primary uppercase tracking-wider whitespace-nowrap select-none">
                              {item.unit}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Trust Badges */}
                {pricingPreview.badges && pricingPreview.badges.length > 0 && (
                  <div className="rounded-b-[var(--radius-20)] border border-t-0 border-white/[0.08] bg-zinc-900/30 px-6 py-5 shadow-[0_15px_40px_rgba(0,0,0,0.3)] backdrop-blur-md">
                    <div className="grid grid-cols-2 gap-3">
                      {pricingPreview.badges.map((badge) => (
                        <div
                          key={badge}
                          className="flex items-center gap-2 text-xs text-neutral-400 font-sans"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00ffa3] shadow-[0_0_8px_rgba(0,255,163,0.8)]" />
                          <span>{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Meta Data (HUD-style indicators) */}
              {pricingPreview.meta && pricingPreview.meta.length > 0 && (
                <div className="mt-4 grid gap-2.5 rounded-[var(--radius-20)] border border-white/[0.06] bg-zinc-950/60 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                  {pricingPreview.meta.map((item, index) => {
                    const Icon = metaIcons[index] ?? Clock3;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-3 rounded-[var(--radius-12)] border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] px-4 py-3 transition-colors duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-[#00ffa3]/80" />
                          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-white/90 font-sans">{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.aside>
          )}
        </div>

        {/* CTA Buttons - Positioned below the aligned content baseline grid */}
        {(ctaText || secondaryCtaText) && (
          <div className="mt-12 flex flex-col gap-4 sm:flex-row relative z-10">
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
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-outline" />
    </section>
  );
}

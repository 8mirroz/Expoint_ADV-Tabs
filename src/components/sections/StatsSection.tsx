'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { BookOpenCheck, FileCheck2, HardHat, Lightbulb } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  numericValue?: number;
  suffix?: string;
}

interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  items: StatItem[];
  animateOnView?: boolean;
}

function AnimatedNumber({
  target,
  animateOnView = true,
}: {
  target: number;
  animateOnView?: boolean;
}) {
  const [count, setCount] = useState(() => (animateOnView ? 0 : target));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!animateOnView) return;
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [animateOnView, isInView, target]);

  return (
    <span ref={ref}>
      {(animateOnView ? count : target).toLocaleString()}
    </span>
  );
}

/**
 * StatsSection — Premium animated statistics with Stark Engineering styling and responsive layouts.
 */
export default function StatsSection({
  title,
  subtitle,
  items,
  animateOnView = true,
}: StatsSectionProps) {
  const statIcons = [HardHat, BookOpenCheck, FileCheck2, Lightbulb];

  return (
    <section className="section-padding bg-canvas-soft relative overflow-hidden">
      {/* Decorative Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.04)_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none z-0" />
      
      {/* Ambient Neo-Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,245,160,0.04)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="section-container relative z-10">
        {(title || subtitle) && (
          <div className="mb-16 md:mb-20">
            {subtitle ? (
              <p className="verge-mono-label text-accent uppercase tracking-[0.2em] text-xs mb-3">{subtitle}</p>
            ) : (
              <p className="verge-mono-label text-accent uppercase tracking-[0.2em] text-xs mb-3">// PERFORMANCE & METRICS</p>
            )}
            {title && (
              <h2 className="geist-display-lg max-w-[18ch] text-balance md:text-4xl lg:text-[48px] text-on-surface font-semibold tracking-[-0.03em]">
                {title}.
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 xl:gap-10">
          {items.map((item, index) => {
            const Icon = statIcons[index] ?? HardHat;
            return (
            <motion.div
              key={item.label}
              initial={animateOnView ? { opacity: 0, y: 20 } : false}
              whileInView={animateOnView ? { opacity: 1, y: 0 } : undefined}
              viewport={animateOnView ? { once: true, margin: '-50px' } : undefined}
              transition={animateOnView ? { delay: index * 0.1, duration: 0.8 } : undefined}
              className="relative group overflow-hidden rounded-[var(--radius-16)] border border-outline/50 bg-surface/40 p-5 sm:p-6 lg:p-7 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-outline-strong/40 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_-8px_rgba(0,245,160,0.08)] dark:bg-surface/15 dark:border-outline/25"
            >
              {/* Radial Hover Gradient Fill */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,245,160,0.04),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* HUD Engineering Accents */}
              <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-outline/40 group-hover:border-accent transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-outline/40 group-hover:border-accent transition-colors duration-300" />

              <div className="relative z-10 mb-6 flex h-11 w-11 items-center justify-center rounded-[12px] border border-outline/65 bg-surface-variant/80 text-primary transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(0,245,160,0.2)]">
                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-105" />
              </div>

              <div className="font-bold text-primary text-3xl sm:text-4xl lg:text-[38px] xl:text-[46px] 2xl:text-[54px] tracking-[-0.04em] relative z-10 flex items-baseline flex-nowrap whitespace-nowrap gap-0.5 transition-colors duration-300">
                {item.numericValue !== undefined ? (
                  <>
                    <AnimatedNumber
                      target={item.numericValue}
                      animateOnView={animateOnView}
                    />
                    {item.suffix && (
                      <span className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-medium text-primary/75 dark:text-primary/60 ml-0.5 relative bottom-[0.06em] select-none transition-colors">
                        {item.suffix}
                      </span>
                    )}
                  </>
                ) : (
                  item.value
                )}
              </div>
              <p className="mt-4 verge-mono-label text-on-surface-variant text-[10px] sm:text-xs uppercase tracking-widest leading-relaxed max-w-[160px] relative z-10">
                {item.label}
              </p>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}

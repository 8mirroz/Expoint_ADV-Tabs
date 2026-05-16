'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

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
  suffix = '',
  animateOnView = true,
}: {
  target: number;
  suffix: string;
  animateOnView?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!animateOnView) {
      setCount(target);
      return;
    }

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
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/**
 * StatsSection — Animated statistics with whileInView counter animation.
 */
export default function StatsSection({
  title,
  subtitle,
  items,
  animateOnView = true,
}: StatsSectionProps) {
  return (
    <section className="section-padding bg-canvas-soft relative overflow-hidden">
      <div className="section-container">
        {(title || subtitle) && (
          <div className="mb-20">
            {subtitle && (
              <p className="verge-mono-label text-primary mb-6">{subtitle}</p>
            )}
            {title && (
              <h2 className="geist-display-lg md:text-4xl lg:text-[48px] text-on-surface">
                {title}.
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={animateOnView ? { opacity: 0, y: 20 } : false}
              whileInView={animateOnView ? { opacity: 1, y: 0 } : undefined}
              viewport={animateOnView ? { once: true, margin: '-50px' } : undefined}
              transition={animateOnView ? { delay: index * 0.1, duration: 0.8 } : undefined}
              className="relative group p-8 bg-surface/40 backdrop-blur-sm border border-outline/50 hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              {/* HUD Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-primary/20 group-hover:border-primary/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-primary/20 group-hover:border-primary/40 transition-colors" />

              <div className="geist-display-xl font-bold text-primary md:text-[48px] lg:text-[64px] tracking-[-0.05em] relative z-10">
                {item.numericValue !== undefined ? (
                  <AnimatedNumber
                    target={item.numericValue}
                    suffix={item.suffix || ''}
                    animateOnView={animateOnView}
                  />
                ) : (
                  item.value
                )}
              </div>
              <p className="mt-4 verge-mono-label text-on-surface-variant text-xs uppercase tracking-widest leading-relaxed max-w-[160px] relative z-10">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

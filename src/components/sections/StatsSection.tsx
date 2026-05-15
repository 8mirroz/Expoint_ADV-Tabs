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
}

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
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
export default function StatsSection({ title, subtitle, items }: StatsSectionProps) {
  return (
    <section className="section-padding bg-canvas-soft relative overflow-hidden">
      <div className="section-container">
        {(title || subtitle) && (
          <div className="mb-20">
            {subtitle && (
              <p className="verge-mono-label text-primary mb-6">{subtitle}</p>
            )}
            {title && (
              <h2 className="geist-display-lg md:text-[40px] lg:text-[48px] text-on-surface">
                {title}.
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="geist-display-xl text-primary md:text-[56px] lg:text-[72px] tracking-[-0.05em]">
                {item.numericValue !== undefined ? (
                  <AnimatedNumber target={item.numericValue} suffix={item.suffix || ''} />
                ) : (
                  item.value
                )}
              </div>
              <p className="mt-4 verge-mono-label text-on-surface-variant max-w-[200px]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

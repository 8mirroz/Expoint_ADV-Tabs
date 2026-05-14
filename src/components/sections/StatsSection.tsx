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
    <section className="section-padding bg-surface">
      <div className="section-container">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {subtitle && (
              <p className="verge-kicker text-primary mb-4">{subtitle}</p>
            )}
            {title && (
              <h2 className="font-headline text-[36px] md:text-[52px] lg:text-[64px] uppercase leading-[0.85] text-on-surface">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-outline">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-surface p-8 md:p-12 text-center"
            >
              <p className="font-headline text-[40px] md:text-[56px] lg:text-[72px] leading-[0.8] text-primary">
                {item.numericValue !== undefined ? (
                  <AnimatedNumber target={item.numericValue} suffix={item.suffix || ''} />
                ) : (
                  item.value
                )}
              </p>
              <p className="mt-4 verge-mono-label text-on-surface-variant">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

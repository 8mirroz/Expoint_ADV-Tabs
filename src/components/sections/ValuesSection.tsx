'use client';

import { motion } from 'motion/react';

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface ValuesSectionProps {
  title?: string;
  subtitle?: string;
  items: ValueItem[];
}

/**
 * ValuesSection — Company values / benefits cards with Material icons.
 */
export default function ValuesSection({ title, subtitle, items }: ValuesSectionProps) {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {(title || subtitle) && (
          <div className="mb-16">
            {subtitle && (
              <p className="verge-kicker text-primary mb-4">{subtitle}</p>
            )}
            {title && (
              <h2 className="font-headline text-[36px] md:text-[52px] lg:text-[64px] uppercase leading-[0.85] text-on-surface max-w-3xl">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group p-8 bg-surface rounded-[var(--radius-12)] border border-outline hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-[var(--radius-8)] bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  {item.icon}
                </span>
              </div>
              <h3 className="font-sans font-bold text-[18px] text-on-surface mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-on-surface-variant">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

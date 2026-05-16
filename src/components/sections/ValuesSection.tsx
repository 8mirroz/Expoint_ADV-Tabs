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
              <h2 className="geist-display-xl uppercase text-on-surface max-w-3xl">
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
              className="relative group p-8 bg-surface border border-outline/50 hover:border-primary/40 hover:shadow-xl transition-all duration-500 overflow-hidden rounded-sm"
            >
              {/* HUD Accents */}
              <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-primary/10 group-hover:border-primary/40 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-primary/10 group-hover:border-primary/40 transition-colors duration-500" />

              <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors duration-500 border border-primary/10 group-hover:border-primary/20">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="font-sans font-bold text-lg text-on-surface mb-4 leading-tight tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm leading-[1.6] text-on-surface-variant font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

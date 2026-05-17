'use client';

import { motion } from 'motion/react';
import { Cpu, ShieldCheck, Factory, CalendarRange, LucideIcon } from 'lucide-react';

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

const iconMap: Record<string, LucideIcon> = {
  precision_manufacturing: Cpu,
  verified: ShieldCheck,
  factory: Factory,
  schedule: CalendarRange,
};

/**
 * ValuesSection — Company values / benefits cards with Lucide React icons.
 */
export default function ValuesSection({ title, subtitle, items }: ValuesSectionProps) {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle blueprint grid in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:16px_28px] opacity-60 pointer-events-none" />
      
      <div className="section-container relative z-10">
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

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Cpu;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative group p-10 bg-surface/10 backdrop-blur-md border border-outline/30 hover:border-accent/40 transition-all duration-500 rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(0,245,160,0.06)] hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Premium Glow Effect */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Corner Accents - thin tech notches */}
                <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-outline/40 group-hover:border-accent transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-outline/40 group-hover:border-accent transition-colors duration-500" />

                <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-start">
                  {/* Icon Wrapper */}
                  <div className="shrink-0 w-16 h-16 rounded-[16px] bg-surface-variant/80 border border-outline/65 flex items-center justify-center text-primary transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent group-hover:shadow-[0_0_20px_rgba(0,245,160,0.25)]">
                    <IconComponent className="h-7 w-7 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-mono text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 tracking-widest uppercase">
                        0{index + 1}
                      </span>
                      <div className="h-px bg-outline/50 flex-1 group-hover:bg-accent/20 transition-colors duration-500" />
                    </div>
                    <h3 className="geist-display-sm text-neutral-100 mb-4 tracking-tight group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-neutral-400 font-light group-hover:text-neutral-200 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

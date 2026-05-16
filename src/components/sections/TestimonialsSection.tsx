'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useState } from 'react';

interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  text: string;
  rating: number;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  items: TestimonialItem[];
}

/**
 * TestimonialsSection — Client testimonials carousel / grid.
 */
export default function TestimonialsSection({ title, subtitle, items }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

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

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 bg-surface rounded-[var(--radius-12)] border border-outline"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-base leading-[1.8] text-on-surface mb-6">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-on-surface text-sm">{item.clientName}</p>
                  <p className="text-sm text-on-surface-variant">{item.company}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 bg-surface rounded-[var(--radius-12)] border border-outline"
          >
            <Quote className="w-8 h-8 text-primary/30 mb-4" />
            <p className="text-base leading-[1.8] text-on-surface mb-6">
              &ldquo;{items[activeIndex].text}&rdquo;
            </p>
            <div>
              <p className="font-semibold text-on-surface text-sm">{items[activeIndex].clientName}</p>
              <p className="text-sm text-on-surface-variant">{items[activeIndex].company}</p>
            </div>
          </motion.div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? 'w-6 bg-primary' : 'bg-outline'
                }`}
                aria-label={`Отзыв ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

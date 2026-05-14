'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CTASectionProps {
  title: string;
  titleAccent?: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'primary' | 'secondary';
}

/**
 * CTASection — Call-to-action block with title, description, and button.
 */
export default function CTASection({
  title,
  titleAccent,
  description,
  buttonText,
  buttonHref,
  variant = 'primary',
}: CTASectionProps) {
  const isPrimary = variant === 'primary';

  return (
    <section className={`section-padding ${isPrimary ? 'bg-primary' : 'bg-surface'}`}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className={`font-headline text-[36px] md:text-[52px] lg:text-[64px] uppercase leading-[0.85] ${isPrimary ? 'text-on-primary' : 'text-on-surface'}`}>
            {title}
            {titleAccent && (
              <>
                {' '}
                <span className={isPrimary ? 'opacity-70' : 'text-primary'}>{titleAccent}</span>
              </>
            )}
          </h2>

          {description && (
            <p className={`mt-6 text-[16px] md:text-[18px] leading-[1.7] max-w-xl mx-auto ${isPrimary ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
              {description}
            </p>
          )}

          <Link
            href={buttonHref}
            className={`mt-10 inline-flex items-center gap-3 h-[52px] px-10 rounded-[var(--radius-12)] font-mono font-semibold uppercase tracking-[1px] text-[12px] transition-all ${
              isPrimary
                ? 'bg-on-primary text-primary hover:bg-on-primary/90'
                : 'bg-primary text-on-primary hover:opacity-90'
            }`}
          >
            <span>{buttonText}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

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
    <section className={`section-padding ${isPrimary ? 'bg-primary' : 'bg-canvas-soft'}`}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className={`geist-display-lg md:text-[40px] lg:text-[56px] ${isPrimary ? 'text-on-primary' : 'text-on-surface'}`}>
            {title}
            {titleAccent && (
              <>
                {' '}
                <span className={isPrimary ? 'text-on-primary/60' : 'text-primary'}>{titleAccent}</span>
              </>
            )}
            .
          </h2>

          {description && (
            <p className={`mt-8 text-[18px] md:text-[20px] leading-[1.6] max-w-2xl mx-auto ${isPrimary ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>
              {description}
            </p>
          )}

          <Link
            href={buttonHref}
            className={`mt-12 group ${
              isPrimary
                ? 'geist-button-secondary h-[56px] px-12'
                : 'geist-button-primary h-[56px] px-12'
            }`}
          >
            <span>{buttonText}</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

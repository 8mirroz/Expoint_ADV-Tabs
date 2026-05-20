'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CTASectionProps {
  title: string;
  titleAccent?: string;
  description?: string;
  buttonText: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

/**
 * CTASection — Call-to-action block with title, description, and button.
 * v10: Added optional secondary button support.
 */
export default function CTASection({
  title,
  titleAccent,
  description,
  buttonText,
  buttonHref,
  secondaryButtonText,
  secondaryButtonHref,
  onClick,
  variant = 'primary',
}: CTASectionProps) {
  const isPrimary = variant === 'primary';

  return (
    <section className={`section-padding ${isPrimary ? 'bg-primary' : 'bg-canvas-soft'}`}>
      <div className="section-container">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className={`geist-display-lg md:text-4xl lg:text-[56px] ${isPrimary ? 'text-on-primary' : 'text-on-surface'}`}>
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
            <p className={`mt-8 text-lg md:text-xl leading-[1.6] max-w-2xl mx-auto ${isPrimary ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>
              {description}
            </p>
          )}

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {onClick ? (
              <button
                onClick={onClick}
                className={`inline-flex items-center group ${
                  isPrimary
                    ? 'geist-button-secondary h-[56px] px-12'
                    : 'geist-button-primary h-[56px] px-12'
                }`}
              >
                <span>{buttonText}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <Link
                href={buttonHref || '#'}
                className={`inline-flex items-center group ${
                  isPrimary
                    ? 'geist-button-secondary h-[56px] px-12'
                    : 'geist-button-primary h-[56px] px-12'
                }`}
              >
                <span>{buttonText}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            {secondaryButtonText && secondaryButtonHref && (
              <Link
                href={secondaryButtonHref}
                className={`inline-flex items-center group ${
                  isPrimary
                    ? 'geist-button-secondary h-[56px] px-12 !bg-transparent !border-on-primary/30 !text-on-primary/80 hover:!text-on-primary'
                    : 'geist-button-secondary h-[56px] px-12'
                }`}
              >
                <span>{secondaryButtonText}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

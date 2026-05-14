'use client';

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface BentoCardProps {
  name: string;
  className?: string;
  background?: React.ReactNode;
  icon?: React.ReactNode;
  description: string;
  href: string;
  cta: string;
}

type IconElement = React.ReactElement<{ className?: string }>;

function isIconElement(value: React.ReactNode): value is IconElement {
  return React.isValidElement<{ className?: string }>(value);
}

export function BentoCard({
  name,
  className,
  background,
  icon,
  description,
  href,
  cta,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-none',
        'bg-surface border border-outline transition-all duration-500',
        'hover:shadow-premium hover:border-accent/30',
        className
      )}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">{background}</div>
      
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-8 transition-all duration-500 group-hover:-translate-y-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-none bg-secondary/30 backdrop-blur-sm transition-all duration-500 group-hover:bg-accent group-hover:scale-110">
           {isIconElement(icon) ? React.cloneElement(icon, {
             className: cn(
               icon.props.className,
               "transition-colors duration-500 group-hover:text-white"
             )
           }) : icon}
        </div>
        <h3 className="text-xl font-black text-on-surface mt-6 tracking-tight uppercase">
          {name}
        </h3>
        <p className="max-w-xs text-sm text-on-surface-variant leading-relaxed font-light">{description}</p>
      </div>

      <div
        className={cn(
          'pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'
        )}
      >
        <Link
          href={href}
          className="pointer-events-auto flex items-center gap-2 text-sm font-bold text-on-surface hover:text-accent transition-colors"
        >
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-500 group-hover:bg-accent/2" />
    </motion.div>
  );
}

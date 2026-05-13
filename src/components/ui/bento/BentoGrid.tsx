'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[20rem]', className)}>
      {children}
    </div>
  );
}

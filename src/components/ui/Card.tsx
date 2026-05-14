import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'story' | 'saturated' | 'outlined';
}

export function Card({ className = '', variant = 'story', children, ...props }: CardProps) {
  const baseStyles = 'rounded-[var(--radius-20)] overflow-hidden transition-colors duration-150 relative block';
  
  const variants = {
    // Standard Dark Canvas tile with 1px hairline border
    story: 'bg-background border border-outline hover:border-primary group',
    // Full bleed color block (like acid mint or ultraviolet)
    saturated: 'bg-primary border border-transparent text-on-primary',
    // Minimal outlined variant
    outlined: 'bg-transparent border border-outline-strong',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`font-headline text-xl font-black uppercase tracking-tight text-on-surface ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pt-0 flex items-center ${className}`} {...props}>
      {children}
    </div>
  );
}

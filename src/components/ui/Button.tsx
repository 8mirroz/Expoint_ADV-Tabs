import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-none font-bold uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 border';
  
  const variants = {
    primary: 'bg-accent border-accent text-on-accent hover:bg-accent/90 shadow-neon',
    secondary: 'bg-secondary border-outline text-on-surface hover:bg-secondary/80',
    outline: 'border-outline bg-transparent text-on-surface hover:bg-secondary/20',
    ghost: 'border-transparent hover:bg-secondary/20 text-on-surface',
  };

  const sizes = {
    sm: 'h-10 px-4 text-[10px]',
    md: 'h-12 px-8 text-xs',
    lg: 'h-16 px-10 text-sm',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}

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
  const baseStyles = 'inline-flex items-center justify-center border font-mono uppercase tracking-[1.1px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';
  
  const variants = {
    // Primary Jelly Pill
    primary: 'rounded-[var(--radius-24)] bg-primary border-primary text-on-primary hover:bg-white/20 hover:border-[#c2c2c2] hover:text-white',
    // Secondary Slate Pill
    secondary: 'rounded-[var(--radius-24)] bg-surface border-surface text-on-surface hover:bg-surface-elevated hover:border-outline-strong',
    // Outlined
    outline: 'rounded-[var(--radius-40)] border-outline bg-transparent text-on-surface hover:border-primary hover:text-primary',
    ghost: 'rounded-[var(--radius-24)] border-transparent text-on-surface hover:text-[var(--state-hover-link)]',
  };

  const sizes = {
    sm: 'h-10 px-6 text-[10px]',
    md: 'h-12 px-8 text-[11px]',
    lg: 'h-[60px] px-10 text-[13px]',
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

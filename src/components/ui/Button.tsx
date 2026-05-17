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
  const baseStyles = 'ui-button focus-visible:ring-2 focus-visible:ring-primary';
  
  const variants = {
    primary: 'ui-button-primary',
    secondary: 'ui-button-secondary',
    outline: 'ui-button-outline',
    ghost: 'ui-button-ghost',
  };

  const sizes = {
    sm: 'ui-button-sm',
    md: 'ui-button-md',
    lg: 'ui-button-lg',
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

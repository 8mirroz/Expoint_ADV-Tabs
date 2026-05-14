import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block verge-mono-label text-on-surface-variant mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={`
              block w-full rounded-[var(--radius-2)] border border-outline p-4
              focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm
              bg-background text-on-surface transition-all outline-none
              disabled:opacity-50 disabled:bg-surface placeholder:text-on-surface-variant
              ${error ? 'border-error focus:border-error focus:ring-error' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-error' : 'text-on-surface-variant'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

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
          <label htmlFor={inputId} className="block text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={`
              block w-full rounded-none border border-outline p-4
              focus:border-accent focus:ring-1 focus:ring-accent/20 sm:text-sm
              bg-surface text-on-surface transition-all outline-none
              disabled:opacity-50 disabled:bg-secondary placeholder:text-on-surface-variant
              ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-error' : 'text-secondary'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

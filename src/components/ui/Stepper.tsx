import React from 'react';

export interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className = '' }: StepperProps) {
  return (
    <div className={`flex items-center w-full ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = currentStep > index;
        const isActive = currentStep === index;
        
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-12 h-12 rounded-none flex items-center justify-center font-black text-xs transition-all duration-500 border ${
                  isActive
                    ? 'bg-accent border-accent text-on-accent shadow-neon'
                    : isCompleted
                      ? 'bg-secondary border-outline text-on-surface'
                      : 'bg-secondary/50 border-outline text-on-surface-variant'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  `0${index + 1}`
                )}
              </div>
              <span className={`mt-3 text-xs font-black uppercase tracking-widest absolute -bottom-6 w-max text-center ${isActive ? 'text-accent' : 'text-on-surface-variant'}`}>
                {step}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-px mx-4 bg-outline">
                <div
                  className="h-full bg-accent transition-all duration-700 ease-in-out shadow-neon"
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

import React from 'react';
import { cn } from '@/lib/utils';

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  clean?: boolean;
  children?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

export function Container<T extends React.ElementType = 'div'>({ 
  children, 
  className, 
  as,
  clean = false,
  ...props 
}: ContainerProps<T>) {
  const Component = as || 'div';
  
  return React.createElement(
    Component,
    {
      ...props,
      className: cn(
        'mx-auto w-full max-w-(--container-max)',
        !clean && 'px-(--container-px) lg:px-(--container-px-lg)',
        className
      ),
    },
    children
  );
}

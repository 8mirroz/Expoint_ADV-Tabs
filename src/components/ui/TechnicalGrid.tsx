'use client';

import React from 'react';

interface TechnicalGridProps {
  opacity?: number;
  dotSize?: number;
  spacing?: number;
}

export function TechnicalGrid({ 
  opacity = 0.15, 
  dotSize = 1, 
  spacing = 40 
}: TechnicalGridProps) {
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle ${dotSize}px at center, currentColor 100%, transparent 100%)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        opacity: opacity,
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
      <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-background" />
    </div>
  );
}

export default TechnicalGrid;
